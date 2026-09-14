import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../lib/dotTexture";

/*
 * Backdrop for the Real Estate hero. Three ideas, one scene:
 *
 *   District — an instanced grid of towers whose heights breathe, so the field
 *              reads as a city being built rather than a static skyline.
 *   Plot     — a point field on the ground plane, the survey grid the towers
 *              stand on, lifted slightly by the same wave that drives them.
 *   Survey   — two rings sweeping outward from the centre, like a valuation
 *              pass running across the district.
 *
 * Decorative and cheap: one instanced mesh, one shared geometry mutated in
 * place, no lights, and nothing allocated inside the frame loop.
 */

const TEAL = "#14D8C4";
const INDIGO = "#788BE3";

const COLS = 13;
const ROWS = 7;
const GAP = 1.15;
const TOWER_COUNT = COLS * ROWS;

const PLOT_SEGMENTS = 46;
const PLOT_SPAN = 24;

/** Deterministic so the composition is identical on every load. */
function makeRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/** The district: a block grid whose towers rise and settle on a travelling wave. */
function District() {
  const meshRef = useRef();
  // One scratch object, reused for every instance matrix.
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Per-tower base height and phase, fixed at mount so the skyline has a
  // recognisable profile instead of reshuffling every frame.
  const towers = useMemo(() => {
    const rand = makeRandom(20260915);
    return Array.from({ length: TOWER_COUNT }, (_, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const x = (col - (COLS - 1) / 2) * GAP;
      const z = (row - (ROWS - 1) / 2) * GAP;
      // Tallest toward the middle of the district, as a real skyline is.
      const centrality = 1 - Math.min(1, Math.hypot(x, z * 1.6) / 8);
      return {
        x,
        z,
        base: 0.5 + centrality * 3.2 + rand() * 1.5,
        phase: rand() * Math.PI * 2,
        width: 0.3 + rand() * 0.16,
      };
    });
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;
    for (let i = 0; i < TOWER_COUNT; i += 1) {
      const tw = towers[i];
      // A wave travelling across the grid, so construction reads as directional.
      const h = tw.base + Math.sin(t * 0.7 + tw.phase + tw.x * 0.22) * 0.55;
      dummy.position.set(tw.x, h / 2, tw.z);
      dummy.scale.set(tw.width, h, tw.width);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, TOWER_COUNT]}
      position={[0, -3.1, 0]}
      rotation={[0, 0.24, 0]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={TEAL} transparent opacity={0.34} />
    </instancedMesh>
  );
}

/** The survey grid the district stands on. */
function Plot() {
  const dotTexture = useMemo(() => makeDotTexture(), []);
  const pointsRef = useRef();

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(PLOT_SPAN, PLOT_SPAN * 0.5, PLOT_SEGMENTS, Math.round(PLOT_SEGMENTS * 0.5)),
    []
  );
  // Rest positions copied once, so every frame is a pure function of time.
  const base = useMemo(() => geometry.attributes.position.array.slice(), [geometry]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const attr = pointsRef.current.geometry.attributes.position;
    const arr = attr.array;
    for (let i = 0; i < arr.length; i += 3) {
      const x = base[i];
      const y = base[i + 1];
      const d = Math.sqrt(x * x + y * y);
      // The same outward pass that drives the rings, damped with distance.
      arr[i + 2] =
        Math.sin(d * 0.5 - t * 1.1) * (1.1 / (1 + d * 0.3)) + Math.sin(x * 0.2 + t * 0.3) * 0.16;
    }
    attr.needsUpdate = true;
  });

  return (
    <group position={[0, -3.35, 0]} rotation={[-Math.PI / 2, 0, 0.24]}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={INDIGO} wireframe transparent opacity={0.13} />
      </mesh>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.11}
          color={TEAL}
          map={dotTexture}
          alphaTest={0.02}
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/** Two rings sweeping outward: a valuation pass crossing the district. */
function SurveyRings() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const [a, b] = groupRef.current.children;
    // Offset phases so one ring is always mid-sweep.
    const pa = (t * 0.22) % 1;
    const pb = (t * 0.22 + 0.5) % 1;
    a.scale.setScalar(0.25 + pa * 2.4);
    a.material.opacity = 0.45 * (1 - pa);
    b.scale.setScalar(0.25 + pb * 2.4);
    b.material.opacity = 0.45 * (1 - pb);
  });

  return (
    <group ref={groupRef} position={[0, -3.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <torusGeometry args={[3.2, 0.012, 8, 160]} />
        <meshBasicMaterial color={INDIGO} transparent opacity={0.4} />
      </mesh>
      <mesh>
        <torusGeometry args={[3.2, 0.012, 8, 160]} />
        <meshBasicMaterial color={TEAL} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

/** Eases the scene toward the pointer, so the hero reacts without chasing it. */
function ParallaxRig({ children }) {
  const groupRef = useRef();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.24;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.12;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(() => {
    const g = groupRef.current;
    g.rotation.y += (target.current.x - g.rotation.y) * 0.04;
    g.rotation.x += (target.current.y - g.rotation.x) * 0.04;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function RealEstateCanvas({ frameloop = "always" }) {
  return (
    <Canvas camera={{ position: [0, 1.4, 12.5], fov: 50 }} dpr={[1, 1.5]} frameloop={frameloop}>
      <ParallaxRig>
        <District />
        <Plot />
        <SurveyRings />
      </ParallaxRig>
    </Canvas>
  );
}

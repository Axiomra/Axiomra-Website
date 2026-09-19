import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../lib/dotTexture";

/*
 * Backdrop for the Education hero. Three ideas, one scene:
 *
 *   Page:     a point field folded by a wave that travels along one axis, so
 *             the sheet reads as pages turning rather than water.
 *   Ascent:   instanced sparks drifting upward and recycling: knowledge
 *             moving up through the field.
 *   Cap:      a wireframe mortarboard on a slow tilt, with one thin ring for
 *             an axis.
 *
 * Decorative and cheap: one shared geometry mutated in place, one instanced
 * mesh, no lights, and nothing allocated inside the frame loop.
 */

const TEAL = "#14D8C4";
const INDIGO = "#788BE3";

const SEGMENTS = 60;
const SPAN = 26;

const SPARK_COUNT = 90;
const SPARK_SPAN = 20;
const SPARK_RISE = 13;

/** A sheet folded by a travelling wave: pages turning, not a water surface. */
function PageField() {
  const dotTexture = useMemo(() => makeDotTexture(), []);
  const pointsRef = useRef();

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(SPAN, SPAN * 0.55, SEGMENTS, Math.round(SEGMENTS * 0.55)),
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
      // A single crease sweeping across x is what makes it read as a page;
      // the second term keeps the sheet from looking machined.
      const crease = Math.sin(x * 0.38 - t * 0.9);
      arr[i + 2] = crease * 1.35 * Math.exp(-Math.abs(y) * 0.07) + Math.sin(y * 0.3 + t * 0.4) * 0.18;
    }
    attr.needsUpdate = true;
  });

  return (
    <group position={[0, -0.8, -2]} rotation={[-1.06, 0, 0.12]}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={INDIGO} wireframe transparent opacity={0.15} />
      </mesh>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.14}
          color={TEAL}
          map={dotTexture}
          alphaTest={0.02}
          transparent
          opacity={0.62}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/** Deterministic 0-1 scatter: one stable value per spark and per axis. */
function scatter(i, salt) {
  const n = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

/** Sparks drifting upward and wrapping back to the floor of the field. */
function Ascent() {
  const meshRef = useRef();
  // One scratch object, reused for every instance matrix.
  const dummy = useMemo(() => new THREE.Object3D(), []);
  // Fixed lanes and speeds, so the column never has to allocate per frame.
  // Scattered with a hash rather than Math.random, so the field is identical
  // on every mount and the lanes stay reproducible.
  const sparks = useMemo(
    () =>
      Array.from({ length: SPARK_COUNT }, (_, i) => ({
        x: (scatter(i, 1) - 0.5) * SPARK_SPAN,
        z: (scatter(i, 2) - 0.5) * 9,
        offset: scatter(i, 3) * SPARK_RISE,
        speed: 0.35 + scatter(i, 4) * 0.55,
        size: 0.05 + scatter(i, 5) * 0.08,
        sway: scatter(i, 6) * Math.PI * 2,
      })),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;
    for (let i = 0; i < SPARK_COUNT; i += 1) {
      const s = sparks[i];
      // Modulo wrap keeps the column endless without respawning anything.
      const y = ((s.offset + t * s.speed) % SPARK_RISE) - SPARK_RISE / 2;
      dummy.position.set(s.x + Math.sin(t * 0.5 + s.sway) * 0.3, y, s.z);
      dummy.rotation.set(0, t * 0.3 + s.sway, t * 0.2);
      dummy.scale.setScalar(s.size);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, SPARK_COUNT]} position={[0, 0, 1.5]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={TEAL} transparent opacity={0.45} />
    </instancedMesh>
  );
}

/** A mortarboard reduced to its outline: a tilted square plus its tassel ring. */
function Mortarboard() {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * 0.12;
    ref.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.3) * 0.09;
  });

  return (
    <group ref={ref} position={[4.8, 2.1, 0.4]}>
      <mesh>
        <planeGeometry args={[4.4, 4.4, 1, 1]} />
        <meshBasicMaterial color={INDIGO} wireframe transparent opacity={0.45} side={THREE.DoubleSide} />
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
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.14;
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

export default function EducationCanvas({ frameloop = "always" }) {
  return (
    <Canvas camera={{ position: [0, 1.4, 12], fov: 50 }} dpr={[1, 1.5]} frameloop={frameloop}>
      <ParallaxRig>
        <PageField />
        <Ascent />
        <Mortarboard />
      </ParallaxRig>
    </Canvas>
  );
}

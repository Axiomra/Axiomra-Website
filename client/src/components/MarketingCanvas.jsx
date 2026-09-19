import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../lib/dotTexture";

/*
 * Backdrop for the Marketing hero. Three ideas, one scene:
 *
 *   Reach:    a point field displaced by radial waves, so signal appears to
 *             broadcast outward from a single origin.
 *   Signal:   a row of instanced bars that rise and fall like a live campaign
 *             readout, drawn from the same waveform as the field.
 *   Orbit:    one thin ring, tilted, to give the composition an axis.
 *
 * Decorative and cheap: one shared geometry mutated in place, one instanced
 * mesh, no lights, and nothing allocated inside the frame loop.
 */

const TEAL = "#14D8C4";
const INDIGO = "#788BE3";

const SEGMENTS = 64;
const SPAN = 26;

const BAR_COUNT = 28;
const BAR_GAP = 0.62;

/** Radial ripples read as reach: one origin, waves travelling outward. */
function ReachField() {
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
      const d = Math.sqrt(x * x + y * y);
      // Outward ripple, damped with distance, plus a slow drift so the field
      // never settles into a single repeating frame.
      arr[i + 2] =
        Math.sin(d * 0.55 - t * 1.4) * (1.6 / (1 + d * 0.22)) +
        Math.sin(x * 0.18 + t * 0.35) * 0.22;
    }
    attr.needsUpdate = true;
  });

  return (
    <group position={[0, -0.6, -2]} rotation={[-1.02, 0, 0]}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={INDIGO} wireframe transparent opacity={0.16} />
      </mesh>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.14}
          color={TEAL}
          map={dotTexture}
          alphaTest={0.02}
          transparent
          opacity={0.65}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/** A live performance readout: instanced bars driven by the same waveform. */
function SignalBars() {
  const meshRef = useRef();
  // One scratch object, reused for every instance matrix.
  const dummy = useMemo(() => new THREE.Object3D(), []);
  // Per-bar phase offsets keep the row from moving as a single block.
  const phases = useMemo(
    () => Array.from({ length: BAR_COUNT }, (_, i) => (i * 0.47) % (Math.PI * 2)),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;
    for (let i = 0; i < BAR_COUNT; i += 1) {
      const h = 0.5 + (Math.sin(t * 1.1 + phases[i]) * 0.5 + 0.5) * 2.6;
      dummy.position.set((i - (BAR_COUNT - 1) / 2) * BAR_GAP, h / 2, 0);
      dummy.scale.set(1, h, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, BAR_COUNT]}
      position={[0, -3.4, 2.2]}
      rotation={[0, 0, 0]}
    >
      <boxGeometry args={[0.16, 1, 0.16]} />
      <meshBasicMaterial color={TEAL} transparent opacity={0.4} />
    </instancedMesh>
  );
}

function Orbit() {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * 0.1;
    ref.current.rotation.x = Math.PI / 2.6 + Math.sin(t * 0.25) * 0.07;
  });
  return (
    <mesh ref={ref} position={[4.6, 1.8, 0.5]}>
      <torusGeometry args={[3.8, 0.013, 8, 200]} />
      <meshBasicMaterial color={INDIGO} transparent opacity={0.5} />
    </mesh>
  );
}

/** Eases the scene toward the pointer, so the hero reacts without chasing it. */
function ParallaxRig({ children }) {
  const groupRef = useRef();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.26;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.16;
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

export default function MarketingCanvas({ frameloop = "always" }) {
  return (
    <Canvas camera={{ position: [0, 1.6, 12], fov: 50 }} dpr={[1, 1.5]} frameloop={frameloop}>
      <ParallaxRig>
        <ReachField />
        <SignalBars />
        <Orbit />
      </ParallaxRig>
    </Canvas>
  );
}

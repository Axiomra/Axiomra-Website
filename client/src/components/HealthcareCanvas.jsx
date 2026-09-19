import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../lib/dotTexture";

/*
 * Backdrop for the Healthcare hero. Four ideas, one scene:
 *
 *   Vitals:    a floor of points carrying a slow swell, the graph paper a
 *              rhythm strip is printed on, seen in perspective.
 *   Trace:     the monitor line itself, drawn left to right, held, cleared,
 *              and redrawn, the way a bedside display sweeps.
 *   Helix:     two instanced strands of base pairs turning on a common axis.
 *   Cells:     instanced capsules drifting through the volume, each on its
 *              own phase so the field never pulses in unison.
 *
 * Decorative and cheap: geometry allocated once and mutated in place, two
 * instanced meshes, no lights, and nothing allocated inside the frame loop.
 */

const TEAL = "#14D8C4";
const INDIGO = "#788BE3";

const SEGMENTS = 56;
const SPAN = 32;

const HELIX_COUNT = 72;
const CELL_COUNT = 30;

/** The rhythm-strip floor: a travelling swell across the graph plane. */
function VitalsField() {
  const dotTexture = useMemo(() => makeDotTexture(), []);
  const pointsRef = useRef();

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(SPAN, SPAN * 0.5, SEGMENTS, Math.round(SEGMENTS * 0.5)),
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
      // A swell running with the trace, crossed by a slower lateral wave and a
      // faint respiratory rise, so the floor never settles into a repeat.
      arr[i + 2] =
        Math.sin(x * 0.26 - t * 0.8) * 0.44 +
        Math.sin(y * 0.2 + t * 0.36) * 0.3 +
        Math.sin((x + y) * 0.09 + t * 0.18) * 0.24;
    }
    attr.needsUpdate = true;
  });

  return (
    <group position={[0, -2.6, -1.5]} rotation={[-1.18, 0, 0]}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={INDIGO} wireframe transparent opacity={0.11} />
      </mesh>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.12}
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

/**
 * The monitor trace: a fixed path drawn progressively, held, then cleared.
 * The sweep is fast and the hold is long, which is what makes it read as a
 * bedside display rather than a line animating in.
 */
function Trace({ points, speed, phase, color }) {
  const ref = useRef();
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))),
    [points]
  );
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 96, 0.017, 6, false), [curve]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    const cycle = (clock.getElapsedTime() * speed + phase) % 1;
    const drawn = Math.min(1, cycle / 0.55);
    const fade = cycle > 0.84 ? 1 - (cycle - 0.84) / 0.16 : 1;
    ref.current.geometry.setDrawRange(0, Math.floor(geometry.index.count * drawn));
    ref.current.material.opacity = 0.52 * fade;
  });

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshBasicMaterial color={color} transparent opacity={0.52} />
    </mesh>
  );
}

/**
 * The double helix. One instanced sphere serves both strands: even indices
 * take one phase, odd indices the opposite, so a single mesh draws the pair.
 * Laid on its side and turning slowly, so it reads across the hero rather
 * than standing in the middle of it.
 */
function Helix() {
  const meshRef = useRef();
  const groupRef = useRef();
  // One scratch object, reused for every instance matrix.
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;
    for (let i = 0; i < HELIX_COUNT; i += 1) {
      const pair = Math.floor(i / 2);
      const strand = i % 2 === 0 ? 0 : Math.PI;
      const a = pair * 0.42 + t * 0.35 + strand;
      // Advances along x, rotates about it: the strand is the axis, not a ring.
      dummy.position.set(-8.5 + pair * 0.48, Math.sin(a) * 1.15, Math.cos(a) * 1.15);
      // Base pairs read as beads, so the near side of the turn sits larger.
      dummy.scale.setScalar(0.07 + (Math.cos(a) * 0.5 + 0.5) * 0.06);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;

    groupRef.current.rotation.x = Math.sin(t * 0.14) * 0.14;
  });

  return (
    <group ref={groupRef} position={[-1.2, 1.4, -1.2]} rotation={[0, 0, -0.22]}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, HELIX_COUNT]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial color={INDIGO} transparent opacity={0.5} />
      </instancedMesh>
    </group>
  );
}

/**
 * Capsules drifting through the volume. Thin cylinders with rounded caps are
 * too expensive for a backdrop, so these are plain cylinders laid along their
 * travel and turning about it, which is enough at this opacity.
 */
function CellDrift() {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const cells = useMemo(
    () =>
      Array.from({ length: CELL_COUNT }, (_, i) => ({
        radius: 4.8 + (i % 5) * 1.05,
        height: -0.6 + ((i * 3) % 8) * 0.6,
        speed: 0.08 + ((i * 5) % 5) * 0.03,
        spin: 0.3 + ((i * 7) % 5) * 0.16,
        phase: (i * 1.31) % (Math.PI * 2),
        scale: 0.13 + ((i * 11) % 4) * 0.04,
      })),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;
    for (let i = 0; i < CELL_COUNT; i += 1) {
      const c = cells[i];
      const a = t * c.speed + c.phase;
      dummy.position.set(
        Math.cos(a) * c.radius,
        c.height + Math.sin(a * 1.5) * 0.6,
        Math.sin(a) * c.radius * 0.42
      );
      dummy.rotation.set(t * c.spin * 0.4, 0, Math.PI / 2 + Math.sin(a) * 0.5);
      // Length along the travel, girth across it: a capsule, not a bead.
      dummy.scale.set(c.scale, c.scale * 3.2, c.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, CELL_COUNT]}>
      <cylinderGeometry args={[1, 1, 1, 12]} />
      <meshBasicMaterial color={TEAL} transparent opacity={0.42} />
    </instancedMesh>
  );
}

/** One tilted torus, to give the composition an axis. */
function Ring() {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * 0.06;
    ref.current.rotation.x = Math.PI / 2.6 + Math.sin(t * 0.18) * 0.05;
  });
  return (
    <mesh ref={ref} position={[5.8, 1.8, 0.2]}>
      <torusGeometry args={[3.9, 0.011, 8, 200]} />
      <meshBasicMaterial color={TEAL} transparent opacity={0.38} />
    </mesh>
  );
}

/** Eases the scene toward the pointer, so the hero reacts without chasing it. */
function ParallaxRig({ children }) {
  const groupRef = useRef();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.11;
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

// Held outside the component so the curves are not rebuilt on every render.
// A real QRS complex: flat baseline, a short P bump, the spike, then a slow
// T wave before it settles again.
const TRACE_A = [
  [-12, 0.2, 0.6],
  [-8.4, 0.2, 0.4],
  [-7.2, 0.62, 0.3],
  [-6.4, 0.2, 0.2],
  [-5.6, -0.5, 0.1],
  [-5.1, 2.9, 0],
  [-4.6, -0.9, -0.1],
  [-3.9, 0.2, -0.2],
  [-2.6, 0.95, -0.3],
  [-1.4, 0.2, -0.4],
  [2.2, 0.2, -0.6],
  [3.4, 0.62, -0.7],
  [4.2, 0.2, -0.8],
  [5, -0.5, -0.9],
  [5.5, 2.9, -1],
  [6, -0.9, -1.1],
  [6.7, 0.2, -1.2],
  [8, 0.95, -1.3],
  [9.2, 0.2, -1.4],
  [12, 0.2, -1.5],
];
// A second, quieter channel: the respiratory line under the cardiac one.
const TRACE_B = [
  [-11, 2.7, -1.8],
  [-6, 3.3, -1.2],
  [-1, 2.6, -0.7],
  [4.2, 3.4, -0.2],
  [9.4, 2.8, 0.4],
  [12, 3.3, 0.8],
];

export default function HealthcareCanvas({ frameloop = "always" }) {
  return (
    <Canvas camera={{ position: [0, 1.5, 12], fov: 50 }} dpr={[1, 1.5]} frameloop={frameloop}>
      <ParallaxRig>
        <VitalsField />
        <Trace points={TRACE_A} speed={0.24} phase={0} color={TEAL} />
        <Trace points={TRACE_B} speed={0.13} phase={0.4} color={INDIGO} />
        <Helix />
        <CellDrift />
        <Ring />
      </ParallaxRig>
    </Canvas>
  );
}

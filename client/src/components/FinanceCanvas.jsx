import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../lib/dotTexture";

/*
 * Backdrop for the Finance hero. Four ideas, one scene:
 *
 *   Grid     — a floor of points carrying a slow swell, the trading grid a
 *              chart is drawn on, seen in perspective.
 *   Candles  — one instanced mesh of market columns, each breathing on its
 *              own phase so the row reads as a live series, not a bar chart.
 *   Tape     — a price line threading above the columns, drawn and cleared on
 *              a loop the way a ticker redraws.
 *   Coins    — thin instanced discs orbiting the volume, edge-on and turning.
 *
 * Decorative and cheap: geometry allocated once and mutated in place, two
 * instanced meshes, no lights, and nothing allocated inside the frame loop.
 */

const TEAL = "#14D8C4";
const INDIGO = "#788BE3";

const SEGMENTS = 56;
const SPAN = 32;

const CANDLE_COUNT = 26;
const COIN_COUNT = 14;

/** The trading grid: a travelling swell across the floor plane. */
function GridField() {
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
      // A swell running with the tape, crossed by a slower lateral wave so the
      // floor never settles into a repeating frame.
      arr[i + 2] =
        Math.sin(x * 0.28 - t * 0.85) * 0.46 +
        Math.sin(y * 0.22 + t * 0.4) * 0.3 +
        Math.sin((x - y) * 0.1 + t * 0.22) * 0.26;
    }
    attr.needsUpdate = true;
  });

  return (
    <group position={[0, -2.6, -1.5]} rotation={[-1.18, 0, 0]}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={INDIGO} wireframe transparent opacity={0.12} />
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
 * The market columns. One instanced box scaled per candle: the body grows and
 * shrinks on its own phase, and the whole row drifts slowly left, so the
 * series always looks like it is printing rather than sitting still.
 */
function CandleField() {
  const meshRef = useRef();
  // One scratch object, reused for every instance matrix.
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const bars = useMemo(
    () =>
      Array.from({ length: CANDLE_COUNT }, (_, i) => ({
        x: -11 + i * 0.86,
        z: ((i * 5) % 3) * -0.7,
        base: 0.5 + ((i * 7) % 6) * 0.28,
        speed: 0.5 + ((i * 3) % 5) * 0.14,
        phase: (i * 0.73) % (Math.PI * 2),
      })),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;
    for (let i = 0; i < CANDLE_COUNT; i += 1) {
      const b = bars[i];
      const h = b.base + (Math.sin(t * b.speed + b.phase) * 0.5 + 0.5) * 1.9;
      // Grown from the floor, not the centre, so the feet stay on the grid.
      dummy.position.set(b.x, -2.2 + h / 2, b.z);
      dummy.scale.set(0.16, h, 0.16);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, CANDLE_COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={TEAL} transparent opacity={0.5} />
    </instancedMesh>
  );
}

/** The price line: a fixed path drawn progressively, held, then cleared. */
function Tape({ points, speed, phase, color }) {
  const ref = useRef();
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))),
    [points]
  );
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.016, 6, false), [curve]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    const cycle = (clock.getElapsedTime() * speed + phase) % 1;
    const drawn = Math.min(1, cycle / 0.6);
    const fade = cycle > 0.82 ? 1 - (cycle - 0.82) / 0.18 : 1;
    ref.current.geometry.setDrawRange(0, Math.floor(geometry.index.count * drawn));
    ref.current.material.opacity = 0.5 * fade;
  });

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
}

/**
 * Coins on a wide orbit. Thin cylinders laid on edge and spun about their own
 * face, which is what sells them as struck discs rather than beads.
 */
function CoinOrbit() {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const coins = useMemo(
    () =>
      Array.from({ length: COIN_COUNT }, (_, i) => ({
        radius: 5.4 + (i % 4) * 1.15,
        height: 0.6 + ((i * 3) % 6) * 0.55,
        speed: 0.12 + ((i * 5) % 4) * 0.035,
        spin: 0.5 + ((i * 7) % 5) * 0.2,
        phase: (i * 1.37) % (Math.PI * 2),
        scale: 0.2 + ((i * 11) % 4) * 0.055,
      })),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;
    for (let i = 0; i < COIN_COUNT; i += 1) {
      const c = coins[i];
      const a = t * c.speed + c.phase;
      dummy.position.set(
        Math.cos(a) * c.radius,
        c.height + Math.sin(a * 1.6) * 0.5,
        Math.sin(a) * c.radius * 0.45
      );
      dummy.rotation.set(Math.PI / 2, 0, t * c.spin + c.phase);
      dummy.scale.setScalar(c.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COIN_COUNT]}>
      <cylinderGeometry args={[1, 1, 0.16, 20]} />
      <meshBasicMaterial color={INDIGO} transparent opacity={0.5} />
    </instancedMesh>
  );
}

/** One tilted torus, to give the composition an axis. */
function Ring() {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * 0.07;
    ref.current.rotation.x = Math.PI / 2.6 + Math.sin(t * 0.2) * 0.05;
  });
  return (
    <mesh ref={ref} position={[5.8, 1.8, 0.2]}>
      <torusGeometry args={[3.9, 0.011, 8, 200]} />
      <meshBasicMaterial color={TEAL} transparent opacity={0.4} />
    </mesh>
  );
}

/** Eases the scene toward the pointer, so the hero reacts without chasing it. */
function ParallaxRig({ children }) {
  const groupRef = useRef();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.22;
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

// Held outside the component so the curves are not rebuilt on every render.
const TAPE_A = [
  [-11, -0.4, 0.8],
  [-6.5, 1.1, 0.4],
  [-2.2, 0.2, 0],
  [2.4, 2.1, -0.4],
  [6.8, 1.4, -0.8],
  [11, 3.2, -1.2],
];
const TAPE_B = [
  [-10, 2.6, -1.6],
  [-5, 1.6, -1],
  [0, 2.9, -0.6],
  [5.2, 2, -0.2],
  [10.4, 3.6, 0.4],
];

export default function FinanceCanvas({ frameloop = "always" }) {
  return (
    <Canvas camera={{ position: [0, 1.5, 12], fov: 50 }} dpr={[1, 1.5]} frameloop={frameloop}>
      <ParallaxRig>
        <GridField />
        <CandleField />
        <Tape points={TAPE_A} speed={0.2} phase={0} color={TEAL} />
        <Tape points={TAPE_B} speed={0.15} phase={0.45} color={INDIGO} />
        <CoinOrbit />
        <Ring />
      </ParallaxRig>
    </Canvas>
  );
}

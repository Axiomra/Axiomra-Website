import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../lib/dotTexture";

/*
 * Backdrop for the Sports hero. Four ideas, one scene:
 *
 *   Pitch:     a ground plane of points carrying a slow travelling swell, so
 *              the surface reads as a field seen in perspective.
 *   Tracks:    instanced markers sweeping along looping paths, the shape
 *              player-tracking output takes on a coach's screen.
 *   Trails:    thin arcs through the volume: the flight of a struck ball.
 *   Ring:      one tilted torus, to give the composition an axis.
 *
 * Decorative and cheap: geometry allocated once and mutated in place, one
 * instanced mesh, no lights, and nothing allocated inside the frame loop.
 */

const TEAL = "#14D8C4";
const INDIGO = "#788BE3";

const SEGMENTS = 60;
const SPAN = 30;

const NODE_COUNT = 22;

/** The playing surface: a travelling swell, damped toward the horizon. */
function PitchField() {
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
      // A swell running the length of the pitch, crossed by a slower lateral
      // wave so the surface never settles into a repeating frame.
      arr[i + 2] =
        Math.sin(x * 0.32 - t * 1.15) * 0.52 +
        Math.sin(y * 0.24 + t * 0.5) * 0.34 +
        Math.sin((x + y) * 0.12 - t * 0.28) * 0.3;
    }
    attr.needsUpdate = true;
  });

  return (
    <group position={[0, -2.4, -1.5]} rotation={[-1.15, 0, 0]}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={INDIGO} wireframe transparent opacity={0.13} />
      </mesh>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.13}
          color={TEAL}
          map={dotTexture}
          alphaTest={0.02}
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/**
 * Player-tracking markers. Each node runs its own Lissajous loop over the
 * pitch, which gives twenty-two independent paths out of one closed form.
 */
function TrackingNodes() {
  const meshRef = useRef();
  // One scratch object, reused for every instance matrix.
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const paths = useMemo(
    () =>
      Array.from({ length: NODE_COUNT }, (_, i) => ({
        rx: 4.2 + (i % 5) * 1.35,
        rz: 1.5 + ((i * 3) % 4) * 0.8,
        speed: 0.18 + ((i * 7) % 5) * 0.045,
        phase: (i * 1.21) % (Math.PI * 2),
        lift: ((i * 5) % 7) * 0.16,
      })),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;
    for (let i = 0; i < NODE_COUNT; i += 1) {
      const p = paths[i];
      const a = t * p.speed + p.phase;
      dummy.position.set(Math.sin(a) * p.rx, -1.9 + p.lift + Math.sin(a * 2) * 0.18, Math.cos(a * 1.5) * p.rz);
      // Markers pulse rather than spin: reads as a live readout, not debris.
      const s = 0.055 + (Math.sin(t * 1.6 + p.phase) * 0.5 + 0.5) * 0.045;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color={TEAL} transparent opacity={0.75} />
    </instancedMesh>
  );
}

/** Ball flight: a quadratic arc, redrawn as the strike repeats. */
function Trail({ from, to, peak, speed, phase, color }) {
  const ref = useRef();
  const curve = useMemo(
    () =>
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(...from),
        new THREE.Vector3((from[0] + to[0]) / 2, peak, (from[2] + to[2]) / 2),
        new THREE.Vector3(...to)
      ),
    [from, to, peak]
  );
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 48, 0.014, 6, false), [curve]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    // The arc is drawn progressively, held, then cleared: one strike per cycle.
    const cycle = (clock.getElapsedTime() * speed + phase) % 1;
    const drawn = Math.min(1, cycle / 0.55);
    const fade = cycle > 0.8 ? 1 - (cycle - 0.8) / 0.2 : 1;
    ref.current.geometry.setDrawRange(0, Math.floor(geometry.index.count * drawn));
    ref.current.material.opacity = 0.55 * fade;
  });

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshBasicMaterial color={color} transparent opacity={0.55} />
    </mesh>
  );
}

function Ring() {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * 0.09;
    ref.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.22) * 0.06;
  });
  return (
    <mesh ref={ref} position={[5.2, 1.4, 0.4]}>
      <torusGeometry args={[3.6, 0.012, 8, 200]} />
      <meshBasicMaterial color={INDIGO} transparent opacity={0.45} />
    </mesh>
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

export default function SportsCanvas({ frameloop = "always" }) {
  return (
    <Canvas camera={{ position: [0, 1.4, 12], fov: 50 }} dpr={[1, 1.5]} frameloop={frameloop}>
      <ParallaxRig>
        <PitchField />
        <TrackingNodes />
        <Trail from={[-7, -1.8, 1]} to={[5.5, -1.6, -1.5]} peak={4.2} speed={0.22} phase={0} color={TEAL} />
        <Trail from={[6.5, -1.9, 1.8]} to={[-4, -1.7, -1]} peak={3.1} speed={0.17} phase={0.4} color={INDIGO} />
        <Trail from={[-2, -2, 2.4]} to={[7.5, -1.5, 0.5]} peak={2.4} speed={0.27} phase={0.72} color={TEAL} />
        <Ring />
      </ParallaxRig>
    </Canvas>
  );
}

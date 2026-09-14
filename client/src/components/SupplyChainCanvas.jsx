import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../lib/dotTexture";

/*
 * Backdrop for the Supply Chain hero. Three ideas, one scene:
 *
 *   Network  — a wireframe globe, the shared ground every lane is drawn on.
 *   Lanes    — great-circle arcs between fixed nodes, each carrying a pulse
 *              that travels end to end, so the field reads as goods in motion.
 *   Stock    — an instanced grid of containers whose heights breathe like live
 *              inventory levels.
 *
 * Decorative and cheap: every arc is sampled once at mount and baked into a
 * single lineSegments geometry, pulses share one points buffer, and nothing is
 * allocated inside the frame loop.
 */

const TEAL = "#14D8C4";
const INDIGO = "#788BE3";

const RADIUS = 3.4;
const LANE_COUNT = 16;
const LANE_SAMPLES = 44;

const STACK_COLS = 14;
const STACK_ROWS = 3;
const STACK_GAP = 0.58;

/** Deterministic so the composition is identical on every load. */
function makeRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function pointOnSphere(u, v, radius) {
  const theta = u * Math.PI * 2;
  // Bias away from the poles: lanes clustered at the top read as noise.
  const phi = Math.acos(1 - 2 * (0.15 + v * 0.7));
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/**
 * Samples every lane once. Returns the flat sample buffer the pulses read from
 * and the segment-pair positions the static arcs are drawn with.
 */
function buildLanes() {
  const rand = makeRandom(20260915);
  const samples = new Float32Array(LANE_COUNT * LANE_SAMPLES * 3);
  const segments = [];
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const p = new THREE.Vector3();

  for (let lane = 0; lane < LANE_COUNT; lane += 1) {
    a.copy(pointOnSphere(rand(), rand(), RADIUS));
    b.copy(pointOnSphere(rand(), rand(), RADIUS));
    // Arcs that barely leave their origin have nothing to say, and near-
    // antipodal ones pass through the centre where the lerp degenerates.
    // Push the endpoint around until the lane spans a usable arc.
    let guard = 0;
    while ((a.angleTo(b) < 0.9 || a.angleTo(b) > 2.5) && guard < 12) {
      b.copy(pointOnSphere(rand(), rand(), RADIUS));
      guard += 1;
    }
    const lift = 0.22 + a.angleTo(b) * 0.18;

    for (let i = 0; i < LANE_SAMPLES; i += 1) {
      const t = i / (LANE_SAMPLES - 1);
      // Slerp keeps the path on the great circle; the sine term lifts it clear
      // of the surface so crossing lanes stay readable.
      p.copy(a).lerp(b, t).normalize().multiplyScalar(RADIUS * (1 + lift * Math.sin(Math.PI * t)));
      const o = (lane * LANE_SAMPLES + i) * 3;
      samples[o] = p.x;
      samples[o + 1] = p.y;
      samples[o + 2] = p.z;
      if (i > 0) {
        const prev = o - 3;
        segments.push(samples[prev], samples[prev + 1], samples[prev + 2], p.x, p.y, p.z);
      }
    }
  }

  return { samples, segments: new Float32Array(segments) };
}

/** The globe plus its lanes, rotating as one body. */
function LaneNetwork() {
  const groupRef = useRef();
  const pulseRef = useRef();
  const dotTexture = useMemo(() => makeDotTexture(), []);
  const { samples, segments } = useMemo(() => buildLanes(), []);

  const laneGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(segments, 3));
    return g;
  }, [segments]);

  const pulseGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(LANE_COUNT * 3), 3));
    return g;
  }, []);

  const globeGeometry = useMemo(() => new THREE.IcosahedronGeometry(RADIUS, 3), []);

  // Each lane runs at its own speed and starts at its own offset, so the
  // network never pulses in lockstep.
  const timing = useMemo(() => {
    const rand = makeRandom(884422);
    return Array.from({ length: LANE_COUNT }, () => ({
      speed: 0.1 + rand() * 0.16,
      offset: rand(),
    }));
  }, []);

  // The dot sprite is a module-level singleton shared with every other scene,
  // so it is deliberately not disposed here.
  useEffect(
    () => () => {
      laneGeometry.dispose();
      pulseGeometry.dispose();
      globeGeometry.dispose();
    },
    [laneGeometry, pulseGeometry, globeGeometry]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.06;

    const out = pulseRef.current.geometry.attributes.position;
    for (let lane = 0; lane < LANE_COUNT; lane += 1) {
      const { speed, offset } = timing[lane];
      const progress = (offset + t * speed) % 1;
      // Nearest sample is close enough at this scale and keeps the loop free of
      // per-frame interpolation work.
      const i = Math.min(LANE_SAMPLES - 1, Math.floor(progress * LANE_SAMPLES));
      const src = (lane * LANE_SAMPLES + i) * 3;
      out.array[lane * 3] = samples[src];
      out.array[lane * 3 + 1] = samples[src + 1];
      out.array[lane * 3 + 2] = samples[src + 2];
    }
    out.needsUpdate = true;
  });

  return (
    <group ref={groupRef} position={[1.2, 0.4, 0]} rotation={[0.35, 0, 0.18]}>
      <mesh geometry={globeGeometry}>
        <meshBasicMaterial color={INDIGO} wireframe transparent opacity={0.1} />
      </mesh>

      <lineSegments geometry={laneGeometry}>
        <lineBasicMaterial color={TEAL} transparent opacity={0.28} />
      </lineSegments>

      <points ref={pulseRef} geometry={pulseGeometry}>
        <pointsMaterial
          size={0.3}
          color={TEAL}
          map={dotTexture}
          alphaTest={0.02}
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/** Inventory that breathes: an instanced container yard under the network. */
function ContainerStack() {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const phases = useMemo(
    () =>
      Array.from(
        { length: STACK_COLS * STACK_ROWS },
        (_, i) => ((i % STACK_COLS) * 0.41 + Math.floor(i / STACK_COLS) * 0.83) % (Math.PI * 2)
      ),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;
    for (let i = 0; i < phases.length; i += 1) {
      const col = i % STACK_COLS;
      const row = Math.floor(i / STACK_COLS);
      const h = 0.35 + (Math.sin(t * 0.8 + phases[i]) * 0.5 + 0.5) * 1.5;
      dummy.position.set((col - (STACK_COLS - 1) / 2) * STACK_GAP, h / 2, row * -STACK_GAP);
      dummy.scale.set(1, h, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, STACK_COLS * STACK_ROWS]}
      position={[-3.2, -3.6, 1.4]}
      rotation={[0, 0.34, 0]}
    >
      <boxGeometry args={[0.34, 1, 0.34]} />
      <meshBasicMaterial color={TEAL} transparent opacity={0.3} />
    </instancedMesh>
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

export default function SupplyChainCanvas({ frameloop = "always" }) {
  return (
    <Canvas camera={{ position: [0, 1.2, 12], fov: 50 }} dpr={[1, 1.5]} frameloop={frameloop}>
      <ParallaxRig>
        <LaneNetwork />
        <ContainerStack />
      </ParallaxRig>
    </Canvas>
  );
}

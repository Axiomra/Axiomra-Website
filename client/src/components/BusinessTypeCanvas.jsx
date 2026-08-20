import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../lib/dotTexture";

/**
 * The animated header inside the business-type modal.
 *
 * One scene per audience, chosen by `variant`, so the four modals do not all
 * open onto the same picture. Each variant is a single point cloud driven by a
 * closed-form function of (index, time) — no per-frame allocation, no
 * neighbour search — because this mounts and unmounts every time a card is
 * opened and has to be cheap enough to do that instantly.
 *
 * Loaded lazily by BusinessTypeModal: three.js is ~900 kB and nothing on the
 * page needs it until a card is actually clicked.
 */

const BRAND = new THREE.Color("#14D8C4");
const ACCENT = new THREE.Color("#788BE3");

const COUNT = 900;

/**
 * Per-variant layout. Each returns the *rest* position of point `i` plus the
 * scalar that `animate` uses to move it, so the geometry and the motion stay
 * described in one place.
 */
const LAYOUTS = {
  // Startups: a launch plume — points spiral upward and recycle at the base,
  // so the field reads as continuous lift-off rather than a static cone.
  launch: (i) => {
    const t = i / COUNT;
    const angle = t * Math.PI * 18;
    const radius = 0.4 + t * 2.9;
    return [Math.cos(angle) * radius, t * 8 - 4, Math.sin(angle) * radius];
  },
  // Scale-ups: concentric rings expanding outward across a plane — growth
  // spreading from a core into new territory.
  growth: (i) => {
    const ring = Math.floor(i / 60);
    const step = (i % 60) / 60;
    const radius = 0.6 + ring * 0.28;
    const angle = step * Math.PI * 2 + ring * 0.35;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.55, ring * -0.18];
  },
  // SMBs: a rectangular lattice — the legacy grid of systems that modernising
  // work re-sorts, which the animation does by rippling through it.
  lattice: (i) => {
    const cols = 36;
    const x = (i % cols) - cols / 2;
    const y = Math.floor(i / cols) - COUNT / cols / 2;
    return [x * 0.32, y * 0.32, 0];
  },
  // Enterprises: a sphere of departments, slowly rotating — one organisation,
  // many connected surfaces.
  globe: (i) => {
    // Fibonacci sphere: even coverage without the pole clustering that
    // naive lat/long sampling produces.
    const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 3.1;
    return [
      r * Math.cos(theta) * Math.sin(phi),
      r * Math.sin(theta) * Math.sin(phi),
      r * Math.cos(phi),
    ];
  },
};

/** Displacement applied to the rest position each frame, per variant. */
const MOTION = {
  launch: (i, t, base, out) => {
    // Cycle each point up the plume on its own offset, then wrap.
    const speed = 0.55;
    const span = 8;
    const y = ((base[1] + 4 + (t * speed + (i % 97) * 0.08)) % span) - 4;
    const swirl = t * 0.25;
    const radius = Math.hypot(base[0], base[2]);
    const angle = Math.atan2(base[2], base[0]) + swirl;
    out[0] = Math.cos(angle) * radius;
    out[1] = y;
    out[2] = Math.sin(angle) * radius;
  },
  growth: (i, t, base, out) => {
    // Pulse the whole field outward on a slow breath.
    const pulse = 1 + Math.sin(t * 0.7 - Math.hypot(base[0], base[1]) * 0.35) * 0.12;
    out[0] = base[0] * pulse;
    out[1] = base[1] * pulse;
    out[2] = base[2] + Math.sin(t * 0.9 + i * 0.05) * 0.25;
  },
  lattice: (i, t, base, out) => {
    // A wave crossing the grid: the rows lift in sequence, then settle.
    const d = Math.hypot(base[0], base[1]);
    out[0] = base[0];
    out[1] = base[1];
    out[2] = Math.sin(t * 1.1 - d * 0.55) * 0.9;
  },
  globe: (i, t, base, out) => {
    // Rotate about Y and let the surface breathe slightly.
    const a = t * 0.18;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    const scale = 1 + Math.sin(t * 0.6 + i * 0.02) * 0.03;
    out[0] = (base[0] * cos - base[2] * sin) * scale;
    out[1] = base[1] * scale;
    out[2] = (base[0] * sin + base[2] * cos) * scale;
  },
};

function Field({ variant }) {
  const pointsRef = useRef();

  const { positions, base } = useMemo(() => {
    const layout = LAYOUTS[variant] ?? LAYOUTS.globe;
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const [x, y, z] = layout(i);
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return { positions: arr, base: arr.slice() };
  }, [variant]);

  // Two-tone cloud: brand teal fading into the accent violet along the field,
  // so the shape reads even when the points overlap.
  const colors = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    const c = new THREE.Color();
    for (let i = 0; i < COUNT; i++) {
      c.copy(BRAND).lerp(ACCENT, i / COUNT);
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, []);

  const dotTexture = useMemo(() => makeDotTexture(), []);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    const motion = MOTION[variant] ?? MOTION.globe;
    const attr = pointsRef.current.geometry.attributes.position;
    // Two scratch triples reused across the whole loop, so the per-point work
    // stays allocation-free at 900 points a frame.
    const basePoint = [0, 0, 0];
    const scratch = [0, 0, 0];

    for (let i = 0; i < COUNT; i++) {
      basePoint[0] = base[i * 3];
      basePoint[1] = base[i * 3 + 1];
      basePoint[2] = base[i * 3 + 2];
      motion(i, t, basePoint, scratch);
      attr.array[i * 3] = scratch[0];
      attr.array[i * 3 + 1] = scratch[1];
      attr.array[i * 3 + 2] = scratch[2];
    }
    attr.needsUpdate = true;

    // A little parallax so the scene tracks the cursor inside the modal.
    pointsRef.current.rotation.y += (pointer.x * 0.25 - pointsRef.current.rotation.y) * 0.04;
    pointsRef.current.rotation.x += (-pointer.y * 0.18 - pointsRef.current.rotation.x) * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={COUNT} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.13}
        map={dotTexture}
        vertexColors
        transparent
        opacity={0.95}
        alphaTest={0.02}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function BusinessTypeCanvas({ variant = "globe" }) {
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 50 }} dpr={[1, 1.5]}>
      <Field variant={variant} />
    </Canvas>
  );
}

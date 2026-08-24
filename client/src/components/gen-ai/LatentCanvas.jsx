import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../../lib/dotTexture";

/* Morphing latent-space point cloud, the hero field for the Generative AI page. */

const COUNT = 3200;
/** Seconds a shape is held, including the morph into the next one. */
const CYCLE = 5.5;
/** Seconds of the cycle spent morphing, the rest is a hold. */
const MORPH = 2.2;

/** Evenly distributed points on a sphere (Fibonacci spiral). */
function sphereTarget(out, radius) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    out[i * 3] = Math.cos(theta) * r * radius;
    out[i * 3 + 1] = y * radius;
    out[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
}

/** A (2,3) torus knot, reads as a folded manifold rather than a plain ring. */
function knotTarget(out, scale) {
  const p = 2;
  const q = 3;
  for (let i = 0; i < COUNT; i++) {
    const u = (i / COUNT) * Math.PI * 2 * q;
    const r = 1.1 + 0.45 * Math.cos((p / q) * u);
    // A little thickness, otherwise the knot is a hairline at this point count.
    const jitter = 0.22;
    out[i * 3] = (r * Math.cos(u) + (Math.random() - 0.5) * jitter) * scale;
    out[i * 3 + 1] = (r * Math.sin(u) + (Math.random() - 0.5) * jitter) * scale;
    out[i * 3 + 2] = (0.45 * Math.sin((p / q) * u) + (Math.random() - 0.5) * jitter) * scale;
  }
}

/** A cube lattice, the "structured data" end of the morph. */
function latticeTarget(out, size) {
  const side = Math.ceil(Math.cbrt(COUNT));
  const step = size / (side - 1);
  for (let i = 0; i < COUNT; i++) {
    const x = i % side;
    const y = Math.floor(i / side) % side;
    const z = Math.floor(i / (side * side)) % side;
    out[i * 3] = x * step - size / 2;
    out[i * 3 + 1] = y * step - size / 2;
    out[i * 3 + 2] = z * step - size / 2;
  }
}

/** A rippling plane, the field "flattening out" between structures. */
function waveTarget(out, size) {
  const side = Math.ceil(Math.sqrt(COUNT));
  const step = size / (side - 1);
  for (let i = 0; i < COUNT; i++) {
    const x = (i % side) * step - size / 2;
    const z = Math.floor(i / side) * step - size / 2;
    out[i * 3] = x;
    out[i * 3 + 1] = Math.sin(x * 0.55) * Math.cos(z * 0.55) * 1.5;
    out[i * 3 + 2] = z;
  }
}

/** Smoothstep, eases both ends of the morph so shapes settle instead of snapping. */
function ease(t) {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

function LatentField({ pointer }) {
  const pointsRef = useRef();
  const groupRef = useRef();

  const shapes = useMemo(() => {
    const make = (fill, arg) => {
      const arr = new Float32Array(COUNT * 3);
      fill(arr, arg);
      return arr;
    };
    return [
      make(sphereTarget, 4.4),
      make(knotTarget, 3.1),
      make(latticeTarget, 7),
      make(waveTarget, 10),
    ];
  }, []);

  // Start on the sphere; every frame writes the blended target into this buffer.
  const positions = useMemo(() => shapes[0].slice(), [shapes]);

  const colors = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    const from = new THREE.Color("#14D8C4");
    const to = new THREE.Color("#788BE3");
    const mixed = new THREE.Color();
    for (let i = 0; i < COUNT; i++) {
      mixed.copy(from).lerp(to, i / COUNT);
      arr[i * 3] = mixed.r;
      arr[i * 3 + 1] = mixed.g;
      arr[i * 3 + 2] = mixed.b;
    }
    return arr;
  }, []);

  const dotTexture = useMemo(() => makeDotTexture(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const phase = t / CYCLE;
    const index = Math.floor(phase) % shapes.length;
    const next = (index + 1) % shapes.length;
    // Hold the shape, then morph over the tail of the cycle.
    const blend = ease(((phase % 1) * CYCLE - (CYCLE - MORPH)) / MORPH);

    const from = shapes[index];
    const to = shapes[next];
    const attr = pointsRef.current.geometry.attributes.position;
    const arr = attr.array;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      // Per-point drift keeps the held shapes breathing instead of frozen.
      const drift = Math.sin(t * 0.6 + i * 0.35) * 0.09;
      arr[i3] = from[i3] + (to[i3] - from[i3]) * blend + drift;
      arr[i3 + 1] = from[i3 + 1] + (to[i3 + 1] - from[i3 + 1]) * blend + drift;
      arr[i3 + 2] = from[i3 + 2] + (to[i3 + 2] - from[i3 + 2]) * blend;
    }
    attr.needsUpdate = true;

    const g = groupRef.current;
    g.rotation.y = t * 0.14 + pointer.current.x * 0.4;
    g.rotation.x = Math.sin(t * 0.2) * 0.12 + pointer.current.y * 0.25;
  });

  return (
    <group ref={groupRef}>
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
    </group>
  );
}

export default function LatentCanvas({ frameloop = "always" }) {
  // Pointer parallax lives in a ref so moving the mouse never re-renders React.
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      frameloop={frameloop}
      camera={{ position: [0, 0, 13], fov: 50 }}
      dpr={[1, 1.5]}
      onPointerMove={(e) => {
        const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
        pointer.current.x = ((e.clientX - left) / width) * 2 - 1;
        pointer.current.y = ((e.clientY - top) / height) * 2 - 1;
      }}
    >
      <LatentField pointer={pointer} />
    </Canvas>
  );
}

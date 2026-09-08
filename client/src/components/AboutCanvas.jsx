import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../lib/dotTexture";

/*
 * Backdrop for the About Us hero: a slowly turning wireframe core wrapped in a
 * breathing particle shell, with a wide dust field drifting behind it.
 *
 * Everything here is decorative, so it stays cheap: no lights, no shadows, no
 * per-frame allocation. The shell positions are generated once and only their
 * radius is modulated in the frame loop.
 */

const SHELL_POINTS = 700;
const SHELL_RADIUS = 3.4;
const DUST_POINTS = 420;

/**
 * Seeded generator for the dust field. Math.random would hand a re-render a
 * different sky, and it makes the component impure for no benefit.
 */
function makeRandom(seed) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

/** Evenly spread directions on a sphere, without the pole clustering of naive lat/long sampling. */
function fibonacciShell(count) {
  const dirs = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const near = new THREE.Color("#14D8C4");
  const far = new THREE.Color("#788BE3");
  const mixed = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;

    dirs[i * 3] = Math.cos(theta) * ring;
    dirs[i * 3 + 1] = y;
    dirs[i * 3 + 2] = Math.sin(theta) * ring;

    mixed.copy(near).lerp(far, (y + 1) / 2);
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
  }
  return { dirs, colors };
}

/** The particle shell. Its radius pulses on a slow sine so the sphere reads as alive rather than static. */
function Shell() {
  const pointsRef = useRef();
  const { dirs, colors } = useMemo(() => fibonacciShell(SHELL_POINTS), []);
  const positions = useMemo(() => dirs.slice(), [dirs]);
  const dotTexture = useMemo(() => makeDotTexture(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const attr = pointsRef.current.geometry.attributes.position;
    const arr = attr.array;

    for (let i = 0; i < SHELL_POINTS; i++) {
      // Each point keeps its own phase, so the surface ripples instead of scaling uniformly.
      const r = SHELL_RADIUS + Math.sin(t * 0.7 + i * 0.35) * 0.16;
      arr[i * 3] = dirs[i * 3] * r;
      arr[i * 3 + 1] = dirs[i * 3 + 1] * r;
      arr[i * 3 + 2] = dirs[i * 3 + 2] * r;
    }
    attr.needsUpdate = true;
    pointsRef.current.rotation.y = t * 0.06;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={SHELL_POINTS} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={SHELL_POINTS} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.085}
        map={dotTexture}
        alphaTest={0.02}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Two counter-rotating wireframe hulls, echoing the hexagonal mark in the brand. */
function Core() {
  const outerRef = useRef();
  const innerRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    outerRef.current.rotation.set(t * 0.12, t * 0.17, 0);
    innerRef.current.rotation.set(-t * 0.2, -t * 0.14, t * 0.08);
  });

  return (
    <group>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshBasicMaterial color="#14D8C4" wireframe transparent opacity={0.22} />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.55, 0]} />
        <meshBasicMaterial color="#788BE3" wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/** Wide, slow dust field that fills the corners the sphere never reaches. */
function Dust() {
  const ref = useRef();

  const positions = useMemo(() => {
    const rand = makeRandom(20260905);
    const arr = new Float32Array(DUST_POINTS * 3);
    for (let i = 0; i < DUST_POINTS; i++) {
      arr[i * 3] = (rand() - 0.5) * 26;
      arr[i * 3 + 1] = (rand() - 0.5) * 14;
      arr[i * 3 + 2] = -2 - rand() * 8;
    }
    return arr;
  }, []);

  const dotTexture = useMemo(() => makeDotTexture(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * 0.012;
    ref.current.position.x = Math.sin(t * 0.08) * 0.7;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={DUST_POINTS} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.13}
        color="#788BE3"
        map={dotTexture}
        alphaTest={0.02}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Eases the whole scene toward the pointer, so the hero reacts without ever chasing it. */
function ParallaxRig({ children }) {
  const groupRef = useRef();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.3;
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

export default function AboutCanvas({ frameloop = "always" }) {
  return (
    <Canvas camera={{ position: [0, 0, 10] }} dpr={[1, 1.5]} frameloop={frameloop}>
      <Dust />
      <ParallaxRig>
        <Core />
        <Shell />
      </ParallaxRig>
    </Canvas>
  );
}

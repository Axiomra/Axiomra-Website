import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../lib/dotTexture";

/*
 * Backdrop for the Industries hero: a low-poly wireframe globe with a single
 * orbit, sitting in a slow drift of particles. The reading is "one network,
 * many markets", which is what the page is about.
 *
 * Decorative, so it stays cheap: no lights, no shadows, no per-frame
 * allocation. Positions are written once into a typed array and only a small
 * sine offset changes per frame.
 */

const PARTICLE_COUNT = 260;
const FIELD = { x: 22, y: 12, z: 10 };

const TEAL = "#14D8C4";
const INDIGO = "#788BE3";

/** Deterministic pseudo-random so the field looks the same on every mount. */
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function Globe() {
  const outerRef = useRef();
  const innerRef = useRef();
  const ringRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    outerRef.current.rotation.y = t * 0.08;
    outerRef.current.rotation.x = Math.sin(t * 0.15) * 0.12;
    // Counter rotation keeps the two shells from reading as one solid object.
    innerRef.current.rotation.y = -t * 0.12;
    ringRef.current.rotation.z = t * 0.1;
  });

  return (
    <group position={[3.2, 0.2, 0]}>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[3.1, 2]} />
        <meshBasicMaterial color={TEAL} wireframe transparent opacity={0.22} />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial color={INDIGO} wireframe transparent opacity={0.3} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2.6, 0.3, 0]}>
        <torusGeometry args={[4.3, 0.012, 8, 160]} />
        <meshBasicMaterial color={TEAL} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

/** A slow drift of points across the whole viewport, brighter toward the globe. */
function Particles() {
  const ref = useRef();
  const dotTexture = useMemo(() => makeDotTexture(), []);

  const base = useMemo(() => {
    const rand = seeded(7);
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] = (rand() - 0.5) * FIELD.x;
      arr[i * 3 + 1] = (rand() - 0.5) * FIELD.y;
      arr[i * 3 + 2] = (rand() - 0.5) * FIELD.z - 3;
    }
    return arr;
  }, []);

  const positions = useMemo(() => base.slice(), [base]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const attr = ref.current.geometry.attributes.position;
    const arr = attr.array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = base[i * 3];
      const y = base[i * 3 + 1];
      // Each point bobs on its own phase, so the field breathes rather than waves.
      arr[i * 3 + 1] = y + Math.sin(t * 0.35 + x * 0.6) * 0.35;
      arr[i * 3] = x + Math.cos(t * 0.2 + y * 0.5) * 0.25;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
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
  );
}

/** Eases the scene toward the pointer, so the hero reacts without chasing it. */
function ParallaxRig({ children }) {
  const groupRef = useRef();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.35;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.2;
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

export default function IndustriesCanvas({ frameloop = "always" }) {
  return (
    <Canvas camera={{ position: [0, 0, 11], fov: 50 }} dpr={[1, 1.5]} frameloop={frameloop}>
      <Particles />
      <ParallaxRig>
        <Globe />
      </ParallaxRig>
    </Canvas>
  );
}

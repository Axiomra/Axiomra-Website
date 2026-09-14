import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../lib/dotTexture";

/*
 * Backdrop for the Fashion hero: a sheet of wireframe "fabric" that ripples
 * as if draped over a form, with the same grid drawn again as points so the
 * weave catches light at the intersections. A single thin ring reads as a
 * measuring tape / dress form.
 *
 * Decorative, so it stays cheap: one shared PlaneGeometry updated in place,
 * no lights, no per-frame allocation.
 */

const TEAL = "#14D8C4";
const INDIGO = "#788BE3";

const SEGMENTS_X = 56;
const SEGMENTS_Y = 32;
const WIDTH = 22;
const HEIGHT = 12;

function Fabric() {
  const dotTexture = useMemo(() => makeDotTexture(), []);

  const meshRef = useRef();
  const geometry = useMemo(() => new THREE.PlaneGeometry(WIDTH, HEIGHT, SEGMENTS_X, SEGMENTS_Y), []);
  // Rest positions are copied once so every frame is a pure function of time.
  const base = useMemo(() => geometry.attributes.position.array.slice(), [geometry]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Read the live geometry off the mesh; the points share the same instance.
    const attr = meshRef.current.geometry.attributes.position;
    const arr = attr.array;
    for (let i = 0; i < arr.length; i += 3) {
      const x = base[i];
      const y = base[i + 1];
      // Two crossing waves plus a slow swell: cloth, not a water surface.
      arr[i + 2] =
        Math.sin(x * 0.45 + t * 0.9) * 0.55 +
        Math.cos(y * 0.6 - t * 0.7) * 0.4 +
        Math.sin((x + y) * 0.25 + t * 0.35) * 0.35;
    }
    attr.needsUpdate = true;
  });

  return (
    <group position={[2.5, -1.2, -1]} rotation={[-0.95, 0.18, 0.12]}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial color={INDIGO} wireframe transparent opacity={0.22} />
      </mesh>
      <points geometry={geometry}>
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

function Ring() {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * 0.12;
    ref.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.3) * 0.08;
  });
  return (
    <mesh ref={ref} position={[4.2, 1.4, 0.5]}>
      <torusGeometry args={[3.4, 0.014, 8, 180]} />
      <meshBasicMaterial color={TEAL} transparent opacity={0.55} />
    </mesh>
  );
}

/** Eases the scene toward the pointer, so the hero reacts without chasing it. */
function ParallaxRig({ children }) {
  const groupRef = useRef();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.3;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.18;
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

export default function FashionCanvas({ frameloop = "always" }) {
  return (
    <Canvas camera={{ position: [0, 1.5, 12], fov: 50 }} dpr={[1, 1.5]} frameloop={frameloop}>
      <ParallaxRig>
        <Fabric />
        <Ring />
      </ParallaxRig>
    </Canvas>
  );
}

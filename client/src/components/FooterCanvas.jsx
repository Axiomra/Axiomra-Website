import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../lib/dotTexture";

/* Animated wave grid for the footer.
   Unlike NetworkCanvas this is O(n) per frame — a fixed lattice of points
   displaced by two sine waves — so it can afford a much denser field while
   staying cheap enough for a surface that is always mounted at page bottom. */

const COLS = 90;
const ROWS = 36;
const GAP = 0.4;

function WaveGrid() {
  const pointsRef = useRef();
  const meshRef = useRef();

  const { positions, colors, count } = useMemo(() => {
    const count = COLS * ROWS;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    // Teal → indigo, mapped across the grid's depth so the field reads as
    // one gradient sheet rather than a cloud of unrelated dots.
    const near = new THREE.Color("#14D8C4");
    const far = new THREE.Color("#788BE3");
    const mixed = new THREE.Color();

    let i = 0;
    for (let z = 0; z < ROWS; z++) {
      for (let x = 0; x < COLS; x++) {
        positions[i * 3] = (x - COLS / 2) * GAP;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (z - ROWS / 2) * GAP;

        mixed.copy(near).lerp(far, z / (ROWS - 1));
        colors[i * 3] = mixed.r;
        colors[i * 3 + 1] = mixed.g;
        colors[i * 3 + 2] = mixed.b;
        i++;
      }
    }
    return { positions, colors, count };
  }, []);

  const dotTexture = useMemo(() => makeDotTexture(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const attr = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const x = attr.array[i * 3];
      const z = attr.array[i * 3 + 2];
      attr.array[i * 3 + 1] =
        Math.sin(x * 0.35 + t * 0.75) * 0.7 + Math.cos(z * 0.4 + t * 0.55) * 0.5;
    }
    attr.needsUpdate = true;
    // A slow yaw keeps the perspective alive without the horizon sliding away.
    meshRef.current.rotation.y = Math.sin(t * 0.08) * 0.16;
  });

  return (
    <group ref={meshRef} rotation={[-0.9, 0, 0]} position={[0, -1.4, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.2}
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
    </group>
  );
}

export default function FooterCanvas() {
  return (
    <Canvas camera={{ position: [0, 3.4, 11], fov: 55 }} dpr={[1, 1.5]}>
      <WaveGrid />
    </Canvas>
  );
}

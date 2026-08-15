import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../lib/dotTexture";

/* Animated particle-network field. This module is loaded lazily because
   three.js + @react-three/fiber are ~900 kB of the bundle and nothing above
   the fold depends on them — NetworkBackground paints a CSS fallback first. */
function ParticleField({ count }) {
  const pointsRef = useRef();
  const linesRef = useRef();
  // The neighbour search below is O(count²) per frame, so the caller picks a
  // budget: the hero can afford a dense field, secondary surfaces cannot.
  const COUNT = count;

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [COUNT]);

  const basePositions = useMemo(() => positions.slice(), [positions]);
  const dotTexture = useMemo(() => makeDotTexture(), []);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(COUNT * COUNT * 6), 3));
    return geo;
  }, [COUNT]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < COUNT; i++) {
      posAttr.array[i * 3 + 1] = basePositions[i * 3 + 1] + Math.sin(t * 0.4 + i) * 0.4;
      posAttr.array[i * 3] = basePositions[i * 3] + Math.cos(t * 0.3 + i) * 0.3;
    }
    posAttr.needsUpdate = true;

    // rebuild nearby connections each frame (throttled by distance threshold)
    const linePos = linesRef.current.geometry.attributes.position.array;
    let idx = 0;
    const maxDist = 2.6;
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = posAttr.array[i * 3] - posAttr.array[j * 3];
        const dy = posAttr.array[i * 3 + 1] - posAttr.array[j * 3 + 1];
        const dz = posAttr.array[i * 3 + 2] - posAttr.array[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < maxDist && idx < linePos.length - 6) {
          linePos[idx++] = posAttr.array[i * 3];
          linePos[idx++] = posAttr.array[i * 3 + 1];
          linePos[idx++] = posAttr.array[i * 3 + 2];
          linePos[idx++] = posAttr.array[j * 3];
          linePos[idx++] = posAttr.array[j * 3 + 1];
          linePos[idx++] = posAttr.array[j * 3 + 2];
        }
      }
    }
    // Collapse the unused tail to the origin so stale segments do not linger.
    const drawn = idx;
    for (; idx < linePos.length; idx++) linePos[idx] = 0;
    linesRef.current.geometry.setDrawRange(0, drawn / 3);
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group rotation={[0, 0, 0.15]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.34}
          color="#14D8C4"
          map={dotTexture}
          alphaTest={0.02}
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#788BE3" transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
}

export default function NetworkCanvas({ count = 140 }) {
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 50 }} dpr={[1, 1.5]}>
      <ParticleField count={count} />
    </Canvas>
  );
}

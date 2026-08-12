import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import ErrorBoundary from "./ErrorBoundary";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function StaticNetworkBackground({ className = "" }) {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      aria-hidden="true"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(20,216,196,0.5) 1.5px, transparent 1.5px), radial-gradient(circle, rgba(120,139,227,0.4) 1px, transparent 1px)",
        backgroundSize: "60px 60px, 40px 40px",
        backgroundPosition: "0 0, 20px 20px",
      }}
    />
  );
}

/* Animated particle-network field — echoes the wavy AI-network texture
   used behind the Tezeract hero, rebuilt with Three.js instead of a
   static image so it breathes and reacts to time. */
function ParticleField() {
  const pointsRef = useRef();
  const linesRef = useRef();
  const COUNT = 140;

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  const basePositions = useMemo(() => positions.slice(), [positions]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(COUNT * COUNT * 6), 3));
    return geo;
  }, []);

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
    for (; idx < linePos.length; idx++) linePos[idx] = 0;
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group rotation={[0, 0, 0.15]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#14D8C4" transparent opacity={0.9} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#788BE3" transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
}

export default function NetworkBackground({ className = "" }) {
  const [webgl] = useState(() => supportsWebGL());

  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      {webgl ? (
        <ErrorBoundary fallback={<StaticNetworkBackground className={className} />}>
          <Canvas camera={{ position: [0, 0, 9], fov: 50 }} dpr={[1, 1.5]}>
            <ParticleField />
          </Canvas>
        </ErrorBoundary>
      ) : (
        <StaticNetworkBackground className={className} />
      )}
    </div>
  );
}

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../lib/dotTexture";

/* Orbiting signal globe for the contact hero. */

const POINTS = 900;
const RADIUS = 3.2;
const SIGNALS = [
  { radius: 4.15, speed: 0.42, tilt: [1.25, 0, 0.35], color: "#14D8C4" },
  { radius: 4.85, speed: -0.3, tilt: [0.55, 0.4, -0.5], color: "#788BE3" },
  { radius: 5.5, speed: 0.22, tilt: [1.5, 0.2, 0.9], color: "#14D8C4" },
];

function Globe() {
  const groupRef = useRef();
  const pointsRef = useRef();

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(POINTS * 3);
    const colors = new Float32Array(POINTS * 3);
    // Fibonacci sphere: evenly spread without the pole clustering you get from naive lat/long sampling.
    const golden = Math.PI * (3 - Math.sqrt(5));
    const near = new THREE.Color("#14D8C4");
    const far = new THREE.Color("#788BE3");
    const mixed = new THREE.Color();

    for (let i = 0; i < POINTS; i++) {
      const y = 1 - (i / (POINTS - 1)) * 2;
      const ring = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;

      positions[i * 3] = Math.cos(theta) * ring * RADIUS;
      positions[i * 3 + 1] = y * RADIUS;
      positions[i * 3 + 2] = Math.sin(theta) * ring * RADIUS;

      mixed.copy(near).lerp(far, (y + 1) / 2);
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }
    return { positions, colors };
  }, []);

  const dotTexture = useMemo(() => makeDotTexture(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.09;
    groupRef.current.rotation.x = Math.sin(t * 0.16) * 0.12;
    pointsRef.current.rotation.y = t * 0.05;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={POINTS}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute attach="attributes-color" count={POINTS} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.11}
          map={dotTexture}
          alphaTest={0.02}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {SIGNALS.map((signal) => (
        <SignalRing key={signal.radius} {...signal} />
      ))}
    </group>
  );
}

/** One tilted orbit: a hairline torus plus the dot travelling along it. */
function SignalRing({ radius, speed, tilt, color }) {
  const ringRef = useRef();
  const dotRef = useRef();

  useFrame(({ clock }) => {
    const angle = clock.getElapsedTime() * speed;
    dotRef.current.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    ringRef.current.rotation.z = angle * 0.15;
  });

  return (
    <group rotation={tilt}>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.012, 8, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

export default function ContactCanvas({ frameloop = "always" }) {
  return (
    <Canvas camera={{ position: [0, 1.2, 11.5], fov: 50 }} dpr={[1, 1.5]} frameloop={frameloop}>
      <Globe />
    </Canvas>
  );
}

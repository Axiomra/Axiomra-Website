import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../../lib/dotTexture";


const STREAMS = 10;
const PER_STREAM = 26;
const SAMPLES = 220;
const TOTAL = STREAMS * PER_STREAM;

/* Deterministic stand-in for Math.random. */
function jitter(n) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function buildStreams() {
  const paths = new Float32Array(STREAMS * SAMPLES * 3);
  const tmp = new THREE.Vector3();

  for (let s = 0; s < STREAMS; s++) {
    const angle = (s / STREAMS) * Math.PI * 2 + jitter(s) * 0.35;
    const radius = 8 + jitter(s + 100) * 3.5;
    const start = new THREE.Vector3(
      Math.cos(angle) * radius,
      (jitter(s + 200) - 0.5) * 6,
      Math.sin(angle) * radius * 0.5
    );
    // Curve bows away from the straight line so streams braid instead of spoking.
    const control = new THREE.Vector3(
      Math.cos(angle + 0.9) * radius * 0.45,
      (jitter(s + 300) - 0.5) * 4,
      Math.sin(angle + 0.9) * radius * 0.3
    );
    const end = new THREE.Vector3(
      Math.cos(angle + Math.PI) * radius * 0.9,
      (jitter(s + 400) - 0.5) * 5,
      Math.sin(angle + Math.PI) * radius * 0.45
    );
    const curve = new THREE.QuadraticBezierCurve3(start, control, end);

    for (let i = 0; i < SAMPLES; i++) {
      curve.getPoint(i / (SAMPLES - 1), tmp);
      const o = (s * SAMPLES + i) * 3;
      paths[o] = tmp.x;
      paths[o + 1] = tmp.y;
      paths[o + 2] = tmp.z;
    }
  }
  return paths;
}

function TokenField() {
  const pointsRef = useRef();
  const coreRef = useRef();
  const ringRef = useRef();

  const paths = useMemo(() => buildStreams(), []);
  const positions = useMemo(() => new Float32Array(TOTAL * 3), []);
  const dotTexture = useMemo(() => makeDotTexture(), []);

  const offsets = useMemo(() => {
    const arr = new Float32Array(TOTAL);
    for (let i = 0; i < TOTAL; i++) arr[i] = (i % PER_STREAM) / PER_STREAM + jitter(i + 500) * 0.01;
    return arr;
  }, []);

  const speeds = useMemo(() => {
    const arr = new Float32Array(STREAMS);
    for (let s = 0; s < STREAMS; s++) arr[s] = 0.055 + jitter(s + 600) * 0.05;
    return arr;
  }, []);

  const colors = useMemo(() => {
    const arr = new Float32Array(TOTAL * 3);
    const from = new THREE.Color("#14D8C4");
    const to = new THREE.Color("#788BE3");
    const mixed = new THREE.Color();
    for (let i = 0; i < TOTAL; i++) {
      mixed.copy(from).lerp(to, (i % PER_STREAM) / PER_STREAM);
      arr[i * 3] = mixed.r;
      arr[i * 3 + 1] = mixed.g;
      arr[i * 3 + 2] = mixed.b;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const attr = pointsRef.current.geometry.attributes.position;
    const arr = attr.array;

    for (let s = 0; s < STREAMS; s++) {
      for (let p = 0; p < PER_STREAM; p++) {
        const i = s * PER_STREAM + p;
        let u = (offsets[i] + t * speeds[s]) % 1;
        if (u < 0) u += 1;
        const sample = Math.min(SAMPLES - 1, Math.floor(u * SAMPLES));
        const src = (s * SAMPLES + sample) * 3;
        const dst = i * 3;
        arr[dst] = paths[src];
        arr[dst + 1] = paths[src + 1];
        arr[dst + 2] = paths[src + 2];
      }
    }
    attr.needsUpdate = true;

    // The core breathes on the same clock as the streams passing through it.
    const pulse = 1 + Math.sin(t * 1.6) * 0.07;
    coreRef.current.scale.setScalar(pulse);
    coreRef.current.rotation.y = t * 0.25;
    coreRef.current.rotation.x = t * 0.12;
    ringRef.current.rotation.z = t * 0.4;
    ringRef.current.rotation.x = Math.PI / 2.4;
  });

  return (
    <group rotation={[0.25, 0, 0]}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color="#14D8C4" wireframe transparent opacity={0.35} />
      </mesh>

      <mesh ref={ringRef}>
        <torusGeometry args={[2.9, 0.012, 8, 128]} />
        <meshBasicMaterial color="#788BE3" transparent opacity={0.5} />
      </mesh>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={TOTAL} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={TOTAL} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.19}
          map={dotTexture}
          vertexColors
          transparent
          opacity={0.9}
          alphaTest={0.02}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function TokenFlowCanvas({ frameloop = "always" }) {
  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 55 }} dpr={[1, 1.5]} frameloop={frameloop}>
      <TokenField />
    </Canvas>
  );
}

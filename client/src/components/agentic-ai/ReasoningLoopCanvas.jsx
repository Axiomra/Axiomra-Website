import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../../lib/dotTexture";

/* The reason → act → observe → repeat cycle, rendered as an orbit. */

/** Points in the comet trail chasing the head around the loop. */
const TRAIL = 150;
/** Tool markers on the outer ring. */
const TOOLS = 18;
/** The four phases of the cycle. */
const STATIONS = 4;

const LOOP_RADIUS = 3.4;
const TOOL_RADIUS = 5.3;
/** Radians the trail spans behind the head. */
const TRAIL_ARC = 2.1;

const HEAD = new THREE.Color("#14D8C4");
const TAIL = new THREE.Color("#788BE3");

/** Deterministic sin-hash, see AgentSwarmCanvas for why not `Math.random()`. */
function jitter(n) {
  return Math.abs(Math.sin(n * 91.7 + 47.3) * 26421.31) % 1;
}

function Loop({ pointer }) {
  const groupRef = useRef();
  const trailRef = useRef();
  const stationsRef = useRef();
  const toolRingRef = useRef();
  const coreRef = useRef();

  const dotTexture = useMemo(() => makeDotTexture(), []);

  const { trailPositions, trailColors, stationPositions, toolPositions, toolColors } =
    useMemo(() => {
      const trailPositions = new Float32Array(TRAIL * 3);
      const trailColors = new Float32Array(TRAIL * 3);
      const mixed = new THREE.Color();
      for (let i = 0; i < TRAIL; i++) {
        // Hot at the head, cooling toward the tail.
        mixed.copy(HEAD).lerp(TAIL, i / TRAIL);
        trailColors.set([mixed.r, mixed.g, mixed.b], i * 3);
      }

      const stationPositions = new Float32Array(STATIONS * 3);
      for (let i = 0; i < STATIONS; i++) {
        const a = (i / STATIONS) * Math.PI * 2;
        stationPositions.set([Math.cos(a) * LOOP_RADIUS, Math.sin(a) * LOOP_RADIUS, 0], i * 3);
      }

      const toolPositions = new Float32Array(TOOLS * 3);
      const toolColors = new Float32Array(TOOLS * 3);
      for (let i = 0; i < TOOLS; i++) {
        const a = (i / TOOLS) * Math.PI * 2;
        // Slight z-spread so the outer ring reads as a band, not a hoop.
        const z = (jitter(i) - 0.5) * 1.1;
        toolPositions.set([Math.cos(a) * TOOL_RADIUS, Math.sin(a) * TOOL_RADIUS, z], i * 3);
        mixed.copy(TAIL).lerp(HEAD, jitter(i + 5.5));
        toolColors.set([mixed.r, mixed.g, mixed.b], i * 3);
      }

      return { trailPositions, trailColors, stationPositions, toolPositions, toolColors };
    }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const head = t * 0.85;

    const attr = trailRef.current.geometry.attributes.position;
    const arr = attr.array;
    for (let i = 0; i < TRAIL; i++) {
      const a = head - (i / TRAIL) * TRAIL_ARC;
      // The loop wobbles off-plane so it never flattens into a flat circle.
      const wobble = Math.sin(a * 3 + t * 0.6) * 0.22;
      const i3 = i * 3;
      arr[i3] = Math.cos(a) * LOOP_RADIUS;
      arr[i3 + 1] = Math.sin(a) * LOOP_RADIUS;
      arr[i3 + 2] = wobble;
    }
    attr.needsUpdate = true;

    // Stations brighten as the comet head sweeps past them.
    const nearest = ((head % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    stationsRef.current.material.size = 0.34 + Math.sin(nearest * STATIONS) * 0.06;

    coreRef.current.rotation.x = t * 0.25;
    coreRef.current.rotation.y = t * 0.36;
    toolRingRef.current.rotation.z = -t * 0.14;

    const g = groupRef.current;
    g.rotation.x = -0.42 + Math.sin(t * 0.22) * 0.07 + pointer.current.y * 0.16;
    g.rotation.y = Math.sin(t * 0.15) * 0.2 + pointer.current.x * 0.3;
  });

  return (
    <group ref={groupRef}>
      {/* The agent itself */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.95, 0]} />
        <meshBasicMaterial color="#14D8C4" wireframe transparent opacity={0.5} />
      </mesh>

      {/* The track the cycle runs on */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[LOOP_RADIUS, 0.012, 8, 160]} />
        <meshBasicMaterial color="#788BE3" transparent opacity={0.4} />
      </mesh>

      {/* Work travelling the cycle */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={TRAIL}
            array={trailPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={TRAIL}
            array={trailColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.13}
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

      {/* Reason · Act · Observe · Repeat */}
      <points ref={stationsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={STATIONS}
            array={stationPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.34}
          map={dotTexture}
          color="#14D8C4"
          transparent
          opacity={0.95}
          alphaTest={0.02}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Tools the agent can reach, counter-rotating */}
      <group ref={toolRingRef}>
        <mesh>
          <torusGeometry args={[TOOL_RADIUS, 0.008, 6, 200]} />
          <meshBasicMaterial color="#788BE3" transparent opacity={0.22} />
        </mesh>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={TOOLS}
              array={toolPositions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={TOOLS}
              array={toolColors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.17}
            map={dotTexture}
            vertexColors
            transparent
            opacity={0.8}
            alphaTest={0.02}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </group>
  );
}

export default function ReasoningLoopCanvas({ frameloop = "always" }) {
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      frameloop={frameloop}
      camera={{ position: [0, 0, 12] , fov: 50 }}
      dpr={[1, 1.5]}
      onPointerMove={(e) => {
        const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
        pointer.current.x = ((e.clientX - left) / width) * 2 - 1;
        pointer.current.y = ((e.clientY - top) / height) * 2 - 1;
      }}
    >
      <Loop pointer={pointer} />
    </Canvas>
  );
}

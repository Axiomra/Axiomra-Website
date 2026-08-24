import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../../lib/dotTexture";

/* Orchestrated agent swarm, the hero field for the Agentic AI page. */

/** Specialised agents orbiting the supervisor. */
const AGENTS = 16;
/** Extra agent-to-agent edges, so the graph reads as a mesh and not a star. */
const PEER_LINKS = 12;
/** Work packets in flight along each edge at any moment. */
const PER_EDGE = 2;
/** Ambient context dust behind the graph. */
const DUST = 900;

const CORE = new THREE.Color("#14D8C4");
const EDGE = new THREE.Color("#788BE3");

function jitter(n) {
  return Math.abs(Math.sin(n * 127.1 + 311.7) * 43758.5453) % 1;
}

/** Agents on a Fibonacci shell, even spacing, no clustered poles. */
function agentPositions(radius) {
  const out = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < AGENTS; i++) {
    const y = 1 - (i / (AGENTS - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    // A little radial variance so the shell is not a perfect ball.
    const scale = radius * (0.86 + jitter(i) * 0.3);
    out.push(
      new THREE.Vector3(Math.cos(theta) * r * scale, y * scale, Math.sin(theta) * r * scale)
    );
  }
  return out;
}

function Swarm({ pointer }) {
  const groupRef = useRef();
  const packetsRef = useRef();
  const coreRef = useRef();
  const nodesRef = useRef();

  const dotTexture = useMemo(() => makeDotTexture(), []);

  /* Everything geometric is built once. */
  const { edges, edgeLines, edgeColors, nodePositions, nodeColors, dust } = useMemo(() => {
    const agents = agentPositions(4.4);
    const origin = new THREE.Vector3(0, 0, 0);

    // Supervisor → agent edges first, then a ring of peer hand-offs.
    const edges = agents.map((a) => [origin, a]);
    for (let i = 0; i < PEER_LINKS; i++) {
      const from = agents[i % AGENTS];
      const to = agents[(i * 5 + 3) % AGENTS];
      if (from !== to) edges.push([from, to]);
    }

    const edgeLines = new Float32Array(edges.length * 6);
    const edgeColors = new Float32Array(edges.length * 6);
    const mixed = new THREE.Color();
    edges.forEach(([from, to], i) => {
      edgeLines.set([from.x, from.y, from.z, to.x, to.y, to.z], i * 6);
      // Fade every edge outward, so the core reads as the source of the work.
      mixed.copy(CORE);
      edgeColors.set([mixed.r, mixed.g, mixed.b], i * 6);
      mixed.copy(EDGE);
      edgeColors.set([mixed.r, mixed.g, mixed.b], i * 6 + 3);
    });

    const nodePositions = new Float32Array(AGENTS * 3);
    const nodeColors = new Float32Array(AGENTS * 3);
    agents.forEach((a, i) => {
      nodePositions.set([a.x, a.y, a.z], i * 3);
      mixed.copy(CORE).lerp(EDGE, jitter(i + 40));
      nodeColors.set([mixed.r, mixed.g, mixed.b], i * 3);
    });

    const dust = new Float32Array(DUST * 3);
    for (let i = 0; i < DUST; i++) {
      const r = 6 + jitter(i) * 7;
      const theta = jitter(i + 1.3) * Math.PI * 2;
      const phi = Math.acos(2 * jitter(i + 2.7) - 1);
      dust.set(
        [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.6,
          r * Math.cos(phi),
        ],
        i * 3
      );
    }

    return { edges, edgeLines, edgeColors, nodePositions, nodeColors, dust };
  }, []);

  const packetCount = edges.length * PER_EDGE;

  const { packetPositions, packetColors, packetSeeds } = useMemo(() => {
    const packetPositions = new Float32Array(packetCount * 3);
    const packetColors = new Float32Array(packetCount * 3);
    const packetSeeds = new Float32Array(packetCount * 2);
    const mixed = new THREE.Color();
    for (let i = 0; i < packetCount; i++) {
      // Phase offset + speed, so packets never travel in lockstep.
      packetSeeds[i * 2] = jitter(i + 7.1);
      packetSeeds[i * 2 + 1] = 0.25 + jitter(i + 13.9) * 0.4;
      mixed.copy(CORE).lerp(EDGE, jitter(i + 21.4));
      packetColors.set([mixed.r, mixed.g, mixed.b], i * 3);
    }
    return { packetPositions, packetColors, packetSeeds };
  }, [packetCount]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const attr = packetsRef.current.geometry.attributes.position;
    const arr = attr.array;

    for (let i = 0; i < packetCount; i++) {
      const edgeIndex = i % edges.length;
      const [from, to] = edges[edgeIndex];
      const phase = packetSeeds[i * 2];
      const speed = packetSeeds[i * 2 + 1];
      // Ping-pong: work goes out to the agent and the result comes back.
      const raw = (t * speed + phase) % 1;
      const k = raw < 0.5 ? raw * 2 : (1 - raw) * 2;
      const i3 = i * 3;
      arr[i3] = from.x + (to.x - from.x) * k;
      arr[i3 + 1] = from.y + (to.y - from.y) * k;
      arr[i3 + 2] = from.z + (to.z - from.z) * k;
    }
    attr.needsUpdate = true;

    // The supervisor breathes; the whole graph drifts under the pointer.
    const pulse = 1 + Math.sin(t * 1.5) * 0.07;
    coreRef.current.scale.setScalar(pulse);
    coreRef.current.rotation.y = t * 0.3;
    nodesRef.current.material.size = 0.3 + Math.sin(t * 2) * 0.03;

    const g = groupRef.current;
    g.rotation.y = t * 0.12 + pointer.current.x * 0.45;
    g.rotation.x = Math.sin(t * 0.18) * 0.13 + pointer.current.y * 0.28;
  });

  return (
    <group ref={groupRef}>
      {/* Supervisor */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial color="#14D8C4" wireframe transparent opacity={0.55} />
      </mesh>

      {/* Delegation graph */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={edges.length * 2}
            array={edgeLines}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={edges.length * 2}
            array={edgeColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.24}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Agents */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={AGENTS}
            array={nodePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={AGENTS}
            array={nodeColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.3}
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

      {/* Work in flight */}
      <points ref={packetsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={packetCount}
            array={packetPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={packetCount}
            array={packetColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
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

      {/* Ambient context */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={DUST} array={dust} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          map={dotTexture}
          color="#788BE3"
          transparent
          opacity={0.4}
          alphaTest={0.02}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function AgentSwarmCanvas({ frameloop = "always" }) {
  // Pointer parallax lives in a ref so moving the mouse never re-renders React.
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      frameloop={frameloop}
      camera={{ position: [0, 0, 13.5], fov: 50 }}
      dpr={[1, 1.5]}
      onPointerMove={(e) => {
        const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
        pointer.current.x = ((e.clientX - left) / width) * 2 - 1;
        pointer.current.y = ((e.clientY - top) / height) * 2 - 1;
      }}
    >
      <Swarm pointer={pointer} />
    </Canvas>
  );
}

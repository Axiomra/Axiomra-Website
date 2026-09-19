import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/*
 * Backdrop for the Transportation hero. Three ideas, one scene:
 *
 *   Corridor:  a perspective grid of lanes and cross streets, the network every
 *              other element is measured against.
 *   Traffic:   instanced light streaks running the lanes at their own speeds,
 *              half of them counter-flowing, so the field reads as movement
 *              rather than decoration.
 *   Nodes:     a handful of pulsing rings at junctions, the waypoints a routing
 *              engine actually optimises around.
 *
 * Decorative and cheap: the grid is baked once into a single lineSegments
 * geometry, every vehicle shares one instanced mesh, and nothing is allocated
 * inside the frame loop.
 */

const TEAL = "#14D8C4";
const INDIGO = "#788BE3";

const LANE_COUNT = 11;
const LANE_GAP = 1.5;
const CORRIDOR_LENGTH = 86;
const CORRIDOR_START = -70;
const CROSS_GAP = 7;

const VEHICLES = 132;

/** Deterministic so the composition is identical on every load. */
function makeRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const laneX = (lane) => (lane - (LANE_COUNT - 1) / 2) * LANE_GAP;

/** The road surface: lanes running away from camera, cross streets binding them. */
function Corridor() {
  const geometry = useMemo(() => {
    const points = [];
    const end = CORRIDOR_START + CORRIDOR_LENGTH;

    for (let lane = 0; lane < LANE_COUNT; lane += 1) {
      const x = laneX(lane);
      points.push(x, 0, CORRIDOR_START, x, 0, end);
    }

    const halfWidth = ((LANE_COUNT - 1) / 2) * LANE_GAP;
    for (let z = CORRIDOR_START; z <= end; z += CROSS_GAP) {
      points.push(-halfWidth, 0, z, halfWidth, 0, z);
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(points), 3));
    return g;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={INDIGO} transparent opacity={0.16} />
    </lineSegments>
  );
}

/**
 * Traffic as instanced streaks. Each vehicle owns a lane, a speed and a start
 * offset; odd lanes run the other way, which is what makes the corridor read as
 * a two-directional network instead of a screensaver.
 */
function Traffic() {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const vehicles = useMemo(() => {
    const rand = makeRandom(20260915);
    return Array.from({ length: VEHICLES }, () => {
      const lane = Math.floor(rand() * LANE_COUNT);
      return {
        x: laneX(lane) + (rand() - 0.5) * 0.18,
        // Outer lanes are the quiet ones, the way a real corridor thins at the edge.
        speed: (5 + rand() * 11) * (1 - Math.abs(lane - (LANE_COUNT - 1) / 2) / LANE_COUNT),
        offset: rand() * CORRIDOR_LENGTH,
        forward: lane % 2 === 0,
        length: 1.1 + rand() * 2.6,
        lift: 0.11 + rand() * 0.06,
      };
    });
  }, []);

  /* Colour has to go on through `setColorAt`, which creates `instanceColor` and
     trips the shader's USE_INSTANCING_COLOR define. Feeding the attribute in as
     JSX and asking the material for `vertexColors` instead paints every streak
     black: `vertexColors` reads a geometry colour attribute that a boxGeometry
     does not have. */
  useLayoutEffect(() => {
    const mesh = meshRef.current;
    const rand = makeRandom(773311);
    const teal = new THREE.Color(TEAL);
    const indigo = new THREE.Color(INDIGO);
    const c = new THREE.Color();
    for (let i = 0; i < VEHICLES; i += 1) {
      // A mostly-teal stream with indigo mixed through it, never a two-tone split.
      mesh.setColorAt(i, c.copy(teal).lerp(indigo, rand() * rand()));
    }
    mesh.instanceColor.needsUpdate = true;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;

    for (let i = 0; i < vehicles.length; i += 1) {
      const v = vehicles[i];
      const travelled = (v.offset + t * v.speed) % CORRIDOR_LENGTH;
      const z = v.forward
        ? CORRIDOR_START + travelled
        : CORRIDOR_START + CORRIDOR_LENGTH - travelled;
      dummy.position.set(v.x, v.lift, z);
      dummy.scale.set(1, 1, v.length);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, VEHICLES]}>
      <boxGeometry args={[0.13, 0.13, 1]} />
      <meshBasicMaterial
        transparent
        opacity={1}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}

/** Junction markers: rings that expand and fade on their own cycle. */
function Nodes() {
  const groupRef = useRef();
  const geometry = useMemo(() => new THREE.RingGeometry(0.82, 0.92, 48), []);

  const nodes = useMemo(() => {
    const rand = makeRandom(505011);
    return Array.from({ length: 6 }, (_, i) => ({
      x: laneX(Math.floor(rand() * LANE_COUNT)),
      z: CORRIDOR_START + 8 + rand() * (CORRIDOR_LENGTH - 20),
      phase: rand() * 3,
      color: i % 3 === 0 ? INDIGO : TEAL,
    }));
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const children = groupRef.current.children;
    for (let i = 0; i < children.length; i += 1) {
      // A three-second cycle per node: expand outward, fade as it goes.
      const cycle = ((t + nodes[i].phase) % 3) / 3;
      const ring = children[i];
      const scale = 0.4 + cycle * 2.6;
      ring.scale.set(scale, scale, 1);
      ring.material.opacity = (1 - cycle) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node) => (
        <mesh
          key={`${node.x}-${node.z}`}
          geometry={geometry}
          position={[node.x, 0.02, node.z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Eases the scene toward the pointer, so the hero reacts without chasing it. */
function ParallaxRig({ children }) {
  const groupRef = useRef();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.16;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.06;
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

export default function TransportationCanvas({ frameloop = "always" }) {
  return (
    <Canvas camera={{ position: [0, 2.6, 12], fov: 55, rotation: [-0.14, 0, 0] }} dpr={[1, 1.5]} frameloop={frameloop}>
      {/* Far end of the corridor dissolves into the hero's own ground colour. */}
      <fog attach="fog" args={["#05070F", 24, 78]} />
      <group position={[3.4, -1.6, 0]} rotation={[0, 0.08, 0]}>
        <ParallaxRig>
          <Corridor />
          <Traffic />
          <Nodes />
        </ParallaxRig>
      </group>
    </Canvas>
  );
}

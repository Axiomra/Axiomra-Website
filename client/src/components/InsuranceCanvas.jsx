import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../lib/dotTexture";

/*
 * Backdrop for the Insurance hero. One idea, told four ways: cover holds.
 *
 *   Canopy:   a dome of points carrying a travelling ripple, the umbrella
 *             every policy is a version of.
 *   Risk:     instanced shards falling out of the dark, deflected at the
 *             canopy and recycled, so the dome is visibly doing work.
 *   Shield:   the crest outline, drawn once and turned slowly on its axis.
 *   Policies: thin instanced plates on a wide orbit, edge-on and rotating,
 *             the book of business circling the risk.
 *
 * Decorative and cheap: geometry allocated once and mutated in place, two
 * instanced meshes, no lights, and nothing allocated inside the frame loop.
 */

const TEAL = "#14D8C4";
const INDIGO = "#788BE3";

const DOME_RADIUS = 6.4;
const DOME_SEGMENTS = 44;
const DOME_Y = -2.1;

const RISK_COUNT = 90;
const POLICY_COUNT = 16;

/** Height of the canopy at a given distance from its axis. */
function canopyHeight(r) {
  if (r >= DOME_RADIUS) return DOME_Y;
  return DOME_Y + Math.sqrt(DOME_RADIUS * DOME_RADIUS - r * r) * 0.52;
}

/** The canopy: a hemisphere of points with a ripple running down its face. */
function Canopy() {
  const dotTexture = useMemo(() => makeDotTexture(), []);
  const pointsRef = useRef();

  const geometry = useMemo(
    () =>
      new THREE.SphereGeometry(
        DOME_RADIUS,
        DOME_SEGMENTS,
        Math.round(DOME_SEGMENTS * 0.4),
        0,
        Math.PI * 2,
        0,
        Math.PI / 2
      ),
    []
  );
  // Rest positions copied once, so every frame is a pure function of time.
  const base = useMemo(() => geometry.attributes.position.array.slice(), [geometry]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const attr = pointsRef.current.geometry.attributes.position;
    const arr = attr.array;
    for (let i = 0; i < arr.length; i += 3) {
      const x = base[i];
      const y = base[i + 1];
      const z = base[i + 2];
      const r = Math.hypot(x, z);
      // A ring travelling out from the apex, crossed by a slow breath, so the
      // canopy never settles into a frame the eye can memorise.
      const swell = Math.sin(r * 0.9 - t * 1.1) * 0.12 + Math.sin(t * 0.32) * 0.06;
      const k = 1 + swell / DOME_RADIUS;
      arr[i] = x * k;
      arr[i + 1] = y * k;
      arr[i + 2] = z * k;
    }
    attr.needsUpdate = true;
  });

  return (
    <group position={[0, DOME_Y, 0]} scale={[1, 0.52, 1]}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={INDIGO} wireframe transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.14}
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

/**
 * Incoming risk. Each shard falls on its own speed, and is recycled the
 * moment it reaches the canopy, because the deflection is the whole point, so the
 * reset happens at the dome surface rather than at a floor plane.
 */
function RiskField() {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const shards = useMemo(
    () =>
      Array.from({ length: RISK_COUNT }, (_, i) => {
        const angle = (i * 2.399) % (Math.PI * 2);
        const radius = 0.6 + ((i * 7) % 11) * 0.82;
        return {
          x: Math.cos(angle) * radius,
          z: Math.sin(angle) * radius * 0.55,
          radius,
          speed: 1.1 + ((i * 5) % 7) * 0.32,
          offset: ((i * 13) % 97) / 97,
          spin: 0.3 + ((i * 3) % 5) * 0.2,
          scale: 0.06 + ((i * 11) % 4) * 0.026,
        };
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;
    for (let i = 0; i < RISK_COUNT; i += 1) {
      const s = shards[i];
      const floor = canopyHeight(s.radius);
      const span = 9 - floor;
      // A sawtooth from the top of the field down to the canopy, so every
      // shard is always mid-fall and none of them pop.
      const travelled = ((t * s.speed) / span + s.offset) % 1;
      dummy.position.set(s.x, 9 - travelled * span, s.z);
      dummy.rotation.set(t * s.spin, t * s.spin * 0.7, 0);
      // Fades into nothing as it meets the dome rather than vanishing.
      dummy.scale.setScalar(s.scale * (1 - travelled * 0.75));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, RISK_COUNT]}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color={INDIGO} transparent opacity={0.55} />
    </instancedMesh>
  );
}

/** The crest: a shield outline drawn once, turning slowly on its own axis. */
function Crest() {
  const groupRef = useRef();

  const { outline, inner } = useMemo(() => {
    const shape = (w, h) => {
      const pts = [
        [-w, h],
        [w, h],
        [w, -h * 0.1],
        [0, -h],
        [-w, -h * 0.1],
      ].map(([x, y]) => new THREE.Vector3(x, y, 0));
      pts.push(pts[0].clone());
      return new THREE.BufferGeometry().setFromPoints(pts);
    };
    return { outline: shape(2.1, 2.6), inner: shape(1.5, 1.9) };
  }, []);

  useEffect(
    () => () => {
      outline.dispose();
      inner.dispose();
    },
    [outline, inner]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.18) * 0.55;
    groupRef.current.position.y = 1.5 + Math.sin(t * 0.4) * 0.14;
  });

  return (
    <group ref={groupRef} position={[0, 1.5, 0]}>
      <line geometry={outline}>
        <lineBasicMaterial color={TEAL} transparent opacity={0.55} />
      </line>
      <line geometry={inner}>
        <lineBasicMaterial color={INDIGO} transparent opacity={0.35} />
      </line>
    </group>
  );
}

/**
 * The book of business: thin plates on a wide orbit, turning about their own
 * face, which is what sells them as documents rather than beads.
 */
function PolicyOrbit() {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const plates = useMemo(
    () =>
      Array.from({ length: POLICY_COUNT }, (_, i) => ({
        radius: 5.2 + (i % 4) * 1.2,
        height: 1.2 + ((i * 3) % 6) * 0.6,
        speed: 0.1 + ((i * 5) % 4) * 0.03,
        spin: 0.35 + ((i * 7) % 5) * 0.16,
        phase: (i * 1.37) % (Math.PI * 2),
        scale: 0.28 + ((i * 11) % 4) * 0.07,
      })),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;
    for (let i = 0; i < POLICY_COUNT; i += 1) {
      const p = plates[i];
      const a = t * p.speed + p.phase;
      dummy.position.set(
        Math.cos(a) * p.radius,
        p.height + Math.sin(a * 1.5) * 0.45,
        Math.sin(a) * p.radius * 0.42
      );
      dummy.rotation.set(0.3, t * p.spin + p.phase, 0.18);
      dummy.scale.set(p.scale * 0.78, p.scale, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, POLICY_COUNT]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color={TEAL} transparent opacity={0.28} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

/** One tilted torus, to give the composition an axis. */
function Ring() {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * 0.06;
    ref.current.rotation.x = Math.PI / 2.5 + Math.sin(t * 0.18) * 0.05;
  });
  return (
    <mesh ref={ref} position={[0, -1.6, 0]}>
      <torusGeometry args={[7.4, 0.012, 8, 220]} />
      <meshBasicMaterial color={INDIGO} transparent opacity={0.35} />
    </mesh>
  );
}

/** Eases the scene toward the pointer, so the hero reacts without chasing it. */
function ParallaxRig({ children }) {
  const groupRef = useRef();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.1;
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

export default function InsuranceCanvas({ frameloop = "always" }) {
  return (
    <Canvas camera={{ position: [0, 1.8, 13] , fov: 50 }} dpr={[1, 1.5]} frameloop={frameloop}>
      <ParallaxRig>
        <Canopy />
        <RiskField />
        <Crest />
        <PolicyOrbit />
        <Ring />
      </ParallaxRig>
    </Canvas>
  );
}

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../lib/dotTexture";

/*
 * Backdrop for the Legal hero. Five ideas, one scene:
 *
 *   Floor      — a plane of points carrying a slow swell, the ruled paper a
 *                case is written on, seen in perspective.
 *   Colonnade  — one instanced mesh of columns standing in two ranks, each
 *                breathing on its own phase so the row reads as depth rather
 *                than as a bar chart.
 *   Scale      — a balance: a beam rocking about its pivot with a pan hung at
 *                each end, the whole thing settling toward level and never
 *                quite arriving.
 *   Documents  — thin instanced planes drifting up through the volume, turning
 *                edge-on as they rise, like paper caught in a draught.
 *   Seal       — a tilted torus, to give the composition an axis.
 *
 * Decorative and cheap: geometry allocated once and mutated in place, two
 * instanced meshes, no lights, and nothing allocated inside the frame loop.
 */

const TEAL = "#14D8C4";
const INDIGO = "#788BE3";

const SEGMENTS = 54;
const SPAN = 32;

const COLUMN_COUNT = 18;
const PAPER_COUNT = 22;

/** The ruled floor: a travelling swell across the plane. */
function PaperField() {
  const dotTexture = useMemo(() => makeDotTexture(), []);
  const pointsRef = useRef();

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(SPAN, SPAN * 0.5, SEGMENTS, Math.round(SEGMENTS * 0.5)),
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
      // A swell running down the page, crossed by a slower lateral wave so the
      // floor never settles into a repeating frame.
      arr[i + 2] =
        Math.sin(y * 0.3 - t * 0.6) * 0.42 +
        Math.sin(x * 0.2 + t * 0.34) * 0.3 +
        Math.sin((x + y) * 0.11 + t * 0.18) * 0.24;
    }
    attr.needsUpdate = true;
  });

  return (
    <group position={[0, -2.7, -1.6]} rotation={[-1.2, 0, 0]}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={INDIGO} wireframe transparent opacity={0.11} />
      </mesh>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.11}
          color={TEAL}
          map={dotTexture}
          alphaTest={0.02}
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/**
 * The colonnade. One instanced box scaled per column, standing in two ranks:
 * each shaft grows and settles on its own phase, so the row looks like a
 * portico receding into the frame rather than a static wall.
 */
function Colonnade() {
  const meshRef = useRef();
  // One scratch object, reused for every instance matrix.
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const columns = useMemo(
    () =>
      Array.from({ length: COLUMN_COUNT }, (_, i) => {
        const rank = i % 2;
        return {
          x: -11.5 + Math.floor(i / 2) * 2.6 + rank * 1.3,
          z: rank === 0 ? -0.4 : -2.2,
          base: 1.6 + ((i * 7) % 5) * 0.42,
          speed: 0.28 + ((i * 3) % 4) * 0.08,
          phase: (i * 0.83) % (Math.PI * 2),
        };
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;
    for (let i = 0; i < COLUMN_COUNT; i += 1) {
      const c = columns[i];
      const h = c.base + (Math.sin(t * c.speed + c.phase) * 0.5 + 0.5) * 1.1;
      // Grown from the floor, not the centre, so the feet stay on the plane.
      dummy.position.set(c.x, -2.3 + h / 2, c.z);
      dummy.scale.set(0.2, h, 0.2);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COLUMN_COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={INDIGO} transparent opacity={0.34} />
    </instancedMesh>
  );
}

/**
 * The balance. The beam rocks about its pivot on a decaying swing, and each
 * pan hangs plumb from its own end — the pan groups counter-rotate by exactly
 * the beam's angle, which is what keeps them level as the beam tilts.
 */
function Scale() {
  const beamRef = useRef();
  const panLeftRef = useRef();
  const panRightRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Two frequencies, so the swing never returns to the same rest twice.
    const tilt = Math.sin(t * 0.42) * 0.16 + Math.sin(t * 0.17) * 0.05;
    beamRef.current.rotation.z = tilt;
    // Pans stay plumb: undo the beam's rotation, then follow its ends in y.
    panLeftRef.current.rotation.z = -tilt;
    panRightRef.current.rotation.z = -tilt;
    panLeftRef.current.position.y = -1.5 + Math.sin(tilt) * 0.1;
    panRightRef.current.position.y = -1.5 - Math.sin(tilt) * 0.1;
  });

  return (
    <group position={[0, 1.4, -0.6]}>
      {/* the standard */}
      <mesh position={[0, -1.6, 0]}>
        <cylinderGeometry args={[0.035, 0.06, 3.4, 12]} />
        <meshBasicMaterial color={TEAL} transparent opacity={0.4} />
      </mesh>

      <group ref={beamRef}>
        {/* the beam */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 6.4, 10]} />
          <meshBasicMaterial color={TEAL} transparent opacity={0.5} />
        </mesh>

        {/* left arm: hanger and pan */}
        <group position={[-3.2, 0, 0]}>
          <mesh position={[0, -0.75, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 1.5, 6]} />
            <meshBasicMaterial color={INDIGO} transparent opacity={0.42} />
          </mesh>
          <group ref={panLeftRef} position={[0, -1.5, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.62, 0.016, 8, 48]} />
              <meshBasicMaterial color={INDIGO} transparent opacity={0.52} />
            </mesh>
          </group>
        </group>

        {/* right arm: hanger and pan */}
        <group position={[3.2, 0, 0]}>
          <mesh position={[0, -0.75, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 1.5, 6]} />
            <meshBasicMaterial color={INDIGO} transparent opacity={0.42} />
          </mesh>
          <group ref={panRightRef} position={[0, -1.5, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.62, 0.016, 8, 48]} />
              <meshBasicMaterial color={INDIGO} transparent opacity={0.52} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

/**
 * Filed paper. Thin instanced planes rising through the volume and turning as
 * they go, wrapped back to the floor once they clear the top, so the drift
 * runs forever without ever allocating.
 */
function PaperDrift() {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const sheets = useMemo(
    () =>
      Array.from({ length: PAPER_COUNT }, (_, i) => ({
        x: -10 + ((i * 7) % 20) * 1.02,
        z: -3 + ((i * 5) % 7) * 0.8,
        offset: ((i * 11) % 13) * 0.62,
        rise: 0.24 + ((i * 3) % 5) * 0.06,
        spin: 0.2 + ((i * 7) % 4) * 0.12,
        scale: 0.42 + ((i * 13) % 4) * 0.12,
      })),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;
    for (let i = 0; i < PAPER_COUNT; i += 1) {
      const s = sheets[i];
      // Height wraps over an 8-unit column, so a sheet leaving the top is the
      // same sheet re-entering at the floor.
      const y = -2.4 + ((s.offset + t * s.rise) % 8);
      dummy.position.set(s.x + Math.sin(t * 0.3 + s.offset) * 0.4, y, s.z);
      dummy.rotation.set(Math.PI / 2.4, t * s.spin + s.offset, 0.2);
      dummy.scale.set(s.scale, s.scale * 1.32, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PAPER_COUNT]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color={TEAL} transparent opacity={0.22} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

/** One tilted torus, to give the composition an axis. */
function Seal() {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * 0.06;
    ref.current.rotation.x = Math.PI / 2.8 + Math.sin(t * 0.18) * 0.05;
  });
  return (
    <mesh ref={ref} position={[-5.6, 1.6, 0.2]}>
      <torusGeometry args={[3.7, 0.012, 8, 200]} />
      <meshBasicMaterial color={TEAL} transparent opacity={0.38} />
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
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.11;
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

export default function LegalCanvas({ frameloop = "always" }) {
  return (
    <Canvas camera={{ position: [0, 1.4, 12.5], fov: 50 }} dpr={[1, 1.5]} frameloop={frameloop}>
      <ParallaxRig>
        <PaperField />
        <Colonnade />
        <PaperDrift />
        <Scale />
        <Seal />
      </ParallaxRig>
    </Canvas>
  );
}

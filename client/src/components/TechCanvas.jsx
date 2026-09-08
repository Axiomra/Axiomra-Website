import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../lib/dotTexture";

/*
 * Backdrop for the Tech Stack hero: a wireframe die sitting inside three
 * counter-rotating rings, with a lattice of points drifting behind it. The
 * reading is deliberate, a processor with orbits of tooling around it.
 *
 * Decorative, so it stays cheap: no lights, no shadows, no per-frame
 * allocation. Geometry is built once and only rotations change per frame.
 */

const LATTICE_COLS = 26;
const LATTICE_ROWS = 14;
const LATTICE_COUNT = LATTICE_COLS * LATTICE_ROWS;

const TEAL = "#14D8C4";
const INDIGO = "#788BE3";

/** The processor at the centre: an outer cage plus a denser inner die. */
function Core() {
  const cageRef = useRef();
  const dieRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    cageRef.current.rotation.set(t * 0.1, t * 0.16, 0);
    // Counter rotation keeps the two shells from reading as one solid object.
    dieRef.current.rotation.set(-t * 0.14, -t * 0.22, t * 0.05);
  });

  return (
    <group>
      <mesh ref={cageRef}>
        <boxGeometry args={[2.9, 2.9, 2.9, 3, 3, 3]} />
        <meshBasicMaterial color={TEAL} wireframe transparent opacity={0.18} />
      </mesh>
      <mesh ref={dieRef}>
        <boxGeometry args={[1.5, 1.5, 1.5, 2, 2, 2]} />
        <meshBasicMaterial color={INDIGO} wireframe transparent opacity={0.42} />
      </mesh>
    </group>
  );
}

/** Three rings on different axes, each turning at its own rate. */
function Orbits() {
  const innerRef = useRef();
  const middleRef = useRef();
  const outerRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    innerRef.current.rotation.z = t * 0.18;
    middleRef.current.rotation.y = -t * 0.13;
    outerRef.current.rotation.x = t * 0.09;
  });

  return (
    <group>
      <mesh ref={innerRef} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[4.2, 0.012, 8, 128]} />
        <meshBasicMaterial color={TEAL} transparent opacity={0.55} />
      </mesh>
      <mesh ref={middleRef} rotation={[Math.PI / 3, Math.PI / 5, 0]}>
        <torusGeometry args={[5.1, 0.01, 8, 128]} />
        <meshBasicMaterial color={INDIGO} transparent opacity={0.45} />
      </mesh>
      <mesh ref={outerRef} rotation={[0, Math.PI / 3.5, Math.PI / 6]}>
        <torusGeometry args={[6.1, 0.008, 8, 128]} />
        <meshBasicMaterial color={TEAL} transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

/**
 * A regular grid of points far behind the core. A travelling sine gives it
 * depth without the noise of a random dust field, which suits a page about
 * structured systems.
 */
function Lattice() {
  const ref = useRef();
  const dotTexture = useMemo(() => makeDotTexture(), []);

  const base = useMemo(() => {
    const arr = new Float32Array(LATTICE_COUNT * 3);
    let i = 0;
    for (let x = 0; x < LATTICE_COLS; x++) {
      for (let y = 0; y < LATTICE_ROWS; y++) {
        arr[i * 3] = (x - (LATTICE_COLS - 1) / 2) * 1.15;
        arr[i * 3 + 1] = (y - (LATTICE_ROWS - 1) / 2) * 1.15;
        arr[i * 3 + 2] = -9;
        i++;
      }
    }
    return arr;
  }, []);

  const positions = useMemo(() => base.slice(), [base]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const attr = ref.current.geometry.attributes.position;
    const arr = attr.array;

    for (let i = 0; i < LATTICE_COUNT; i++) {
      const x = base[i * 3];
      const y = base[i * 3 + 1];
      // One wave across the plane, so the grid breathes as a surface.
      arr[i * 3 + 2] = -9 + Math.sin(t * 0.5 + x * 0.28 + y * 0.2) * 0.9;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={LATTICE_COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.11}
        color={INDIGO}
        map={dotTexture}
        alphaTest={0.02}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Eases the scene toward the pointer, so the hero reacts without chasing it. */
function ParallaxRig({ children }) {
  const groupRef = useRef();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.45;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.28;
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

export default function TechCanvas({ frameloop = "always" }) {
  return (
    <Canvas camera={{ position: [0, 0, 11] }} dpr={[1, 1.5]} frameloop={frameloop}>
      <Lattice />
      <ParallaxRig>
        <Orbits />
        <Core />
      </ParallaxRig>
    </Canvas>
  );
}

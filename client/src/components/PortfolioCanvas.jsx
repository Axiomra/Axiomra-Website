import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../lib/dotTexture";

/*
 * Backdrop for the Portfolio hero: a carousel of framed panels turning around
 * a vertical axis, each one drifting on its own sine, with a slow spiral of
 * points behind them. The reading is a gallery of work rotating past you.
 *
 * Decorative, so it stays cheap: no lights, no shadows, no per-frame
 * allocation. Geometry is built once; only transforms change per frame.
 */

const PANEL_COUNT = 14;
const RING_RADIUS = 5.4;

const SPIRAL_COUNT = 420;
const SPIRAL_TURNS = 7;

const TEAL = "#14D8C4";
const INDIGO = "#788BE3";

/**
 * One framed panel. The fill is nearly transparent and the border is a
 * separate line loop, so panels overlapping in depth still read as distinct
 * rectangles rather than a smear of translucent quads.
 */
function Panel({ index }) {
  const groupRef = useRef();

  // Fixed per-panel constants, so the ring never looks mechanically uniform.
  const { angle, height, phase, drift } = useMemo(() => {
    const a = (index / PANEL_COUNT) * Math.PI * 2;
    return {
      angle: a,
      // Alternating tiers give the ring a horizon rather than a single band.
      height: (index % 3) * 1.35 - 1.35,
      phase: index * 0.7,
      drift: 0.28 + (index % 4) * 0.06,
    };
  }, [index]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const g = groupRef.current;
    g.position.y = height + Math.sin(t * drift + phase) * 0.42;
    // A shallow tilt that never settles, so panels catch the eye as they pass.
    g.rotation.z = Math.sin(t * 0.22 + phase) * 0.07;
  });

  const border = useMemo(() => {
    const w = 1.5;
    const h = 1.0;
    return new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-w, -h, 0),
      new THREE.Vector3(w, -h, 0),
      new THREE.Vector3(w, h, 0),
      new THREE.Vector3(-w, h, 0),
      new THREE.Vector3(-w, -h, 0),
    ]);
  }, []);

  useEffect(() => () => border.dispose(), [border]);

  return (
    <group
      ref={groupRef}
      position={[Math.sin(angle) * RING_RADIUS, height, Math.cos(angle) * RING_RADIUS]}
      // Panels face outward from the axis, so the ring reads as a room.
      rotation={[0, angle, 0]}
    >
      <mesh>
        <planeGeometry args={[3, 2]} />
        <meshBasicMaterial
          color={index % 2 === 0 ? TEAL : INDIGO}
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <line geometry={border}>
        <lineBasicMaterial
          color={index % 2 === 0 ? TEAL : INDIGO}
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </line>
    </group>
  );
}

/** The whole carousel, turning slowly enough to feel ambient. */
function PanelRing() {
  const ref = useRef();
  const panels = useMemo(() => Array.from({ length: PANEL_COUNT }, (_, i) => i), []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.055;
  });

  return (
    <group ref={ref} rotation={[0.08, 0, 0]}>
      {panels.map((i) => (
        <Panel key={i} index={i} />
      ))}
    </group>
  );
}

/**
 * A spiral of points sunk behind the ring. It shares the carousel's axis, so
 * the two layers rotate as one system instead of fighting each other.
 */
function Spiral() {
  const ref = useRef();
  const dotTexture = useMemo(() => makeDotTexture(), []);

  const positions = useMemo(() => {
    const arr = new Float32Array(SPIRAL_COUNT * 3);
    for (let i = 0; i < SPIRAL_COUNT; i++) {
      const p = i / SPIRAL_COUNT;
      const a = p * Math.PI * 2 * SPIRAL_TURNS;
      // Radius widens toward the outside so the field thins out at the edges.
      const r = 2.2 + p * 7.5;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = (p - 0.5) * 9;
      arr[i * 3 + 2] = Math.sin(a) * r - 4;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = -t * 0.03;
    ref.current.position.y = Math.sin(t * 0.2) * 0.35;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={SPIRAL_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={TEAL}
        map={dotTexture}
        alphaTest={0.02}
        transparent
        opacity={0.55}
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
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.3;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(() => {
    const g = groupRef.current;
    g.rotation.y += (target.current.x - g.rotation.y) * 0.035;
    g.rotation.x += (target.current.y - g.rotation.x) * 0.035;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function PortfolioCanvas({ frameloop = "always" }) {
  return (
    <Canvas camera={{ position: [0, 0.6, 9.5], fov: 55 }} dpr={[1, 1.5]} frameloop={frameloop}>
      <Spiral />
      <ParallaxRig>
        <PanelRing />
      </ParallaxRig>
    </Canvas>
  );
}

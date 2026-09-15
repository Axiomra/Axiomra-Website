import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../lib/dotTexture";

/*
 * Backdrop for the Retail hero. Three ideas, one scene:
 *
 *   Shelf   — a grid of instanced units whose heights rise and fall under a
 *             travelling wave: stock moving through an estate, not water.
 *   Barcode — a row of thin bars along the floor, scrolling and re-striping,
 *             so the base of the frame reads as a scan line.
 *   Tag     — a swing ticket built from a real polygon (five points and a
 *             punched eyelet) on a slow tilt.
 *
 * Decorative and cheap: two instanced meshes, one shared dot sprite, no lights,
 * and nothing allocated inside the frame loop.
 */

const TEAL = "#14D8C4";
const INDIGO = "#788BE3";

const SHELF_COLS = 26;
const SHELF_ROWS = 9;
const SHELF_COUNT = SHELF_COLS * SHELF_ROWS;
const SHELF_GAP = 0.92;

const BAR_COUNT = 64;
const BAR_SPAN = 30;

/** Deterministic 0-1 scatter: one stable value per index and per axis. */
function scatter(i, salt) {
  const n = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

/**
 * The stock grid. Every unit keeps its lane; only its height changes, so the
 * field reads as inventory being drawn down and replenished rather than as a
 * surface being disturbed.
 */
function ShelfField() {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Lane positions and per-unit phase, fixed once.
  const units = useMemo(
    () =>
      Array.from({ length: SHELF_COUNT }, (_, i) => {
        const col = i % SHELF_COLS;
        const row = Math.floor(i / SHELF_COLS);
        return {
          x: (col - (SHELF_COLS - 1) / 2) * SHELF_GAP,
          z: (row - (SHELF_ROWS - 1) / 2) * SHELF_GAP,
          phase: scatter(i, 1) * Math.PI * 2,
          gain: 0.55 + scatter(i, 2) * 0.75,
        };
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;
    for (let i = 0; i < SHELF_COUNT; i += 1) {
      const u = units[i];
      // One wave travelling along x is what makes it read as replenishment
      // sweeping the estate; the per-unit phase keeps it from looking machined.
      const wave = Math.sin(u.x * 0.42 - t * 0.85 + u.phase * 0.25);
      const height = 0.35 + (wave * 0.5 + 0.5) * 2.1 * u.gain;
      dummy.position.set(u.x, height / 2 - 1.6, u.z);
      dummy.scale.set(0.34, height, 0.34);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, SHELF_COUNT]}
      rotation={[0, -0.22, 0]}
      position={[0, -1.2, -1]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={INDIGO} transparent opacity={0.34} />
    </instancedMesh>
  );
}

/** Thin bars scrolling along the floor: a barcode passing under a scanner. */
function BarcodeRun() {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const bars = useMemo(
    () =>
      Array.from({ length: BAR_COUNT }, (_, i) => ({
        offset: (i / BAR_COUNT) * BAR_SPAN,
        width: 0.05 + scatter(i, 3) * 0.16,
        height: 1.1 + scatter(i, 4) * 1.9,
      })),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;
    for (let i = 0; i < BAR_COUNT; i += 1) {
      const b = bars[i];
      // Modulo wrap keeps the strip endless without respawning anything.
      const x = ((b.offset + t * 1.6) % BAR_SPAN) - BAR_SPAN / 2;
      dummy.position.set(x, 0, 0);
      dummy.scale.set(b.width, b.height, 0.02);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, BAR_COUNT]}
      position={[0, -3.4, 3.2]}
      rotation={[-0.42, 0, 0]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={TEAL} transparent opacity={0.38} />
    </instancedMesh>
  );
}

/** Sparse dust over the field, so the empty upper half is not dead space. */
function Motes() {
  const dotTexture = useMemo(() => makeDotTexture(), []);
  const geometry = useMemo(() => {
    const positions = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i += 1) {
      positions[i * 3] = (scatter(i, 5) - 0.5) * 30;
      positions[i * 3 + 1] = (scatter(i, 6) - 0.5) * 14;
      positions[i * 3 + 2] = (scatter(i, 7) - 0.5) * 12;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  const ref = useRef();

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.13}
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
  );
}

/** A swing ticket: the five-point tag outline plus its punched eyelet. */
function PriceTag() {
  const ref = useRef();

  const outline = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1.6, 0);
    shape.lineTo(-0.9, 1.1);
    shape.lineTo(1.6, 1.1);
    shape.lineTo(1.6, -1.1);
    shape.lineTo(-0.9, -1.1);
    shape.closePath();
    const points = shape.getPoints(6);
    return new THREE.BufferGeometry().setFromPoints(
      points.map((p) => new THREE.Vector3(p.x, p.y, 0))
    );
  }, []);

  useEffect(() => () => outline.dispose(), [outline]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.28) * 0.5;
    ref.current.rotation.z = Math.sin(t * 0.2) * 0.12;
    ref.current.position.y = 2.4 + Math.sin(t * 0.5) * 0.22;
  });

  return (
    <group ref={ref} position={[5.4, 2.4, 0.6]} scale={1.35}>
      <lineLoop geometry={outline}>
        <lineBasicMaterial color={TEAL} transparent opacity={0.65} />
      </lineLoop>
      {/* The punched eyelet the string would run through. */}
      <mesh position={[-0.75, 0, 0]}>
        <torusGeometry args={[0.16, 0.014, 8, 48]} />
        <meshBasicMaterial color={INDIGO} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

/** Eases the scene toward the pointer, so the hero reacts without chasing it. */
function ParallaxRig({ children }) {
  const groupRef = useRef();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.12;
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

export default function RetailCanvas({ frameloop = "always" }) {
  return (
    <Canvas camera={{ position: [0, 2.2, 13], fov: 50 }} dpr={[1, 1.5]} frameloop={frameloop}>
      <ParallaxRig>
        <ShelfField />
        <BarcodeRun />
        <Motes />
        <PriceTag />
      </ParallaxRig>
    </Canvas>
  );
}

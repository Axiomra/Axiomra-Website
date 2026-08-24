import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../../lib/dotTexture";

/* The Computer Vision hero field. */

const PANEL_W = 3.15;
const PANEL_H = 1.97;
const RADIUS = 3.05;
/** Ambient feature points drifting behind the carousel. */
const FEATURES = 620;
/** Radians per second the carousel turns, one full pass every ~50s. */
const SPIN = 0.125;

const BRAND = new THREE.Color("#14D8C4");
const ACCENT = new THREE.Color("#788BE3");

/** Deterministic sin-hash, so the field is identical on every reload and React's two dev-mode render passes agree. */
function jitter(n) {
  return Math.abs(Math.sin(n * 127.1 + 311.7) * 43758.5453) % 1;
}

/** The eight short L-strokes a detector paints at the corners of a box. */
function cornerBracketGeometry(w, h, len) {
  const x = w / 2;
  const y = h / 2;
  const pts = [];
  // [signX, signY] for each of the four corners.
  for (const [sx, sy] of [
    [-1, 1],
    [1, 1],
    [1, -1],
    [-1, -1],
  ]) {
    // Horizontal stroke, then vertical stroke, both running inward.
    pts.push(sx * x, sy * y, 0, sx * (x - len), sy * y, 0);
    pts.push(sx * x, sy * y, 0, sx * x, sy * (y - len), 0);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  return geo;
}

function Panel({ src, index, count }) {
  const scanRef = useRef();
  const groupRef = useRef();

  // useLoader ships with react-three-fiber and caches per URL exactly like
  // drei's useTexture did, so drei is no longer a dependency for one helper.
  const loaded = useLoader(THREE.TextureLoader, src);

  const texture = useMemo(() => {
    const t = loaded.clone();
    const img = t.image;
    const panelAspect = PANEL_W / PANEL_H;
    const imageAspect = img?.width ? img.width / img.height : panelAspect;

    t.center.set(0.5, 0.5);
    if (imageAspect > panelAspect) {
      t.repeat.set(panelAspect / imageAspect, 1);
    } else {
      t.repeat.set(1, imageAspect / panelAspect);
    }
    t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  }, [loaded]);

  // The clone is ours, so its GPU handle is ours to release. The cached original stays alive for the next mount.
  useEffect(() => () => texture.dispose(), [texture]);

  const edges = useMemo(() => {
    // The plane is scaffolding for the edge extraction and is never rendered,
    // so it is released as soon as the outline exists.
    const plane = new THREE.PlaneGeometry(PANEL_W, PANEL_H);
    const outline = new THREE.EdgesGeometry(plane);
    plane.dispose();
    return outline;
  }, []);
  const brackets = useMemo(() => cornerBracketGeometry(PANEL_W * 1.04, PANEL_H * 1.06, 0.42), []);

  // Both are built imperatively and attached through a prop, so
  // react-three-fiber does not dispose them for us on unmount.
  useEffect(() => {
    return () => {
      edges.dispose();
      brackets.dispose();
    };
  }, [edges, brackets]);

  const angle = (index / count) * Math.PI * 2;
  const phase = jitter(index + 3) * Math.PI * 2;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    // Each panel breathes on its own phase so the ring never reads as one rigid object bolted together.
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.6 + phase) * 0.16;
      groupRef.current.rotation.z = Math.sin(t * 0.4 + phase) * 0.014;
    }
    if (scanRef.current) {
      const cycle = (t * 0.42 + index * 0.25) % 1;
      const sweep = Math.min(cycle / 0.62, 1);
      scanRef.current.position.y = PANEL_H / 2 - sweep * PANEL_H;
      scanRef.current.material.opacity = cycle < 0.62 ? 0.65 : 0;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[Math.sin(angle) * RADIUS, 0, Math.cos(angle) * RADIUS]}
      rotation={[0, angle, 0]}
    >
      <mesh>
        <planeGeometry args={[PANEL_W, PANEL_H]} />
        <meshBasicMaterial map={texture} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      {/* Frame + brackets sit a hair in front of the photo so they never z-fight. */}
      <lineSegments geometry={edges} position={[0, 0, 0.012]}>
        <lineBasicMaterial color={BRAND} transparent opacity={0.85} />
      </lineSegments>
      <lineSegments geometry={brackets} position={[0, 0, 0.012]}>
        <lineBasicMaterial color={BRAND} transparent opacity={0.55} />
      </lineSegments>

      <mesh ref={scanRef} position={[0, 0, 0.02]}>
        <planeGeometry args={[PANEL_W, 0.035]} />
        <meshBasicMaterial
          color={BRAND}
          transparent
          opacity={0.6}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Soft glow slab behind the panel, so each feed lifts off the backdrop. */}
      <mesh position={[0, 0, -0.06]}>
        <planeGeometry args={[PANEL_W * 1.12, PANEL_H * 1.16]} />
        <meshBasicMaterial
          color={ACCENT}
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/** Drifting keypoint cloud, the features a detector latches onto. */
function FeatureCloud() {
  const ref = useRef();
  const dotTexture = useMemo(() => makeDotTexture(), []);

  const positions = useMemo(() => {
    const arr = new Float32Array(FEATURES * 3);
    for (let i = 0; i < FEATURES; i++) {
      arr[i * 3] = (jitter(i) - 0.5) * 22;
      arr[i * 3 + 1] = (jitter(i + 101) - 0.5) * 12;
      arr[i * 3 + 2] = (jitter(i + 227) - 0.5) * 16;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={FEATURES}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        map={dotTexture}
        color="#788BE3"
        transparent
        opacity={0.5}
        alphaTest={0.02}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Carousel({ panels, pointer, onActiveChange }) {
  const groupRef = useRef();
  const activeRef = useRef(-1);

  useFrame(({ clock }, delta) => {
    const g = groupRef.current;
    if (!g) return;

    g.rotation.y += SPIN * delta;
    // Pointer parallax is damped rather than tracked, so a fast mouse never snaps the whole carousel sideways.
    const targetX = -pointer.current.y * 0.16 + Math.sin(clock.elapsedTime * 0.3) * 0.03;
    const targetZ = pointer.current.x * 0.05;
    g.rotation.x += (targetX - g.rotation.x) * 0.05;
    g.rotation.z += (targetZ - g.rotation.z) * 0.05;

    // Which feed is facing the camera right now.
    const step = (Math.PI * 2) / panels.length;
    const idx = ((Math.round(-g.rotation.y / step) % panels.length) + panels.length) % panels.length;
    if (idx !== activeRef.current) {
      activeRef.current = idx;
      onActiveChange?.(idx);
    }
  });

  return (
    <group ref={groupRef}>
      {panels.map((p, i) => (
        <Panel key={p.src} src={p.src} index={i} count={panels.length} />
      ))}
    </group>
  );
}

export default function VisionPanelsCanvas({ panels, onActiveChange, frameloop = "always" }) {
  // Pointer parallax lives in a ref so moving the mouse never re-renders React.
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      frameloop={frameloop}
      camera={{ position: [0, 0.4, 9.3], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      onPointerMove={(e) => {
        const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
        pointer.current.x = ((e.clientX - left) / width) * 2 - 1;
        pointer.current.y = ((e.clientY - top) / height) * 2 - 1;
      }}
    >
      <FeatureCloud />
      <Suspense fallback={null}>
        <Carousel panels={panels} pointer={pointer} onActiveChange={onActiveChange} />
      </Suspense>
    </Canvas>
  );
}

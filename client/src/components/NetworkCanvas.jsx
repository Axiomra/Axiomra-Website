import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../lib/dotTexture";
import { buildLinks, makeGrid } from "../lib/linkGrid";

/*
 * Animated particle-network field.
 *
 * The connection pass (lib/linkGrid.js) only compares neighbouring grid cells,
 * runs every LINK_INTERVAL frames rather than every frame, and compares
 * squared distances so it never calls Math.sqrt.
 */

// Only a small fraction of the n² pairs are ever close enough to draw, so the
// segment buffer is sized to a realistic ceiling instead of COUNT * COUNT.
const MAX_LINKS_PER_PARTICLE = 12;
const LINK_INTERVAL = 3;

// A fresh random layout per mount is intended; useMemo keeps it stable across
// re-renders, so the impurity never reaches the rendered output.
function scatter(count) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 18;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  return arr;
}

function ParticleField({ count }) {
  const pointsRef = useRef();
  const linesRef = useRef();
  const frame = useRef(0);
  const COUNT = count;

  const positions = useMemo(() => scatter(COUNT), [COUNT]);

  const basePositions = useMemo(() => positions.slice(), [positions]);
  const dotTexture = useMemo(() => makeDotTexture(), []);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const maxSegments = COUNT * MAX_LINKS_PER_PARTICLE;
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(maxSegments * 6), 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, [COUNT]);

  // Built imperatively rather than declared in JSX, so react-three-fiber does
  // not know to release it on unmount. Route changes would otherwise leak it.
  useEffect(() => () => lineGeometry.dispose(), [lineGeometry]);

  // Counting-sort scratch for the grid, allocated once so frames make no garbage.
  const grid = useRef(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;
    const pos = posAttr.array;

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 1] = basePositions[i * 3 + 1] + Math.sin(t * 0.4 + i) * 0.4;
      pos[i * 3] = basePositions[i * 3] + Math.cos(t * 0.3 + i) * 0.3;
    }
    posAttr.needsUpdate = true;

    // The links drift slowly compared to the points, so rebuilding them on
    // every third frame is indistinguishable from rebuilding every frame.
    if (frame.current++ % LINK_INTERVAL !== 0) return;

    if (grid.current?.order.length !== COUNT) grid.current = makeGrid(COUNT);
    const idx = buildLinks(
      pos,
      COUNT,
      grid.current,
      linesRef.current.geometry.attributes.position.array
    );

    // Anything past the draw range is simply not rendered, so the stale tail
    // beyond `idx` does not need to be cleared.
    linesRef.current.geometry.setDrawRange(0, idx / 3);
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group rotation={[0, 0, 0.15]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.34}
          color="#14D8C4"
          map={dotTexture}
          alphaTest={0.02}
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#788BE3" transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
}

export default function NetworkCanvas({ count = 140, frameloop = "always" }) {
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 50 }} dpr={[1, 1.5]} frameloop={frameloop}>
      <ParticleField count={count} />
    </Canvas>
  );
}

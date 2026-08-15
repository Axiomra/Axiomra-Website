import * as THREE from "three";

/**
 * A soft round sprite for three.js point clouds.
 *
 * `pointsMaterial` renders square quads by default, which reads as pixel
 * confetti once the points are big enough to see. Mapping this radial-gradient
 * texture turns every point into a soft dot. Built once and memoised — the
 * same texture is shared by every field on the page.
 */
let cached = null;

export function makeDotTexture() {
  if (cached) return cached;

  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.45, "rgba(255,255,255,0.85)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  cached = new THREE.CanvasTexture(canvas);
  return cached;
}

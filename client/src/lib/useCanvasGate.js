import { useEffect, useState } from "react";
import { afterLoadIdle } from "./idle";

/**
 * True when WebGL is hardware accelerated. A software rasteriser (SwiftShader,
 * llvmpipe: no GPU, a blocklisted driver, headless Chrome) runs every frame
 * on the CPU and turns a decorative loop into seconds of main-thread work, so
 * the static fallback shows there instead. With a GPU nothing changes.
 *
 * `failIfMajorPerformanceCaveat` alone is not enough: Chrome's SwiftShader
 * behind ANGLE/Vulkan does not count as a caveat, so the renderer name is
 * checked as well.
 */
export function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const opts = { failIfMajorPerformanceCaveat: true };
    const gl = canvas.getContext("webgl2", opts) || canvas.getContext("webgl", opts);
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    // Free the probe context now rather than at GC; browsers cap live contexts.
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !/swiftshader|llvmpipe|softpipe|software/i.test(renderer);
  } catch {
    return false;
  }
}

/**
 * Whether a decorative WebGL canvas may mount yet.
 *
 * Every canvas wrapper renders its static fallback first, on the server and in
 * the browser alike, so the prerendered HTML hydrates cleanly. The canvas (and
 * the three.js chunk behind it) mounts only once the page has loaded and gone
 * idle, and only after the host has come near the viewport (`inView`), so a
 * canvas far down the page costs nothing until it is scrolled to. Once true it
 * stays true: remounting would re-randomise the scene.
 *
 * `allowed` is an extra client-only check (device class), evaluated once.
 */
export default function useCanvasGate(inView, allowed) {
  const [armed, setArmed] = useState(false);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    // The CSS reduced-motion rule can't reach a WebGL render loop, so opt out
    // of the animated field here instead.
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !supportsWebGL() || (allowed && !allowed())) return undefined;
    return afterLoadIdle(() => setArmed(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- decided once per mount
  }, []);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- latches the first intersection
  useEffect(() => void (inView && setSeen(true)), [inView]);
  return armed && seen;
}

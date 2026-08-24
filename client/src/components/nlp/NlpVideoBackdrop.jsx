import { useEffect, useRef } from "react";

/** The hero wallpaper: one muted video, looping forever, behind everything. */
export default function NlpVideoBackdrop({ src, poster, className = "", ...rest }) {
  const videoRef = useRef(null);
  const shouldPlay = useRef(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let armed = false;

    const attempt = () => {
      if (!shouldPlay.current || !video.paused) return;
      const p = video.play();
      // Older Safari returns undefined rather than a promise.
      if (p?.catch) p.catch(arm);
    };

    // Autoplay was refused: wait for any gesture, then try once more.
    const arm = () => {
      if (armed) return;
      armed = true;
      const start = () => {
        armed = false;
        video.play().catch(() => {});
        events.forEach((e) => window.removeEventListener(e, start));
      };
      const events = ["pointerdown", "touchstart", "keydown", "scroll"];
      events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    };

    const onVisibility = () => {
      if (!document.hidden) attempt();
    };

    const onEnded = () => {
      video.currentTime = 0;
      attempt();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        shouldPlay.current = entry.isIntersecting;
        if (entry.isIntersecting) attempt();
        else video.pause();
      },
      { threshold: 0.01 },
    );

    video.addEventListener("pause", attempt);
    video.addEventListener("ended", onEnded);
    video.addEventListener("stalled", attempt);
    video.addEventListener("canplay", attempt);
    document.addEventListener("visibilitychange", onVisibility);
    observer.observe(video);

    attempt();

    return () => {
      observer.disconnect();
      video.removeEventListener("pause", attempt);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("stalled", attempt);
      video.removeEventListener("canplay", attempt);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <video
      {...rest}
      ref={videoRef}
      className={className}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      // "auto" makes the browser pull the whole file as fast as it can, which
      // starves the CSS and JS it is racing. The poster covers the gap and the
      // observer above starts playback, so the video may stream in behind them.
      preload="none"
      // Decorative: the hero's meaning is carried entirely by the copy over it.
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
    />
  );
}

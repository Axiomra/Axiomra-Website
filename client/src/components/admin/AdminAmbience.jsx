/**
 * The colour wash the glass panels sit on.
 *
 * Frosted panels only read as glass if there is something behind them to
 * blur — over a flat page they just look faded. This paints three brand-hued
 * pools across the viewport for the table and stat cards to pick up.
 *
 * Deliberately static, unlike the animated header backdrop: it covers the
 * whole scroll area including the table, and anything moving under a
 * `backdrop-blur` surface forces that blur to re-rasterise on every frame.
 */
export default function AdminAmbience() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        className="absolute -left-40 top-[12%] h-[38rem] w-[38rem] rounded-full opacity-[0.18] blur-[120px]"
        style={{ background: "radial-gradient(circle, #14D8C4 0%, transparent 70%)" }}
      />
      <div
        className="absolute -right-48 top-[38%] h-[42rem] w-[42rem] rounded-full opacity-[0.16] blur-[130px]"
        style={{ background: "radial-gradient(circle, #788BE3 0%, transparent 70%)" }}
      />
      {/* Violet, mid-page. Carries the dark theme's hue down past the fold so
          the table's glass keeps something to blur instead of fading to flat. */}
      <div
        className="absolute left-[18%] top-[62%] h-[40rem] w-[40rem] rounded-full opacity-[0.10] blur-[130px] dark:opacity-[0.26]"
        style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-14%] left-1/3 h-[30rem] w-[30rem] rounded-full opacity-[0.10] blur-[110px]"
        style={{ background: "radial-gradient(circle, #FFB020 0%, transparent 72%)" }}
      />
    </div>
  );
}

/** Category label with a 2x2 cluster of outline circles, set above a hero title. */
export default function CategoryBadge({ label, className = "", style }) {
  return (
    <p
      className={`flex w-fit items-center gap-2.5 font-mono text-sm uppercase tracking-[0.2em] text-accent ${className}`}
      style={style}
    >
      <svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="4.5" cy="4.5" r="3.5" stroke="currentColor" strokeWidth="1.25" />
        <circle cx="13.5" cy="4.5" r="3.5" stroke="currentColor" strokeWidth="1.25" />
        <circle cx="4.5" cy="13.5" r="3.5" stroke="currentColor" strokeWidth="1.25" />
        <circle cx="13.5" cy="13.5" r="3.5" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.25" />
      </svg>
      {label}
    </p>
  );
}

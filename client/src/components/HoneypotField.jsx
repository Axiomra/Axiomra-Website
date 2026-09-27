/**
 * Bot trap for the contact forms. Positioned off screen inside the (relatively
 * positioned) form so it takes no space, hidden from assistive tech, and out of
 * the tab order, so no person fills it in. Bots that fill every input do.
 */
export default function HoneypotField({ inputRef }) {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: "-10000px", top: 0, width: 1, height: 1, overflow: "hidden" }}
    >
      <label>
        Website
        <input ref={inputRef} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

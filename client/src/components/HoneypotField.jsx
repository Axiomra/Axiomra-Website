/**
 * Bot trap for the contact forms. Positioned off screen inside the (relatively
 * positioned) form so it takes no space, hidden from assistive tech, and out of
 * the tab order, so no person fills it in. Bots that fill every input do.
 * The name and label are meaningless on purpose: anything that reads as a
 * real field (a URL, a company site) gets filled by browser autofill and
 * password managers, which would drop a genuine lead.
 */
export default function HoneypotField({ inputRef }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-10000px",
        top: 0,
        width: 1,
        height: 1,
        overflow: "hidden",
      }}
    >
      <input
        ref={inputRef}
        type="text"
        name="hp_q7v"
        aria-label="Leave this field empty"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}

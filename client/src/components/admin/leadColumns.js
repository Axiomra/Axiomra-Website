/**
 * The table's column definitions, in one place so the desktop table, the
 * mobile card view and the column-visibility menu can never disagree about
 * what a column is called or how wide it should be.
 *
 * `tint` gives each column a very faint wash pulled from the brand palette.
 * The purpose is to help the eye track across a wide row, so the values are
 * deliberately near-invisible, since anything stronger turns the table into a
 * rainbow and stops the progress chips from being the loudest thing on screen.
 */

export const LEAD_COLUMNS = [
  {
    key: "name",
    label: "Name",
    width: 190,
    tint: "bg-[hsl(232_62%_60%_/_0.08)]",
    sortable: true,
    // Identity fields only change through the details panel, never in place;
    // a click here selects the row instead of opening an inline input.
    locked: true,
  },
  {
    key: "email",
    label: "Email",
    width: 220,
    tint: "bg-[hsl(232_62%_60%_/_0.055)]",
    sortable: true,
    type: "email",
    locked: true,
  },
  {
    key: "phone",
    label: "Phone",
    width: 150,
    tint: "bg-[hsl(174_72%_45%_/_0.065)]",
    locked: true,
  },
  {
    key: "company",
    label: "Company",
    width: 170,
    tint: "bg-[hsl(174_72%_45%_/_0.09)]",
    sortable: true,
    locked: true,
  },
  {
    key: "subject",
    label: "Subject",
    width: 190,
    tint: "bg-[hsl(200_60%_55%_/_0.07)]",
  },
  {
    key: "service",
    label: "Requested service",
    width: 200,
    tint: "bg-[hsl(262_66%_60%_/_0.08)]",
    sortable: true,
    locked: true,
  },
  {
    key: "message",
    label: "Message",
    width: 280,
    tint: "bg-[hsl(262_66%_60%_/_0.05)]",
    multiline: true,
  },
  {
    key: "progress",
    label: "Progress",
    width: 175,
    tint: "bg-[hsl(38_92%_52%_/_0.09)]",
    sortable: true,
    // Rendered by ProgressBadge, not EditableCell.
    kind: "stage",
  },
  {
    key: "teamAssigned",
    label: "Team assigned",
    width: 155,
    tint: "bg-[hsl(38_92%_52%_/_0.06)]",
    sortable: true,
  },
  {
    key: "budget",
    label: "Budget",
    width: 130,
    tint: "bg-[hsl(152_62%_42%_/_0.09)]",
    sortable: true,
  },
  {
    key: "remarks",
    label: "Remarks",
    width: 260,
    tint: "bg-[hsl(152_62%_42%_/_0.05)]",
    multiline: true,
    // Notes get written like notes: bold a name, bullet the next steps.
    formatting: true,
  },
  {
    key: "deadline",
    label: "Deadline",
    width: 150,
    tint: "bg-[hsl(2_72%_56%_/_0.06)]",
    sortable: true,
    kind: "deadline",
  },
  {
    key: "completion",
    label: "Complete",
    width: 165,
    tint: "bg-[hsl(206_84%_54%_/_0.07)]",
    sortable: true,
    // Rendered by CompletionBadge, not EditableCell.
    kind: "completion",
  },
  {
    key: "createdAt",
    label: "Received",
    width: 140,
    tint: "bg-transparent",
    sortable: true,
    kind: "date",
  },
];

/** Columns shown on a first visit. The rest stay a click away in the menu. */
export const DEFAULT_VISIBLE = [
  "name",
  "email",
  "phone",
  "company",
  "service",
  "progress",
  "teamAssigned",
  "budget",
  "remarks",
  "deadline",
  "completion",
  "createdAt",
];

export const COLUMN_STORAGE_KEY = "axiomra-admin-columns";
export const COLUMN_WIDTH_STORAGE_KEY = "axiomra-admin-column-widths";
export const MIN_COLUMN_WIDTH = 90;
export const MAX_COLUMN_WIDTH = 640;

/* --- Columns the team added themselves ---
   Their definitions come from the server (see routes/leadFields.js) and their
   values live in `lead.custom`, so every read and write of a cell goes through
   the two accessors below rather than touching `lead[col.key]` directly. */

/** Namespaced so a column called "name" cannot shadow the built-in one. */
export const CUSTOM_PREFIX = "custom:";

export const CUSTOM_FIELD_TYPES = [
  { value: "text", label: "Text", hint: "A short line: a name, a reference, a status." },
  { value: "longtext", label: "Long text", hint: "A paragraph that wraps across lines." },
  { value: "number", label: "Number", hint: "Figures: a count, an amount, a score." },
  { value: "date", label: "Date", hint: "A single calendar date." },
];

/** Turn a server-side field definition into a table column. */
export function toCustomColumn(field) {
  return {
    key: `${CUSTOM_PREFIX}${field.key}`,
    customKey: field.key,
    id: field._id,
    label: field.label,
    width: field.width || 170,
    // One shared tint for every custom column: they are the newest thing in a
    // wide row, and giving each its own colour would out-shout the stage chips.
    tint: "bg-[hsl(232_62%_60%_/_0.045)]",
    multiline: field.type === "longtext",
    type: field.type === "number" ? "number" : field.type === "date" ? "date" : "text",
    // Sorting is a server concern and the values are free-text strings under a
    // Mixed key, so custom columns are display-and-edit only.
    sortable: false,
  };
}

export function isCustomKey(key) {
  return typeof key === "string" && key.startsWith(CUSTOM_PREFIX);
}

/** Read a cell's value, whether it is a built-in field or a custom one. */
export function cellValue(lead, col) {
  return col.customKey ? lead.custom?.[col.customKey] ?? "" : lead[col.key];
}

/** The PATCH body for saving one cell. */
export function cellPatch(col, value) {
  return col.customKey ? { custom: { [col.customKey]: value } } : { [col.key]: value };
}

/** Short, unambiguous date. Long-form dates make the column twice as wide. */
export function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.valueOf())) return "";
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "2-digit" });
}

/**
 * `YYYY-MM-DD` for <input type="date">.
 * Shifted by the local offset first: toISOString() is UTC, so an evening date
 * in a positive-offset zone would otherwise come back as the following day.
 */
export function toDateInputValue(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.valueOf())) return "";
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export function formatDateTime(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.valueOf())) return "";
  return d.toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

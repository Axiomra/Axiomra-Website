/**
 * The table's column definitions, in one place so the desktop table, the
 * mobile card view and the column-visibility menu can never disagree about
 * what a column is called or how wide it should be.
 *
 * `tint` gives each column a very faint wash pulled from the brand palette.
 * The purpose is to help the eye track across a wide row, so the values are
 * deliberately near-invisible — anything stronger turns the table into a
 * rainbow and stops the progress chips from being the loudest thing on screen.
 */

export const LEAD_COLUMNS = [
  {
    key: "name",
    label: "Name",
    width: "min-w-[170px]",
    tint: "bg-[hsl(232_62%_60%_/_0.045)]",
    sortable: true,
  },
  {
    key: "email",
    label: "Email",
    width: "min-w-[210px]",
    tint: "bg-[hsl(232_62%_60%_/_0.03)]",
    sortable: true,
    type: "email",
  },
  {
    key: "phone",
    label: "Phone",
    width: "min-w-[150px]",
    tint: "bg-[hsl(174_72%_45%_/_0.035)]",
  },
  {
    key: "company",
    label: "Company",
    width: "min-w-[160px]",
    tint: "bg-[hsl(174_72%_45%_/_0.05)]",
    sortable: true,
  },
  {
    key: "subject",
    label: "Subject",
    width: "min-w-[180px]",
    tint: "bg-[hsl(200_60%_55%_/_0.04)]",
  },
  {
    key: "service",
    label: "Requested service",
    width: "min-w-[190px]",
    tint: "bg-[hsl(262_66%_60%_/_0.045)]",
    sortable: true,
  },
  {
    key: "message",
    label: "Message",
    width: "min-w-[260px]",
    tint: "bg-[hsl(262_66%_60%_/_0.028)]",
    multiline: true,
  },
  {
    key: "progress",
    label: "Progress",
    width: "min-w-[168px]",
    tint: "bg-[hsl(38_92%_52%_/_0.05)]",
    sortable: true,
    // Rendered by ProgressBadge, not EditableCell.
    kind: "stage",
  },
  {
    key: "teamAssigned",
    label: "Team assigned",
    width: "min-w-[150px]",
    tint: "bg-[hsl(38_92%_52%_/_0.035)]",
    sortable: true,
  },
  {
    key: "budget",
    label: "Budget",
    width: "min-w-[120px]",
    tint: "bg-[hsl(152_62%_42%_/_0.05)]",
    sortable: true,
  },
  {
    key: "remarks",
    label: "Remarks",
    width: "min-w-[240px]",
    tint: "bg-[hsl(152_62%_42%_/_0.03)]",
    multiline: true,
  },
  {
    key: "createdAt",
    label: "Received",
    width: "min-w-[130px]",
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
  "createdAt",
];

export const COLUMN_STORAGE_KEY = "axiomra-admin-columns";

/** Short, unambiguous date. Long-form dates make the column twice as wide. */
export function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.valueOf())) return "";
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "2-digit" });
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

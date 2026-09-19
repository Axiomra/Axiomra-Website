import mongoose from "mongoose";

/**
 * A column the team added themselves.
 *
 * The definition lives in the database rather than in each browser's
 * localStorage on purpose: a column is only useful if the value one person
 * types into it is a column everyone else can see. localStorage would give
 * every admin a private set of columns over the same shared data.
 *
 * The values themselves live under `custom` on the lead, keyed by `key`.
 */

/** Types an admin can pick. Deliberately few: this is a table, not a CRM. */
export const FIELD_TYPES = ["text", "longtext", "number", "date"];

/** Lowercase slug. No dots: mongoSanitize strips dotted keys from bodies. */
export const FIELD_KEY_RE = /^[a-z][a-z0-9_]{0,39}$/;

/** A ceiling, so the table cannot be widened into unusability by accident. */
export const MAX_FIELDS = 20;

export const DEFAULT_FIELD_WIDTH = 170;

const leadFieldSchema = new mongoose.Schema(
  {
    // Immutable once created: it is the key every lead's value is stored
    // under, so renaming it would orphan the data. The label is what the
    // header shows and that stays editable.
    key: {
      type: String,
      required: true,
      unique: true,
      match: FIELD_KEY_RE,
      maxlength: 40,
    },
    label: { type: String, required: true, trim: true, maxlength: 40 },
    type: { type: String, enum: FIELD_TYPES, default: "text" },
    width: { type: Number, default: DEFAULT_FIELD_WIDTH, min: 90, max: 640 },
    // Position among the other custom columns; the built-in ones always
    // come first.
    order: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "leadfields" }
);

leadFieldSchema.index({ order: 1, createdAt: 1 });

export default mongoose.models.LeadField || mongoose.model("LeadField", leadFieldSchema);

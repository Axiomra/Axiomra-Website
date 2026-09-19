import { Router } from "express";
import mongoose from "mongoose";
import Lead from "../models/Lead.js";
import LeadField, {
  DEFAULT_FIELD_WIDTH,
  FIELD_KEY_RE,
  FIELD_TYPES,
  MAX_FIELDS,
} from "../models/LeadField.js";
import { requireAuth } from "../lib/auth.js";
import { cleanString } from "../lib/sanitize.js";

const router = Router();

// Admin-only, same as the leads routes.
router.use(requireAuth);

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(String(id));
}

/**
 * "Contract value" -> "contract_value".
 * Returns "" when nothing usable survives (a label of only punctuation, or one
 * starting with a digit), which the caller reports as a bad label.
 */
function slugify(label) {
  const slug = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 40);
  return FIELD_KEY_RE.test(slug) ? slug : "";
}

/** Append _2, _3… until the key is free. Two "Notes" columns are allowed. */
async function uniqueKey(base) {
  for (let n = 1; n <= 50; n += 1) {
    const candidate = n === 1 ? base : `${base}_${n}`.slice(0, 40);
    // eslint-disable-next-line no-await-in-loop
    const taken = await LeadField.exists({ key: candidate });
    if (!taken) return candidate;
  }
  return "";
}

/* GET /api/lead-fields: every custom column, in display order. */
router.get("/", async (req, res) => {
  try {
    const items = await LeadField.find().sort({ order: 1, createdAt: 1 }).lean();
    return res.json({ items });
  } catch (err) {
    console.error("Lead field list failed:", err.message);
    return res.status(500).json({ error: "Could not load custom columns." });
  }
});

/* POST /api/lead-fields: add a column. */
router.post("/", async (req, res) => {
  try {
    const label = cleanString(req.body?.label, 40);
    if (!label) return res.status(400).json({ error: "Give the column a name." });

    const type = FIELD_TYPES.includes(req.body?.type) ? req.body.type : "text";

    const width = Math.min(
      640,
      Math.max(90, parseInt(req.body?.width, 10) || DEFAULT_FIELD_WIDTH)
    );

    const count = await LeadField.countDocuments();
    if (count >= MAX_FIELDS) {
      return res
        .status(400)
        .json({ error: `A table can hold ${MAX_FIELDS} custom columns. Delete one first.` });
    }

    const base = slugify(label);
    if (!base) {
      return res.status(400).json({ error: "Use letters and numbers in the column name." });
    }

    const key = await uniqueKey(base);
    if (!key) return res.status(400).json({ error: "That column name is already taken." });

    const field = await LeadField.create({ key, label, type, width, order: count });
    return res.status(201).json(field.toObject());
  } catch (err) {
    console.error("Lead field creation failed:", err.message);
    return res.status(500).json({ error: "Could not add the column." });
  }
});

/* PATCH /api/lead-fields/:id: rename or resize. The key never changes. */
router.patch("/:id", async (req, res) => {
  if (!isValidId(req.params.id)) return res.status(400).json({ error: "Invalid column id." });

  const update = {};

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "label")) {
    const label = cleanString(req.body.label, 40);
    if (!label) return res.status(400).json({ error: "Give the column a name." });
    update.label = label;
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "width")) {
    const width = parseInt(req.body.width, 10);
    if (Number.isFinite(width)) update.width = Math.min(640, Math.max(90, width));
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "order")) {
    const order = parseInt(req.body.order, 10);
    if (Number.isFinite(order)) update.order = order;
  }

  if (!Object.keys(update).length) return res.status(400).json({ error: "Nothing to update." });

  try {
    const field = await LeadField.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true, runValidators: true }
    ).lean();
    if (!field) return res.status(404).json({ error: "Column not found." });
    return res.json(field);
  } catch (err) {
    console.error("Lead field update failed:", err.message);
    return res.status(500).json({ error: "Could not save the column." });
  }
});

/* DELETE /api/lead-fields/:id: drops the column and every value in it. */
router.delete("/:id", async (req, res) => {
  if (!isValidId(req.params.id)) return res.status(400).json({ error: "Invalid column id." });
  try {
    const field = await LeadField.findByIdAndDelete(req.params.id).lean();
    if (!field) return res.status(404).json({ error: "Column not found." });

    // Leaving the values behind would resurrect them under the same name if
    // the column were ever re-added, which is not what "delete" means here.
    await Lead.updateMany(
      { [`custom.${field.key}`]: { $exists: true } },
      { $unset: { [`custom.${field.key}`]: "" } }
    );

    return res.json({ success: true, id: String(field._id) });
  } catch (err) {
    console.error("Lead field delete failed:", err.message);
    return res.status(500).json({ error: "Could not delete the column." });
  }
});

export default router;

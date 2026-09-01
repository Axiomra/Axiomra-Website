import { Router } from "express";
import mongoose from "mongoose";
import Lead, { PROGRESS_STAGES } from "../models/Lead.js";
import { requireAuth } from "../lib/auth.js";
import { cleanString, csvCell } from "../lib/sanitize.js";

const router = Router();

// Every route below is admin-only. Applied once here rather than per-route so
// a new endpoint cannot be added unprotected by accident.
router.use(requireAuth);

/* Field -> max length. Doubles as the allow-list for writes: anything not
   named here is dropped, so `progress` cannot be smuggled past its enum and
   `_id`/`createdAt` cannot be overwritten from the client. */
const WRITABLE = {
  name: 60,
  email: 254,
  phone: 32,
  company: 100,
  subject: 120,
  service: 120,
  message: 4000,
  teamAssigned: 80,
  budget: 60,
  remarks: 8000,
};

const SORTABLE = new Set([
  "createdAt",
  "updatedAt",
  "name",
  "email",
  "company",
  "progress",
  "teamAssigned",
  "budget",
  "service",
]);

const EMAIL_RE =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;

/** Escape a search term so a lead searching for "c++" is not a regex crash. */
function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(String(id));
}

/**
 * Turn the query string into a Mongo filter.
 * Every value goes through cleanString or an allow-list first — nothing from
 * the client reaches the query as an object, so no operator can be injected.
 */
function buildFilter(query) {
  const filter = {};

  const search = cleanString(query.search, 120);
  if (search) {
    const re = new RegExp(escapeRegex(search), "i");
    filter.$or = [
      { name: re },
      { email: re },
      { company: re },
      { subject: re },
      { message: re },
      { teamAssigned: re },
      { remarks: re },
    ];
  }

  // Repeated params arrive as arrays (?progress=New&progress=Won); a single
  // one as a string. Normalise, then keep only real stages.
  const stages = []
    .concat(query.progress || [])
    .flatMap((v) => String(v).split(","))
    .map((v) => cleanString(v, 40))
    .filter((v) => PROGRESS_STAGES.includes(v));
  if (stages.length) filter.progress = { $in: stages };

  const team = cleanString(query.team, 80);
  if (team) filter.teamAssigned = new RegExp(`^${escapeRegex(team)}$`, "i");

  const service = cleanString(query.service, 120);
  if (service) filter.service = new RegExp(escapeRegex(service), "i");

  const email = cleanString(query.email, 254);
  if (email) filter.email = email.toLowerCase();

  // Date range on createdAt. An unparseable date is ignored rather than
  // rejected, so a half-typed filter does not blank the table.
  const from = new Date(cleanString(query.from, 40));
  const to = new Date(cleanString(query.to, 40));
  const range = {};
  if (!Number.isNaN(from.valueOf())) range.$gte = from;
  if (!Number.isNaN(to.valueOf())) {
    // An inclusive end date: "to 5 March" should contain 5 March.
    to.setHours(23, 59, 59, 999);
    range.$lte = to;
  }
  if (Object.keys(range).length) filter.createdAt = range;

  return filter;
}

/**
 * Budget is free text ("50k", "USD 20,000", "TBC"), so it cannot be range-
 * filtered in Mongo. The numeric range is applied in memory over the page's
 * documents instead, and the endpoint reports that it did so.
 */
function budgetNumber(value) {
  const raw = String(value ?? "").toLowerCase().replace(/[, ]/g, "");
  const match = raw.match(/(\d+(?:\.\d+)?)\s*([km])?/);
  if (!match) return null;
  const n = parseFloat(match[1]);
  if (Number.isNaN(n)) return null;
  if (match[2] === "k") return n * 1000;
  if (match[2] === "m") return n * 1000000;
  return n;
}

/* GET /api/leads — paginated, filtered, sorted list. */
router.get("/", async (req, res) => {
  try {
    const filter = buildFilter(req.query);

    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(200, Math.max(1, parseInt(req.query.limit, 10) || 25));

    const sortKey = SORTABLE.has(String(req.query.sort)) ? String(req.query.sort) : "createdAt";
    const sortDir = String(req.query.dir) === "asc" ? 1 : -1;

    const [items, total] = await Promise.all([
      Lead.find(filter)
        .sort({ [sortKey]: sortDir })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Lead.countDocuments(filter),
    ]);

    const minBudget = req.query.minBudget ? Number(req.query.minBudget) : null;
    const maxBudget = req.query.maxBudget ? Number(req.query.maxBudget) : null;
    const budgetFiltered = Number.isFinite(minBudget) || Number.isFinite(maxBudget);

    const visible = budgetFiltered
      ? items.filter((lead) => {
          const n = budgetNumber(lead.budget);
          if (n === null) return false;
          if (Number.isFinite(minBudget) && n < minBudget) return false;
          if (Number.isFinite(maxBudget) && n > maxBudget) return false;
          return true;
        })
      : items;

    return res.json({
      items: visible,
      page,
      limit,
      total,
      pages: Math.max(1, Math.ceil(total / limit)),
      // Tells the panel the count is a page-local one, so it can label it
      // honestly instead of implying it filtered the whole collection.
      budgetFilteredInPage: budgetFiltered,
    });
  } catch (err) {
    console.error("Lead list failed:", err.message);
    return res.status(500).json({ error: "Could not load leads." });
  }
});

/* GET /api/leads/stats — counts per stage, for the footer summary. */
router.get("/stats", async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const grouped = await Lead.aggregate([
      { $match: filter },
      { $group: { _id: "$progress", count: { $sum: 1 } } },
    ]);

    // Seed every stage at zero so the footer keeps a stable set of chips
    // instead of columns appearing and vanishing as leads move.
    const byProgress = Object.fromEntries(PROGRESS_STAGES.map((s) => [s, 0]));
    let total = 0;
    for (const row of grouped) {
      if (row._id in byProgress) byProgress[row._id] = row.count;
      total += row.count;
    }

    return res.json({ total, byProgress });
  } catch (err) {
    console.error("Lead stats failed:", err.message);
    return res.status(500).json({ error: "Could not load lead stats." });
  }
});

/* GET /api/leads/export — CSV of everything matching the current filter. */
router.get("/export", async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    // Capped: an unbounded export is a memory cliff in a serverless function.
    const leads = await Lead.find(filter).sort({ createdAt: -1 }).limit(5000).lean();

    const columns = [
      ["Name", "name"],
      ["Email", "email"],
      ["Phone", "phone"],
      ["Company", "company"],
      ["Subject", "subject"],
      ["Requested service", "service"],
      ["Message", "message"],
      ["Progress", "progress"],
      ["Team assigned", "teamAssigned"],
      ["Budget", "budget"],
      ["Remarks", "remarks"],
    ];

    const rows = [
      columns.map(([label]) => csvCell(label)).concat([csvCell("Created"), csvCell("Updated")]),
      ...leads.map((lead) =>
        columns
          .map(([, key]) => csvCell(lead[key]))
          .concat([
            csvCell(lead.createdAt?.toISOString?.() ?? ""),
            csvCell(lead.updatedAt?.toISOString?.() ?? ""),
          ])
      ),
    ];

    const stamp = new Date().toISOString().slice(0, 10);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="axiomra-leads-${stamp}.csv"`);
    // The BOM is what makes Excel read the file as UTF-8 rather than mangling
    // every non-ASCII name in it.
    return res.send("﻿" + rows.map((r) => r.join(",")).join("\r\n"));
  } catch (err) {
    console.error("Lead export failed:", err.message);
    return res.status(500).json({ error: "Could not export leads." });
  }
});

/* GET /api/leads/:id */
router.get("/:id", async (req, res) => {
  if (!isValidId(req.params.id)) return res.status(400).json({ error: "Invalid lead id." });
  try {
    const lead = await Lead.findById(req.params.id).lean();
    if (!lead) return res.status(404).json({ error: "Lead not found." });
    return res.json(lead);
  } catch (err) {
    console.error("Lead fetch failed:", err.message);
    return res.status(500).json({ error: "Could not load the lead." });
  }
});

/* GET /api/leads/:id/related — earlier leads from the same person or company. */
router.get("/:id/related", async (req, res) => {
  if (!isValidId(req.params.id)) return res.status(400).json({ error: "Invalid lead id." });
  try {
    const lead = await Lead.findById(req.params.id).lean();
    if (!lead) return res.status(404).json({ error: "Lead not found." });

    const or = [{ email: lead.email }];
    if (lead.company) or.push({ company: new RegExp(`^${escapeRegex(lead.company)}$`, "i") });

    const related = await Lead.find({ $or: or, _id: { $ne: lead._id } })
      .sort({ createdAt: -1 })
      .limit(20)
      .select("name email company subject service progress budget createdAt")
      .lean();

    return res.json({ items: related });
  } catch (err) {
    console.error("Related leads failed:", err.message);
    return res.status(500).json({ error: "Could not load related leads." });
  }
});

/**
 * Normalise an incoming payload against WRITABLE.
 * `partial` is what separates PATCH from PUT: PATCH only touches the keys the
 * client actually sent, PUT rewrites the whole writable surface.
 */
function buildUpdate(body, { partial }) {
  const update = {};
  const errors = [];

  for (const [field, max] of Object.entries(WRITABLE)) {
    const sent = Object.prototype.hasOwnProperty.call(body, field);
    if (partial && !sent) continue;
    update[field] = cleanString(body[field], max);
  }

  if (Object.prototype.hasOwnProperty.call(body, "progress") || !partial) {
    const stage = cleanString(body.progress, 40);
    if (stage) {
      if (!PROGRESS_STAGES.includes(stage)) {
        errors.push(`Progress must be one of: ${PROGRESS_STAGES.join(", ")}.`);
      } else {
        update.progress = stage;
      }
    }
  }

  // Required fields are only enforced when they are actually being written,
  // so a PATCH that just moves the progress chip is not blocked by them.
  if ("name" in update && !update.name) errors.push("Name cannot be empty.");
  if ("email" in update) {
    update.email = update.email.toLowerCase();
    if (!update.email) errors.push("Email cannot be empty.");
    else if (!EMAIL_RE.test(update.email)) errors.push("Enter a valid email address.");
  }

  return { update, errors };
}

/* POST /api/leads — manual entry from the panel. The public contact form still
   posts to /api/contact, which writes into this same collection. */
router.post("/", async (req, res) => {
  try {
    const { update, errors } = buildUpdate(req.body || {}, { partial: false });
    if (errors.length) return res.status(400).json({ error: errors[0] });

    const lead = await Lead.create(update);
    return res.status(201).json(lead.toObject());
  } catch (err) {
    console.error("Lead creation failed:", err.message);
    return res.status(500).json({ error: "Could not create the lead." });
  }
});

async function applyUpdate(req, res, partial) {
  if (!isValidId(req.params.id)) return res.status(400).json({ error: "Invalid lead id." });

  const { update, errors } = buildUpdate(req.body || {}, { partial });
  if (errors.length) return res.status(400).json({ error: errors[0] });
  if (!Object.keys(update).length) return res.status(400).json({ error: "Nothing to update." });

  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      // runValidators keeps the schema's enum and maxlength authoritative even
      // though findByIdAndUpdate bypasses document middleware.
      { new: true, runValidators: true }
    ).lean();

    if (!lead) return res.status(404).json({ error: "Lead not found." });
    return res.json(lead);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: "Some values were rejected. Please check the fields." });
    }
    console.error("Lead update failed:", err.message);
    return res.status(500).json({ error: "Could not save the lead." });
  }
}

/* PUT /api/leads/:id — full update. */
router.put("/:id", (req, res) => applyUpdate(req, res, false));

/* PATCH /api/leads/:id — partial update, e.g. just progress or remarks. */
router.patch("/:id", (req, res) => applyUpdate(req, res, true));

/* DELETE /api/leads/:id */
router.delete("/:id", async (req, res) => {
  if (!isValidId(req.params.id)) return res.status(400).json({ error: "Invalid lead id." });
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id).lean();
    if (!lead) return res.status(404).json({ error: "Lead not found." });
    return res.json({ success: true, id: String(lead._id) });
  } catch (err) {
    console.error("Lead delete failed:", err.message);
    return res.status(500).json({ error: "Could not delete the lead." });
  }
});

export default router;

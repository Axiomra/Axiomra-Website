import mongoose from "mongoose";

/**
 * A lead is a contact-form submission plus everything the sales team adds to
 * it afterwards. Both live in one document: the public form writes the top
 * block, the admin panel owns the bottom block.
 *
 * Deliberately bound to the existing `contacts` collection. This model
 * replaced models/Contact.js, and every submission taken before the lead
 * panel existed has to keep showing up in it — a fresh `leads` collection
 * would have orphaned all of them.
 */

export const PROGRESS_STAGES = [
  "New",
  "Contacted",
  "In Discussion",
  "Proposal Sent",
  "Won",
  "Lost",
];

/**
 * Delivery state, tracked separately from the sales pipeline.
 *
 * `progress` answers "where is this deal?"; `completion` answers "where is the
 * work?". A Won lead can still be Pending, and a Lost one can be Closed, so
 * folding them into one enum would lose information the team needs.
 */
export const COMPLETION_STATES = ["Pending", "Ongoing", "Completed", "Closed"];

// Values written by the pre-panel schema, mapped onto the new pipeline.
export const LEGACY_STATUS_MAP = {
  new: "New",
  contacted: "Contacted",
  closed: "Won",
};

const leadSchema = new mongoose.Schema(
  {
    /* --- Written by the public contact form --- */
    name: { type: String, required: true, trim: true, maxlength: 60 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    // One dialable string, dial code included, e.g. "+1 555 123 4567".
    phone: { type: String, trim: true, default: "", maxlength: 32 },
    company: { type: String, trim: true, default: "", maxlength: 100 },
    subject: { type: String, trim: true, default: "", maxlength: 120 },
    // The category picker's value on both the homepage form and /contact.
    // Surfaced in the panel as "Requested service".
    service: { type: String, trim: true, default: "", maxlength: 120 },
    message: { type: String, trim: true, default: "", maxlength: 4000 },

    /* --- Owned by the admin panel --- */
    progress: { type: String, enum: PROGRESS_STAGES, default: "New", index: true },
    teamAssigned: { type: String, trim: true, default: "", maxlength: 80 },
    // Free text on purpose: real answers are "50-70k", "TBC", "retainer".
    budget: { type: String, trim: true, default: "", maxlength: 60 },
    remarks: { type: String, trim: true, default: "", maxlength: 8000 },
    // Null rather than "" so an unset deadline sorts and filters as a real
    // absence instead of an empty string that Mongo orders before every date.
    deadline: { type: Date, default: null },
    completion: { type: String, enum: COMPLETION_STATES, default: "Pending", index: true },

    /* --- Values for the columns the team added themselves --- */
    // A flat bag keyed by LeadField.key, values stored as strings even for the
    // number and date types: they are only ever displayed and edited as text,
    // and a Mixed bag keeps a new column from needing a schema migration.
    // Writes go through the `custom` allow-list in routes/leads.js, which
    // checks every key against an existing LeadField first.
    custom: { type: mongoose.Schema.Types.Mixed, default: () => ({}) },
  },
  {
    timestamps: true,
    collection: "contacts",
    // Documents written before `progress` existed carry a `status` field that
    // no longer maps to anything. strict:true already drops it on write;
    // minimize:false keeps empty-string defaults present so the panel's
    // inline editors always have something to bind to.
    minimize: false,
  }
);

// The panel's default view is "newest first", and the search box filters on
// name/email/company. Indexed so neither degrades as the collection grows.
leadSchema.index({ createdAt: -1 });
leadSchema.index({ email: 1, createdAt: -1 });

export default mongoose.models.Lead || mongoose.model("Lead", leadSchema);

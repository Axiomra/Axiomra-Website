import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    // Stored as one dialable string, dial code included, e.g. "+1 555 123 4567".
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    subject: { type: String, trim: true },
    // Set by the category picker on both the homepage form and the /contact page.
    service: { type: String, trim: true },
    message: { type: String, trim: true },
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new" },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);

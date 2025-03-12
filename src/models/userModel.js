import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    address: { type: String },
    dob: { type: Date },
    role: { type: String },
    isDeleted: { type: Boolean, default: false },
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
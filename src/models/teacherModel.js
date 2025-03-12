import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  startDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  teacherPositionsId: [{ type: mongoose.Schema.Types.ObjectId, ref: "TeacherPosition" }],
  degrees: [
    {
      type: { type: String, required: true },
      school: { type: String, required: true },
      major: { type: String, required: true },
      year: { type: Number, required: true },
      isGraduated: { type: Boolean, default: true },
    },
  ],
}, { timestamps: true });

export default mongoose.model("Teacher", teacherSchema);
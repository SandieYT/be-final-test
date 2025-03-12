import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import teacherRoutes from "./routes/teacherRoutes.js";
import teacherPositionRoutes from "./routes/teacherPositionRoutes.js";
import "./models/userModel.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/teachers", teacherRoutes);
app.use("/teacher-positions", teacherPositionRoutes);

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));
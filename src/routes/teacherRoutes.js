import express from "express";
import { createTeacher, getTeachers } from "../controllers/teacherController.js";

const router = express.Router();

router.get("/", getTeachers);
router.post("/", createTeacher);

export default router;
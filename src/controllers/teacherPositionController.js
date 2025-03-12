import TeacherPosition from "../models/teacherPositionModel.js";

export const getTeacherPositions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalPositions = await TeacherPosition.countDocuments();
    const positions = await TeacherPosition.find()
      .skip(skip)
      .limit(limit);

    res.json({
      status: "success",
      page,
      limit,
      totalPages: Math.ceil(totalPositions / limit),
      totalPositions,
      data: positions,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const createTeacherPosition = async (req, res) => {
  try {
    const { code, name, des, isActive } = req.body;

    const existingPosition = await TeacherPosition.findOne({ code });
    if (existingPosition) {
      return res.status(400).json({ status: "error", message: "Code already exists" });
    }

    const newPosition = new TeacherPosition({
      code,
      name,
      des,
      isActive: isActive !== undefined ? isActive : true,
      isDeleted: false,
    });

    await newPosition.save();
    res.status(201).json({ status: "success", data: newPosition });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
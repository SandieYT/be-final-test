import Teacher from "../models/teacherModel.js";

export const getTeachers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalTeachers = await Teacher.countDocuments();

    const teachers = await Teacher.find()
      .skip(skip)
      .limit(limit)
      .populate("userId", "name email phoneNumber address")
      .populate("teacherPositionsId", "code name des");

    const teacherList = teachers.map((teacher) => ({
      code: teacher.code,
      name: teacher.userId ? teacher.userId.name : "",
      email: teacher.userId ? teacher.userId.email : "",
      phoneNumber: teacher.userId ? teacher.userId.phoneNumber : "",
      address: teacher.userId ? teacher.userId.address : "",
      isActive: teacher.isActive,
      teacherPositions: teacher.teacherPositionsId,
      degrees: teacher.degrees.map((degree) => ({
        type: degree.type,
        school: degree.school,
        major: degree.major
      })),
    }));

    res.json({
      status: "success",
      page,
      limit,
      totalPages: Math.ceil(totalTeachers / limit),
      totalTeachers,
      data: teacherList,
    });
  } catch (error) {
    console.error("Error in getTeachers:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

const generateUniqueCode = async () => {
  let code;
  let exists = true;
  while (exists) {
    code = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    exists = await Teacher.exists({ code });
  }
  return code;
};

export const createTeacher = async (req, res) => {
  try {
    const { userId, teacherPositionsId, degrees, startDate, isActive } = req.body;

    const code = await generateUniqueCode();

    const newTeacher = new Teacher({
      code,
      userId,
      teacherPositionsId,
      degrees,
      startDate: startDate || new Date(),
      isActive: isActive !== undefined ? isActive : true,
      isDeleted: false,
    });

    await newTeacher.save();

    res.status(201).json({ status: "success", data: newTeacher });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
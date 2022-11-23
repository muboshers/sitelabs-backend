import mongoose from "mongoose";
import jobModel from "../models/jobs.model.js";
// create job info
export const createJob = async (req, res) => {
  const { title, description, demands, skills } = req.body;
  const newJob = new jobModel({
    title,
    description,
    skills,
    demands,
  });
  try {
    await newJob.save();
    res.status(200).json({ job: newJob });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// update job
export const updateJob = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json("Bu id bo'yicha post mavjud emas ekan");
  }
  try {
    await jobModel.findByIdAndUpdate(id, { $set: req.body });
    res
      .status(200)
      .json({ message: "Ish bo'yicha e'lon muvaqqiyatli yangilandi" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// delete job
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json("Bu id bo'yicha post mavjud emas ekan");
  }
  try {
    await jobModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Ish e'lon bo'yicha muvaqqiyatli o'chirildi" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// get all job
export const getAllJob = async (req, res) => {
  const allJob = await jobModel.find();
  try {
    res.status(200).json({ jobs: allJob });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// get By id
export const GetById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Bu id bo'yicha elon mavjud emas" });
  }
  const job = await jobModel.findById(id);
  try {
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server xatoliigi yoki internet tizimi" });
  }
};

export const getAllJobStats = async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const job = await jobModel.aggregate([
      {
        $project: {
          month: { $month: "$updatedAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({ data: job });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

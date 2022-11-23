import mongoose from "mongoose";
import hireJobModel from "../models/hirejob.model.js";
import jobModel from "../models/jobs.model.js";
export const createJob = async (req, res) => {
  const {
    firstName,
    email,
    lastName,
    phoneNumber,
    id,
    comments,
    region,
    resume,
  } = req.body;
  const jobs = await jobModel.findById(id);
  const newHireJob = hireJobModel({
    name: `${firstName} ${lastName}`,
    email,
    phoneNumber,
    region,
    opinion: comments,
    resume,
  });
  try {
    await newHireJob.save();
    await jobs.updateOne({ $push: { userId: newHireJob._id } });
    res
      .status(200)
      .json({ message: "Arizangiz qabul qilindi tez orada aloqaga chiqamiz" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteJob = async (req, res) => {
  const { id, jobId } = req.params;
  const jobs = await jobModel.findById(jobId);
  const hirejob = await hireJobModel.findById(id);
  console.log(jobs);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ message: "Bu id bo'yicha e'lon mavjud emas" });
  }
  try {
    await jobs.updateOne({ $pull: { userId: hirejob._id } });
    await hirejob.delete();
    res.status(200).json({ message: "Ariza muvaqqiyatli o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllHireJob = async (req, res) => {
  const hireJobData = await hireJobModel.find();
  try {
    res.status(200).json(hireJobData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllHirejobStats = async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const hirejob = await hireJobModel.aggregate([
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
    res.status(200).json({ data: hirejob });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

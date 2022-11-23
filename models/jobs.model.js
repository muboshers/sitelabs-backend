import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    skills: {
      type: Array,
      default: [],
    },
    demands: {
      type: Array,
      default: [],
    },
    userId: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
const jobModel = mongoose.model("jobModel", jobSchema);

export default jobModel;

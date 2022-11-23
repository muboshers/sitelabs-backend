import mongoose from "mongoose";

const hireJobSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phoneNumber: String,
    region: String,
    opinion: String,
    resume: String,
  },
  {
    timestamps: true,
  }
);

const hireJobModel = mongoose.model("hirejoboffer", hireJobSchema);
export default hireJobModel;

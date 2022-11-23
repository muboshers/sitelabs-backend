import mongoose from "mongoose";
const categoryeSchema = new mongoose.Schema({
  category: String,
});

const categoryModel = new mongoose.model("categoryeSchema", categoryeSchema);
export default categoryModel;

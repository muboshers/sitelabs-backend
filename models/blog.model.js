import mongoose from "mongoose";
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    category: String,
    blogPicture: {
      type: String,
      default: "",
    },
    description: String,
    blogList: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
    blogImages: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const blogModel = mongoose.model("blogModel", blogSchema);
export default blogModel;

import mongoose from "mongoose";
const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    isRead: {
      type: Boolean,
      default: false,
    },
    message: String,
  },
  {
    timestamps: true,
  }
);
const contactModel = mongoose.model("contactModel", contactSchema);
export default contactModel;

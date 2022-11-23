import mongoose from "mongoose";
import subscribeModel from "../models/subscribe.js";

export const subscribeEmail = async (req, res) => {
  const { email } = req.body;
  const newSubscribers = new subscribeModel({
    email,
  });
  try {
    await newSubscribers.save();
    res
      .status(200)
      .json({ message: "Tabriklaymiz muvaqqiyatli obuna bo'dingiz" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEmail = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json("Bu id bo'yicha post yo'q");
  }
  try {
    await subscribeModel.findByIdAndDelete(id);
    res.status(200).json("Email muvatqqiyatli o'chirildi");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getAllEmail = async (req, res) => {
  const allEmail = await subscribeModel.find();
  try {
    res.status(200).json({ email: allEmail });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import mongoose from "mongoose";
import categoryModel from "../models/category.js";

export const creatreCategory = async (req, res) => {
  const { category } = req.body;

  try {
    await categoryModel.create({
      category,
    });
    res.status(200).json({ message: "Kategoriya muvaqqiyatli yaratildi" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json("Bu id bo'yicha kategoriya yo'q");
  }
  const oldCategory = await categoryModel.findByIdAndUpdate(id, {
    $set: req.body.category,
  });
  try {
    res.status(200).json("Katregoriya muvaqqiyatli yasaldi");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json("Bu id bo'yicha kategoriya yo'q");
  }
  try {
    const oldCategory = await categoryModel.findByIdAndDelete(id);
    res.status(200).json("Katregoriya muvaqqiyatli o'chirildi");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const allCategory = await categoryModel.find();
    res.status(200).json({ category: allCategory });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

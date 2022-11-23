import mongoose from "mongoose";
import serviceModel from "../models/service.model.js";
// create method
export const createService = async (req, res) => {
  const { title, description, serviceImg } = req.body;
  const oldSer = await serviceModel.findOne({ title });
  if (oldSer) {
    return res
      .status(404)
      .json({ message: "Bu turdagi service allaqachon yaratilgan" });
  } else {
    const newService = new serviceModel({
      title,
      description,
      serviceImg,
    });
    try {
      await newService.save();
      res.status(200).json(newService);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
// update function
export const updateService = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(404)
      .json({ message: `Bu id bo'yicha xizmat yo'nalishi mavjud emas` });
  } else {
    try {
      await serviceModel.findByIdAndUpdate(id, {
        $set: req.body,
      });
      res
        .status(200)
        .json({ message: "Xizmatlar ro'yhati muvaqqiyatli yangilandi" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
// delete service
export const deleteService = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res
        .status(404)
        .json({ message: `Bu id bo'yicha xizmat yo'nalishi mavjud emas` });
    } else {
      try {
        await serviceModel.findByIdAndDelete(id);
        res
          .status(200)
          .json({ message: "Xizmatlar ro'yhati muvaqqiyatli o'chirildi" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
};
// get all service
export const getAllService = async (req, res) => {
  const service = await serviceModel.find();
  try {
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get by id
export const getById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Bu id bo'yicha service mavjud emas" });
  } else {
    const service = await serviceModel.findById(id);
    try {
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

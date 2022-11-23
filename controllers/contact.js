import mongoose from "mongoose";
import { sendEmailForContactMessage } from "../email.js";
import contactModel from "../models/contact.model.js";

export const createContact = async (req, res) => {
  const { name, email, message } = req.body;
  const newContactMessage = new contactModel({
    name,
    email,
    message,
  });

  try {
    await newContactMessage.save();
    res.status(200).json({ message: "Muvaqqiyatli yuborildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContactMessage = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Bu id bo'yicha kontact yo'q" });
  }
  try {
    await contactModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Kontakt malumoti mufaqqiyatli o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllContact = async (req, res) => {
  const contactMessage = await contactModel.find();
  try {
    res.status(200).json(contactMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRead = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json("Bu id bo'yicha xabar mavjud emas");
  }
  const contact = await contactModel.findById(id);
  try {
    await contact.updateOne({ isRead: true });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const answerQuestion = async (req, res) => {
  const { email, title, answer } = req.body;
  try {
    const msg = await contactModel.findOne({ email });
    sendEmailForContactMessage(title, email, answer, msg);
    res.status(200).json({ message: "Xabar muvaqqiyatli yuborildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import adminModel from "../models/admin.models.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const jwtWord = process.env.JWT;
export const createAdmin = async (req, res) => {
  // if (req.admin) {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newAdmin = new adminModel({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newAdmin.save();
    const token = jwt.sign(
      { email: newAdmin.email, id: newAdmin._id },
      jwtWord,
      {
        expiresIn: "10h",
      }
    );

    const { password, ...admins } = newAdmin._doc;
    res.status(200).json({ admin: admins, token });
  } catch (error) {
    res.status(500).json("Qandaydir hatolik bor " + error.message);
  }
  // } else {
  // res.status(401).json({ message: "Sizda bunday vakolat yo'q" });
  // }
};

export const LoginAdmin = async (req, res) => {
  const { email } = req.body;

  const admin = await adminModel.findOne({ email });

  if (!admin) {
    return res.status(404).json({ message: "Admin mavjud emas" });
  }

  const verifyPassword = await bcrypt.compare(
    req.body.password,
    admin.password
  );

  if (!verifyPassword) {
    return res.status(404).json({ message: "Parol bir hil emas" });
  }
  const token = jwt.sign({ email: admin.email, id: admin._id }, jwtWord, {
    expiresIn: "10h",
  });

  try {
    const { password, __v, ...admins } = admin._doc;
    res.status(200).json({ admin: admins, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  // if (req.admin) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json("Bu id bo'yicha admin mavjud emas");
  }
  try {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
    const updatedAdmin = await adminModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({ message: "Admin profili muvaqqiyatli yangilandi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // }
  // else {
  // res.status(401).json({ message: "Sizda bunday vakolat yo'q" });
  // }
};

export const deleteAdmin = async (req, res) => {
  // if (req.admin) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json("Bu id bo'yicha admin mavjud emas");
  }
  try {
    await adminModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Admin profili muvaqqiyatli o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // }
  // else {
  // res.status(401).json({ message: "Sizda bunday vakolat yo'q" });
  // }
};

export const getAllAdmin = async (req, res) => {
  // if(req.admin){
  try {
    const allAdmin = await adminModel.find();
    const pRAdmin = allAdmin.map((admin) => {
      const { password, ...other } = admin._doc;
      return other;
    });
    res.status(200).json({ admin: pRAdmin });
  } catch (error) {
    res.status(500).json({ message: "Qandaydir xatolik bor " + error.message });
  }
  // }
  // else {
  // res.status(401).json({ message: "Sizda bunday vakolat yo'q" });
  // }
};

export const getById = async (req, res) => {
  // if (req.admin) {
  const { id } = req.params;
  const adminUser = await adminModel.findById(id);
  const { password, ...others } = adminUser._doc;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: "Bu id bo'yicha admin topilmadi" });
    }
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json({ message: "Qandaydir xatolik bor " + error.message });
  }
  // } else {
  //   res.status(401).json({ message: "Sizda bunday vakolat yo'q" });
  // }
};

export const getAllAdminStats = async (req, res) => {
  // if (req.admin) {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const admin = await adminModel.aggregate([
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
    res.status(200).json({ data: admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  // } else {
  //   res.status(401).json({ message: "Sizda bunday vakolat yo'q" });
  // }
};

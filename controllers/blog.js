import mongoose from "mongoose";
import blogModel from "../models/blog.model.js";
import categoryModel from "../models/category.js";
import { sendMessageEmail } from "../email.js";
import subscribeModel from "../models/subscribe.js";

export const createBlog = async (req, res) => {
  const { title, description, blogPicture, blogList, category, blogImages } =
    req.body;
  const blogCategory = await categoryModel.findOne({ category });
  const emails = await subscribeModel.find();

  const allEmail = emails.map((email) => email.email);
  if (!blogCategory) {
    return res.status(404).json("Bundayt kategoriya mavjud emas");
  }
  const blog = new blogModel({
    title,
    description,
    blogPicture,
    blogList,
    blogImages,
    category,
  });

  try {
    await blog.save();
    sendMessageEmail(
      "Sahifada yangi blog yaratildi",
      allEmail,
      blog.description,
      blog.title
    );
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// delete blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await blogModel.findOne({ id });
  try {
    await blogModel.findByIdAndDelete(id);
    res.status(200).json("Blog muvaqqiyatli o'chirildi");
  } catch (error) {
    res.status(500).json({
      message:
        "Nimadir xato bo'ldi iltimos qaytadan urining error sababi >>> " +
        error.message,
    });
  }
};
// update blog
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await blogModel.findOne({ id });
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ message: "Bu id bo'yichya post mavjud emas" });
  } else {
    await blogModel.findByIdAndUpdate(id, {
      $set: req.body,
    });
    res.status(200).json(`Blog muvaqqiyatli yangilandi`);
  }
};
// get all blog
export const getBlog = async (req, res) => {
  const title = req.query.title;
  const category = req.query.cat;
  try {
    let posts;
    if (title) {
      posts = await blogModel.find({ title });
    } else if (category) {
      posts = await blogModel.find({
        categories: {
          $in: [category],
        },
      });
    } else {
      posts = await blogModel.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};
// get by id
export const getById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(`Blog mavjud emas`);
  }
  try {
    const blog = await blogModel.findById(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBlogStats = async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const blog = await blogModel.aggregate([
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
    res.status(200).json({ data: blog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

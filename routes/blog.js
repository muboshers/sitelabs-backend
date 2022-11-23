import express from "express";
import {
  createBlog,
  deleteBlog,
  updateBlog,
  getBlog,
  getById,
  getAllBlogStats,
} from "../controllers/blog.js";

import { auth } from "../middleware/auth.js";
const router = express.Router();

router.post("/", auth, createBlog);
router.delete("/:id", auth, deleteBlog);
router.patch("/:id", auth, updateBlog);
router.get("/statistic",auth, getAllBlogStats);
router.get("/", getBlog);
router.get("/:id", getById);
export default router;

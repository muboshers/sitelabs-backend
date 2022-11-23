import { Router } from "express";
import {
  creatreCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/category.js";
import { auth } from "../middleware/auth.js";
const router = Router();
router.post("/", auth, creatreCategory);
router.patch("/:id", auth, updateCategory);
router.get("/", getAllCategory);
router.delete("/:id", auth, deleteCategory);
export default router;

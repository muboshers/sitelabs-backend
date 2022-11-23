import { Router } from "express";
import {
  createAdmin,
  deleteAdmin,
  updateAdmin,
  getAllAdmin,
  getById,
  LoginAdmin,
  getAllAdminStats,
} from "../controllers/admin.js";
import { auth } from "../middleware/auth.js";
const router = Router();
router.post("/", createAdmin);
router.post("/login", LoginAdmin);
router.patch("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);
router.get("/", getAllAdmin);
router.get("/:id", getById);
router.get("/statistic/admin", getAllAdminStats);

export default router;

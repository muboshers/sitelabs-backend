import { Router } from "express";
import {
  createService,
  deleteService,
  getAllService,
  getById,
  updateService,
} from "../controllers/service.js";
import { auth } from "../middleware/auth.js";
const router = Router();
// create method
router.post("/", auth, createService);
// update method
router.patch("/:id", auth, updateService);
// get by id
router.get("/:id", getById);
// get all service
router.get("/", getAllService);
// delete method
router.delete("/:id", auth, deleteService);
export default router;

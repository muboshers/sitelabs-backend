import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJob,
  updateJob,
  GetById,
  getAllJobStats,
} from "../controllers/job.js";
import { auth } from "../middleware/auth.js";
const router = Router();
// post method
router.post("/", auth, createJob);
// update method
router.patch("/:id", auth, updateJob);
// get method
router.get("/", getAllJob);
// get by id
router.get("/:id", GetById);
// delete all method
router.delete("/:id", auth, deleteJob);
// get all job stats
router.get("/stats/job", auth, getAllJobStats);
export default router;

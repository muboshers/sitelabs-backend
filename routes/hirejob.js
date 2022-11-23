import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllHireJob,
  getAllHirejobStats,
} from "../controllers/hireJob.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/", createJob);
router.delete("/:id/:jobId", deleteJob);
router.get("/stats", auth, getAllHirejobStats);
router.get("/", auth, getAllHireJob);
export default router;

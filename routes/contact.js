import { Router } from "express";
import {
  createContact,
  deleteContactMessage,
  getAllContact,
  updateRead,
  answerQuestion,
} from "../controllers/contact.js";
import { auth } from "../middleware/auth.js";

const router = Router();
// router.1
router.post("/", createContact);
router.post("/answer", auth, answerQuestion);
router.delete("/:id", auth, deleteContactMessage);
router.get("/", auth, getAllContact);
router.patch("/:id", auth, updateRead);
export default router;

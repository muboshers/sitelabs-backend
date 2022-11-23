import { Router } from "express";
import { subscribeEmail,deleteEmail,getAllEmail } from "../controllers/subscribe.js";
import { auth } from "../middleware/auth.js";

const router = Router();
router.post("/", subscribeEmail);
router.delete("/:id", deleteEmail);
router.get("/",auth,getAllEmail)
export default router;

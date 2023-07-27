import Express from "express";
import {
  registerUser,
  loginUser,
  currentUser,
} from "../controllers/userController.mjs";
const router = Express.Router();
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", currentUser);

export default router;

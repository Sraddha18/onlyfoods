import express from "express";

const router = express.Router();
import {
  getUser,
  getUserById,
  login,
  register,
  updateUser,
  verifyToken,
} from "../controllers/Users.js";

router.post("/login", login);
router.post("/register", register);
router.get("/user/:id", getUserById);
router.get("/user", getUser);
router.patch("/user", updateUser);

export default router;

import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  getUserBlogs,
  updateUserPassword,
} from "../controllers/user.controller";
import authenticateToken from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authenticateToken, getUserProfile);


router.patch("/", authenticateToken, updateUserProfile);

router.patch("/password", authenticateToken, updateUserPassword);

router.get("/blogs", authenticateToken, getUserBlogs);

export default router;

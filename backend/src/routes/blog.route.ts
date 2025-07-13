import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getUserBlogs,
} from "../controllers/blogs.controller";
import express from "express";
import authenticateToken from "../middlewares/authMiddleware";
import validateblogdetails from "../middlewares/validateblogdetails";

const router: Router = express.Router();

router.get("/", authenticateToken, getAllBlogs);

router.post("/", authenticateToken, validateblogdetails, createBlog);

router.get("/:blogId", getBlogById);

router.patch("/:blogId", authenticateToken, updateBlog);

router.delete("/:blogId", authenticateToken, deleteBlog);

router.get("/user/blogs", getUserBlogs);

export default router;

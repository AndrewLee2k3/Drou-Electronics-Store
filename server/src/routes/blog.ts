import { authMiddleware, isAdmin } from "../middlewares/auth";
import {
  createBlog,
  getAllBlogs,
  updateBlog,
  getBlogDetails,
  deleteBlog,
  likeBlog,
  dislikeBlog,
} from "./../controllers/blog";

import { Router } from "express";

const blogRouter = Router();
blogRouter.get("/", getAllBlogs);
blogRouter.post("/", authMiddleware, isAdmin, createBlog);
blogRouter.put("/likes", authMiddleware, likeBlog);
blogRouter.put("/dislikes", authMiddleware, dislikeBlog);

blogRouter.get("/:id", getBlogDetails);
blogRouter.put("/:id", authMiddleware, isAdmin, updateBlog);
blogRouter.delete("/:id", authMiddleware, isAdmin, deleteBlog);

export default blogRouter;

import { Router } from "express";

import { authMiddleware, isAdmin } from "../middlewares/auth";
import {
  createCate,
  deleteCate,
  getAllCate,
  getCateDetails,
  updateCate,
} from "../controllers/blogCategory";

const blogCategoryRouter = Router();
blogCategoryRouter.post("/", authMiddleware, isAdmin, createCate);
blogCategoryRouter.get("/", getAllCate);
blogCategoryRouter.get("/:id", getCateDetails);

blogCategoryRouter.put("/:id", authMiddleware, isAdmin, updateCate);
blogCategoryRouter.delete("/:id", authMiddleware, isAdmin, deleteCate);

export default blogCategoryRouter;

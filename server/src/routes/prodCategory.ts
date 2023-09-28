import { Router } from "express";

import { authMiddleware, isAdmin } from "../middlewares/auth";
import {
  createCate,
  deleteCate,
  getAllCate,
  getCateDetails,
  updateCate,
} from "../controllers/prodCategory";

const prodCategoryRouter = Router();
prodCategoryRouter.post("/", authMiddleware, isAdmin, createCate);
prodCategoryRouter.get("/", getAllCate);
prodCategoryRouter.get("/:id", getCateDetails);

prodCategoryRouter.put("/:id", authMiddleware, isAdmin, updateCate);
prodCategoryRouter.delete("/:id", authMiddleware, isAdmin, deleteCate);

export default prodCategoryRouter;

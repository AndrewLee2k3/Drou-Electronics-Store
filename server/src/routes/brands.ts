import { Router } from "express";

import { authMiddleware, isAdmin } from "../middlewares/auth";
import {
  createBrand,
  deleteBrand,
  getAllBrand,
  getBrandDetails,
  updateBrand,
} from "../controllers/brands";

const brandRouter = Router();
brandRouter.post("/", authMiddleware, isAdmin, createBrand);
brandRouter.get("/", getAllBrand);
brandRouter.get("/:id", getBrandDetails);

brandRouter.put("/:id", authMiddleware, isAdmin, updateBrand);
brandRouter.delete("/:id", authMiddleware, isAdmin, deleteBrand);

export default brandRouter;

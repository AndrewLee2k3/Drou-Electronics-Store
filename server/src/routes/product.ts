import {
  createProduct,
  getAllProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
} from "./../controllers/product";
import { authMiddleware, isAdmin } from "../middlewares/auth";

import { Router } from "express";

const productRouter = Router();
productRouter.get("/", getAllProduct);
productRouter.post("/", authMiddleware, isAdmin, createProduct);

productRouter.get("/:id", getProductDetails);
productRouter.put("/wishlist", authMiddleware, addToWishlist);
productRouter.put("/rating", authMiddleware, rating);

productRouter.put("/:id", authMiddleware, isAdmin, updateProduct);
productRouter.delete("/:id", authMiddleware, isAdmin, deleteProduct);

export default productRouter;

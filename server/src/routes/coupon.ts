import { Router } from "express";

import { authMiddleware, isAdmin } from "../middlewares/auth";
import { createCoupon, deleteCoupon, getAllCoupon, updateCoupon } from "../controllers/coupon";

const couponRouter = Router();
couponRouter.post("/", authMiddleware, isAdmin, createCoupon);
couponRouter.get("/", authMiddleware, isAdmin, getAllCoupon);
couponRouter.put("/:id", authMiddleware, isAdmin, updateCoupon);
couponRouter.delete("/:id", authMiddleware, isAdmin, deleteCoupon);



export default couponRouter;

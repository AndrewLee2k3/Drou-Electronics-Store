import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { validateMongodbID } from "../utils/validateMongodbID";
import { Coupon, CouponModel } from "../models/coupon";

export const createCoupon = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const coupon: Coupon = await CouponModel.create(req.body);
      if (!coupon) {
        res.status(404).json({
          message: "Coupon Not Found! 💥",
        });
      }
      res.status(201).json({
        message: "Created Coupon Successfully! 💥",
        coupon,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getAllCoupon = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const coupon: Coupon[] = await CouponModel.find();
      if (!coupon) {
        res.status(404).json({
          message: "Coupon Not Found! 💥",
        });
      }
      res.status(200).json({
        message: "Get All Coupon Successfully! 💥",
        coupon,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const updateCoupon = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      validateMongodbID(id);
      const coupon: Coupon[] | null = await CouponModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!coupon) {
        res.status(404).json({
          message: "Coupon Not Found! 💥",
        });
      }
      res.status(200).json({
        message: "Updated Coupon Successfully! 💥",
        coupon,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const deleteCoupon = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      validateMongodbID(id);
      const coupon: Coupon | null = await CouponModel.findByIdAndDelete(id);
      if (!coupon) {
        res.status(404).json({
          message: "Coupon Not Found! 💥",
        });
      }
      res.status(200).json({
        message: "Deleted Coupon Successfully! 💥",
        coupon,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
);

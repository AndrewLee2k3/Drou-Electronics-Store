import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { validateMongodbID } from "../utils/validateMongodbID";
import { Brand, BrandModel } from "../models/brands";

export const createBrand = asyncHandler(async (req: Request, res: Response) => {
  try {
    const brand: Brand = await BrandModel.create(req.body);
    if (!brand) {
      res.status(404).json({
        message: "Brand Not Found! 💥",
      });
    }
    res.status(201).json({
      message: "Created Brand Successfully! 💥",
      brand,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const updateBrand = asyncHandler(async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    validateMongodbID(id);
    const brand: Brand | null = await BrandModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!brand) {
      res.status(404).json({
        message: "Brand Not Found! 💥",
      });
    }
    res.status(200).json({
      message: "Updated Brand Successfully! 💥",
      brand,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteBrand = asyncHandler(async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    validateMongodbID(id);
    const brand: Brand | null = await BrandModel.findByIdAndDelete(id);
    if (!brand) {
      res.status(404).json({
        message: "Brand Not Found! 💥",
      });
    }
    res.status(200).json({
      message: "Delete Brand Successfully! 💥",
      brand,
    });
  } catch (error) {
    throw new Error(error);
  }
});
export const getBrandDetails = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      validateMongodbID(id);
      const brand: Brand | null = await BrandModel.findById(id);

      if (!brand) {
        res.status(404).json({
          message: "Brand Not Found! 💥",
        });
      }
      res.status(200).json({
        message: "Get Brand Details Successfully! 💥",
        brand,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getAllBrand = asyncHandler(async (req: Request, res: Response) => {
  try {
    const brand: Brand[] = await BrandModel.find();
    if (!brand) {
      res.status(404).json({
        message: "Brand Not Found! 💥",
      });
    }
    res.status(200).json({
      message: "Get All Brand Successfully! 💥",
      brand,
    });
  } catch (error) {
    throw new Error(error);
  }
});

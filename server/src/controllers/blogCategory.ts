import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { validateMongodbID } from "../utils/validateMongodbID";
import { BlogCategory, BlogCategoryModel } from "../models/blogCategory";

export const createCate = asyncHandler(async (req: Request, res: Response) => {
  try {
    const cate: BlogCategory = await BlogCategoryModel.create(req.body);
    if (!cate) {
      res.status(404).json({
        message: "Category Not Found! 💥",
      });
    }
    res.status(201).json({
      message: "Created Category Successfully! 💥",
      category: cate,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const updateCate = asyncHandler(async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    validateMongodbID(id);
    const cate: BlogCategory | null = await BlogCategoryModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!cate) {
      res.status(404).json({
        message: "Category Not Found! 💥",
      });
    }
    res.status(200).json({
      message: "Updated Category Successfully! 💥",
      category: cate,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteCate = asyncHandler(async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    validateMongodbID(id);
    const cate: BlogCategory | null = await BlogCategoryModel.findByIdAndDelete(
      id
    );
    if (!cate) {
      res.status(404).json({
        message: "Category Not Found! 💥",
      });
    }
    res.status(200).json({
      message: "Delete Category Successfully! 💥",
      category: cate,
    });
  } catch (error) {
    throw new Error(error);
  }
});
export const getCateDetails = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      validateMongodbID(id);
      const cate: BlogCategory | null = await BlogCategoryModel.findById(id);

      if (!cate) {
        res.status(404).json({
          message: "Category Not Found! 💥",
        });
      }
      res.status(200).json({
        message: "Get Category Details Successfully! 💥",
        category: cate,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getAllCate = asyncHandler(async (req: Request, res: Response) => {
  try {
    const cate: BlogCategory[] = await BlogCategoryModel.find();
    if (!cate) {
      res.status(404).json({
        message: "Category Not Found! 💥",
      });
    }
    res.status(200).json({
      message: "Get All Category Successfully! 💥",
      category: cate,
    });
  } catch (error) {
    throw new Error(error);
  }
});

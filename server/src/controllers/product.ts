import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Product, ProductModel } from "../models/product";
import slugify from "slugify";
export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const newProduct = await ProductModel.create(req.body);
      res.json({
        message: "Product created! 💥",
        product: newProduct,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const updateProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      console.log("UPDATE PRODUCT: ", updateProduct);

      if (updateProduct) {
        res.json({
          message: "Update product successfully! 💥",
          product: updateProduct,
        });
      } else {
        res.json({
          message: "Not found ID Product! 💥",
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deleteProduct = await ProductModel.findByIdAndDelete(id);
      res.json({
        message: "Delete product successfully! 💥",
        product: deleteProduct,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getProductDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const product = await ProductModel.findById(id);
      res
        .status(200)
        .json({ message: "Get Product Details Successfully! 💥", product });
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getAllProduct = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      // Filtering
      const queryObj: any = { ...req.query };

      const excludeFields: string[] = ["page", "sort", "limit", "fields"];

      excludeFields.forEach((field: string) => delete queryObj[field]);

      let queryStr: string = JSON.stringify(queryObj);

      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match: string) => `$${match}`
      );

      let query: any = ProductModel.find(JSON.parse(queryStr));

      // Sorting
      if (req.query.sort) {
        const sortBy =
          typeof req.query.sort === "string"
            ? req.query.sort.split(",").join(" ")
            : "-createdAt";
        query = query.sort(sortBy);
      }

      // Limiting the fields

      if (req.query.fields) {
        const fields =
          typeof req.query.fields === "string"
            ? req.query.fields.split(",").join(" ")
            : "-__v";
        query = query.select(fields);
      }

      // pagination

      const page: number = Number(req.query.page);
      const limit: number = Number(req.query.limit);
      const skip: number = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      if (req.query.page) {
        const productCount: number = await ProductModel.countDocuments();
        if (skip >= productCount) throw new Error("This Page does not exists");
      }
      const products: Product[] = await query;
      res
        .status(200)
        .json({ message: "Get All Product Successfully! 💥", products });
    } catch (error) {
      throw new Error(error);
    }
  }
);

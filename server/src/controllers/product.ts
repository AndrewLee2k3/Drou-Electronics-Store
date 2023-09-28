import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Product, ProductModel, Rating } from "../models/product";
import slugify from "slugify";
import { validateMongodbID } from "../utils/validateMongodbID";
import { User, UserModel } from "../models/user";
import { Ref } from "@typegoose/typegoose";

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

export const addToWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const prodId: string = req.body.prodId;
      validateMongodbID(prodId);
      const userId = req?.user?._id;
      validateMongodbID(userId);

      const user: User | null = await UserModel.findById(userId);

      const alreadyAdded: Ref<Product> | undefined = user?.wishlist?.find(
        (id: Ref<Product>) => id?.toString() === prodId?.toString()
      );

      const updatedUser = alreadyAdded
        ? await UserModel.findByIdAndUpdate(
            userId,
            {
              $pull: { wishlist: prodId },
            },
            { new: true }
          )
        : await UserModel.findByIdAndUpdate(
            userId,
            {
              $push: { wishlist: prodId },
            },
            { new: true }
          );

      res.status(201).json({ message: "Successfully! 💥", user: updatedUser });
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const rating = asyncHandler(async (req: Request, res: Response) => {
  try {
    const star: number = req.body.star;
    const comment: string = req.body.comment;

    const prodId: string = req.body.prodId;
    validateMongodbID(prodId);
    const userId = req?.user?._id;
    validateMongodbID(userId);

    const product: Product | null = await ProductModel.findById(prodId);

    const alreadyRated: Rating | undefined = product?.ratings?.find(
      (id) => id?.postedby?.toString() === userId?.toString()
    );

    alreadyRated
      ? await ProductModel.updateOne(
          {
            ratings: { $elemMatch: alreadyRated },
          },
          {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment },
          },
          { new: true }
        )
      : await ProductModel.findByIdAndUpdate(
          prodId,
          {
            $push: {
              ratings: {
                star,
                comment,
                postedby: userId,
              },
            },
          },
          {
            new: true,
          }
        );

    const updatedProduct: Product | null = await ProductModel.findById(prodId);
    const ratings: Rating[] = updatedProduct?.ratings || [];
    const totalRatings: number = ratings.length;
    const totalStars: number = ratings.reduce((sum, rating) => {
      if (rating.star !== undefined) {
        return sum + rating.star;
      }
      return sum;
    }, 0);

    const averageRating: number =
      totalRatings === 0 ? 0 : Math.round(totalStars / totalRatings);

    const finalProduct = await ProductModel.findByIdAndUpdate(
      prodId,
      {
        totalrating: averageRating,
      },
      { new: true }
    );

    res.status(201).json({
      message: "Product Rating Successfully! 💥",
      product: finalProduct,
    });
  } catch (error) {
    throw new Error(error);
  }
});

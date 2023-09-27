import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

import { Blog, BlogModel } from "../models/blog";
import { User, UserModel } from "../models/user";
import { validateMongodbID } from "../utils/validateMongodbID";
import { Ref } from "@typegoose/typegoose";
export const createBlog = asyncHandler(async (req: Request, res: Response) => {
  try {
    const blog: Blog = await BlogModel.create(req.body);
    res.status(201).json({
      message: "Created Blog Successfully! 💥",
      blog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    validateMongodbID(id);

    const updateBlog = await BlogModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json({
      message: "Updated Blog Successfully! 💥",
      blog: updateBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const getBlogDetails = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      validateMongodbID(id);
      const blog: Blog | null = await BlogModel.findById(id)
        .populate("likes")
        .populate("dislikes");

      if (!blog) {
        res.status(404).json({ message: "Blog Not Found! 💥" });
      }

      await BlogModel.findByIdAndUpdate(
        id,
        {
          $inc: { numViews: 1 },
        },
        {
          new: true,
        }
      );

      res.status(200).json({
        message: "Get Blog Details Successfully! 💥",
        blog,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getAllBlogs = asyncHandler(async (req: Request, res: Response) => {
  try {
    const blogs = await BlogModel.find();
    res.status(200).json({
      message: "Get All Products Successfully! 💥",
      blogs,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    validateMongodbID(id);

    const deleteBlog = await BlogModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Delete Blog Successfully! 💥",
      blog: deleteBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const likeBlog = asyncHandler(async (req: Request, res: Response) => {
  try {
    const blogId: string = req.body.blogId;
    validateMongodbID(blogId);

    const userId = req?.user?._id;
    validateMongodbID(userId);

    if (!userId) {
      res.status(401).json({ message: "Please log in to like the blog! 💥" });
    }

    const blog: Blog | null = await BlogModel.findById(blogId);

    if (!blog) {
      res.status(404).json({ message: "Blog Not Found! 💥" });
    }

    const isLiked: boolean = blog?.isLiked || false;

    const alreadyDisliked: Ref<User> | undefined = blog?.dislikes?.find(
      (id: Ref<User>) => id?.toString() === userId?.toString()
    );

    if (alreadyDisliked) {
      await BlogModel.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: userId },
          isDisliked: false,
        },
        { new: true }
      );
    }

    const updatedBlog = isLiked
      ? await BlogModel.findByIdAndUpdate(
          blogId,
          {
            $pull: { likes: userId },
            isLiked: false,
          },
          { new: true }
        )
      : await BlogModel.findByIdAndUpdate(
          blogId,
          {
            $push: { likes: userId },
            isLiked: true,
          },
          { new: true }
        );

    res.status(201).json({ message: "Successfully! 💥", blog: updatedBlog });
  } catch (error) {
    throw new Error(error);
  }
});

export const dislikeBlog = asyncHandler(async (req: Request, res: Response) => {
  try {
    const blogId: string = req.body.blogId;
    validateMongodbID(blogId);

    const userId = req?.user?._id;
    validateMongodbID(userId);

    if (!userId) {
      res.status(401).json({ message: "Please log in to like the blog! 💥" });
    }

    const blog: Blog | null = await BlogModel.findById(blogId);

    if (!blog) {
      res.status(404).json({ message: "Blog Not Found! 💥" });
    }

    const isDisliked: boolean = blog?.isDisliked || false;

    const alreadyLiked: Ref<User> | undefined = blog?.likes?.find(
      (id: Ref<User>) => id?.toString() === userId?.toString()
    );

    if (alreadyLiked) {
      await BlogModel.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: userId },
          isLiked: false,
        },
        { new: true }
      );
    }

    const updatedBlog = isDisliked
      ? await BlogModel.findByIdAndUpdate(
          blogId,
          {
            $pull: { dislikes: userId },
            isDisliked: false,
          },
          { new: true }
        )
      : await BlogModel.findByIdAndUpdate(
          blogId,
          {
            $push: { dislikes: userId },
            isDisliked: true,
          },
          { new: true }
        );

    res.status(201).json({ message: "Successfully! 💥", blog: updatedBlog });
  } catch (error) {
    throw new Error(error);
  }
});

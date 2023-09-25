import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { User, UserModel } from "../models/user";

export const login = asyncHandler(async (req: Request, res: Response) => {});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const email = req.body.email;
  const findUser = await UserModel.findOne(email);
  if (!findUser) {
    const newUser = UserModel.create(req.body);
    res.status(201).json(newUser);
  } else {
    res.status(404).json({
      message: "User Already Exists 💥",
      success: false,
    });
  }
});

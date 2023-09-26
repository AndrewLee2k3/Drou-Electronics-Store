import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { User, UserModel } from "../models/user";
import generateToken from "../config/jwtToken";
import { validateMongodbID } from "../utils/validateMongodbID";
import generateRefreshToken from "../config/refreshToken";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const findUser = await UserModel.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = generateRefreshToken(findUser?._id);
    // Update User
    await UserModel.findByIdAndUpdate(
      findUser?._id,
      {
        refreshToken,
      },
      { new: true }
    );

    // Cookies
    const optionsCookie = {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    };

    res.cookie("refreshToken", refreshToken, optionsCookie);

    res.status(200).json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      tel: findUser?.tel,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid email or password");
  }
});

export const handleRefreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const cookie = req.cookies;

    if (!cookie?.refreshToken) {
      throw new Error("No refresh token in cookies! 💥");
    }

    const refreshToken = cookie.refreshToken;

    const user = await UserModel.findOne({ refreshToken });

    if (!user) {
      throw new Error("No refresh token in present in DB or not matched! 💥");
    }

    jwt.verify(
      refreshToken,
      process.env.JWT_SECRET || "supersecret",
      (err: any, decoded: any) => {
        if (err || user._id.toString() !== decoded.id) {
          throw new Error("There is something wrong with refresh token! 💥");
        }
        const accessToken = generateToken(user?._id);
        res.json({
          message: "Access Token Successfully! 💥",
          accessToken,
        });
      }
    );
  }
);

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const cookie = req.cookies;

  if (!cookie?.refreshToken) {
    throw new Error("No refresh token in cookies! 💥");
  }

  const refreshToken = cookie.refreshToken;

  const user = await UserModel.findOne({ refreshToken });

  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.status(401).json({ message: "Unauthorized! 💥" });
  }

  await UserModel.findOneAndUpdate({ refreshToken }, { refreshToken: "" });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  res.sendStatus(204);
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const email = req.body.email;
  const findUser = await UserModel.findOne({ email });
  if (!findUser) {
    const newUser = await UserModel.create(req.body);
    res.status(201).json(newUser);
  } else {
    throw new Error("User Already Exists 💥");
  }
});

export const getAllUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const getUsers: User[] = await UserModel.find();
    res.status(200).json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

export const getUserDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    validateMongodbID(id);
    try {
      const getUser = await UserModel.findById(id);
      res.status(200).json(getUser);
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  if (req.user) {
    const { _id } = req.user;
    validateMongodbID(_id);

    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        _id,
        {
          firstname: req?.body?.firstname,
          lastname: req?.body?.lastname,
          email: req?.body?.email,
          tel: req?.body?.tel,
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        message: "Updated user successfully 💥",
        user: updatedUser,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongodbID(id);

  try {
    const deleteUser = await UserModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Delete user successfully 💥", user: deleteUser });
  } catch (error) {
    throw new Error(error);
  }
});

export const blockUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const block = await UserModel.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ message: "Block user successfully 💥", user: block });
  } catch (error) {
    throw new Error(error);
  }
});

export const unblockUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongodbID(id);

  try {
    const unblock = await UserModel.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ message: "Unblock user successfully 💥", user: unblock });
  } catch (error) {
    throw new Error(error);
  }
});

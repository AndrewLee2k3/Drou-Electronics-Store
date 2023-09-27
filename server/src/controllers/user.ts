import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { User, UserModel } from "../models/user";
import generateToken from "../config/jwtToken";
import { validateMongodbID } from "../utils/validateMongodbID";
import generateRefreshToken from "../config/refreshToken";
import { sendEmail } from "./email";
import { SendEmail } from "../types/email";
import crypto from "crypto";

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

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Successfully! 💥",
      user: {
        _id: findUser?._id,
        firstname: findUser?.firstname,
        lastname: findUser?.lastname,
        email: findUser?.email,
        tel: findUser?.tel,
        token: generateToken(findUser?._id),
      },
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

export const updatePassword = asyncHandler(
  async (req: Request, res: Response) => {
    if (req.user) {
      console.log(req.user);
      const { _id } = req.user;

      console.log(_id);

      validateMongodbID(_id);
      const password = req.body.password;
      console.log(password);

      const user = await UserModel.findById(_id);
      if (user && password) {
        user.password = password;
        const updatePassword = await user.save();
        res.status(200).json({
          message: "Password Updated Successfully! 💥",
          updatePassword,
        });
      } else {
        res.json(user);
      }
    } else {
      throw new Error("Not Found User!");
    }
  }
);

export const forgotPasswordToken = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User not found with this email! 💥");
    try {
      const token = await user.createPasswordResetToken();
      await user.save();
      const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:6000/api/user/reset-password/${token}'>Click Here</>`;

      const data: SendEmail = {
        to: email,
        text: "Hey Guys 👋",
        subject: "Forgot Password 💻",
        html: resetURL,
      };

      sendEmail(data);
      res.json({ message: "Get Token Successfully! 💥", token });
    } catch (err) {
      throw new Error(err);
    }
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { password } = req.body;
    console.log("password: ", password);

    const { token } = req.params;
    console.log("token: ", token);

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await UserModel.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("Token Expired, Please try again later! 💥");
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    res.status(201).json({
      message: "Reset Password Successfully! 💥",
      user,
    });
  }
);

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

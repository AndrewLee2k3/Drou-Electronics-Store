import asyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user";

import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
interface JwtPayload {
  id: string;
}
// Định nghĩa một kiểu tùy chỉnh cho Request
declare global {
  namespace Express {
    interface Request {
      user?: User; // Đây là kiểu dữ liệu của thuộc tính user, bạn có thể sử dụng kiểu dữ liệu cụ thể của người dùng ở đây
    }
  }
}
export const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      try {
        if (token) {
          const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "supersecret"
          ) as JwtPayload;

          const user = await UserModel.findById(decoded.id);

          if (user) {
            req.user = user;
            next();
          } else {
            throw new Error("User not found! 💥");
          }
        }
      } catch (error) {
        throw new Error("Not Authorized Token Expired! Please Login Again!💥");
      }
    } else {
      throw new Error("There is no token attached to header! 💥");
    }
  }
);

export const isAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      const { email } = req.user;
      if (email) {
        const admin = await UserModel.findOne({ email });
        if (admin?.role !== "admin") {
          throw new Error("You are not an admin! 💥");
        } else {
          next();
        }
      }
    }
  }
);

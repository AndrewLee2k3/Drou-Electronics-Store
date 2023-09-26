import { Router } from "express";
import {
  register,
  login,
  getAllUser,
  getUserDetails,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
} from "../controllers/user";
import { authMiddleware, isAdmin } from "../middlewares/auth";

const userRouter = Router();
userRouter.post("/login", login);


userRouter.post("/register", register);

userRouter.get("/", getAllUser);

userRouter.put("/edit", authMiddleware, updateUser);

userRouter.get("/refresh", handleRefreshToken);

userRouter.get("/logout", logout);

userRouter.get("/:id", authMiddleware, isAdmin, getUserDetails);

userRouter.delete("/:id", deleteUser);

userRouter.put("/block/:id", authMiddleware, isAdmin, blockUser);

userRouter.put("/unblock/:id", authMiddleware, isAdmin, unblockUser);

export default userRouter;

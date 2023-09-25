import { Router } from "express";
import { register, login } from "../controllers/user";

const userRouter = Router();
// POST /api/users/login
userRouter.post("/login", login);

// POST /api/users/regester
userRouter.post("/register", register);
export default userRouter;

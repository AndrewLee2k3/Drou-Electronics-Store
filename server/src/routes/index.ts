import { Application } from "express";
import authRoute from "./auth";
import productRouter from "./product";
import blogRouter from "./blog";
import prodCategoryRouter from "./prodCategory";
import blogCategoryRouter from "./blogCategory";
import brandRouter from "./brands";
import couponRouter from "./coupon";

const routes = (app: Application) => {
  app.use("/api/users", authRoute);
  app.use("/api/products", productRouter);
  app.use("/api/blogs", blogRouter);
  app.use("/api/category", prodCategoryRouter);
  app.use("/api/blog-category", blogCategoryRouter);
  app.use("/api/brands", brandRouter);
  app.use("/api/coupons", couponRouter);
};

export default routes;

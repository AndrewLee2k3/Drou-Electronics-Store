import { Application } from "express";
import authRoute from "./auth";
import productRouter from "./product";
import blogRouter from "./blog";

const routes = (app: Application) => {
  app.use("/api/users", authRoute);
  app.use("/api/products", productRouter);
  app.use("/api/blogs", blogRouter);
};

export default routes;

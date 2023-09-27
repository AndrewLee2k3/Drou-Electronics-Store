import { Application } from "express";
import authRoute from "./auth";
import productRouter from "./product";
const routes = (app: Application) => {
  app.use("/api/users", authRoute);
  app.use("/api/products", productRouter);
};

export default routes;

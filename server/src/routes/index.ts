import { Application } from "express";
import authRoute from "./auth";
const routes = (app: Application) => {
  app.use("/api/users", authRoute);
};

export default routes;

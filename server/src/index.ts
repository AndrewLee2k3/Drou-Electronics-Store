import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dbConnect from "./config/dbConnect";
import routes from "./routes";
import { errorHandler, notFound } from "./middlewares/errorHandler";

// CONFIGURATION
dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 6000;
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
// ROUTERS
routes(app);

// Error Handler
app.use(notFound);
app.use(errorHandler);

// MONGOOSE
dbConnect();
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});

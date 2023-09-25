import express, { Express } from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect";
import routes from "./routes";


// CONFIGURATION
dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 6000;

// ROUTERS
routes(app);

// MONGOOSE
dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});

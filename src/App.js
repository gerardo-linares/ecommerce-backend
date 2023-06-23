import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import __dirname from "../utils.js";
import connect from "./database/connect.js";
import initalizePassportStrategies from "./config/passport.config.js";

import AuthRouter from "./routes/auth.js";

//configurar env
dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
initalizePassportStrategies();

const authRouter = new AuthRouter();
//routes/
app.use("/api/auth", authRouter.getRouter());
app.get("/", (req, res) => {
  res.send("test");
});

const PORT = process.env.PORT || 3000;
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Invalid database connection...");
  });

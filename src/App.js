import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "./config.js";

import __dirname from "../utils.js";
import connect from "./database/connect.js";
import initalizePassportStrategies from "./config/passport.config.js";

import AuthRouter from "./routes/auth.route.js";
import ProductsRouter from "./routes/products.route.js";
import CartsRouter from "./routes/carts.route.js";
import UserRouter from "./routes/user.route.js";
const app = express();
app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
    sameSite: "None",
    secure: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
initalizePassportStrategies();

const authRouter = new AuthRouter();
const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRouter();
const userRouter = new UserRouter();
//routes/
app.use("/api/auth", authRouter.getRouter());
app.use("/api/products", productsRouter.getRouter());
app.use("/api/carts", cartsRouter.getRouter());
app.use("/api/users", userRouter.getRouter());
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

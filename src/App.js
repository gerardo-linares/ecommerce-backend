import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import __dirname from "../utils.js";
import connect from "./database/connect.js";
import initalizePassportStrategies from "./config/passport.config.js";

import AuthRouter from "./routes/auth.js";
import ProductsRouter from "./routes/products.js";
import CartsRouter from "./routes/carts.js";

//configurar env
dotenv.config();
const app = express();
app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
initalizePassportStrategies();

const authRouter = new AuthRouter();
const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRouter();
//routes/
app.use("/api/auth", authRouter.getRouter());
app.use("/api/products", productsRouter.getRouter());
app.use("/api/carts", cartsRouter.getRouter());
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

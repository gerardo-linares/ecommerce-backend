import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import __dirname from "../utils.js";
import connect from "./database/connect.js";

import authRouter from "./routes/auth.js";

//configurar env
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));

//routes/
app.use("/api/", authRouter);
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

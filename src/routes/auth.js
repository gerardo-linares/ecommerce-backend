import { generateToken, passportCall } from "../services/auth.js";
import BaseRouter from "./router.js";
export default class AuthRouter extends BaseRouter {
  init() {
    // Ruta para registrar un usuario
    this.post(
      "/register",
      ["NO_AUTH"],
      passportCall("register", { strategyType: "locals" }),
      (req, res) => {
        res.sendSuccess("Registered");
      }
    );

    // Ruta para iniciar sesión
    this.post(
      "/login",
      ["NO_AUTH"],
      passportCall("login", { strategyType: "locals" }),
      (req, res) => {
        const token = generateToken(req.user);
        res
          .cookie("authToken", token, {
            maxAge: 1000 * 3600 * 24,
            httpOnly: true,
            sameSite: "None",
            secure: true,
          })
          .sendSuccess("Logged In");
      }
    );

    // Ruta para cerrar sesión
    this.post("/logout", ["USER", "SUPERADMIN"], (req, res) => {
      res.clearCookie("authToken", {
        sameSite: "None",
        secure: true,
      });
      res.sendSuccess("Logout successful");
    });
    this.get("/current", ["USER", "SUPERADMIN"], (req, res) => {
      const currentUser = req.user; // Obtener el usuario actual desde req.user
      res.sendSuccessWithPayload(currentUser);
    });
  }
}

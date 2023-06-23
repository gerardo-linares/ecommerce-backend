import { generateToken, passportCall } from "../services/auth.js";
import BaseRouter from "./router.js";

export default class AuthRouter extends BaseRouter {
  init() {
    // Ruta para registrar un usuario
    this.post(
      "/register",
      ["NO_AUTH"], // Política: solo se permite acceder a usuarios no autenticados
      passportCall("register", { strategyType: "locals" }), // Middleware de autenticación personalizado utilizando la estrategia "register"
      (req, res) => {
        res.sendSuccess("Registered"); // Respuesta de éxito al registrarse
      }
    );

    // Ruta para iniciar sesión
    this.post(
      "/login",
      ["NO_AUTH"], // Política: solo se permite acceder a usuarios no autenticados
      passportCall("login", { strategyType: "locals" }), // Middleware de autenticación personalizado utilizando la estrategia "login"
      (req, res) => {
        const token = generateToken(req.user); // Generar token JWT utilizando el usuario autenticado
        res
          .cookie("authToken", token, {
            maxAge: 1000 * 3600 * 24,
            httpOnly: true,
          }) // Configurar la cookie con el token JWT (ejemplo: nombre de la cookie: "authToken")
          .sendSuccess("Logged In"); // Respuesta de éxito al iniciar sesión
      }
    );

    // Ruta para cerrar sesión
    this.post("/logout", ["USER", "ADMIN"], (req, res) => {
      req.logout(() => res.sendSuccess("logout")); // Cerrar sesión utilizando req.logout y enviar respuesta de éxito
    });
  }
}

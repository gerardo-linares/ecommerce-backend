import { Router } from "express";
import { passportCall } from "../services/auth.js";

export default class BaseRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {}
  // Este método se puede sobrescribir en las clases hijas para definir rutas adicionales
  getRouter = () => this.router;

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.generateCustomResponses,
      this.handlePolicies(policies),
      passportCall("jwt", { strategyType: "jwt" }),
      this.applyCallbacks(callbacks)
    );
  }
  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      this.generateCustomResponses,
      this.handlePolicies(policies),
      passportCall("jwt", { strategyType: "jwt" }),
      this.applyCallbacks(callbacks)
    );
  }
  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      this.generateCustomResponses,
      this.handlePolicies(policies),
      passportCall("jwt", { strategyType: "jwt" }),
      this.applyCallbacks(callbacks)
    );
  }
  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      this.generateCustomResponses,
      this.handlePolicies(policies),
      passportCall("jwt", { strategyType: "jwt" }),
      this.applyCallbacks(callbacks)
    );
  }

  generateCustomResponses = (req, res, next) => {
    // Funciones personalizadas de respuesta agregadas a res
    res.sendSuccess = (message) => res.send({ status: "success", message });
    res.sendSuccessWithPayload = (payload) =>
      res.send({ status: "success", payload });
    res.sendInternalError = (error) =>
      res.status(500).send({ status: "error", error });
    res.sendUnauthorized = (error) =>
      res.status(400).send({ status: "error", error });
    next();
  };

  handlePolicies = (policies) => {
    return (req, res, next) => {
      if (policies[0] === "PUBLIC") return next();
      // Obtener el usuario autenticado desde req.user (ya que se agregó en passportCall)
      const user = req.user;

      if (policies[0] === "NO_AUTH" && user)
        return res.status(401).send({ status: "error", error: "Unauthorized" });
      if (policies[0] === "NO_AUTH" && !user) return next();
      //A partir de aquí, sí me interesa que exista un usuario.
      if (!user)
        return res.status(401).send({ status: "error", error: req.error });
      if (!policies.includes(user.role.toUpperCase()))
        return res.status(403).send({ status: "error", error: "Forbidden" });
      next();
    };
  };

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        params[1].sendInternalError(error);
      }
    });
  }
}

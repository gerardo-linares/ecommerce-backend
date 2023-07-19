import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";

// Función para crear un hash de una contraseña
export const createHash = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Función para validar una contraseña
export const validatePassword = async (password, hashedPassword) => {
  const passwordMatch = await bcrypt.compare(password, hashedPassword);
  return passwordMatch;
};

// Middleware de autenticación Passport
export const passportCall = (strategy, options = {}) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) return next(error);

      // Verificar si se ha definido options.strategyType
      if (!options.strategyType) {
        console.log(`Route ${req.url} doesn't have defined a strategyType`);
        return res.sendServerError(); // Enviar respuesta de error
      }

      // Si no se ha autenticado ningún usuario
      if (!user) {
        switch (options.strategyType) {
          case "jwt":
            req.error = info.message || info.toString();
            return next();
          case "locals":
            return res.sendUnauthorized(info.message || info.toString()); // Enviar respuesta de no autorizado
        }
      }

      req.user = user; // Asignar el usuario autenticado a req.user
      next(); // Pasar al siguiente middleware
    })(req, res, next);
  };
};

// Función para generar un token JWT
export const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Middleware de autenticación de usuario para agegar productos al carrito
export const authAddCart = (req, res, next) => {
  const token = req.cookies["authToken"];
  console.log(token);
  if (!token) {
    return res.status(401).send({ status: "Registrate para continuar" });
  }
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
};

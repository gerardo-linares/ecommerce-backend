import { Strategy, ExtractJwt } from "passport-jwt";
import local from "passport-local";
import passport from "passport";

import { usersService } from "../dao/mongo/managers/index.js";
import { createHash, validatePassword } from "../services/auth.js";

const localStrategy = local.Strategy;
const JWTStrategy = Strategy;

const initalizePassportStrategies = () => {
  // Configuración de la estrategia "register" para el registro de usuarios
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        try {
          const { firstName, lastName, role } = req.body;
          const exists = await usersService.getUserBy({ email });
          if (exists)
            return done(null, false, { message: "User Alredy exists" });
          const hashedPassword = await createHash(password);
          const newUser = {
            name: `${firstName} ${lastName}`,
            email,
            role,
            password: hashedPassword,
          };
          const result = await usersService.createUser(newUser);
          return done.apply(null, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new localStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        // Agrega el parámetro 'done' en la función de devolución de llamada
        let resultUser;
        try {
          if (email === "admin@admin.com" && password === "123") {
            // Corrige la comparación del password a '==='
            // Entra como super admin
            resultUser = {
              name: "Admin",
              id: 0,
              role: "superadmin",
            };
            return done(null, resultUser);
          }
          const user = await usersService.getUserBy({ email });
          if (!user) return done(null, false, { message: "User not found" });
          const isValidPassword = await validatePassword(
            password,
            user.password
          );
          if (!isValidPassword)
            return done(null, false, { message: "Incorrect credentials" }); // Corrige el nombre de la propiedad 'mensage' a 'message'
          // El usuario ya existe y la contraseña es correcta
          resultUser = {
            name: user.name,
            id: user._id,
            role: user.role,
          };
          return done(null, resultUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initalizePassportStrategies;

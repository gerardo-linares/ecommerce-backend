import { usersService } from "../dao/mongo/managers/index.js";
import { createHash, validatePassword } from "../services/auth.js";

export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    // Verificar si el correo electrónico ya está registrado
    const existingUser = await usersService.getUserBy({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está registrado." });
    }

    // Generar el hash del password
    const hashedPassword = await createHash(password);

    // Crear un nuevo usuario
    const newUser = {
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
    };

    // Guardar el usuario en la base de datos
    await usersService.createUser(newUser);

    res.status(200).json({ message: "Registro exitoso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el registro." });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario por correo electrónico
    const user = await usersService.getUserBy({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "Correo electrónico no encontrado." });
    }

    // Verificar la contraseña
    const passwordMatch = await validatePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta." });
    }

    // Aquí puedes generar y devolver un token de autenticación si deseas implementar la funcionalidad de autenticación.

    res.status(200).json({ message: "Inicio de sesión exitoso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el inicio de sesión." });
  }
};

import { usersService } from "../services/repositories.js";

export const getUsers = async (req, res) => {
  try {
    const params = req.query;
    const users = await usersService.getUsers(params);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.uId;
    const user = await usersService.getUserBy({ userId });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = req.body;
    const createdUser = await usersService.createUser(user);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.uId;
    const user = req.body;
    const updatedUser = await usersService.updateUser(userId, user);
    if (updatedUser) {
      res.sendSuccess({
        message: `El usuario se actualizo correctamente`,
        payload: user,
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.uId;
    const deletedUser = await usersService.deleteUser(userId);
    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

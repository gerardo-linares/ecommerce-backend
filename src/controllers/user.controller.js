import { usersService } from "../services/repositories.js";

export const getUsers = async (req, res) => {
  try {
    const params = req.query;
    const users = await usersService.getUsers(params);
    res.sendSuccessWithPayload(users);
  } catch (error) {
    res.sendInternalError("Internal server error");
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.uId;
    const user = await usersService.getUserBy({ userId });
    if (user) {
      res.sendSuccessWithPayload(user);
    } else {
      res.sendNotFound("User not found");
    }
  } catch (error) {
    res.sendInternalError("Internal server error");
  }
};

export const createUser = async (req, res) => {
  try {
    const user = req.body;
    const createdUser = await usersService.createUser(user);
    res.status(201).json(createdUser);
  } catch (error) {
    res.sendInternalError("Internal server error");
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.uId;
    const user = req.body;
    const updatedUser = await usersService.updateUser(userId, user);
    if (updatedUser) {
      res.sendSuccess({
        message: "El usuario se actualizó correctamente",
        payload: user,
      });
    } else {
      res.sendNotFound("User not found");
    }
  } catch (error) {
    res.sendInternalError("Internal server error");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.uId;
    const deletedUser = await usersService.deleteUser(userId);
    if (deletedUser) {
      res.sendSuccess({ message: "User deleted successfully" });
    } else {
      res.sendNotFound("User not found");
    }
  } catch (error) {
    res.sendInternalError("Internal server error");
  }
};

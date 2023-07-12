import userModel from "./models/user.model.js";

export default class UsersManager {
  getUsers = (params) => {
    return userModel.find(params).lean();
  };

  getUserBy = (params) => {
    return userModel.findOne(params).lean();
  };

  createUser = (user) => {
    return userModel.create(user);
  };

  updateUser = (userId, user) => {
    return userModel.findByIdAndUpdate(userId, { $set: user });
  };

  deleteUser = (userId) => {
    return userModel.findByIdAndDelete(userId);
  };
}

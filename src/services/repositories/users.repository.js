export default class UsersService {
  constructor(dao) {
    this.dao = dao;
  }

  getUsers = (params) => {
    return this.dao.getUsers(params);
  };

  getUserBy = (params) => {
    return this.dao.getUserBy(params);
  };

  createUser = (user) => {
    return this.dao.createUser(user);
  };

  updateUser = (userId, user) => {
    return this.dao.updateUser(userId, user);
  };

  deleteUser = (userId) => {
    return this.dao.deleteUser(userId);
  };
}

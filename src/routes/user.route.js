import BaseRouter from "./router.js";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

export default class UserRouter extends BaseRouter {
  init() {
    this.get("/", ["PUBLIC"], getUsers);
    this.get("/:uId", ["PUBLIC"], getUserById);
    this.put("/:uId", ["PUBLIC"], updateUser);
    this.delete("/:uId", ["PUBLIC"], deleteUser);
  }
}

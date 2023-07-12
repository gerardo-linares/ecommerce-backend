import BaseRouter from "./router.js";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

export default class UserRouter extends BaseRouter {
  init() {
    this.get("/", ["SUPERADMIN"], getUsers);
    this.get("/:uId", ["SUPERADMIN"], getUserById);
    this.put("/:uId", ["SUPERADMIN"], updateUser);
    this.delete("/:uId", ["SUPERADMIN"], deleteUser);
  }
}

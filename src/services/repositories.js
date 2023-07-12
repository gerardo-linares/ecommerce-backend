import CartsDao from "../dao/mongo/carts.dao.js";
import UsersDao from "../dao/mongo/users.dao.js";
import ProductsDao from "../dao/mongo/products.dao.js";

import CartsService from "./repositories/carts.repository.js";
import ProductsService from "./repositories/products.repository.js";
import UsersService from "./repositories/users.repository.js";

export const cartsService = new CartsService(new CartsDao());
export const productsService = new ProductsService(new ProductsDao());
export const usersService = new UsersService(new UsersDao());

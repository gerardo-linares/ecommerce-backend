import CartsDao from "../dao/mongo/carts.dao.js";
import UsersDao from "../dao/mongo/users.dao.js";
import ProductsDao from "../dao/mongo/products.dao.js";
import TicketsDao from "../dao/mongo/ticket.dao.js";

import CartsRepository from "./repositories/carts.repository.js";
import ProductsRepository from "./repositories/products.repository.js";
import UsersRepository from "./repositories/users.repository.js";
import TicketsRepository from "./repositories/tickets.repository.js";

export const cartsService = new CartsRepository(new CartsDao());
export const productsService = new ProductsRepository(new ProductsDao());
export const usersService = new UsersRepository(new UsersDao());
export const ticketsService = new TicketsRepository(new TicketsDao());

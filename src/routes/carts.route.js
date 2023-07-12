import BaseRouter from "./router.js";
import {
  getCarts,
  createCart,
  getCartById,
  updateCartById,
  deleteAllProducts,
  addProductToCart,
  updateProductQuantity,
  deleteProductFromCart,
} from "../controllers/carts.controller.js";
import { authAddCart } from "../services/auth.service.js";

export default class CartsRouter extends BaseRouter {
  init() {
    this.get("/", ["SUPERADMIN"], getCarts);
    this.post("/", ["PUBLIC"], createCart);
    this.get("/:cid", ["PUBLIC"], getCartById);
    this.put("/:cid", ["PUBLIC"], updateCartById);
    this.delete("/:cid", ["PUBLIC"], deleteAllProducts);
    this.post("/:cid/products/:pid", ["PUBLIC"], authAddCart, addProductToCart);
    this.put("/:cid/products/:pid", ["PUBLIC"], updateProductQuantity);
    this.delete("/:cid/products/:pid", ["PUBLIC"], deleteProductFromCart);
  }
}

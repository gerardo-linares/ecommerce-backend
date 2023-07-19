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
  doPurchase,
} from "../controllers/carts.controller.js";
// import { authAddCart } from "../services/auth.service.js";

export default class CartsRouter extends BaseRouter {
  init() {
    this.get("/", ["PUBLIC"], getCarts);
    this.post("/", ["PUBLIC"], createCart);
    this.get("/:cid", ["PUBLIC"], getCartById);
    this.put("/:cid", ["PUBLIC"], updateCartById);
    this.delete("/:cid", ["PUBLIC"], deleteAllProducts);
    this.post("/:cid/products/:pid", ["USER"], addProductToCart);
    this.put("/:cid/products/:pid", ["PUBLIC"], updateProductQuantity);
    this.delete("/:cid/products/:pid", ["PUBLIC"], deleteProductFromCart);
    this.post("/:cid/purchase", ["USER"], doPurchase);
  }
}

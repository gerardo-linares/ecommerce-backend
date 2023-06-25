import BaseRouter from "./router.js";
import {
  getAllCarts,
  createCart,
  getCartById,
  updateCartById,
  deleteAllProducts,
  addProductToCart,
  updateProductQuantity,
  deleteProductFromCart,
} from "../controllers/carts.js";

export default class CartsRouter extends BaseRouter {
  init() {
    this.get("/", ["SUPERADMIN"], getAllCarts);
    this.post("/", ["PUBLIC"], createCart);
    this.get("/:cid", ["PUBLIC"], getCartById);
    this.put("/:cid", ["PUBLIC"], updateCartById);
    this.delete("/:cid", ["PUBLIC"], deleteAllProducts);
    this.post("/:cid/products/:pid", ["PUBLIC"], addProductToCart);
    this.put("/:cid/products/:pid", ["PUBLIC"], updateProductQuantity);
    this.delete("/:cid/products/:pid", ["PUBLIC"], deleteProductFromCart);
  }
}

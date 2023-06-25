import BaseRouter from "./router.js";
import {
  getProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/products.js";

export default class ProductsRouter extends BaseRouter {
  init() {
    this.get("/", ["PUBLIC"], getProducts);
    this.post("/", ["SUPERADMIN"], addProduct);
    this.get("/:pId", ["PUBLIC"], getProductById);
    this.put("/:pId", ["SUPERADMIN"], updateProduct);
    this.delete("/:pId", ["SUPERADMIN"], deleteProduct);
  }
}

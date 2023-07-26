import BaseRouter from "./router.js";
import { generateProducts } from "./../mocks/products.mock.js";

export default class MockPorductsRouter extends BaseRouter {
  init() {
    this.get("/mockingproducts", ["PUBLIC"], (req, res) => {
      const products = [];
      for (let i = 0; i < 100; i++) {
        products.push(generateProducts());
      }
      res.sendSuccessWithPayload(products);
    });
  }
}

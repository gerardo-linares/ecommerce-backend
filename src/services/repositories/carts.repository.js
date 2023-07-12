export default class CartsService {
  constructor(dao) {
    this.dao = dao;
  }

  getCarts = (params) => {
    return this.dao.getCarts(params);
  };

  getCartById = (cartId) => {
    return this.dao.getCartById(cartId);
  };

  createCart = (carts) => {
    return this.dao.createCart(carts);
  };

  addProductToCart = (cartId, productId, quantity) => {
    return this.dao.addProductToCart(cartId, productId, quantity);
  };

  deleteAllProducts = (cartId, deleteProducts) => {
    return this.dao.deleteAllProducts(cartId, deleteProducts);
  };

  deleteProductFromCart = (cartId, productId, quantity) => {
    return this.dao.deleteProductFromCart(cartId, productId, quantity);
  };

  updateCart = (cartId, updatedProducts) => {
    return this.dao.updateCart(cartId, updatedProducts);
  };

  updateProductQuantity = (cartId, productId, quantity) => {
    return this.dao.updateProductQuantity(cartId, productId, quantity);
  };
}

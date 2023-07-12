export default class ProductsService {
  constructor(dao) {
    this.dao = dao;
  }

  getAllProducts = (params) => {
    return this.dao.getProducts(params);
  };

  getProductById = (productId) => {
    return this.dao.getProductById(productId);
  };

  getProductByCode = (params) => {
    return this.dao.getProductByCode(params);
  };

  addProduct = (product) => {
    return this.dao.addProduct(product);
  };

  updateProduct = (productId, productToUpdate) => {
    return this.dao.updateProduct(productId, productToUpdate);
  };

  deleteProduct = (productId) => {
    return this.dao.deleteProduct(productId);
  };

  getPaginatedProducts = (query, options) => {
    return this.dao.getPaginatedProducts(query, options);
  };
}

import productModel from "../models/product.js";

export default class ProductsManager {
  getProducts = (params) => {
    return productModel.find(params);
  };

  getProductById = (productId) => {
    return productModel.findById(productId);
  };

  addProduct = (product) => {
    return productModel.create(product);
  };

  updateProduct = (productId, productToUpdate) => {
    return productModel.updateOne(
      { _id: productId },
      { $set: productToUpdate }
    );
  };

  deleteProduct = (productId) => {
    return productModel.deleteOne({ _id: productId });
  };

  getProductByCode = (code) => {
    return productModel.findOne(code);
  };

  getPaginatedProducts = async (filters, options) => {
    try {
      const result = await productModel.paginate(filters, options);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener los productos paginados");
    }
  };
}

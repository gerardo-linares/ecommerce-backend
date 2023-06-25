import cartsModel from "../models/cart.js";
import mongoose from "mongoose";

export default class CartsManager {
  // Obtener todos los carritos de compras
  getCarts = (params) => {
    return cartsModel.find(params);
  };

  // Obtener un carrito de compras por su ID
  getCartById = (cartId) => {
    return cartsModel.findById(cartId);
  };

  // Agregar un nuevo carrito de compras
  addCart = (carts) => {
    return cartsModel.create(carts);
  };

  // Agregar un producto al carrito de compras
  addProductToCart = async (cartId, productId, quantity) => {
    const cart = await this.getCartById(cartId);

    if (!cart) {
      throw new Error(
        "Carrito no encontrado. Por favor, ingrese una ID válida."
      );
    }

    const productIndex = cart.products.findIndex(
      (product) => product.product.toString() === productId
    );

    if (productIndex !== -1) {
      // El producto ya existe en el carrito, actualizar la cantidad
      cart.products[productIndex].quantity = quantity;
    } else {
      // El producto no existe en el carrito, agregarlo
      cart.products.push({
        product: productId,
        quantity: quantity,
      });
    }

    // Guardar los cambios en la base de datos
    await cart.save();

    // Retornar el carrito actualizado
    return cart;
  };

  // Eliminar todos los productos de un carrito de compras
  deleteAllProducts = async (cartId, deleteProducts) => {
    const cart = await this.getCartById(cartId);

    if (cart) {
      cart.products = deleteProducts;
      await cart.save();
    } else {
      throw new Error(
        "Carrito no encontrado. Por favor, ingrese una ID válida."
      );
    }

    return cart;
  };

  // Actualizar todos los productos de un carrito de compras
  updateCart = async (cartId, updatedProducts) => {
    const cart = await this.getCartById(cartId);

    if (cart) {
      cart.products = updatedProducts;
      await cart.save();
    } else {
      throw new Error(
        "Carrito no encontrado. Por favor, ingrese una ID válida."
      );
    }

    return cart;
  };

  // Actualizar la cantidad de un producto en un carrito de compras
  updateProductQuantity = async (cartId, productId, quantity) => {
    const cart = await this.getCartById(cartId);

    if (!cart) {
      throw new Error(
        "Carrito no encontrado. Por favor, ingrese una ID válida."
      );
    }

    const productIndex = cart.products.findIndex(
      (product) => product.product.toString() === productId
    );

    if (productIndex !== -1) {
      // Actualizar la cantidad del producto en el carrito
      cart.products[productIndex].quantity = quantity;
    } else {
      throw new Error(
        "Producto no encontrado. Por favor, ingrese una ID válida."
      );
    }

    // Guardar los cambios en la base de datos
    await cart.save();

    // Retornar el carrito actualizado
    return cart;
  };

  deleteProductFromCart = async (cartId, productId, quantity) => {
    const cart = await this.getCartById(cartId);

    if (!cart) {
      throw new Error(
        "Carrito no encontrado. Por favor, ingrese una ID válida."
      );
    }

    const productIndex = cart.products.findIndex(
      (product) => product.product.toString() === productId
    );

    if (productIndex !== -1) {
      const product = cart.products[productIndex];

      // Verificar si la cantidad a eliminar es menor o igual a la cantidad actual del producto en el carrito
      if (quantity <= product.quantity) {
        if (quantity === product.quantity) {
          // Si la cantidad a eliminar es igual a la cantidad actual, eliminar el producto del carrito
          cart.products.splice(productIndex, 1);
        } else {
          // Si la cantidad a eliminar es menor a la cantidad actual, actualizar la cantidad del producto en el carrito
          cart.products[productIndex].quantity -= quantity;
        }

        // Guardar los cambios en la base de datos
        await cart.save();

        // Retornar el carrito actualizado
        return cart;
      } else {
        throw new Error(
          "La cantidad a eliminar es mayor a la cantidad actual del producto en el carrito."
        );
      }
    } else {
      throw new Error(
        "Producto no encontrado en el carrito. Por favor, ingrese una ID válida."
      );
    }
  };
}

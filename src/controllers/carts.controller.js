import { productsService, cartsService } from "../services/repositories.js";

export const getCarts = async (req, res) => {
  try {
    const carts = await cartsService.getCarts();
    res.sendSuccessWithPayload(carts);
  } catch (error) {
    res.sendInternalError("Error interno del servidor");
  }
};

export const createCart = async (req, res) => {
  try {
    const { name, price } = req.body;

    // Verificando que los campos name y price se envíen correctamente
    if (!name || !price) {
      throw new Error("El 'name' y 'price' del producto deben estar indicados");
    }

    // Verificando que los campos name y price sean de tipo string y number respectivamente
    if (typeof name !== "string" || typeof price !== "number") {
      throw new Error(
        "El 'name' debe ser de tipo 'String' y el 'price' de tipo 'Number'"
      );
    }

    const newCart = await cartsService.createCart({ name, price });
    res.sendSuccessWithPayload(newCart);
  } catch (error) {
    res.sendInternalError(error.message);
  }
};

export const getCartById = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartsService
      .getCartById(cartId)
      .populate("products.product");
    if (cart) {
      res.sendSuccessWithPayload(cart);
    } else {
      res.sendBadRequest("Producto no encontrado, ingrese un ID válido");
    }
  } catch (error) {
    console.log(error);
    res.sendInternalError(error.message);
  }
};

export const updateCartById = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const updatedProducts = req.body.products;

    // Verificando si los productos existen en la base de datos
    const productIds = updatedProducts.map((product) => product.product);
    const existingProducts = await productsService.getAllProducts({
      _id: { $in: productIds },
    });

    // Validando si se encontraron todos los productos
    if (existingProducts.length !== productIds.length) {
      res.sendBadRequest(
        "Uno o más IDs de productos no existen en la base de datos. Por favor, ingrese IDs válidos"
      );
      return;
    }

    const updatedCart = await cartsService.updateCart(cartId, updatedProducts);

    res.sendSuccessWithPayload(updatedCart);
  } catch (error) {
    console.log(error);
    res.sendInternalError(error.message);
  }
};

export const deleteAllProducts = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const deleteProducts = [];

    const deleteAllProducts = await cartsService.deleteAllProducts(
      cartId,
      deleteProducts
    );

    res.sendSuccess({
      message: "Productos del carrito eliminados con éxito",
      payload: deleteAllProducts,
    });
  } catch (error) {
    console.log(error);
    res.sendInternalError(error.message);
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;

    // Validando si el ID del producto es mayor que 0
    if (pid <= 0) {
      throw new Error("El Id del producto debe ser mayor que 0.");
    }

    const updatedCart = await cartsService.addProductToCart(cid, pid, quantity);
    if (updatedCart) {
      res.sendSuccess({
        message: `Producto agregado correctamente al carrito '${req.params.cid}'`,
        payload: updatedCart,
      });
    } else {
      res.sendBadRequest(error.message);
    }
  } catch (error) {
    console.log(error);
    res.sendInternalError(error.message);
  }
};

export const updateProductQuantity = async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;

    // Validando si el ID del producto es mayor que 0
    if (pid <= 0) {
      throw new Error("El Id del producto debe ser mayor que 0.");
    }

    const updatedProductQuantity = await cartsService.updateProductQuantity(
      cid,
      pid,
      quantity
    );
    if (updatedProductQuantity) {
      res.sendSuccess({
        message: "Cantidad actualizada correctamente",
        payload: updatedProductQuantity,
      });
    } else {
      res.sendBadRequest(error.message);
    }
  } catch (error) {
    console.log(error);
    res.sendInternalError(error.message);
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;

    // Validando si la cantidad es mayor que 0
    if (quantity <= 0) {
      throw new Error("La cantidad debe ser mayor que 0.");
    }

    const deletedProduct = await cartsService.deleteProductFromCart(
      cartId,
      productId,
      quantity
    );

    res.sendSuccess({
      message: "Producto eliminado del carrito con éxito",
      payload: deletedProduct,
    });
  } catch (error) {
    console.log(error);
    res.sendInternalError(error.message);
  }
};

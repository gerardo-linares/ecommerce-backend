import { generateUniqueCode } from "../../utils.js";
import {
  productsService,
  cartsService,
  ticketsService,
  usersService,
} from "../services/repositories.js";

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

    res.sendSuccessWithPayload({
      message: "Productos del carrito eliminados con éxito",
      deleteAllProducts,
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

    const cart = await cartsService.addProductToCart(cid, pid, quantity);
    if (cart) {
      res.sendSuccessWithPayload({
        message: `Producto agregado correctamente al carrito '${req.params.cid}'`,
        cart,
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
      res.sendSuccessWithPayload({
        message: "Cantidad actualizada correctamente",
        updatedProductQuantity,
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

    res.sendSuccessWithPayload({
      message: "Producto eliminado del carrito con éxito",
      deletedProduct,
    });
  } catch (error) {
    console.log(error);
    res.sendInternalError(error.message);
  }
};

export const doPurchase = async (req, res) => {
  try {
    const cartId = req.params.cid;

    // Obtener el carrito de la base de datos
    const cart = await cartsService
      .getCartById(cartId)
      .populate("products.product");
    if (!cart) {
      return res.sendNotFound({ message: "Carrito no encontrado" });
    }

    // Verificar el stock de cada producto en el carrito
    const updatedProducts = [];
    let amount = 0; // Variable para almacenar la suma total de precios

    for (const item of cart.products) {
      const product = item.product;
      const quantity = item.quantity;

      // Verificar si hay suficiente stock
      if (product.stock < quantity) {
        return res.sendNotFound({
          message: `No hay suficiente stock para ${product.title} id: ${product.id}`,
        });
      }

      // Restar el stock de los productos vendidos
      product.stock -= quantity;
      await product.save();

      // Agregar los productos actualizados al carrito
      updatedProducts.push({
        product: product._id,
        quantity: item.quantity,
      });

      // Calcular el precio total del producto y agregarlo a la suma total
      const productPrice = product.price;
      amount += productPrice * quantity;
    }

    const code = generateUniqueCode();

    // Obtener el usuario comprador del carrito
    const user = req.user;

    console.log("esto es user:", user);
    if (!user) {
      return res.sendNotFound({ message: "Usuario no encontrado" });
    }

    // Crear un nuevo ticket con el correo electrónico del usuario como comprador
    const ticket = await ticketsService.createTicket({
      code,
      amount,
      purchaser: user.email,
    });

    // Guardar el ticket en la colección de tickets
    await ticket.save();

    // Actualizar el estado del carrito a "comprado" y los productos vendidos
    cart.products = updatedProducts;
    await cart.save();
    const purchaser = user.email;
    res.sendSuccessWithPayload({ cart, amount, code, purchaser });
  } catch (error) {
    console.log(error);
    res.sendInternalError(error.message);
  }
};

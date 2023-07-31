import {
  productAlreadyExistError,
  productErrorIncompleteValues,
  productErrorInvalidTypes,
} from "../constants/products.errors.js";
import { productsService } from "../services/repositories.js";
import ErrorService from "./../services/error.service.js";
import { EErrors } from "./../constants/e.errors.js";

export const getProducts = async (req, res) => {
  const { page = 1, category, sort, limit } = req.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit) || 60,
    lean: true,
  };
  const filters = {};

  if (category) {
    filters.category = category;
  }

  if (sort === "asc") {
    options.sort = { price: 1 };
  } else if (sort === "desc") {
    options.sort = { price: -1 };
  }

  try {
    const result = await productsService.getPaginatedProducts(filters, options);
    const products = result.docs;

    const hasPrevPage = result.hasPrevPage;
    const hasNextPage = result.hasNextPage;
    const prevPage = result.prevPage;
    const nextPage = result.nextPage;
    const totalPages = result.totalPages;

    res.sendSuccessWithPayload({
      products,
      page: result.page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      totalPages,
    });
  } catch (error) {
    console.log(error);
    res.sendInternalError("Error interno del servidor");
  }
};

export const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      code,
      stock,
      category,
      thumbnails,
      status,
    } = req.body;
    const productWithCode = await productsService.getProductByCode({ code });

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof price !== "number" ||
      typeof code !== "string" ||
      typeof stock !== "number" ||
      typeof category !== "string"
    )
      ErrorService.createError({
        name: "Datos invalidos",
        cause: productErrorInvalidTypes({
          title,
          description,
          price,
          code,
          stock,
          category,
        }),
        message: "Error intentando ingresar un producto",
        code: EErrors.INVALID_VALUES,
      });

    if (
      !title ||
      !description ||
      !price ||
      !code ||
      !stock ||
      !status ||
      !category ||
      !thumbnails
    ) {
      ErrorService.createError({
        name: "Datos incompletos",
        cause: productErrorIncompleteValues({
          title,
          description,
          price,
          code,
          stock,
          category,
        }),
        message: "Error intentando ingresar un producto",
        code: EErrors.INCOMPLETE_VALUES,
      });
    }

    const existingProduct = productWithCode;
    if (existingProduct) {
      ErrorService.createError({
        name: "Codigo del producto existente",
        cause: productAlreadyExistError({
          title,
          description,
          price,
          code,
          stock,
          category,
        }),
        message: "Error intentando ingresar un producto",
        code: EErrors.PRODUCT_ALREADY_EXIST,
      });
    }

    const product = {
      title,
      description,
      price,
      code,
      stock,
      category,
      thumbnails,
      status,
    };

    const result = await productsService.addProduct(product);
    res.sendSuccessWithPayload({
      message: "Producto agregado correctamente",
      result,
    });
  } catch (error) {
    console.log(error);
    res.sendInternalError(error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.pId;
    const product = await productsService.getProductById(productId);
    if (product) {
      res.sendSuccessWithPayload({
        message: `El producto '${product.title}', se ha cargado correctamente`,
        product,
      });
    } else {
      res.sendBadRequest("Producto no encontrado");
    }
  } catch (error) {
    console.log(error);
    res.sendInternalError("Error interno del servidor");
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.pId;
    const productToUpdate = req.body;
    const result = await productsService.updateProduct(
      productId,
      productToUpdate
    );
    console.log(result);
    res.sendSuccessWithPayload({
      message: "Producto actualizado con éxito",
      result,
    });
  } catch (error) {
    console.log(error);
    res.sendBadRequest("Producto no encontrado");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.pId;
    const result = await productsService.deleteProduct(productId);
    console.log(result);
    res.sendSuccessWithPayload({
      message: "Su producto ha sido eliminado con éxito",
    });
  } catch (error) {
    console.error(error);
    res.sendInternalError("Error interno del servidor");
  }
};

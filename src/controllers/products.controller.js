import { productsService } from "../services/repositories.js";
// links/
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
      !title ||
      !description ||
      !price ||
      !code ||
      !stock ||
      !status ||
      !category ||
      !thumbnails
    ) {
      return res.sendBadRequest(
        "Datos incompletos, por favor, verifica que los datos se estén enviando correctamente"
      );
    }

    const existingProduct = productWithCode;
    if (existingProduct) {
      return res.sendBadRequest("El código de producto ya está en uso");
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

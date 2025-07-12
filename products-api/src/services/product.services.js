import {
    getProductsById,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from '../models/product.model.js';

export const getProductsService = async () => {
    return await getAllProducts();
};

export const getProductByIdService = async (id) => {
    return await getProductsById(id);
};

export const createProductService = async (product) => {
    // Aquí podríamos agregar lógica de negocio, como validar que el precio no sea negativo.
    if (product.price < 0) {
        throw new Error("El precio del producto no puede ser negativo.");
    }
    return await createProduct(product);
};

export const updateProductService = async (id, productData) => {
    const productExists = await getProductsById(id);
    if(!productExists) {
        const error = new Error("Producto no encontrado para actualizar.");
        error.status = 404;
        throw error;
    }
    return await updateProduct(id, productData);
};

export const deleteProductService = async (id) => {
    const productExists = await getProductsById(id);
    if (!productExists) {
        const error = new Error("Producto no encontrado para eliminar.");
        error.status = 404;
        throw error;
    }
    return await deleteProduct(id);
};

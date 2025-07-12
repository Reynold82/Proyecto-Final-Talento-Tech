import {
    getProductsService,
    getProductByIdService,
    createProductService,
    updateProductService,
    deleteProductService
} from '../services/product.services.js';


// Controlador para obtener todos los productos
export const getProducts = async (req, res) => {
    try {
        const products = await getProductsService();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener los productos',
            error: error.message });
    }
    
};

// Controlador para obtener un producto por su ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProductByIdService(id);
        if (!product) {
            return res.status(404).json({message: 'Producto no encontrado'});
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener el producto',
            error: error.message });
    }
};

// Controlador para crear un nuevo producto
export const createProduct = async (req, res) => {
    try {
        const product = req.body;
        const newProductId = await createProductService(product);
        res.status(201).json({
            message: 'Producto creado con éxito',
            id: newProductId });

    } catch (error) {
        res.status(400).json({ 
            message: 'Error al crear el producto',
            error: error.message });
    }
};

// Controlador para actualizar un producto
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productData = req.body;
        await updateProductService(id, productData);
        res.status(200).json({
            message: 'Producto actualizado con éxito' });

    } catch (error) {
        res.status(error.status || 500).json({
            message: 'Error al actualizar el producto',
            error: error.message });
    }
};

// Controlador para eliminar un producto
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteProductService(id);
        res.status(200).json({
            message: 'Producto eliminado exitosamente' });

    } catch (error) {
        res.status(error.status || 500).json({
            message: 'Error al eliminar el producto',
            error: error.message });
    }
};

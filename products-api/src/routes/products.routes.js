import { Router } from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/products.controller.js';
import { authenticationMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// GET /api/products
router.get('/', authenticationMiddleware, getProducts);

// GET /api/products/:id 
router.get('/:id', authenticationMiddleware, getProductById);

// POST /api/products/create 
router.post('/create', authenticationMiddleware, createProduct);

// PUT /api/products/:id 
router.put('/:id', authenticationMiddleware, updateProduct);

// PATCH /api/products/:id
router.patch('/:id', authenticationMiddleware, updateProduct);

// DELETE /api/products/:id 
router.delete('/:id', authenticationMiddleware, deleteProduct);

export default router;
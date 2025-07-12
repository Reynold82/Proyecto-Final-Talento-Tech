import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importaciones de los routers
import productsRouter from './src/routes/products.routes.js';
import authRouter from './src/routes/auth.routes.js';

const app = express();
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
    res.send('<h1>API de Productos - Proyecto Final</h1>');
});

// Rutas de la API
app.use('/auth', authRouter);
app.use('/api/products', productsRouter);

// Middleware para manejar rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada.' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor corriendo  en http://localhost:${port}`);
});
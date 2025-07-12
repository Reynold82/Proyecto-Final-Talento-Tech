import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Middleware para verificar el token JWT
export const authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token no proporcionado' })
    };

    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY;

    jwt.verify(token, secretKey, (err) => {
        if (err) { 
            return res.status(403).json({ message: 'Token inválido' })
        };
        next();
    });
};
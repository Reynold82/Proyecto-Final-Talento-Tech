// Controlador para el login de usuario
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


const default_user = {
    id: '1',
    email: 'user@login.com.ar',
    password: 'userlogin2025'
};

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (email === default_user.email && password === default_user.password) {
            const secretKey = process.env.JWT_SECRET_KEY;
            if(!secretKey) {
                throw new Error('No hay configurada una clave secreta');
            }
            const token = jwt.sign(
                { userId: default_user.id }, 
                secretKey, 
                { expiresIn: '1h' });
                
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
}
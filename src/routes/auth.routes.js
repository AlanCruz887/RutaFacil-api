import { Router } from 'express';
import { login, register } from '../controllers/auth/auth.controller.js';

const router = Router();

// Ruta pública para iniciar sesión
router.post('/login', login);

// Ruta pública para registrar un nuevo usuario
router.post('/register', register);

export default router;

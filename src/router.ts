import {Router} from 'express';
import { body } from 'express-validator';
import { registerUser } from './handlers/userHandler';


const router = Router();

router.post('/auth/register', 
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('lastName').notEmpty().withMessage('El apellido es obligatorio'),
    body('email').isEmail().withMessage('El email no es válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    registerUser
);

export default router;
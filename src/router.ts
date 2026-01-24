import {Router} from 'express';
import { body } from 'express-validator';
import { loginUser, registerUser } from './handlers/userHandler';
import { validateRequest } from './middleware/validation';


const router = Router();

router.post('/auth/register', 
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('lastName').notEmpty().withMessage('El apellido es obligatorio'),
    body('email').isEmail().withMessage('El email no es válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    //body('company').notEmpty().withMessage('La empresa es obligatoria'),
    validateRequest,
    registerUser
);

router.post('/auth/login', 
    body('email').isEmail().withMessage('El email no es válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    validateRequest,
    loginUser
);

export default router;
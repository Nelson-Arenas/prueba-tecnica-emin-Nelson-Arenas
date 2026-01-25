import {Router} from 'express';
import { body, header } from 'express-validator';
import { getUserProfile, loginUser, registerUser } from './handlers/userHandler';
import { registerCompany } from './handlers/empresaHandler';
import { validateRequest } from './middleware/validation';
import { authMiddleware } from './middleware/auth';


const router = Router();


//User routes
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

router.get('/user/profile', 
    validateRequest,
    authMiddleware,
    getUserProfile
);


//Empresa routes 
router.post('/empresas/register', 
    body('name').notEmpty().withMessage('El nombre de la empresa es obligatorio'),
    validateRequest,
    registerCompany
);

export default router;
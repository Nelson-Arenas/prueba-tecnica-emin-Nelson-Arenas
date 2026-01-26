import { Router } from 'express';
import { body, header } from 'express-validator';
import { getUserProfile, loginUser, registerUser } from './handlers/userHandler';
import { registerCompany } from './handlers/empresaHandler';
import { validateRequest } from './middleware/validation';
import { authMiddleware } from './middleware/auth';
import { registerActivo } from './handlers/activoHandler';


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

//Activos routes
router.post(
    "/activo/register",
    header("Authorization").notEmpty().withMessage("El token de autenticación es obligatorio"),
    body("code").notEmpty().withMessage("El código del activo es obligatorio").isString().withMessage("El código debe ser texto").trim(),
    body("name").notEmpty().withMessage("El nombre del activo es obligatorio").isString().withMessage("El nombre debe ser texto").trim(),
    body("type").notEmpty().withMessage("El tipo del activo es obligatorio").isIn(["NOTEBOOK", "MONITOR", "LICENCIA", "PERIFERICO", "OTRO"]).withMessage("Tipo inválido"),
    body("brand").optional({ nullable: true }).isString().withMessage("La marca debe ser texto").trim(),
    body("model").optional({ nullable: true }).isString().withMessage("El modelo debe ser texto").trim(),
    body("serialNumber").notEmpty().withMessage("El número de serie es obligatorio").isString().withMessage("El número de serie debe ser texto").trim(),
    body("status").optional().isIn(["DISPONIBLE", "ASIGNADO", "MANTENCION", "BAJA"]).withMessage("Estado inválido"),
    body("purchaseDate").optional({ nullable: true }).isISO8601().withMessage("purchaseDate debe ser una fecha ISO8601 (YYYY-MM-DD o ISO completo)").toDate(),
    body("company").notEmpty().withMessage("La empresa es obligatoria").isMongoId().withMessage("company debe ser un MongoId válido"),
    body("location").notEmpty().withMessage("La ubicación es obligatoria").isString().withMessage("La ubicación debe ser texto"),
    body("assignedUser")
        .optional({ nullable: true })
        .custom((value) => value === null || Number.isInteger(value))
        .withMessage("assignedUser debe ser un número entero o null"),

    body("notes").optional({ nullable: true }).isString().withMessage("notes debe ser texto"),
    validateRequest,
    authMiddleware,
    registerActivo
);


export default router;
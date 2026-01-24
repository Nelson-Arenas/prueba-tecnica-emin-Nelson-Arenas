import {Router} from 'express';
import { registerUser } from './handlers';
import { Activo } from './models/Activo';


const router = Router();


router.post('/auth/register', registerUser);

export default router;
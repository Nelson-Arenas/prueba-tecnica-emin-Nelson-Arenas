import {Router} from 'express';
import { registerUser } from './handlers';



const router = Router();


router.post('/auth/register', registerUser);

export default router;
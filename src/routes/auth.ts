import { Router } from 'express';
import { validateLogin, validateRegister } from '../middleware/authValidation';
import { loginController, registerController } from '../controllers/AuthController';

const router = Router();

// Public routes
router.post('/login', validateLogin, loginController);
router.post('/register', validateRegister, registerController);


export default router;

import { Router } from 'express';
import { validateLogin, validateRegister } from '../middleware/authValidation';
import { AuthController } from '../controllers';

const router = Router();

// Public routes
router.post('/login', validateLogin, AuthController.login);
router.post('/signup', validateRegister, AuthController.register);


export default router;

import { Router } from 'express';
import { validateLogin, validateRegister } from '../middleware/authValidation';
import { authenticateToken } from '../middleware/auth';
import { AuthController } from '../controllers';

const router = Router();

// Public routes
router.post('/login', validateLogin, AuthController.login);
router.post('/signup', validateRegister, AuthController.register);

router.get('/me', authenticateToken, AuthController.getCurrentUser);
router.get("/all",authenticateToken,AuthController.getAllUsers)


export default router;

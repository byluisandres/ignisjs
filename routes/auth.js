import { Router } from 'express';
const router = Router();
// Controllers
import AuthenticatedController from '../app/Controllers/Http/auth/AuthenticatedController.js';
import PasswordResetController from '../app/Controllers/Http/auth/PasswordResetController.js';


// Validators
import registerValidator from '../app/Validators/registerValidator.js'
import resetPasswordValidator from '../app/Validators/resetPasswordValidator.js';

// Middleware
import auth from '../app/Middleware/auth.js';

router.post('/register', registerValidator, AuthenticatedController.register);
router.post('/login', AuthenticatedController.login);
router.post('/forgot-password', PasswordResetController.forgotPassword);
router.post('/reset-password', resetPasswordValidator, PasswordResetController.resetPassword);
// Rutas protegidas
router.post('/logout', auth, AuthenticatedController.logout);
router.get('/me', auth, AuthenticatedController.me);
export default router;
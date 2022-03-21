import express from 'express';
import { catchErrors } from '../handlers/error.handler.js';
import { login, register } from '../controllers/user.controllers.js';

const router = express.Router();

router.post('/login', catchErrors(login));
router.post('/register', catchErrors(register));

export default router;

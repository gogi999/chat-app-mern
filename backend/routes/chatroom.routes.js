import express from 'express';
import { catchErrors } from '../handlers/error.handler.js';
import { createChatroom, getAllChatrooms } from '../controllers/chatroom.controllers.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, catchErrors(getAllChatrooms));
router.post('/', auth, catchErrors(createChatroom));

export default router;

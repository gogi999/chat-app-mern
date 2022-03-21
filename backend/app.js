import express from 'express';
import cors from 'cors';
import {
    notFound,
    developmentErrors,
    productionErrors
} from './handlers/error.handler.js';
import userRoutes from './routes/user.routes.js';
import chatroomRoutes from './routes/chatroom.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/user', userRoutes);
app.use('/chatroom', chatroomRoutes);

// Setup Error Handlers
app.use(notFound);
if (process.env.ENV === 'development') {
    app.use(developmentErrors);
} else {
    app.use(productionErrors);
}

export default app;

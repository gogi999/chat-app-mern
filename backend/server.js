import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import socketIO from 'socket.io';
import jwt from 'jwt-then';
import Message from './models/message.model.js';
import User from './models/user.model.js';

dotenv.config();

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('MongoDB successfully connected!');
}).catch((err) => {
    console.log('MongoDB connection failed!!!', err);
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});

const io = socketIO(server);
io.use(async (socket, next) => {
    try {
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = payload.id;
        next();
    } catch (err) {
        console.log(err.message);
    }
});
io.on('connection', (socket) => {
    console.log(`Connected: ${socket.userId}`);

    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.userId}`);
    });

    socket.on('joinRoom', ({ chatroomId }) => {
        socket.join(chatroomId);
        console.log(`A user joined chatroom: ${chatroomId}`);
    });

    socket.on('leaveRoom', ({ chatroomId }) => {
        socket.leave(chatroomId);
        console.log(`A user left chatroom: ${chatroomId}`);
    });

    socket.on('chatroomMessage', async ({ chatroomId, message }) => {
        if (message.trim().length > 0) {
            const user = await User.findOne({ _id: socket.userId });
            const newMessage = new Message({
                chatroom: chatroomId,
                user: socket.userId,
                message
            });
            io.to(chatroomId).emit('newMessage', {
                message,
                name: user.name,
                userId: socket.userId
            });

            await newMessage.save();
        }
    });
});

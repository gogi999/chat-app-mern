import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    chatroom: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Chatroom is required!',
        ref: 'Chatroom'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'User is required!',
        ref: 'User'
    },
    message: {
        type: String,
        required: 'Message is required!'
    },
}, { timestamp: true });

export default mongoose.model('Message', messageSchema);

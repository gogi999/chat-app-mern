import Chatroom from '../models/chatroom.model.js';

export const createChatroom = async (req, res) => {
    const { name } = req.body;

    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(name)) throw 'Chatroom name can contain only alphabets!';

    const chatroomExists = await Chatroom.findOne({ name });

    if (chatroomExists) throw 'Chatroom with that name already exists!';

    const chatroom = new Chatroom({
        name,
    });

    await chatroom.save();

    res.json({
        message: 'Chatroom created!',
    });
}

export const getAllChatrooms = async (req, res) => {
    const chatrooms = await Chatroom.find({});

    res.json(chatrooms);
}

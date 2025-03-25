const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); // Import Message model

// Store a new message
router.post('/', async (req, res) => {
    try {
        const { sender, receiver, text } = req.body;

        if (!sender || !receiver || !text) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newMessage = new Message({ sender, receiver, text });
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get messages between two users
// Get messages between two users (using POST)
router.post('/get', async (req, res) => {
    try {
        const { sender, receiver } = req.body;

        if (!sender || !receiver) {
            return res.status(400).json({ error: 'Sender and receiver are required' });
        }

        const messages = await Message.find({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender },
            ],
        }).sort({ timestamp: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;

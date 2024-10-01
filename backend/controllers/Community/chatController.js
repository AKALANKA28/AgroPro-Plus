// controllers/chatController.js
const Chat = require("../../models/community/chatModel");

// Get all chat messages
exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new chat message
exports.createChat = async (req, res) => {
  const chat = new Chat(req.body)({
    sender: req.body.sender,
    receiver: req.body.receiver,
    message: req.body.message,
    timestamp: req.body.timestamp
  });
  try {
    const newChat = await chat.save();
    res.status(201).json(newChat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a chat message
exports.updateChat = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findByIdAndUpdate(id, req.body, { new: true });
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.status(200).json(chat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a chat message
exports.deleteChat = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findByIdAndDelete(id);
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.status(200).json({ message: "Chat deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

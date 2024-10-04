<<<<<<< Updated upstream
// controllers/postController.js
const Post = require("../../models/community/postModel");

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new post
exports.addPost = async (req, res) => {
  //const { text, image } = req.body;

  // if (!text) {
  //   return res.status(400).json({ message: "Text is required" });
  // }

  const post = new Post({
    text: req.body.text,
    image: req.body.image,
   });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  const { text, image } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.text = text || post.text;
    post.image = image || post.image;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
};
=======
const express = require('express');
const multer = require('multer');
const router = express.Router();
const Post = require('../models/postModel'); // Assuming you have a Post model

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Add a new post
router.post('/', upload.single('image'), async (req, res) => {
  const { text } = req.body;
  const image = req.file ? req.file.filename : null;

  const newPost = new Post({ text, image });

  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    res.status(500).json({ error: 'Error saving post' });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

// Update a post
router.put('/:id', async (req, res) => {
  const { text } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, { text }, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Error updating post' });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post' });
  }
});

module.exports = router;
>>>>>>> Stashed changes

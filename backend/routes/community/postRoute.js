<<<<<<< Updated upstream
// routes/postRoute.js
const express = require("express");
const router = express.Router();
const postController = require("../../controllers/Community/postController");

// Get all posts
router.get("/", postController.getPosts);

// Add a new post
router.post("/", postController.addPost);

// Update a post
router.put("/:id", postController.updatePost);

// Delete a post
router.delete("/:id", postController.deletePost);
=======
const express = require('express');
const router = express.Router();
const multer = require('multer');
const postController = require('../../controllers/Community/postController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store the images in the uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Generate unique filenames
  }
});

const upload = multer({ storage });

// Get all posts
router.get('/', postController.getPosts);

// Add a new post with an image
router.post('/', upload.single('image'), postController.addPost);

// Update a post with a new image
router.put('/:id', upload.single('image'), postController.updatePost);

// Delete a post
router.delete('/:id', postController.deletePost);
>>>>>>> Stashed changes

module.exports = router;

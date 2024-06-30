const express = require('express');
const router = express.Router();
const { createBlog, getBlogs } = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');
const { getBlogsByCategory } = require('../controllers/blogController');

router.get('/category/:category', getBlogsByCategory);

router.post('/', authMiddleware, createBlog); // Apply middleware to protect this route
router.get('/', getBlogs);

module.exports = router;

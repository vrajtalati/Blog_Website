const express = require('express');
const router = express.Router();
const { createBlog, getBlogs, getBlogsByCategory, searchBlogs } = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/category/:category', getBlogsByCategory);

router.post('/', authMiddleware, createBlog); 
router.get('/', getBlogs);
router.get('/search', searchBlogs); 

module.exports = router;

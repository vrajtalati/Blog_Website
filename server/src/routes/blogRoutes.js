// src/routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createBlog, getBlogs } = require('../controllers/blogController');

router.post('/', authMiddleware, createBlog);
router.get('/', getBlogs);

module.exports = router;

// src/controllers/blogController.js
const Blog = require('../models/Blog');

const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newBlog = new Blog({
            title,
            content,
            author: req.user.id
        });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        console.error('Error creating blog:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username');
        res.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createBlog, getBlogs };


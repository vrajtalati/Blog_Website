// src/components/BlogPage.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogs } from '../features/blogSlice';
import { Container, Typography, Box } from '@mui/material';

const BlogPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const blog = useSelector((state) =>
        state.blogs.blogs.find((blog) => blog.id === id)
    );

    useEffect(() => {
        if (!blog) {
            dispatch(fetchBlogs());
        }
    }, [blog, dispatch, id]);

    if (!blog) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container>
            <Typography variant="h2" component="h1" gutterBottom>
                {blog.title}
            </Typography>
            <Typography variant="body1" component="div">
                <Box dangerouslySetInnerHTML={{ __html: blog.content }} />
            </Typography>
            <Typography variant="caption">
                {new Date(blog.publishedDate).toLocaleDateString()} by {blog.author}
            </Typography>
        </Container>
    );
};

export default BlogPage;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../features/blogSlice';
import { Container, Grid, Typography, Box } from '@mui/material';
import BlogCard from './BlogCard';
import Sidebar from './Sidebar';

const HomePage = () => {
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs.blogs);
    const status = useSelector((state) => state.blogs.status);
    const error = useSelector((state) => state.blogs.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchBlogs());
        }
    }, [status, dispatch]);

    return (
        <Container sx={{ py: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Sidebar />
                </Grid>
                <Grid item xs={12} md={9}>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Featured Blogs
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Discover the latest blogs from various categories
                        </Typography>
                    </Box>
                    {status === 'loading' && <Typography>Loading...</Typography>}
                    {error && <Typography color="error">Error: {error}</Typography>}
                    <Grid container spacing={3}>
                        {blogs.map((blog) => (
                            <Grid item xs={12} sm={6} md={4} key={blog.id}>
                                <BlogCard blog={blog} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;

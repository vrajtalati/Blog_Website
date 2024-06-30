import React from 'react';
import { Card, CardContent, CardMedia, Typography, Link } from '@mui/material';

const BlogCard = ({ blog }) => {
    return (
        <Card 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxShadow: 3,
                '&:hover': {
                    boxShadow: 6,
                },
            }}
        >
            {blog.image && (
                <CardMedia
                    component="img"
                    image={blog.image}
                    alt={blog.title}
                    height="200"
                    sx={{ objectFit: 'cover' }}
                />
            )}
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                    <Link href={`/blogs/${blog.id}`} underline="hover" color="inherit">
                        {blog.title}
                    </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {blog.content}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {new Date(blog.publishedDate).toLocaleDateString()}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default BlogCard;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardActionArea } from '@mui/material';

const CategoryPage = () => {
  const { category } = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(`http://localhost:5000/api/blogs/category/${category}`);
      const data = await response.json();
      setBlogs(data);
    };

    fetchBlogs();
  }, [category]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {category} Blogs
      </Typography>
      {blogs.map((blog) => (
        <Card key={blog._id} sx={{ marginBottom: 2 }}>
          <CardActionArea component={Link} to={`/blog/${blog._id}`}>
            <CardContent>
              <Typography variant="h5">{blog.title}</Typography>
              <Typography variant="body2">{blog.content}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};

export default CategoryPage;

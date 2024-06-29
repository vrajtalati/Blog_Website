import React from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const categories = ['Technology', 'Travel', 'Food', 'Lifestyle'];

const Sidebar = () => {
    return (
        <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
                Categories
            </Typography>
            <List>
                {categories.map((category) => (
                    <ListItem key={category} component={Link} to={`/category/${category}`} button>
                        <ListItemText primary={category} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Sidebar;

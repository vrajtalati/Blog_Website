import React from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const categories = ['Technology', 'Travel', 'Food', 'Lifestyle'];

const Sidebar = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                padding: 2,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                height: '100%',
                color: theme.palette.text.primary,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Categories
            </Typography>
            <List>
                {categories.map((category) => (
                    <ListItem
                        key={category}
                        component={Link}
                        to={`/category/${category}`}
                        button
                        sx={{
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                            },
                            color: theme.palette.text.primary,
                        }}
                    >
                        <ListItemText primary={category} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Sidebar;

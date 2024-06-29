import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';

const NavBar = () => {
    const theme = useTheme();

    const buttonStyles = {
        homeButton: {
            color: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.contrastText,
            borderColor: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.contrastText,
            textTransform: 'none',
            '&:hover': {
                borderColor: theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.primary.light,
                backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.primary.dark,
            }
        },
        createButton: {
            color: theme.palette.mode === 'light' ? theme.palette.primary.contrastText : theme.palette.primary.main,
            backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.contrastText,
            textTransform: 'none',
            '&:hover': {
                backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.primary.light,
            }
        }
    };

    const handleThemeChange = () => {
        // Logic to change theme mode is handled by ThemeProviderWrapper
    };

    return (
        <Box
            component="nav"
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 20px',
                backgroundColor: theme.palette.mode === 'light' ? 'white' : theme.palette.primary.dark,
                mb: 3,
                borderRadius: 1,
                boxShadow: 1,
            }}
        >
            <Button
                component={Link}
                to="/"
                variant="outlined"
                sx={buttonStyles.homeButton}
            >
                Home
            </Button>
            <Button
                component={Link}
                to="/create"
                variant="contained"
                sx={buttonStyles.createButton}
            >
                Create Blog
            </Button>
            <IconButton onClick={handleThemeChange} sx={{ color: 'inherit' }}>
                {theme.palette.mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
        </Box>
    );
};

export default NavBar;

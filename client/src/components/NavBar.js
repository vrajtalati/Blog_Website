import React, { useState } from 'react';
import { Box, Button, IconButton, TextField, Autocomplete } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../features/themeSlice';
import axios from 'axios';

const NavBar = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.theme.mode);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

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
        },
        logoutButton: {
            color: theme.palette.mode === 'light' ? theme.palette.primary.contrastText : theme.palette.primary.main,
            backgroundColor: theme.palette.mode === 'light' ? theme.palette.error.main : theme.palette.error.contrastText,
            textTransform: 'none',
            '&:hover': {
                backgroundColor: theme.palette.mode === 'light' ? theme.palette.error.dark : theme.palette.error.light,
            }
        }
    };

    const handleThemeChange = () => {
        dispatch(toggleTheme());
    };

    const handleSearchChange = async (event) => {
        const query = event.target.value;
        setSearchTerm(query);
        if (query.length > 2) {
            try {
                const response = await axios.get(`http://localhost:5000/api/blogs/search?query=${query}`);
                setSearchResults(response.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchSelect = (event, value) => {
        if (value) {
            window.location.href = `/blogs/${value.id}`;
        }
    };

    const handleLogout = () => {
        // Clear authentication tokens or session data
        localStorage.removeItem('authToken');
        // Redirect to login page
        navigate('/auth');
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
                to="/home"
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
            <Autocomplete
                freeSolo
                options={searchResults}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Blogs"
                        variant="outlined"
                        onChange={handleSearchChange}
                        value={searchTerm}
                    />
                )}
                onChange={handleSearchSelect}
                sx={{ width: 300, marginRight: 2 }}
            />
            <IconButton onClick={handleThemeChange} sx={{ color: 'inherit' }}>
                {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
            <Button
                onClick={handleLogout}
                variant="contained"
                sx={buttonStyles.logoutButton}
            >
                Logout
            </Button>
        </Box>
    );
};

export default NavBar;

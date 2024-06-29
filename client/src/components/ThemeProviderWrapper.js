import React, { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { IconButton, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ThemeProviderWrapper = ({ children }) => {
    const [mode, setMode] = useState('light');

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        main: '#1976d2',
                        dark: '#115293',
                        light: '#4791db',
                        contrastText: '#ffffff',
                    },
                    background: {
                        default: mode === 'light' ? '#ffffff' : '#121212',
                        paper: mode === 'light' ? '#ffffff' : '#1c1c1c',
                    },
                    text: {
                        primary: mode === 'light' ? '#000000' : '#ffffff',
                    },
                },
            }),
        [mode]
    );

    useEffect(() => {
        const savedMode = localStorage.getItem('themeMode') || 'light';
        setMode(savedMode);
    }, []);

    useEffect(() => {
        localStorage.setItem('themeMode', mode);
    }, [mode]);

    const handleThemeChange = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
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
                <IconButton onClick={handleThemeChange} sx={{ color: 'inherit' }}>
                    {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
            </Box>
            {children}
        </ThemeProvider>
    );
};

export default ThemeProviderWrapper;

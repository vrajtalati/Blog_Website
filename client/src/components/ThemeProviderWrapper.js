import React, { useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../features/themeSlice';

const ThemeProviderWrapper = ({ children }) => {
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.theme.mode);

    useEffect(() => {
        const savedMode = localStorage.getItem('themeMode') || 'light';
        dispatch(setTheme(savedMode));
    }, [dispatch]);

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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default ThemeProviderWrapper;

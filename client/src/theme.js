import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
            dark: '#115293',
            light: '#4791db',
        },
        secondary: {
            main: '#dc004e',
            dark: '#9a0036',
            light: '#ff4081',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial',
        button: {
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    padding: '10px 20px',
                },
            },
        },
    },
});

export default theme;

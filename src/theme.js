import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#f59e0b', // Amber 500
            light: '#fef3c7', // Amber 100
            dark: '#d97706',  // Amber 600
        },
        background: {
            default: '#fafafa',
            paper: '#ffffff',
        },
        text: {
            primary: '#1a1a2e',
            secondary: '#666666',
        },
        divider: '#f0f0f5', // Gentle zinc-100 equivalent
    },
    typography: {
        fontFamily: '"Inter", "Geist", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 800,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontWeight: 800,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontWeight: 700,
        },
        h4: {
            fontWeight: 700,
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12, // More pronounced, modern rounded corners like the 'glass-card'
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    border: '1px solid #f0f0f5',
                    boxShadow: '0 2px 10px -3px rgba(0, 0, 0, 0.06)',
                    borderRadius: 16,
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    transition: 'background-color 0.18s cubic-bezier(0.4,0,0.2,1)',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 16, // Pill shaped search bars
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    '&:before': {
                        display: 'none',
                    },
                },
            },
        },
    },
});

export default theme;

import { createTheme } from '@mui/material/styles';

// Neumorphic Soft UI Design Tokens (Sea Green Light + Cloudy White)
// - Background/Base: #E4EDE8 (Sea Green Light)
// - Paper/Card Surface: #F2F6F4 (Cloudy White)
// - Text Primary: #2A3A31 (Deep forest sea green)
// - Text Secondary: #55685C (Medium sea green grey)
// - Accent Primary: #7C3AED (Purple)

const getNeumorphicTokens = () => ({
    palette: {
        mode: 'light',
        primary: {
            main: '#7C3AED',
            light: '#9F67FF',
            dark: '#6D28D9',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#E4EDE8',
            contrastText: '#2A3A31',
        },
        background: {
            default: '#E4EDE8',
            paper: '#F2F6F4',
        },
        text: {
            primary: '#2A3A31',
            secondary: '#55685C',
        },
        error: {
            main: '#E11D48',
            contrastText: '#FFFFFF',
        },
        divider: 'rgba(189, 201, 193, 0.4)',
    },
    typography: {
        fontFamily: 'var(--font-body), sans-serif',
        h1: { fontFamily: 'var(--font-display), sans-serif', fontWeight: 800 },
        h2: { fontFamily: 'var(--font-display), sans-serif', fontWeight: 800 },
        h3: { fontFamily: 'var(--font-display), sans-serif', fontWeight: 700 },
        h4: { fontWeight: 700 },
        h5: { fontWeight: 700 },
        h6: { fontWeight: 700 },
        button: { textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' },
    },
    shape: { borderRadius: 16 },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#E4EDE8',
                    color: '#2A3A31',
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    padding: '10px 22px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    boxShadow: '5px 5px 10px rgba(189, 201, 193, 0.75), -5px -5px 10px rgba(255, 255, 255, 0.85)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    backgroundColor: '#E4EDE8',
                    color: '#2A3A31',
                    border: 'none',
                    '&:hover': {
                        backgroundColor: '#E4EDE8',
                        transform: 'translateY(-1px)',
                        boxShadow: '8px 8px 16px rgba(189, 201, 193, 0.8), -8px -8px 16px rgba(255, 255, 255, 0.9)',
                    },
                    '&:active': {
                        transform: 'translateY(0.5px)',
                        boxShadow: 'inset 4px 4px 8px rgba(189, 201, 193, 0.8), inset -4px -4px 8px rgba(255, 255, 255, 0.8)',
                    },
                },
                contained: {
                    background: '#7C3AED',
                    color: '#FFFFFF',
                    boxShadow: '5px 5px 10px rgba(124, 58, 237, 0.35), -5px -5px 10px rgba(255, 255, 255, 0.6)',
                    '&:hover': {
                        background: '#8B5CF6',
                        boxShadow: '8px 8px 16px rgba(124, 58, 237, 0.45), -8px -8px 16px rgba(255, 255, 255, 0.7)',
                    },
                    '&:active': {
                        background: '#6D28D9',
                        boxShadow: 'inset 4px 4px 8px rgba(58, 20, 120, 0.5), inset -4px -4px 8px rgba(255, 255, 255, 0.25)',
                    }
                },
                outlined: {
                    color: '#7C3AED',
                    background: 'transparent',
                    border: '1px solid #7C3AED',
                    boxShadow: 'none',
                    '&:hover': {
                        background: 'rgba(124, 58, 237, 0.05)',
                        border: '1px solid #8B5CF6',
                        boxShadow: 'none',
                    },
                    '&:active': {
                        background: 'rgba(124, 58, 237, 0.1)',
                    }
                },
                text: {
                    color: '#2A3A31',
                    boxShadow: 'none',
                    background: 'transparent',
                    '&:hover': {
                        background: 'rgba(42, 58, 49, 0.05)',
                        boxShadow: 'none',
                        transform: 'none',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '24px',
                    background: '#F2F6F4', // Cloudy White
                    boxShadow: '9px 9px 18px rgba(189, 201, 193, 0.65), -9px -9px 18px rgba(255, 255, 255, 0.95)',
                    border: 'none',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    background: '#F2F6F4', // Cloudy White
                    borderRadius: '24px',
                    boxShadow: '9px 9px 18px rgba(189, 201, 193, 0.65), -9px -9px 18px rgba(255, 255, 255, 0.95)',
                    border: 'none',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: '#E4EDE8',
                    color: '#2A3A31',
                    boxShadow: '9px 9px 18px rgba(189, 201, 193, 0.75), -9px -9px 18px rgba(255, 255, 255, 0.85)',
                    borderBottom: 'none',
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    fontFamily: 'var(--font-body), sans-serif',
                    background: '#E4EDE8', // Sea Green Light inset
                    color: '#2A3A31',
                    boxShadow: 'inset 4px 4px 8px rgba(189, 201, 193, 0.75), inset -4px -4px 8px rgba(255, 255, 255, 0.85)',
                    transition: 'all 0.3s ease',
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '&.Mui-focused': {
                        boxShadow: 'inset 6px 6px 12px rgba(189, 201, 193, 0.85), inset -6px -6px 12px rgba(255, 255, 255, 0.95)',
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: '1.5px solid #7C3AED',
                        }
                    },
                },
                notchedOutline: {
                    border: 'none',
                }
            }
        }
    },
});

export const lightTheme = createTheme(getNeumorphicTokens());
export const darkTheme = createTheme(getNeumorphicTokens()); // Light mode globally in this design system

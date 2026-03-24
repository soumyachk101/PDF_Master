import { createTheme } from '@mui/material/styles';

// Colors requested by User for Light Mode:
// 1. Dark Sea Green: #347B60 (RGB: 52, 123, 96) (Primary UI element)
// 2. Gainsboro White: #DCDCDC (RGB: 220, 220, 220) (Backgrounds globally)
// 3. Blackish Purple: #240F30 (RGB: 36, 15, 48) (Typography and heavy icons)

const getModernTokens = (mode) => ({
    palette: {
        mode,
        primary: {
            main: mode === 'light' ? '#347B60' : '#F05B25',
            light: mode === 'light' ? 'rgba(52, 123, 96, 0.8)' : '#F47B4F',
            dark: mode === 'light' ? 'rgba(52, 123, 96, 1)' : '#D04412',
            contrastText: mode === 'light' ? '#DCDCDC' : '#FFFFFF',
        },
        secondary: {
            main: mode === 'light' ? '#240F30' : '#40A9F6', 
            light: mode === 'light' ? 'rgba(36, 15, 48, 0.8)' : '#6FBEF8',
            dark: mode === 'light' ? 'rgba(36, 15, 48, 1)' : '#218BE1',
            contrastText: mode === 'light' ? '#DCDCDC' : '#FFFFFF',
        },
        background: {
            default: mode === 'light' ? '#DCDCDC' : '#000000', 
            paper: mode === 'light' ? 'rgba(220, 220, 220, 0.6)' : '#0A0A0A', 
        },
        text: {
            primary: mode === 'light' ? '#240F30' : '#EEE1D0', 
            secondary: mode === 'light' ? 'rgba(36, 15, 48, 0.7)' : 'rgba(238, 225, 208, 0.7)', 
        },
        divider: mode === 'light' ? 'rgba(36, 15, 48, 0.15)' : 'rgba(238, 225, 208, 0.1)', 
    },
    typography: {
        fontFamily: '"Inter", "Space Grotesk", sans-serif',
        h1: { fontWeight: 900, letterSpacing: '-0.06em' },
        h2: { fontWeight: 800, letterSpacing: '-0.04em' },
        h3: { fontWeight: 800, letterSpacing: '-0.03em' },
        h4: { fontWeight: 700, letterSpacing: '-0.02em' },
        h5: { fontWeight: 700, letterSpacing: '-0.01em' },
        h6: { fontWeight: 600 },
        button: { textTransform: 'none', fontWeight: 700, letterSpacing: '0.02em' },
    },
    shape: { borderRadius: 16 },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: mode === 'light' ? '#DCDCDC' : '#000000',
                    color: mode === 'light' ? '#240F30' : '#EEE1D0',
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    padding: '12px 28px',
                    fontWeight: 800,
                    textTransform: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: 'none',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                    },
                    '&:active': {
                        transform: 'translateY(1px)',
                    },
                },
                contained: {
                    background: mode === 'light' ? '#347B60' : '#F05B25',
                    color: mode === 'light' ? '#DCDCDC' : '#FFFFFF',
                    boxShadow: mode === 'light' 
                        ? '0 10px 25px -5px rgba(52, 123, 96, 0.3)' 
                        : '0 10px 30px -5px rgba(240, 91, 37, 0.4)',
                    '&:hover': {
                        background: mode === 'light' ? 'rgba(52, 123, 96, 0.9)' : '#F47B4F',
                        boxShadow: mode === 'light' 
                            ? '0 20px 35px -5px rgba(52, 123, 96, 0.4)' 
                            : '0 20px 40px -5px rgba(240, 91, 37, 0.6)',
                    },
                },
                outlined: {
                    border: `1.5px solid ${mode === 'light' ? 'rgba(52, 123, 96, 0.3)' : 'rgba(238, 225, 208, 0.2)'}`,
                    color: mode === 'light' ? '#347B60' : '#EEE1D0',
                    background: mode === 'light' ? 'rgba(220, 220, 220, 0.4)' : 'rgba(20, 20, 20, 0.5)',
                    backdropFilter: 'blur(12px)',
                    '&:hover': {
                        background: mode === 'light' ? 'rgba(52, 123, 96, 0.08)' : 'rgba(238, 225, 208, 0.08)',
                        border: `1.5px solid ${mode === 'light' ? '#347B60' : 'rgba(238, 225, 208, 0.4)'}`,
                    },
                },
                text: {
                    color: mode === 'light' ? '#347B60' : '#EEE1D0',
                    '&:hover': {
                        background: mode === 'light' ? 'rgba(52, 123, 96, 0.08)' : 'rgba(238, 225, 208, 0.08)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '24px',
                    background: mode === 'light' ? 'rgba(220, 220, 220, 0.5)' : 'rgba(20, 20, 20, 0.6)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    border: `1px solid ${mode === 'light' ? 'rgba(36, 15, 48, 0.15)' : 'rgba(238, 225, 208, 0.1)'}`,
                    boxShadow: mode === 'light' 
                        ? '0 8px 32px -8px rgba(36, 15, 48, 0.08)'
                        : '0 8px 32px -8px rgba(0, 0, 0, 0.6)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-6px) scale(1.01)',
                        boxShadow: mode === 'light'
                            ? '0 24px 48px -12px rgba(52, 123, 96, 0.18)'
                            : '0 24px 48px -12px rgba(0, 0, 0, 0.8), 0 0 40px -10px rgba(240, 91, 37, 0.15)',
                        border: `1px solid ${mode === 'light' ? 'rgba(52, 123, 96, 0.3)' : 'rgba(240, 91, 37, 0.4)'}`,
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    background: mode === 'light' ? 'rgba(220, 220, 220, 0.8)' : 'rgba(20, 20, 20, 0.8)',
                    backdropFilter: 'blur(20px)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: mode === 'light' ? 'rgba(220, 220, 220, 0.85)' : 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    color: mode === 'light' ? '#240F30' : '#EEE1D0',
                    boxShadow: 'none',
                    borderBottom: `1px solid ${mode === 'light' ? 'rgba(36, 15, 48, 0.1)' : 'rgba(238, 225, 208, 0.08)'}`,
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
                    transition: 'all 0.3s ease',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: mode === 'light' ? 'rgba(36, 15, 48, 0.3)' : 'rgba(238, 225, 208, 0.3)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: mode === 'light' ? '#347B60' : '#F05B25',
                        borderWidth: '2px',
                    },
                },
                notchedOutline: {
                    borderColor: mode === 'light' ? 'rgba(36, 15, 48, 0.15)' : 'rgba(238, 225, 208, 0.15)',
                }
            }
        }
    },
});

export const lightTheme = createTheme(getModernTokens('light'));
export const darkTheme = createTheme(getModernTokens('dark'));

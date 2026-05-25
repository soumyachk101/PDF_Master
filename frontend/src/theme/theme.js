import { createTheme } from '@mui/material/styles';

// Industrial Skeuomorphism Design principles:
// - Primary Accent: #ff4757 (Safety orange-red)
// - Chassis: #e0e5ec (Tactile grey background)
// - Recessed: #d1d9e6 (Input wells and recessed shadows)
// - Ink: #2d3436 (Primary text ink)
// - Muted Ink: #4a5568 (Secondary text labels)
// - Shadow Light: #ffffff (Neumorphic diffuse highlight)
// - Shadow Dark: #babecc (Neumorphic soft shadow)

const getModernTokens = (mode) => ({
    palette: {
        mode,
        primary: {
            main: '#ff4757',
            light: '#ff6b7b',
            dark: '#cc3946',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#e0e5ec',
            contrastText: '#2d3436',
        },
        background: {
            default: '#e0e5ec',
            paper: '#e0e5ec',
        },
        text: {
            primary: '#2d3436',
            secondary: '#4a5568',
        },
        divider: '#a3b1c6',
    },
    typography: {
        fontFamily: '"Inter", "JetBrains Mono", "Roboto", sans-serif',
        h1: { fontWeight: 800, letterSpacing: '-0.04em' },
        h2: { fontWeight: 800, letterSpacing: '-0.03em' },
        h3: { fontWeight: 700, letterSpacing: '-0.02em' },
        h4: { fontWeight: 700 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: { textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' },
    },
    shape: { borderRadius: 8 },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#e0e5ec',
                    color: '#2d3436',
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    padding: '12px 28px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    boxShadow: '4px 4px 10px #babecc, -4px -4px 10px #ffffff',
                    transition: 'all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    border: 'none',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '6px 6px 14px #babecc, -6px -6px 14px #ffffff',
                    },
                    '&:active': {
                        transform: 'translateY(1px)',
                        boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff',
                    },
                },
                contained: {
                    background: '#ff4757',
                    color: '#FFFFFF',
                    boxShadow: '4px 4px 10px rgba(255, 71, 87, 0.3), -4px -4px 10px rgba(255, 255, 255, 0.8)',
                    '&:hover': {
                        background: '#ff2e44',
                        boxShadow: '6px 6px 14px rgba(255, 71, 87, 0.4), -6px -6px 14px rgba(255, 255, 255, 0.8)',
                    },
                    '&:active': {
                        background: '#cc3946',
                        boxShadow: 'inset 3px 3px 6px rgba(0, 0, 0, 0.2)',
                    }
                },
                outlined: {
                    border: 'none',
                    color: '#2d3436',
                    background: '#e0e5ec',
                    boxShadow: '4px 4px 10px #babecc, -4px -4px 10px #ffffff',
                    '&:hover': {
                        background: '#e0e5ec',
                        border: 'none',
                        boxShadow: '6px 6px 14px #babecc, -6px -6px 14px #ffffff',
                    },
                    '&:active': {
                        boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff',
                    }
                },
                text: {
                    color: '#2d3436',
                    border: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                        background: 'rgba(45, 52, 70, 0.05)',
                        transform: 'none',
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    background: '#e0e5ec',
                    border: 'none',
                    boxShadow: '9px 9px 16px #babecc, -9px -9px 16px #ffffff',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '14px 14px 24px #babecc, -14px -14px 24px #ffffff',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    background: '#e0e5ec',
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '9px 9px 16px #babecc, -9px -9px 16px #ffffff',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: '#e0e5ec',
                    color: '#2d3436',
                    boxShadow: '0 4px 12px rgba(186, 190, 204, 0.5)',
                    borderBottom: 'none',
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono), monospace',
                    background: '#e0e5ec',
                    boxShadow: 'inset 2px 2px 5px #babecc, inset -2px -2px 5px #ffffff',
                    transition: 'all 0.2s ease',
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '&.Mui-focused': {
                        boxShadow: 'inset 2px 2px 5px #babecc, inset -2px -2px 5px #ffffff, 0 0 0 2px #ff4757',
                    },
                },
                notchedOutline: {
                    border: 'none',
                }
            }
        }
    },
});

export const lightTheme = createTheme(getModernTokens('light'));
export const darkTheme = createTheme(getModernTokens('light')); // Force Light Mode globally

import { createTheme } from '@mui/material/styles';

// Bauhaus Design Principles Colors:
// - Primary: #D02020 (Bauhaus Red)
// - Secondary: #1040C0 (Bauhaus Blue)
// - Yellow: #F0C020 (Bauhaus Yellow)
// - Background: #F0F0F0 (Bauhaus Off-White)
// - Surface: #FFFFFF (White)
// - Ink/Borders: #121212 (Dark Gray/Black)

const getModernTokens = (mode) => ({
    palette: {
        mode,
        primary: {
            main: '#D02020',
            light: '#E04D4D',
            dark: '#901616',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#1040C0',
            light: '#3B66D6',
            dark: '#0B2C8A',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#F0F0F0',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#121212',
            secondary: '#404040',
        },
        divider: '#121212',
    },
    typography: {
        fontFamily: '"Space Grotesk", "Plus Jakarta Sans", "Inter", sans-serif',
        h1: { fontWeight: 900, letterSpacing: '-0.06em' },
        h2: { fontWeight: 800, letterSpacing: '-0.04em' },
        h3: { fontWeight: 800, letterSpacing: '-0.03em' },
        h4: { fontWeight: 700, letterSpacing: '-0.02em' },
        h5: { fontWeight: 700, letterSpacing: '-0.01em' },
        h6: { fontWeight: 600 },
        button: { textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' },
    },
    shape: { borderRadius: 0 },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#F0F0F0',
                    color: '#121212',
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '0px',
                    padding: '12px 28px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    border: '3px solid #121212',
                    boxShadow: '4px 4px 0px 0px #121212',
                    transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    '&:hover': {
                        transform: 'translate(2px, 2px)',
                        boxShadow: '2px 2px 0px 0px #121212',
                    },
                    '&:active': {
                        transform: 'translate(4px, 4px)',
                        boxShadow: 'none',
                    },
                },
                contained: {
                    background: '#D02020',
                    color: '#FFFFFF',
                    '&:hover': {
                        background: '#B01A1A',
                    },
                },
                outlined: {
                    border: '3px solid #121212',
                    color: '#121212',
                    background: '#FFFFFF',
                    '&:hover': {
                        background: '#F0F0F0',
                        border: '3px solid #121212',
                    },
                },
                text: {
                    color: '#121212',
                    border: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                        background: 'rgba(18, 18, 18, 0.05)',
                        transform: 'none',
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '0px',
                    background: '#FFFFFF',
                    border: '4px solid #121212',
                    boxShadow: '8px 8px 0px 0px #121212',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    '&:hover': {
                        transform: 'translate(-2px, -2px)',
                        boxShadow: '10px 10px 0px 0px #121212',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    background: '#FFFFFF',
                    borderRadius: '0px',
                    border: '4px solid #121212',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: '#F0F0F0',
                    color: '#121212',
                    boxShadow: 'none',
                    borderBottom: '4px solid #121212',
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    borderRadius: '0px',
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '0px',
                    transition: 'all 0.2s ease',
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: '3px solid #121212',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1040C0',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#D02020',
                        borderWidth: '3px',
                    },
                },
                notchedOutline: {
                    borderColor: '#121212',
                }
            }
        }
    },
});

export const lightTheme = createTheme(getModernTokens('light'));
export const darkTheme = createTheme(getModernTokens('light')); // Force Light Mode globally

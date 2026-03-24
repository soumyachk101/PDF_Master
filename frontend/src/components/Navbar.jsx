import { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Box, Button, IconButton, Typography, useTheme, Card, Grid, Container } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ChevronDown, Moon, Sun, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { CATEGORIES, getToolsByCategory } from '../utils/tools';
import { useColorMode } from '../contexts/ColorModeContext';
import { springPhysics } from '../animations/variants';

const Logo = ({ color }) => (
    <Box sx={{ position: 'relative', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="30" height="30" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.rect 
                x="8" y="4" width="20" height="24" rx="6" 
                fill={alpha(color, 0.2)} 
                stroke={color} 
                strokeWidth="1.5"
                animate={{ x: [8, 10, 8], y: [4, 2, 4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.rect 
                x="4" y="8" width="20" height="24" rx="6" 
                fill={color} 
                stroke={color} 
                strokeWidth="1.5"
                animate={{ x: [4, 2, 4], y: [8, 10, 8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <path d="M10 16H18" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
            <path d="M10 20H15" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
            <path d="M10 24H18" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        </svg>
    </Box>
);

export default function Navbar() {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { mode, toggleColorMode } = useColorMode();
    const isDark = mode === 'dark';
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);
    const dropdownRef = useRef(null);

    // Primary dynamic color for branding accents
    const primaryColor = theme.palette.primary.main;

    const categorizedTools = useMemo(() => {
        return CATEGORIES.filter(c => c.id !== 'all').map(category => ({
            ...category,
            tools: getToolsByCategory(category.id)
        }));
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navLinks = [
        { name: 'Features', path: '/#features' },
        { name: 'About', path: '/#about' }
    ];

    const handleClickLink = (path) => {
        if (path.startsWith('/#')) {
            const el = document.getElementById(path.substring(2));
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else navigate(path);
        } else {
            navigate(path);
        }
    };

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                background: 'transparent',
                pointerEvents: 'none', // Allows clicking through the empty margins
                zIndex: theme.zIndex.drawer + 1,
                pt: { xs: 2, md: 3 },
            }}
        >
            <Container maxWidth="xl" sx={{ pointerEvents: 'auto' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: { xs: '64px', md: scrolled ? '64px' : '76px' },
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        px: { xs: 2.5, md: 4 },
                        borderRadius: '100px',
                        bgcolor: alpha(theme.palette.background.paper, 0.75),
                        backdropFilter: 'blur(24px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                        border: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.08 : 0.06)}`,
                        boxShadow: isDark 
                            ? '0 12px 32px -12px rgba(0,0,0,0.8)'
                            : '0 12px 32px -12px rgba(0,0,0,0.08)',
                    }}
                >
                    {/* Logo Section */}
                    <Box 
                        component={Link} 
                        to="/" 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1.5, 
                            textDecoration: 'none', 
                            color: 'inherit',
                            '&:hover .logo-svg': { scale: 1.05 }
                        }}
                    >
                        <Logo color={primaryColor} />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 900,
                                fontSize: '1.3rem',
                                letterSpacing: '-0.03em',
                                color: theme.palette.text.primary,
                                fontFamily: '"Space Grotesk", sans-serif',
                                display: { xs: 'none', sm: 'block' }
                            }}
                        >
                            <Box component="span" sx={{ color: primaryColor }}>DOC</Box>-SHIFT
                        </Typography>
                    </Box>

                    {/* Desktop Menu - Center Links */}
                    <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 1 }}>
                        <Box ref={dropdownRef} sx={{ position: 'relative' }}>
                            <Button
                                onMouseEnter={() => setIsMenuOpen(true)}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                endIcon={<motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }}><ChevronDown size={14} /></motion.div>}
                                sx={{ 
                                    fontWeight: 700, 
                                    color: isMenuOpen ? primaryColor : theme.palette.text.primary,
                                    borderRadius: '100px',
                                    px: 2.5,
                                    py: 1,
                                    fontSize: '0.9rem',
                                    transition: 'all 0.2s',
                                    background: isMenuOpen ? alpha(primaryColor, 0.08) : 'transparent',
                                    '&:hover': { background: alpha(theme.palette.text.primary, 0.04) },
                                }}
                            >
                                All Tools
                            </Button>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {isMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.98, filter: 'blur(4px)' }}
                                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, y: 15, scale: 0.98, filter: 'blur(4px)' }}
                                        onMouseLeave={() => setIsMenuOpen(false)}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ 
                                            position: 'absolute', 
                                            top: 'calc(100% + 20px)', 
                                            left: '50%', 
                                            transform: 'translateX(-50%)', 
                                            zIndex: 100 
                                        }}
                                    >
                                        <Card sx={{ 
                                            width: 1000, 
                                            p: 5, 
                                            borderRadius: '32px',
                                            boxShadow: isDark 
                                                ? '0 40px 100px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05)' 
                                                : '0 40px 100px -20px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
                                            border: 'none',
                                            bgcolor: isDark ? 'rgba(15, 17, 21, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                                            backdropFilter: 'blur(40px)',
                                        }}>
                                            <Grid container spacing={4}>
                                                {categorizedTools.map(category => {
                                                    const catTools = category.tools;
                                                    const catColor = catTools[0]?.color || primaryColor;
                                                    
                                                    return (
                                                        <Grid item xs={3} key={category.id}>
                                                            <Typography 
                                                                variant="overline" 
                                                                sx={{ 
                                                                    fontWeight: 900, 
                                                                    color: catColor, 
                                                                    letterSpacing: '0.08em', 
                                                                    mb: 2.5, 
                                                                    display: 'block',
                                                                    fontSize: '0.75rem'
                                                                }}
                                                            >
                                                                {category.label}
                                                            </Typography>
                                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                                {catTools.map(tool => (
                                                                    <Box 
                                                                        key={tool.slug} 
                                                                        onClick={() => { setIsMenuOpen(false); navigate(`/tool/${tool.slug}`); }}
                                                                        sx={{ 
                                                                            display: 'flex', 
                                                                            alignItems: 'center',
                                                                            cursor: 'pointer',
                                                                            py: 0.75,
                                                                            px: 1,
                                                                            mx: -1,
                                                                            borderRadius: '8px',
                                                                            transition: 'background 0.2s',
                                                                            '&:hover': {
                                                                                bgcolor: alpha(catColor, 0.08),
                                                                                '& .tool-text': { color: catColor, transform: 'translateX(4px)' }
                                                                            }
                                                                        }}
                                                                    >
                                                                        <Typography
                                                                            className="tool-text"
                                                                            sx={{
                                                                                color: 'text.primary',
                                                                                fontWeight: 600,
                                                                                fontSize: '0.88rem',
                                                                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                                            }}
                                                                        >
                                                                            {tool.name}
                                                                        </Typography>
                                                                        {tool.isNew && (
                                                                            <Box sx={{
                                                                                ml: 1.5, px: 0.8, py: 0.2, borderRadius: '4px',
                                                                                bgcolor: catColor, color: '#fff', fontSize: '10px', fontWeight: 900,
                                                                            }}>
                                                                                NEW
                                                                            </Box>
                                                                        )}
                                                                    </Box>
                                                                ))}
                                                            </Box>
                                                        </Grid>
                                                    );
                                                })}
                                            </Grid>
                                        </Card>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Box>

                        {navLinks.map((link) => (
                            <Box 
                                key={link.name}
                                onMouseEnter={() => setHoveredLink(link.name)}
                                onMouseLeave={() => setHoveredLink(null)}
                                sx={{ position: 'relative' }}
                            >
                                <Button 
                                    onClick={() => handleClickLink(link.path)}
                                    color="inherit" 
                                    sx={{ 
                                        fontWeight: 700, 
                                        color: theme.palette.text.primary, 
                                        borderRadius: '100px',
                                        px: 2.5,
                                        py: 1,
                                        fontSize: '0.9rem',
                                        zIndex: 2,
                                        '&:hover': { background: 'transparent' }
                                    }}
                                >
                                    {link.name}
                                </Button>
                                {hoveredLink === link.name && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        transition={springPhysics}
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            borderRadius: '100px',
                                            background: alpha(theme.palette.text.primary, 0.04),
                                            zIndex: 0
                                        }}
                                    />
                                )}
                            </Box>
                        ))}
                    </Box>

                    {/* Right side Actions */}
                    <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 2 }}>
                        <IconButton 
                            onClick={toggleColorMode} 
                            aria-label="Toggle Dark Mode"
                            sx={{ 
                                color: theme.palette.text.primary, 
                                bgcolor: alpha(theme.palette.divider, 0.03), 
                                border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                                '&:hover': { bgcolor: alpha(theme.palette.divider, 0.08) } 
                            }}
                        >
                            {isDark ? <Sun size={18} strokeWidth={2.2} /> : <Moon size={18} strokeWidth={2.2} />}
                        </IconButton>

                        <Button
                            variant="contained"
                            onClick={() => handleClickLink('/#tools')}
                            sx={{ 
                                borderRadius: '100px', 
                                px: 3.5, 
                                py: 1.2,
                                fontWeight: 800,
                                fontSize: '0.95rem',
                                bgcolor: primaryColor,
                                color: theme.palette.primary.contrastText,
                                boxShadow: `0 8px 24px -8px ${alpha(primaryColor, 0.5)}`,
                                '&:hover': { 
                                    bgcolor: theme.palette.primary.dark,
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            Start Using <Sparkles size={16} style={{ marginLeft: 8 }} />
                        </Button>
                    </Box>

                    {/* Mobile Toggle Icons */}
                    <Box sx={{ display: { xs: 'flex', lg: 'none' }, alignItems: 'center', gap: 1 }}>
                        <IconButton 
                            onClick={toggleColorMode} 
                            sx={{ color: theme.palette.text.primary }}
                        >
                            {isDark ? <Sun size={20} strokeWidth={2.5} /> : <Moon size={20} strokeWidth={2.5} />}
                        </IconButton>
                        <IconButton 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                            sx={{ color: theme.palette.text.primary }}
                        >
                            {isMobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
                        </IconButton>
                    </Box>
                </Box>
            </Container>

            {/* Mobile Menu Backdrop */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
                            backdropFilter: 'blur(12px)',
                            zIndex: 1999,
                            pointerEvents: 'auto'
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Menu Sidebar */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            maxWidth: '350px',
                            background: theme.palette.background.default,
                            zIndex: 2000,
                            borderLeft: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                            padding: '32px',
                            display: 'flex',
                            flexDirection: 'column',
                            pointerEvents: 'auto',
                            boxShadow: '-20px 0 50px rgba(0,0,0,0.2)'
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Logo color={primaryColor} />
                                <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 900, fontFamily: '"Space Grotesk", sans-serif' }}>DOC-SHIFT</Typography>
                            </Box>
                            <IconButton onClick={() => setIsMobileMenuOpen(false)}>
                                <X size={24} color={theme.palette.text.primary} />
                            </IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {['Home', 'Features', 'Pricing', 'API'].map((item) => (
                                <Button 
                                    key={item}
                                    fullWidth 
                                    onClick={() => { setIsMobileMenuOpen(false); navigate(item === 'Home' ? '/' : `/#${item.toLowerCase()}`); }}
                                    sx={{ 
                                        justifyContent: 'flex-start', 
                                        py: 2, 
                                        px: 3,
                                        borderRadius: '12px',
                                        fontWeight: 700, 
                                        fontSize: '1.1rem', 
                                        color: theme.palette.text.primary,
                                        '&:hover': { background: alpha(primaryColor, 0.08), color: primaryColor }
                                    }}
                                >
                                    {item}
                                </Button>
                            ))}
                            
                            <Box sx={{ mt: 4 }}>
                                <Typography variant="overline" sx={{ fontWeight: 800, color: theme.palette.text.secondary, ml: 2, mb: 1.5, display: 'block' }}>CATEGORIES</Typography>
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, px: 2 }}>
                                    {CATEGORIES.filter(c => c.id !== 'all').map(category => (
                                        <Button
                                            key={category.id}
                                            onClick={() => { 
                                                setIsMobileMenuOpen(false); 
                                                navigate('/#tools');
                                            }}
                                            sx={{ 
                                                justifyContent: 'flex-start', 
                                                py: 1, 
                                                color: theme.palette.text.secondary,
                                                fontWeight: 600,
                                                fontSize: '0.85rem',
                                                borderRadius: '8px',
                                            }}
                                        >
                                            {category.label}
                                        </Button>
                                    ))}
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ mt: 'auto', pt: 4 }}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => { setIsMobileMenuOpen(false); navigate('/#tools'); }}
                                sx={{ 
                                    py: 2.5, 
                                    borderRadius: '16px', 
                                    fontWeight: 900, 
                                    bgcolor: primaryColor,
                                    color: theme.palette.primary.contrastText,
                                }}
                            >
                                Start Using Docs
                            </Button>
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>
        </AppBar>
    );
}

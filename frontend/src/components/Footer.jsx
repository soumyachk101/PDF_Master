import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Grid, Typography, Link, IconButton, useTheme } from '@mui/material';
import { CATEGORIES } from '../utils/tools';
import { Twitter, Github, MessageCircle } from 'lucide-react'; // mapped social icons
import { motion } from 'framer-motion';
// springPhysics, revealUp removed for lint

export default function Footer() {
    const theme = useTheme();
    const currentYear = new Date().getFullYear();

    return (
        <Box component="footer" sx={{
            position: 'relative',
            bgcolor: 'background.paper',
            pt: { xs: 8, md: 10 },
            pb: { xs: 4, md: 5 },
            transition: 'background-color 0.3s',
            overflow: 'hidden'
        }}>
            {/* Subtle top gradient border effect */}
            <Box sx={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '1px',
                background: `linear-gradient(90deg, transparent, ${theme.palette.divider}, transparent)`,
                opacity: 0.5
            }} />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
                <Grid container spacing={{ xs: 6, lg: 4 }} sx={{ mb: { xs: 8, md: 10 } }}>

                    {/* Brand Column */}
                    <Grid size={{ xs: 12, lg: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none', width: 'fit-content' }}>
                                <Box className="logo-icon" sx={{
                                    width: 40, height: 40, borderRadius: '12px', bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main',
                                    transition: 'all 0.3s ease', boxShadow: theme.shadows[1]
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="8" y="4" width="20" height="24" rx="6" fill={alpha(theme.palette.primary.main, 0.2)} stroke={theme.palette.primary.main} strokeWidth="1.5" />
                                        <rect x="4" y="8" width="20" height="24" rx="6" fill={theme.palette.primary.main} stroke={theme.palette.primary.main} strokeWidth="1.5" />
                                    </svg>
                                </Box>
                                <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '-0.04em', color: 'text.primary', fontFamily: '"Space Grotesk", sans-serif' }}>
                                    <Box component="span" sx={{ color: '#F05B25' }}>DOC</Box>-SHIFT
                                </Typography>
                            </Box>

                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, maxWidth: 'sm' }}>
                                Every PDF tool you'll ever need. <Box component="strong" sx={{ color: 'text.primary' }}>100% Free. No limits. No signup required.</Box> We believe essential document utilities should be accessible, secure, and beautiful to use.
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                {[
                                    { icon: Twitter, x: 'https://x.com/soumyachk1', label: 'Twitter' },
                                    { icon: Github, x: 'https://github.com/soumyachk101', label: 'GitHub' },
                                    { icon: MessageCircle, x: 'https://discord.com/users/soumya.chk101', label: 'Discord' }
                                ].map((social, i) => {
                                    const Icon = social.icon;
                                    return (
                                        <IconButton key={i} href={social.x} aria-label={social.label} size="medium" sx={{
                                            bgcolor: 'background.default', border: `1px solid ${theme.palette.divider}`,
                                            color: 'text.secondary',
                                            '&:hover': { color: 'primary.main', borderColor: alpha(theme.palette.primary.main, 0.5), bgcolor: alpha(theme.palette.primary.main, 0.05) },
                                            transition: 'all 0.2s'
                                        }}>
                                            <Icon size={18} />
                                        </IconButton>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Categories Columns */}
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>Tools</Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {CATEGORIES.filter(c => c.id !== 'all').slice(0, 4).map(cat => (
                                <Box component="li" key={cat.id}>
                                    <Link component={RouterLink} to="/" underline="none" sx={{
                                        position: 'relative', fontWeight: 500, color: 'text.secondary', py: 0.5, display: 'inline-block',
                                        '&:hover': { color: 'primary.main' },
                                        '&::after': {
                                            content: '""', position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px',
                                            bgcolor: 'primary.main', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.3s ease'
                                        },
                                        '&:hover::after': { transform: 'scaleX(1)' }
                                    }}>
                                        {cat.label}
                                    </Link>
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>More Tools</Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {CATEGORIES.filter(c => c.id !== 'all').slice(4).map(cat => (
                                <Box component="li" key={cat.id}>
                                    <Link component={RouterLink} to="/" underline="none" sx={{
                                        position: 'relative', fontWeight: 500, color: 'text.secondary', py: 0.5, display: 'inline-block',
                                        '&:hover': { color: 'primary.main' },
                                        '&::after': {
                                            content: '""', position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px',
                                            bgcolor: 'primary.main', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.3s ease'
                                        },
                                        '&:hover::after': { transform: 'scaleX(1)' }
                                    }}>
                                        {cat.label}
                                    </Link>
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    {/* Legal / Company */}
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>Legal</Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {['Privacy Policy', 'Terms of Service', 'About Us', 'Contact'].map((item, i) => (
                                <Box component="li" key={i}>
                                    <Link component={RouterLink} to="/" underline="none" sx={{
                                        position: 'relative', fontWeight: 500, color: 'text.secondary', py: 0.5, display: 'inline-block',
                                        '&:hover': { color: 'primary.main' },
                                        '&::after': {
                                            content: '""', position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px',
                                            bgcolor: 'primary.main', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.3s ease'
                                        },
                                        '&:hover::after': { transform: 'scaleX(1)' }
                                    }}>
                                        {item}
                                    </Link>
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                </Grid>

                {/* Bottom Bar */}
                <Box sx={{
                    pt: 4, borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                    display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 3
                }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                        © {currentYear} <Box component="span" sx={{ color: 'text.primary', fontWeight: 700 }}>DocShift</Box>. All rights reserved.
                    </Typography>

                    <Typography variant="caption" sx={{
                        fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', px: 2, py: 0.5,
                        borderRadius: '99px', bgcolor: alpha(theme.palette.success.main, 0.1), color: theme.palette.success.main,
                        border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`
                    }}>
                        Always Free
                    </Typography>
                </Box>
            </Container>

            {/* Background decorative blob */}
            <Box sx={{
                position: 'absolute', top: 0, right: 0, width: 400, height: 400,
                bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: '50%',
                mixBlendMode: 'multiply', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none'
            }} />
        </Box>
    );
}

function alpha(color, opacity) {
    if (!color) return `rgba(255, 180, 0, ${opacity})`;
    if (color.startsWith('#')) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
}

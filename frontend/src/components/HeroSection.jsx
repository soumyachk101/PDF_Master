import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { alpha } from '@mui/material/styles';

const HeroSection = () => {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    const handleScrollDown = () => {
        const nextSection = document.getElementById('tools');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Box
            component="section"
            sx={{
                position: 'relative',
                minHeight: '100vh',
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                pt: { xs: 14, md: 16 },
                pb: { xs: 8, md: 12 },
                bgcolor: 'background.default',
                transition: 'background-color 0.4s ease',
            }}
        >
            {/* ── BACKGROUND DECO ── */}
            {/* Noise texture overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                    opacity: isLight ? 0.015 : 0.04,
                    pointerEvents: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Subtle horizontal grid lines */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                    pointerEvents: 'none',
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 80px, ${alpha(theme.palette.text.primary, 0.03)} 80px, ${alpha(theme.palette.text.primary, 0.03)} 81px)`,
                    maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)',
                }}
            />

            {/* Huge glowing atmospheric orb aligned to center to fill background perfectly */}
            <Box
                sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '100vw', md: '1200px' },
                    height: { xs: '800px', md: '1000px' },
                    background: `radial-gradient(ellipse at center, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 60%)`,
                    zIndex: 2,
                    pointerEvents: 'none',
                    filter: 'blur(80px)'
                }}
            />

            {/* ── CONTENT BOUNDARY ── */}
            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 10 }}>
                {/* ── CENTERED HERO STRUCTURE ── */}
                <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    maxWidth: { xs: '100%', md: '1200px' },
                    mx: 'auto'
                }}>
                        
                    {/* 1. Small pill/badge at top */}
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            px: 2,
                            py: '6px',
                            mb: 4,
                            borderRadius: '99px',
                            background: alpha(theme.palette.primary.main, 0.08),
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                            animation: 'fadeInUp 0.8s ease-out',
                            '@keyframes fadeInUp': {
                                from: { opacity: 0, transform: 'translateY(20px)' },
                                to: { opacity: 1, transform: 'translateY(0)' }
                            }
                        }}
                    >
                        <Typography sx={{ 
                            fontWeight: 600, 
                            color: theme.palette.primary.main,
                            fontSize: '0.78rem'
                        }}>
                            ⚡ 30+ Free PDF Tools
                        </Typography>
                    </Box>

                    {/* 2. Main headline */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: 'clamp(3.5rem, 8vw, 7.5rem)', 
                            lineHeight: 1.05,
                            fontWeight: 900,
                            letterSpacing: '-0.05em',
                            mb: 4,
                            color: theme.palette.text.primary,
                            animation: 'fadeInUp 0.8s ease-out 0.1s both'
                        }}
                    >
                        The PDF toolkit<br />
                        <Box component="span" sx={{ 
                            background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${alpha(theme.palette.text.primary, 0.5)} 100%)`, 
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            color: 'transparent'
                        }}>
                            built for speed.
                        </Box>
                    </Typography>

                    {/* 3. Subtitle */}
                    <Typography variant="body1" sx={{
                        fontSize: '1.25rem',
                        color: theme.palette.text.secondary, 
                        mb: 6,
                        maxWidth: '750px', 
                        fontWeight: isLight ? 500 : 400, 
                        lineHeight: 1.6,
                        animation: 'fadeInUp 0.8s ease-out 0.2s both'
                    }}>
                        DOC-SHIFT is your focused PDF toolbox for fast, private document workflows. <br />
                        Merge, split, compress, and convert in your browser — no signups, no limits, no files stored.
                    </Typography>

                    {/* 4. Buttons */}
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', sm: 'row' }, 
                        gap: 2, 
                        mb: 6,
                        width: { xs: '100%', sm: 'auto' },
                        animation: 'fadeInUp 0.8s ease-out 0.3s both'
                    }}>
                        <Button
                            variant="contained"
                            size="large"
                            href="#tools"
                            onClick={(e) => { e.preventDefault(); handleScrollDown(); }}
                            sx={{
                                py: 1.5, 
                                px: 4, 
                                fontSize: '1.05rem', 
                            }}
                        >
                            Try Free Tools <ArrowRight size={18} style={{ marginLeft: 8 }} />
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            href="#tools"
                            onClick={(e) => { e.preventDefault(); handleScrollDown(); }}
                            sx={{
                                py: 1.5, 
                                px: 4, 
                                fontSize: '1.05rem', 
                            }}
                        >
                            See All Tools
                        </Button>
                    </Box>

                    {/* 5. Trust badges */}
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center', 
                        justifyContent: 'center',
                        gap: { xs: 2.5, sm: 5 },
                        animation: 'fadeInUp 0.8s ease-out 0.4s both'
                    }}>
                        {[
                            { text: "No files stored", icon: <ShieldCheck size={18} color={theme.palette.primary.main} /> },
                            { text: "Instant processing", icon: <Zap size={18} color={theme.palette.primary.main} /> },
                            { text: "Works offline", icon: <Globe size={18} color={theme.palette.primary.main} /> },
                        ].map((item, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {item.icon}
                                <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.secondary, fontSize: '0.85rem' }}>
                                    {item.text}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default HeroSection;

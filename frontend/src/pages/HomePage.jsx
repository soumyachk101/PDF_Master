import { useState, useMemo, useDeferredValue, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Box, Typography, Button, Container, Card, CardContent, useTheme, InputBase, IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';

import { CATEGORIES, TOOLS } from '../utils/tools';
import HeroSection from '../components/HeroSection';

const DynamicIcon = memo(({ name, color, size = 24 }) => {
    const Icon = Icons[name] || Icons.FileText;
    return <Icon size={size} color={color} />;
});

function HomePage() {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const deferredSearchQuery = useDeferredValue(searchQuery);
    const navigate = useNavigate();

    // Dynamically calculate counts for categories
    const categoryCounts = useMemo(() => {
        const counts = { all: TOOLS.length };
        TOOLS.forEach(tool => {
            counts[tool.category] = (counts[tool.category] || 0) + 1;
        });
        return counts;
    }, []);

    const categoryTools = useMemo(() => {
        if (activeCategory === 'all') return TOOLS;
        return TOOLS.filter(tool => tool.category === activeCategory);
    }, [activeCategory]);
    
    const displayedTools = useMemo(() => {
        if (!deferredSearchQuery.trim()) return categoryTools;
        const q = deferredSearchQuery.toLowerCase();
        return categoryTools.filter(tool => 
            tool.name.toLowerCase().includes(q) || 
            tool.shortDesc.toLowerCase().includes(q) || 
            tool.desc.toLowerCase().includes(q) || 
            tool.slug.toLowerCase().includes(q)
        );
    }, [categoryTools, deferredSearchQuery]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Helmet>
                <title>DocShift – Free & Private PDF Tools | No Uploads Required</title>
                <meta name="description" content="Access 30+ PDF tools in your browser. Merge, compress, and convert PDFs securely without uploading files to any server. 100% private and free." />
                <meta name="keywords" content="pdf tools, merge pdf, split pdf, free online pdf tools, secure pdf editor, convert pdf" />
                <link rel="canonical" href="https://www.docshift.tech/" />
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "itemListElement": ${JSON.stringify(TOOLS.slice(0, 10).map((tool, index) => ({
                            "@type": "SoftwareApplication",
                            "position": index + 1,
                            "name": tool.name,
                            "url": `https://www.docshift.tech/tool/${tool.slug}`,
                            "applicationCategory": "PDFTool",
                            "operatingSystem": "Any"
                        })))}
                    }
                    `}
                </script>
            </Helmet>
            
            {/* ── PREMIUM HERO SECTION ── */}
            <HeroSection />

            {/* ── TRUST STRIP ── */}
            <Box sx={{
                borderTop: `1px solid ${theme.palette.divider}`,
                borderBottom: `1px solid ${theme.palette.divider}`,
                py: 5,
                bgcolor: theme.palette.background.default,
            }}>
                <Container maxWidth="lg">
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: { xs: 4, md: 8 },
                    }}>
                        {[
                            { id: 'secure', icon: 'ShieldCheck', text: 'Secure Encryption' },
                            { id: 'fast', icon: 'Zap', text: 'In-Browser Speed' },
                            { id: 'zero', icon: 'ServerCrash', text: 'No Uploads' },
                            { id: 'free', icon: 'HeartHandshake', text: '100% Private' },
                        ].map((item) => (
                            <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{
                                    width: 48, height: 48, borderRadius: '14px',
                                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                }}>
                                    <DynamicIcon name={item.icon} size={22} color={theme.palette.primary.main} />
                                </Box>
                                <Typography variant="caption" sx={{
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    color: 'text.secondary',
                                    fontSize: '0.75rem',
                                }}>
                                    {item.text}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* ── MAIN TOOLS GRID ── */}
            <Box id="tools" component="section" sx={{
                py: { xs: 12, md: 20 }, px: 3, position: 'relative',
                bgcolor: 'background.default',
                scrollMarginTop: '80px'
            }}>
                <Container maxWidth="xl">
                    <Box sx={{ mb: 10, textAlign: 'center' }}>
                        <Typography variant="overline" sx={{
                            display: 'block',
                            color: '#F05B25',
                            letterSpacing: '0.1em',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            mb: 1
                        }}>
                            PDF TOOLS
                        </Typography>
                        <Typography variant="h2" sx={{
                            color: mode === 'light' ? '#000' : '#fff',
                            mb: 2,
                            fontWeight: 900,
                            letterSpacing: '-0.04em',
                            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                        }}>
                            Everything you need for PDFs
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto', fontWeight: 500, opacity: 0.8 }}>
                            30+ free tools. No uploads. No limits.
                        </Typography>
                    </Box>

                    {/* Standalone Search Bar */}
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center',
                        mb: 6,
                        px: 2
                    }}>
                        <Box sx={{
                            display: 'flex', alignItems: 'center', gap: 2,
                            width: '100%',
                            maxWidth: '650px',
                            px: 3, py: 2,
                            borderRadius: '24px',
                            bgcolor: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(17, 17, 22, 0.6)',
                            backdropFilter: 'blur(30px)',
                            WebkitBackdropFilter: 'blur(30px)',
                            border: `1.5px solid ${mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)'}`,
                            boxShadow: mode === 'light' ? '0 12px 40px -10px rgba(0,0,0,0.08)' : '0 20px 60px -12px rgba(0,0,0,0.5)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:focus-within': {
                                border: `1.5px solid ${theme.palette.primary.main}`,
                                boxShadow: mode === 'light' 
                                    ? `0 20px 50px -10px ${alpha(theme.palette.primary.main, 0.2)}, 0 0 0 4px ${alpha(theme.palette.primary.main, 0.15)}`
                                    : `0 20px 60px -12px rgba(0,0,0,0.6), 0 0 0 4px ${alpha(theme.palette.primary.main, 0.15)}`,
                                transform: 'translateY(-2px) scale(1.01)',
                                bgcolor: mode === 'light' ? '#fff' : 'rgba(17, 17, 22, 0.8)',
                            }
                        }}>
                            <Icons.Search size={22} color={theme.palette.text.secondary} />
                            <InputBase
                                placeholder="Search from 30+ PDF tools..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                sx={{ 
                                    fontSize: '1.1rem', 
                                    fontWeight: 600, 
                                    flex: 1,
                                    color: 'text.primary',
                                    '& input::placeholder': {
                                        color: 'text.secondary',
                                        opacity: 0.7
                                    }
                                }}
                            />
                            {searchQuery && (
                                <IconButton 
                                    size="small" 
                                    onClick={() => setSearchQuery('')} 
                                    sx={{ 
                                        p: 0.5,
                                        '&:hover': { color: 'error.main' }
                                    }}
                                >
                                    <Icons.X size={20} />
                                </IconButton>
                            )}
                        </Box>
                    </Box>

                    {/* Controls Bar */}
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        mb: 8,
                        p: { xs: 1, md: 1.5 },
                        width: { xs: '100%', md: 'fit-content' },
                        maxWidth: '100%',
                        margin: '0 auto 64px auto',
                        borderRadius: { xs: '16px', md: '24px' },
                        bgcolor: mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(17, 17, 22, 0.5)',
                        backdropFilter: 'blur(20px)',
                        border: `1.5px solid ${mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
                        boxShadow: mode === 'light' ? '0 10px 40px -10px rgba(0,0,0,0.05)' : 'none',
                        overflow: 'hidden'
                    }}>
                        {/* Category Buttons */}
                        <Box sx={{ 
                            display: 'flex', 
                            overflowX: 'auto', 
                            gap: 1.5, 
                            px: { xs: 2.5, md: 0 },
                            width: '100%',
                            justifyContent: { xs: 'flex-start', md: 'center' },
                            '&::-webkit-scrollbar': { display: 'none' },
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none'
                        }}>
                            {CATEGORIES.map(category => (
                                <Button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    size="small"
                                    sx={{
                                        borderRadius: '999px', px: 2.5, py: 1,
                                        whiteSpace: 'nowrap', flexShrink: 0,
                                        fontSize: '0.85rem', fontWeight: activeCategory === category.id ? 600 : 500,
                                        bgcolor: activeCategory === category.id ? '#F05B25' : 'transparent',
                                        color: activeCategory === category.id ? '#fff' : alpha(theme.palette.text.primary, 0.6),
                                        border: `1px solid ${activeCategory === category.id ? 'transparent' : alpha(theme.palette.text.primary, 0.12)}`,
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            borderColor: alpha(theme.palette.text.primary, 0.5),
                                            color: alpha(theme.palette.text.primary, 1),
                                            bgcolor: activeCategory === category.id ? '#F05B25' : 'transparent'
                                        }
                                    }}
                                >
                                    {category.label}
                                    <Box component="span" sx={{
                                        ml: 1, px: 0.8, py: 0.2, borderRadius: '999px', fontSize: '0.65rem', fontWeight: 700,
                                        bgcolor: activeCategory === category.id ? 'rgba(0,0,0,0.15)' : alpha(theme.palette.text.primary, 0.05),
                                        color: activeCategory === category.id ? '#fff' : 'inherit'
                                    }}>
                                        {categoryCounts[category.id] || 0}
                                    </Box>
                                </Button>
                            ))}
                        </Box>


                    </Box>

                    {/* Tools Grid with Optimized Animations */}
                    <Box sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, 
                        gap: '12px', 
                        minHeight: '400px',
                        p: 0,
                        '@keyframes fadeInUp': {
                            from: { opacity: 0, transform: 'translateY(20px)' },
                            to: { opacity: 1, transform: 'translateY(0)' }
                        }
                    }}>
                        {displayedTools.length > 0 ? (
                            displayedTools.map((tool, index) => (
                                <Box 
                                    key={tool.slug} 
                                    onClick={() => navigate(`/tool/${tool.slug}`)}
                                    sx={{
                                        position: 'relative',
                                        cursor: 'pointer',
                                        borderRadius: '16px',
                                        bgcolor: mode === 'light' ? 'rgba(36, 15, 48, 0.03)' : alpha(theme.palette.text.primary, 0.03),
                                        border: mode === 'light' ? '1px solid rgba(36, 15, 48, 0.08)' : `1px solid ${alpha(theme.palette.text.primary, 0.06)}`,
                                        transition: 'all 0.25s ease',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        p: 3,
                                        overflow: 'hidden',
                                        opacity: 0,
                                        animation: 'fadeInUp 0.4s ease forwards',
                                        animationDelay: `${index * 0.05}s`,
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            bottom: 0,
                                            width: '3px',
                                            bgcolor: '#347B60',
                                            transform: 'scaleY(0)',
                                            transformOrigin: 'bottom',
                                            transition: 'transform 0.25s ease',
                                        },
                                        '&:hover': {
                                            borderColor: '#347B60',
                                            boxShadow: '0 0 20px rgba(52, 123, 96, 0.15)',
                                            bgcolor: 'rgba(52, 123, 96, 0.08)',
                                            '&::before': { transform: 'scaleY(1)' },
                                            '& .card-icon-wrapper': {
                                                bgcolor: mode === 'light' ? 'rgba(36, 15, 48, 0.15)' : alpha(tool.color, 0.15),
                                            },
                                            '& .card-icon': {
                                                transform: 'scale(1.1)',
                                            },
                                            '& .card-arrow': {
                                                opacity: 1,
                                                transform: 'translateX(0)',
                                            }
                                        }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                                        <Box className="card-icon-wrapper" sx={{
                                            width: 56, height: 56, borderRadius: '16px',
                                            bgcolor: mode === 'light' ? 'rgba(36, 15, 48, 0.06)' : alpha(tool.color, 0.08), 
                                            color: mode === 'light' ? '#240F30' : tool.color,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            transition: 'background-color 0.25s ease'
                                        }}>
                                            <Box className="card-icon" sx={{ transition: 'transform 0.2s ease', display: 'flex' }}>
                                                <DynamicIcon name={tool.icon} size={26} />
                                            </Box>
                                        </Box>
                                        <Box className="card-arrow" sx={{
                                            opacity: 0,
                                            transform: 'translateX(-10px)',
                                            transition: 'all 0.25s ease',
                                            color: '#347B60',
                                            p: 1
                                        }}>
                                            <Icons.ArrowUpRight size={20} />
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ 
                                            fontWeight: 600, 
                                            fontSize: '1rem',
                                            color: mode === 'light' ? '#240F30' : 'text.primary',
                                            mb: 0.5
                                        }}>
                                            {tool.name}
                                        </Typography>
                                        <Typography sx={{ 
                                            color: mode === 'light' ? 'rgba(36, 15, 48, 0.65)' : 'text.primary', 
                                            opacity: mode === 'light' ? 1 : 0.55,
                                            fontSize: '0.82rem',
                                            lineHeight: 1.5
                                        }}>
                                            {tool.shortDesc}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))
                        ) : (
                            <Box sx={{ gridColumn: '1 / -1', py: 12, textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 600 }}>No tools found matching your search.</Typography>
                            </Box>
                        )}
                    </Box>

                    {/* SEO Footer Content */}
                    <Box sx={{ mt: 8, pt: 6, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`, textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary', opacity: 0.8, maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}>
                            DocShift offers a comprehensive suite of completely free online PDF tools. Whether you need to securely <strong>merge PDF</strong> files, <strong>split PDF</strong> pages, or <strong>compress PDF</strong> size, our browser-based solutions process your documents locally. Maintain absolute privacy and 100% security while you manage, edit, and convert PDF documents. No accounts, no uploads, and no limitations.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default memo(HomePage);

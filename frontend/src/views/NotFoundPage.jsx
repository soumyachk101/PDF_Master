'use client';

import Link from 'next/link';
import { Box, Typography, Button, Container, Card } from '@mui/material';
import { Search, Home, ShieldCheck } from 'lucide-react';

const POPULAR_TOOLS = [
    { name: 'Merge PDF', slug: 'merge-pdf', icon: 'Combine' },
    { name: 'Compress PDF', slug: 'compress-pdf', icon: 'Minimize2' },
    { name: 'Word to PDF', slug: 'word-to-pdf', icon: 'FileText' },
    { name: 'PDF to Word', slug: 'pdf-to-word', icon: 'FileOutput' },
];

function NotFoundPage() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>

            <Container maxWidth="md" sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: { xs: 6, md: 10 }, textAlign: 'center' }}>
                <Typography variant="h1" sx={{ fontSize: { xs: '6rem', md: '10rem' }, fontWeight: 900, color: 'primary.main', lineHeight: 1, mb: 2 }}>
                    404
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: 'text.primary', fontSize: { xs: '1.5rem', md: '2rem' } }}>
                    Page Not Found
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '500px', mx: 'auto', mb: 6, fontSize: '1.1rem', lineHeight: 1.6 }}>
                    The page you're looking for doesn't exist or may have been moved. We offer 30+ free tools that are just a click away.
                </Typography>

                <Box sx={{ display: 'flex', gap: 3, mb: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Button
                        component={Link}
                        href="/"
                        variant="contained"
                        size="large"
                        startIcon={<Home size={18} />}
                        sx={{ borderRadius: '14px', fontWeight: 700, px: 4, py: 1.5, fontSize: '1.05rem', bgcolor: 'primary.main' }}
                    >
                        Back to Home
                    </Button>
                    <Button
                        component={Link}
                        href="/#tools"
                        variant="outlined"
                        size="large"
                        startIcon={<Search size={18} />}
                        sx={{ borderRadius: '14px', fontWeight: 700, px: 4, py: 1.5, fontSize: '1.05rem' }}
                    >
                        Browse All Tools
                    </Button>
                </Box>

                {/* Popular Tools Section - SEO benefit: internal linking */}
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 4, color: 'text.primary' }}>
                    Popular PDF Tools
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 8, width: '100%', maxWidth: '900px' }}>
                    {POPULAR_TOOLS.map((tool) => (
                        <Card
                            key={tool.slug}
                            component={Link}
                            href={`/tool/${tool.slug}`}
                            sx={{
                                p: 3, textAlign: 'center', textDecoration: 'none',
                                cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
                                borderRadius: '16px',
                                '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                <ShieldCheck size={32} color="#F05B25" strokeWidth={1.5} />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', color: 'text.primary', mb: 1 }}>
                                {tool.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem', lineHeight: 1.4 }}>
                                Free & secure online tool
                            </Typography>
                        </Card>
                    ))}
                </Box>

                {/* SEO Article Content */}
                <Box sx={{
                    textAlign: 'left', maxWidth: '700px', mt: 4, p: { xs: 3, md: 5 },
                    bgcolor: 'background.paper', borderRadius: '20px',
                    border: '1px solid', borderColor: 'divider'
                }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                        Why Use DocShift for PDF Processing?
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1.05rem' }}>
                        DocShift offers a comprehensive suite of free PDF tools that run entirely in your browser.
                        Whether you need to <Link href="/#tools" style={{ color: 'inherit', fontWeight: 600 }}>merge PDF files</Link>,{' '}
                        <Link href="/#tools" style={{ color: 'inherit', fontWeight: 600 }}>compress large documents</Link>, or{' '}
                        <Link href="/#tools" style={{ color: 'inherit', fontWeight: 600 }}>convert between formats</Link>,
                        all processing happens locally on your device — ensuring 100% privacy and security.
                        <br /><br />
                        No uploads, no accounts, and no limitations. Our browser-based approach means instant results
                        with zero waiting time for file transfers to remote servers.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default NotFoundPage;

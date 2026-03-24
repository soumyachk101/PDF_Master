import { useState, memo } from 'react';
import * as LucideIcons from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button, Container, Card, CircularProgress, TextField, InputAdornment, useTheme, Alert } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useFileUpload } from '../hooks/useFileUpload';
import { getToolBySlug } from '../utils/tools';
import DropzoneArea from '../components/DropzoneArea';

const DynamicIcon = memo(({ name, color, size = 24, className = "" }) => {
    const Icon = LucideIcons[name] || LucideIcons.FileText;
    return <Icon size={size} color={color} className={className} />;
});

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    out: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const stateVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 1.02, transition: { duration: 0.2 } }
};

function ToolPage() {
    const theme = useTheme();
    const { toolSlug } = useParams();
    const tool = getToolBySlug(toolSlug);

    const [files, setFiles] = useState([]);
    const [url, setUrl] = useState('');
    const [params, setParams] = useState({});

    const {
        appState,
        progress,
        resultUrl,
        resultFilename,
        errorMsg,
        resetState,
        processFiles
    } = useFileUpload(toolSlug);

    const isUrlSupported = tool?.type === 'html' || tool?.urlInput || false;
    const status = appState === 'upload' ? 'idle' : appState;
    const error = errorMsg;

    const handleProcess = () => {
        let submissionParams = { ...params };
        if (url && isUrlSupported) {
            submissionParams.url = url;
        }

        if (files.length > 0) {
            processFiles(files, submissionParams);
        } else if (url) {
            processFiles([], submissionParams);
        }
    };

    const handleDownload = () => {
        if (resultUrl) {
            const link = document.createElement('a');
            link.href = resultUrl;
            link.setAttribute('download', resultFilename || `${toolSlug}-result${tool.outputExt || '.pdf'}`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleReset = () => {
        setFiles([]);
        setUrl('');
        setParams({});
        resetState();
    };

    const handleParamChange = (key, value) => {
        setParams(prev => ({ ...prev, [key]: value }));
    };

    if (!tool) {
        return (
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
                <Card sx={{ p: 6, borderRadius: '32px', maxWidth: '500px', width: '100%', textAlign: 'center', boxShadow: theme.shadows[4] }}>
                    <LucideIcons.AlertTriangle size={48} color={theme.palette.warning.main} style={{ margin: '0 auto', marginBottom: '24px' }} />
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Tool Not Found</Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>The tool you are looking for doesn't exist or has been moved.</Typography>
                    <Button component={Link} to="/" variant="contained" size="large" startIcon={<LucideIcons.ArrowLeft size={18} />} sx={{ borderRadius: '12px', fontWeight: 700 }}>
                        Back to Home
                    </Button>
                </Card>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', bgcolor: 'background.default', position: 'relative', overflow: 'hidden' }}>
            <Helmet>
                <title>{`${tool.name} Online Free – DocShift`}</title>
                <meta name="description" content={tool.shortDesc} />
                {(tool.seoKeywords) && <meta name="keywords" content={tool.seoKeywords} />}
                <link rel="canonical" href={`https://www.docshift.tech/tool/${tool.slug}`} />
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "${tool.name}",
                        "operatingSystem": "Any",
                        "applicationCategory": "PDFTool",
                        "url": "https://www.docshift.tech/tool/${tool.slug}",
                        "author": {
                            "@type": "Organization",
                            "name": "DocShift"
                        },
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        }
                    }
                    `}
                </script>
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://www.docshift.tech/"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "${tool.name}",
                                "item": "https://www.docshift.tech/tool/${tool.slug}"
                            }
                        ]
                    }
                    `}
                </script>
            </Helmet>
            <Box sx={{ position: 'absolute', top: 0, right: 0, width: 500, height: 500, bgcolor: alpha(theme.palette.primary.main, 0.1), borderRadius: '50%', filter: 'blur(150px)', pointerEvents: 'none', mixBlendMode: 'multiply' }} />
            <Box sx={{ position: 'absolute', top: '20%', left: '-10%', width: 400, height: 400, bgcolor: 'rgba(64, 169, 246, 0.1)', borderRadius: '50%', filter: 'blur(150px)', pointerEvents: 'none', mixBlendMode: 'multiply' }} />

            <Container maxWidth="md" sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', py: { xs: 4, md: 6 }, position: 'relative', zIndex: 10 }}>

                <Box component={Link} to="/#tools" data-magnetic sx={{ alignSelf: 'flex-start', mb: 3, color: 'text.secondary', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600, '&:hover': { color: 'primary.main' }, transition: 'color 0.2s' }}>
                    <LucideIcons.ArrowLeft size={16} /> Back to All Tools
                </Box>

                <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} style={{ width: '100%', textAlign: 'center', marginBottom: '24px' }}>
                    <Box sx={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '20px', mb: 2,
                        bgcolor: `${tool.color}15`, color: tool.color, border: `1px solid ${theme.palette.divider}`
                    }}>
                        <DynamicIcon name={tool.icon} size={32} />
                    </Box>
                    <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>
                        {tool.name} Online Free
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto', fontWeight: 400 }}>
                        {tool.desc}
                    </Typography>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }} style={{ width: '100%', maxWidth: '800px' }}>
                    <Card sx={{
                        p: { xs: 3, md: 4 },
                        position: 'relative', overflow: 'hidden',
                        borderTop: `4px solid ${tool.color}`,
                        minHeight: { xs: '380px', md: '420px' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <AnimatePresence>
                            {(status === 'idle' || status === 'error') && (
                                <motion.div key="upload" variants={stateVariants} initial="initial" animate="animate" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                                    {isUrlSupported && (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                placeholder="Enter website URL (e.g., https://example.com)"
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LucideIcons.LinkIcon size={20} color={theme.palette.text.secondary} />
                                                        </InputAdornment>
                                                    ),
                                                    sx: { borderRadius: '16px', bgcolor: 'background.default' }
                                                }}
                                            />
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
                                                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>OR</Typography>
                                                <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
                                            </Box>
                                        </Box>
                                    )}

                                    <DropzoneArea
                                        onFileSelect={setFiles}
                                        accept={tool.accept}
                                        maxSize={100 * 1024 * 1024} // 100MB
                                        selectedFiles={files}
                                        hasUrl={!!url}
                                        multiple={tool.multiple}
                                    />

                                    {/* Additional Tool Parameters */}
                                    {files.length > 0 && toolSlug === 'split-pdf' && (
                                        <TextField fullWidth label="Page Ranges (e.g., 1-3,5)" variant="outlined" value={params.ranges || ''} onChange={(e) => handleParamChange('ranges', e.target.value)} />
                                    )}
                                    {files.length > 0 && toolSlug === 'extract-pages' && (
                                        <TextField fullWidth label="Page Ranges to Extract (e.g., 2,4-6)" variant="outlined" value={params.ranges || ''} onChange={(e) => handleParamChange('ranges', e.target.value)} />
                                    )}
                                    {files.length > 0 && toolSlug === 'remove-pages' && (
                                        <TextField fullWidth label="Page Numbers to Remove (e.g., 1,3)" variant="outlined" value={params.pages || ''} onChange={(e) => handleParamChange('pages', e.target.value)} />
                                    )}
                                    {files.length > 0 && toolSlug === 'rotate-pdf' && (
                                        <TextField fullWidth label="Degrees (e.g., 90, 180, 270)" type="number" variant="outlined" value={params.degrees || '90'} onChange={(e) => handleParamChange('degrees', e.target.value)} />
                                    )}
                                    {files.length > 0 && (toolSlug === 'protect-pdf' || toolSlug === 'unlock-pdf') && (
                                        <TextField fullWidth label="Password" type="password" variant="outlined" value={params.password || ''} onChange={(e) => handleParamChange('password', e.target.value)} />
                                    )}
                                    {files.length > 0 && (toolSlug === 'add-watermark' || toolSlug === 'sign-pdf') && (
                                        <TextField fullWidth label="Text" variant="outlined" value={params.text || ''} onChange={(e) => handleParamChange('text', e.target.value)} />
                                    )}

                                    <AnimatePresence>
                                        {error && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                                <Alert severity="error" sx={{ borderRadius: '16px', mt: 2 }} icon={<LucideIcons.AlertCircle size={24} />}>
                                                    {error}
                                                </Alert>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <Button
                                        onClick={handleProcess}
                                        disabled={(!files.length && !url) || (isUrlSupported && !url && !files.length)}
                                        variant="contained"
                                        size="large"
                                        data-magnetic
                                        endIcon={<LucideIcons.ArrowRight size={20} />}
                                        sx={{
                                            width: '100%',
                                            mt: '14px',
                                            padding: '15px',
                                            borderRadius: '14px',
                                            background: 'linear-gradient(135deg, #ff5a14, #cc3d00)',
                                            boxShadow: '0 4px 20px rgba(255,80,20,0.25)',
                                            color: '#fff',
                                            fontSize: '1.1rem',
                                            fontWeight: 700,
                                            textTransform: 'none',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                boxShadow: '0 6px 28px rgba(255,80,20,0.4)',
                                                transform: 'translateY(-1px)',
                                                background: 'linear-gradient(135deg, #ff5a14, #cc3d00)'
                                            },
                                            '&.Mui-disabled': {
                                                background: 'rgba(255,255,255,0.05)',
                                                color: 'rgba(255,255,255,0.3)',
                                                boxShadow: 'none',
                                                transform: 'none'
                                            }
                                        }}
                                    >
                                        Process {files.length > 1 ? `${files.length} Files` : 'File'}
                                    </Button>
                                </motion.div>
                            )}

                            {status === 'processing' && (
                                <motion.div key="processing" variants={stateVariants} initial="initial" animate="animate" exit="exit">
                                    <Box sx={{ py: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                            <CircularProgress variant="determinate" value={100} size={160} thickness={2} sx={{ color: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)' }} />
                                            <CircularProgress variant="determinate" value={progress} size={160} thickness={4} sx={{ color: theme.palette.primary.main, position: 'absolute', left: 0, filter: `drop-shadow(0 0 10px ${alpha(theme.palette.primary.main, 0.5)})`, strokeLinecap: 'round' }} />
                                            <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Typography variant="h3" component="div" className="text-gradient" sx={{ fontWeight: 900 }}>
                                                    {Math.round(progress)}%
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>Processing Document...</Typography>
                                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>This usually takes a few seconds. Please don't close this tab.</Typography>
                                        </Box>
                                    </Box>
                                </motion.div>
                            )}

                            {status === 'success' && (
                                <motion.div key="success" variants={stateVariants} initial="initial" animate="animate" exit="exit">
                                    <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 4 }}>
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, 10, -10, 0] }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
                                            <Box sx={{
                                                width: 96, height: 96, borderRadius: '32px', bgcolor: alpha(theme.palette.success.main, 0.1),
                                                color: theme.palette.success.main, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`, flexShrink: 0
                                            }}>
                                                <LucideIcons.CheckCircle size={48} strokeWidth={2.5} />
                                            </Box>
                                        </motion.div>
                                        <Box>
                                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>Task Complete!</Typography>
                                            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>Your file has been successfully processed.</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, width: '100%', mt: 2 }}>
                                            <Button
                                                onClick={handleDownload}
                                                variant="contained"
                                                color="success"
                                                size="large"
                                                data-magnetic
                                                startIcon={<LucideIcons.Download size={22} />}
                                                sx={{ flex: 1, py: 2, borderRadius: '16px', fontSize: '1.1rem', fontWeight: 700, boxShadow: `0 10px 20px -10px ${theme.palette.success.main}` }}
                                            >
                                                Download Result
                                            </Button>
                                            <Button
                                                onClick={handleReset}
                                                variant="outlined"
                                                size="large"
                                                sx={{ flex: 1, py: 2, borderRadius: '16px', fontSize: '1.1rem', fontWeight: 700, borderColor: theme.palette.divider, color: theme.palette.text.primary, '&:hover': { borderColor: theme.palette.primary.main } }}
                                            >
                                                Start Over
                                            </Button>
                                        </Box>
                                    </Box>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>
                </motion.div>

                {/* SEO Rich Content Section */}
                <Box sx={{ mt: 10, mb: 4, width: '100%', maxWidth: '800px', textAlign: 'left' }}>
                    <Typography variant="h4" component="h2" sx={{ fontWeight: 800, mb: 3, color: 'text.primary' }}>How to {tool.name}</Typography>
                    {tool.seoArticle ? (
                        <Typography 
                            variant="body1" 
                            sx={{ color: 'text.secondary', mb: 5, lineHeight: 1.8, fontSize: '1.1rem', '& a': { color: 'primary.main', textDecoration: 'none', fontWeight: 600, '&:hover': { textDecoration: 'underline' } } }}
                            dangerouslySetInnerHTML={{ __html: tool.seoArticle }}
                        />
                    ) : (
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 5, lineHeight: 1.8, fontSize: '1.1rem' }}>
                            Use our free online tool to {tool.name.toLowerCase()} instantly. Upload your file above and let our secure servers do the heavy lifting. No installation required.
                        </Typography>
                    )}

                    <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>Why use PDFKit?</Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 5, lineHeight: 1.8, fontSize: '1.1rem' }}>
                        <strong>100% Private & Secure:</strong> We take your privacy seriously. Files are never stored permanently, ensuring your data remains completely secure. No account or email required to use our tools.
                        <br/><br/>
                        <strong>Blazing Fast:</strong> Forget heavy desktop software. Process your documents in absolute seconds directly from your browser with zero bloatware.
                    </Typography>

                    {tool.faqs && tool.faqs.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 4, color: 'text.primary' }}>Frequently Asked Questions</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {tool.faqs.map((faq, i) => (
                                    <Box key={i} sx={{ p: 3, bgcolor: alpha(theme.palette.divider, 0.05), border: `1px solid ${theme.palette.divider}`, borderRadius: '16px' }}>
                                        <Typography variant="h6" component="h3" sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 1, color: 'text.primary' }}>{faq.q}</Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '1.05rem' }}>{faq.a}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
}

export default memo(ToolPage);

function alpha(color, opacity) {
    if (!color) return `rgba(37, 99, 235, ${opacity})`;
    if (color.startsWith('#')) {
        let r = parseInt(color.slice(1, 3), 16),
            g = parseInt(color.slice(3, 5), 16),
            b = parseInt(color.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
}

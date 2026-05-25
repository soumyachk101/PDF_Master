'use client';

import React, { useState, memo } from 'react';
import Link from 'next/link';
import { Box, Typography, Button, Container, Card, CircularProgress, TextField, InputAdornment, useTheme, Alert } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useFileUpload } from '@/hooks/useFileUpload';
import { getToolBySlug } from '@/utils/tools';
import DropzoneArea from '@/components/DropzoneArea';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Home, ArrowLeft, ArrowRight, Download, CheckCircle, AlertCircle, AlertTriangle, Link as LinkIcon } from 'lucide-react';
import { getIcon } from '@/utils/icons';

const DynamicIcon = memo(({ name, color, size = 24, className = "" }) => {
    const IconComponent = getIcon(name);
    return React.createElement(IconComponent, { size, color, className });
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

const bauhausInputStyle = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '0px',
        border: '4px solid #000000',
        bgcolor: '#ffffff',
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: '#000000',
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
    },
    '& .MuiInputLabel-root': {
        color: '#000000',
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        '&.Mui-focused': {
            color: '#000000',
        }
    }
};

function ToolPage({ toolSlug }) {
    const theme = useTheme();
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

    const needsMoreFiles = files.length > 0 && files.length < (tool?.minFiles || 1);
    const isPasswordRequired = toolSlug === 'protect-pdf' && !params.password;
    const isSubmitDisabled = (!files.length && !url) || (isUrlSupported && !url && !files.length) || needsMoreFiles || isPasswordRequired;

    const getButtonText = () => {
        if (isPasswordRequired) return 'Enter Password';
        if (needsMoreFiles) return `Upload At Least ${tool.minFiles} Files`;
        return `Process ${files.length > 1 ? `${files.length} Files` : 'File'}`;
    };

    const handleProcess = () => {
        if (isSubmitDisabled) return;
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
                <Card sx={{ p: 6, borderRadius: '0px', border: '4px solid #121212', boxShadow: '8px 8px 0px 0px #121212', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
                    <AlertTriangle size={48} color="#F0C020" style={{ margin: '0 auto', marginBottom: '24px' }} />
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Tool Not Found</Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>The tool you are looking for doesn't exist or has been moved.</Typography>
                    <Button component={Link} href="/" variant="contained" size="large" startIcon={<ArrowLeft size={18} />} sx={{ borderRadius: '0px', border: '3px solid #121212', boxShadow: '4px 4px 0px 0px #121212', bgcolor: '#D02020', '&:hover': { bgcolor: '#B01A1A', boxShadow: 'none', transform: 'translate(4px, 4px)' }, fontWeight: 800 }}>
                        Back to Home
                    </Button>
                </Card>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', bgcolor: 'background.default', position: 'relative', overflow: 'hidden' }}>

            <Box sx={{ position: 'absolute', top: 0, right: 0, width: 500, height: 500, bgcolor: alpha(theme.palette.primary.main, 0.1), borderRadius: '50%', filter: 'blur(150px)', pointerEvents: 'none', mixBlendMode: 'multiply' }} />
            <Box sx={{ position: 'absolute', top: '20%', left: '-10%', width: 400, height: 400, bgcolor: 'rgba(64, 169, 246, 0.1)', borderRadius: '50%', filter: 'blur(150px)', pointerEvents: 'none', mixBlendMode: 'multiply' }} />

            <Container maxWidth="md" sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', py: { xs: 4, md: 6 }, position: 'relative', zIndex: 10 }}>
                <Box sx={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Breadcrumb Navigation */}
                    <Box sx={{ alignSelf: 'flex-start' }}>
                        <Breadcrumbs items={[
                          { name: 'Home', href: '/', icon: Home },
                          { name: tool.name, href: `/tool/${tool.slug}`, isCurrent: true }
                        ]} />
                    </Box>

                    <Box component={Link} href="/#tools" sx={{ alignSelf: 'flex-start', mb: 3, color: 'text.secondary', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600, '&:hover': { color: 'primary.main' }, transition: 'color 0.2s' }}>
                        <ArrowLeft size={16} /> Back to All Tools
                    </Box>

                    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} style={{ width: '100%', textAlign: 'center', marginBottom: '24px' }}>
                        <Box sx={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '0px', mb: 2,
                            bgcolor: '#ffffff', color: '#121212', border: '3px solid #121212', boxShadow: '4px 4px 0px 0px #121212'
                        }}>
                            <DynamicIcon name={tool.icon} size={32} />
                        </Box>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>
                            {tool.name} Online Free
                        </Typography>
                        <Typography variant="subtitle1" component="p" sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto', fontWeight: 400, fontSize: '1.15rem' }}>
                            {tool.desc}
                        </Typography>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }} style={{ width: '100%' }}>
                    <Card sx={{
                        p: { xs: 4, md: 6 },
                        position: 'relative', overflow: 'hidden',
                        borderRadius: '0px',
                        border: '8px solid #000000',
                        bgcolor: '#ffffff',
                        boxShadow: '8px 8px 0px 0px #000000',
                        minHeight: { xs: '380px', md: '420px' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        {/* Decorative Corner Shapes */}
                        <div className="absolute top-0 left-0 w-8 h-8 bg-bauhaus-red border-r-4 border-b-4 border-bauhaus-black z-10" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-bauhaus-blue border-l-4 border-t-4 border-bauhaus-black z-10" />
                        <AnimatePresence>
                            {(status === 'idle' || status === 'error') && (
                                <motion.div key="upload" variants={stateVariants} initial="initial" animate="animate" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                                    {isUrlSupported && (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Website URL"
                                                placeholder="ENTER WEBSITE URL (E.G., HTTPS://EXAMPLE.COM)"
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                                sx={bauhausInputStyle}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LinkIcon size={20} color="#000000" />
                                                        </InputAdornment>
                                                    ),
                                                    sx: { borderRadius: '0px', bgcolor: '#ffffff' }
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
                                        <TextField fullWidth label="Page Ranges (e.g., 1-3,5)" variant="outlined" value={params.ranges || ''} onChange={(e) => handleParamChange('ranges', e.target.value)} sx={bauhausInputStyle} />
                                    )}
                                    {files.length > 0 && toolSlug === 'extract-pages' && (
                                        <TextField fullWidth label="Page Ranges to Extract (e.g., 2,4-6)" variant="outlined" value={params.ranges || ''} onChange={(e) => handleParamChange('ranges', e.target.value)} sx={bauhausInputStyle} />
                                    )}
                                    {files.length > 0 && toolSlug === 'remove-pages' && (
                                        <TextField fullWidth label="Page Numbers to Remove (e.g., 1,3)" variant="outlined" value={params.pages || ''} onChange={(e) => handleParamChange('pages', e.target.value)} sx={bauhausInputStyle} />
                                    )}
                                    {files.length > 0 && toolSlug === 'rotate-pdf' && (
                                        <TextField fullWidth label="Degrees (e.g., 90, 180, 270)" type="number" variant="outlined" value={params.degrees || '90'} onChange={(e) => handleParamChange('degrees', e.target.value)} sx={bauhausInputStyle} />
                                    )}
                                    {files.length > 0 && (toolSlug === 'protect-pdf' || toolSlug === 'unlock-pdf') && (
                                        <TextField fullWidth label="Password" type="password" variant="outlined" value={params.password || ''} onChange={(e) => handleParamChange('password', e.target.value)} sx={bauhausInputStyle} />
                                    )}
                                    {files.length > 0 && (toolSlug === 'add-watermark' || toolSlug === 'sign-pdf') && (
                                        <TextField fullWidth label="Text" variant="outlined" value={params.text || ''} onChange={(e) => handleParamChange('text', e.target.value)} sx={bauhausInputStyle} />
                                    )}

                                    <AnimatePresence>
                                        {error && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                                <Alert severity="error" sx={{ borderRadius: '0px', mt: 2, border: '3px solid #121212', boxShadow: '4px 4px 0px 0px #121212', bgcolor: '#ffffff', color: '#121212', fontWeight: 700 }} icon={<AlertCircle size={24} color="#D02020" />}>
                                                    {error}
                                                </Alert>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <Button
                                        onClick={handleProcess}
                                        disabled={isSubmitDisabled}
                                        variant="contained"
                                        size="large"
                                        endIcon={<ArrowRight size={20} />}
                                        sx={{
                                            width: '100%',
                                            mt: '24px',
                                            padding: '18px',
                                            borderRadius: '0px',
                                            border: '4px solid #121212',
                                            bgcolor: '#D02020',
                                            color: '#ffffff',
                                            fontSize: '1.2rem',
                                            fontWeight: 900,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em',
                                            boxShadow: '4px 4px 0px 0px #121212',
                                            transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                            '& .MuiButton-endIcon': {
                                                transition: 'transform 0.2s ease-in-out',
                                            },
                                            '&:hover': {
                                                bgcolor: '#B01A1A',
                                                boxShadow: 'none',
                                                transform: 'translate(4px, 4px)',
                                            },
                                            '&:hover .MuiButton-endIcon': {
                                                transform: 'translateX(6px)',
                                            },
                                            '&.Mui-disabled': {
                                                bgcolor: '#F3F4F6',
                                                color: '#9CA3AF',
                                                border: '4px solid #9CA3AF',
                                                boxShadow: 'none',
                                                transform: 'none',
                                                cursor: 'not-allowed',
                                                pointerEvents: 'auto',
                                                opacity: 0.7
                                            }
                                        }}
                                    >
                                        {getButtonText()}
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
                                                width: 96, height: 96, borderRadius: '0px', bgcolor: '#ffffff',
                                                color: '#347B60', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                border: '4px solid #121212', boxShadow: '6px 6px 0px 0px #121212', flexShrink: 0
                                            }}>
                                                <CheckCircle size={48} strokeWidth={2.5} />
                                            </Box>
                                        </motion.div>
                                        <Box>
                                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>Task Complete!</Typography>
                                            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>Your file has been successfully processed.</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, width: '100%', mt: 2 }}>
                                            <Button
                                                onClick={handleDownload}
                                                variant="contained"
                                                size="large"
                                                startIcon={<Download size={22} />}
                                                sx={{
                                                    flex: 1,
                                                    py: 2,
                                                    borderRadius: '0px',
                                                    border: '4px solid #000000',
                                                    bgcolor: '#347B60',
                                                    color: '#DCDCDC',
                                                    fontSize: '1.1rem',
                                                    fontWeight: 900,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.05em',
                                                    boxShadow: '4px 4px 0px 0px #000000',
                                                    transition: 'all 0.2s',
                                                    '&:hover': {
                                                        bgcolor: 'rgba(52, 123, 96, 0.9)',
                                                        boxShadow: 'none',
                                                        transform: 'translate(4px, 4px)',
                                                    }
                                                }}
                                            >
                                                Download Result
                                            </Button>
                                            <Button
                                                onClick={handleReset}
                                                variant="outlined"
                                                size="large"
                                                sx={{
                                                    flex: 1,
                                                    py: 2,
                                                    borderRadius: '0px',
                                                    border: '4px solid #000000',
                                                    bgcolor: '#ffffff',
                                                    color: '#000000',
                                                    fontSize: '1.1rem',
                                                    fontWeight: 900,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.05em',
                                                    boxShadow: '4px 4px 0px 0px #000000',
                                                    transition: 'all 0.2s',
                                                    '&:hover': {
                                                        bgcolor: '#f5f5f5',
                                                        borderColor: '#000000',
                                                        boxShadow: 'none',
                                                        transform: 'translate(4px, 4px)',
                                                    }
                                                }}
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
            </Box>

            </Container>
        </Box>
    );
}

export default memo(ToolPage);

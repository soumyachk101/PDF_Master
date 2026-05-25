'use client';

import React, { useState, memo } from 'react';
import Link from 'next/link';
import { Box, Typography, Button, Container, Card, CircularProgress, TextField, InputAdornment, Alert } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useFileUpload } from '@/hooks/useFileUpload';
import { getToolBySlug } from '@/utils/tools';
import DropzoneArea from '@/components/DropzoneArea';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Home, ArrowLeft, ArrowRight, Download, CheckCircle, AlertCircle, AlertTriangle, Link as LinkIcon } from 'lucide-react';
import { getIcon } from '@/utils/icons';
import { Screw, VentSlots } from '@/components/ui/IndustrialComponents';

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

const industrialInputStyle = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        bgcolor: '#e0e5ec',
        fontFamily: 'var(--font-mono), monospace',
        fontWeight: 600,
        letterSpacing: '0.02em',
        color: '#2d3436',
        boxShadow: 'inset 2px 2px 5px #babecc, inset -2px -2px 5px #ffffff',
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '&.Mui-focused': {
            boxShadow: 'inset 2px 2px 5px #babecc, inset -2px -2px 5px #ffffff, 0 0 0 2px #ff4757',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
    },
    '& .MuiInputLabel-root': {
        color: '#4a5568',
        fontFamily: '"Inter", sans-serif',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        '&.Mui-focused': {
            color: '#ff4757',
        }
    }
};

function ToolPage({ toolSlug }) {
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
                <Card sx={{ p: 6, borderRadius: '16px', border: '1px solid rgba(255,255,255,0.4)', boxShadow: '9px 9px 16px #babecc, -9px -9px 16px #ffffff', maxWidth: '500px', width: '100%', textAlign: 'center', bgcolor: '#e0e5ec' }}>
                    <AlertTriangle size={48} color="#ff4757" style={{ margin: '0 auto', marginBottom: '24px' }} />
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: '#2d3436' }}>Tool Not Found</Typography>
                    <Typography variant="body1" sx={{ color: '#4a5568', mb: 4 }}>The tool you are looking for doesn't exist or has been moved.</Typography>
                    <Button component={Link} href="/" variant="contained" size="large" startIcon={<ArrowLeft size={18} />} sx={{ borderRadius: '8px', bgcolor: '#ff4757', '&:hover': { bgcolor: '#ff2e44', transform: 'translateY(-2px)' }, fontWeight: 800, px: 4, py: 1.5 }}>
                        Back to Home
                    </Button>
                </Card>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', bgcolor: 'background.default', position: 'relative', overflow: 'hidden' }}>
            {/* Ambient Radial Lights */}
            <Box sx={{ position: 'absolute', top: 0, right: 0, width: 500, height: 500, bgcolor: 'rgba(255, 71, 87, 0.04)', borderRadius: '50%', filter: 'blur(150px)', pointerEvents: 'none' }} />
            <Box sx={{ position: 'absolute', top: '20%', left: '-10%', width: 400, height: 400, bgcolor: 'rgba(34, 197, 94, 0.03)', borderRadius: '50%', filter: 'blur(150px)', pointerEvents: 'none' }} />

            <Container maxWidth="md" sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', py: { xs: 4, md: 6 }, position: 'relative', zIndex: 10 }}>
                <Box sx={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Breadcrumb Navigation */}
                    <Box sx={{ alignSelf: 'flex-start' }}>
                        <Breadcrumbs items={[
                          { name: 'Home', href: '/', icon: Home },
                          { name: tool.name, href: `/tool/${tool.slug}`, isCurrent: true }
                        ]} />
                    </Box>

                    <Box component={Link} href="/#tools" sx={{ alignSelf: 'flex-start', mb: 3, color: 'text.secondary', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1, fontMono: true, fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', tracking: 'wider', '&:hover': { color: 'primary.main' }, transition: 'color 0.2s' }}>
                        <ArrowLeft size={14} /> Back to All Tools
                    </Box>

                    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} style={{ width: '100%', textAlign: 'center', marginBottom: '32px' }}>
                        <Box sx={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '50%', mb: 2,
                            bgcolor: '#e0e5ec', color: '#ff4757', border: '1px solid rgba(255,255,255,0.4)',
                            boxShadow: '4px 4px 10px #babecc, -4px -4px 10px #ffffff'
                        }}>
                            <DynamicIcon name={tool.icon} size={32} color="#ff4757" />
                        </Box>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 1, color: 'text.primary', fontSize: { xs: '2rem', md: '2.5rem' } }}>
                            {tool.name}
                        </Typography>
                        <Typography variant="subtitle1" component="p" sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto', fontWeight: 500, fontSize: '0.95rem' }}>
                            {tool.desc}
                        </Typography>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }} style={{ width: '100%' }}>
                    <Card className="screw-corners relative overflow-hidden" sx={{
                        p: { xs: 4, md: 6 },
                        borderRadius: '16px',
                        bgcolor: '#e0e5ec',
                        border: '1px solid rgba(255,255,255,0.4)',
                        boxShadow: '9px 9px 16px #babecc, -9px -9px 16px #ffffff',
                        minHeight: { xs: '380px', md: '420px' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        {/* Screws and vent slots details */}
                        <Screw className="top-3 left-3" />
                        <Screw className="top-3 right-3" />
                        <Screw className="bottom-3 left-3" />
                        <Screw className="bottom-3 right-3" />
                        <div className="absolute top-2.5 right-8 pointer-events-none z-10">
                            <VentSlots />
                        </div>

                        <AnimatePresence>
                            {(status === 'idle' || status === 'error') && (
                                <motion.div key="upload" variants={stateVariants} initial="initial" animate="animate" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '8px' }}>

                                    {isUrlSupported && (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Website URL"
                                                placeholder="Enter website URL (e.g., https://example.com)"
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                                sx={industrialInputStyle}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LinkIcon size={18} color="#4a5568" />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgba(0,0,0,0.05)' }} />
                                                <Typography variant="caption" sx={{ fontWeight: 750, color: 'text.secondary', fontFamily: 'monospace', letterSpacing: 1.5 }}>OR</Typography>
                                                <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgba(0,0,0,0.05)' }} />
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
                                        <TextField fullWidth label="Page Ranges (e.g., 1-3,5)" variant="outlined" value={params.ranges || ''} onChange={(e) => handleParamChange('ranges', e.target.value)} sx={industrialInputStyle} />
                                    )}
                                    {files.length > 0 && toolSlug === 'extract-pages' && (
                                        <TextField fullWidth label="Page Ranges to Extract (e.g., 2,4-6)" variant="outlined" value={params.ranges || ''} onChange={(e) => handleParamChange('ranges', e.target.value)} sx={industrialInputStyle} />
                                    )}
                                    {files.length > 0 && toolSlug === 'remove-pages' && (
                                        <TextField fullWidth label="Page Numbers to Remove (e.g., 1,3)" variant="outlined" value={params.pages || ''} onChange={(e) => handleParamChange('pages', e.target.value)} sx={industrialInputStyle} />
                                    )}
                                    {files.length > 0 && toolSlug === 'rotate-pdf' && (
                                        <TextField fullWidth label="Degrees (e.g., 90, 180, 270)" type="number" variant="outlined" value={params.degrees || '90'} onChange={(e) => handleParamChange('degrees', e.target.value)} sx={industrialInputStyle} />
                                    )}
                                    {files.length > 0 && (toolSlug === 'protect-pdf' || toolSlug === 'unlock-pdf') && (
                                        <TextField fullWidth label="Password" type="password" variant="outlined" value={params.password || ''} onChange={(e) => handleParamChange('password', e.target.value)} sx={industrialInputStyle} />
                                    )}
                                    {files.length > 0 && (toolSlug === 'add-watermark' || toolSlug === 'sign-pdf') && (
                                        <TextField fullWidth label="Text" variant="outlined" value={params.text || ''} onChange={(e) => handleParamChange('text', e.target.value)} sx={industrialInputStyle} />
                                    )}

                                    <AnimatePresence>
                                        {error && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                                <Alert severity="error" sx={{ borderRadius: '8px', mt: 2, border: '1px solid rgba(255, 71, 87, 0.2)', bgcolor: '#e0e5ec', boxShadow: 'inset 2px 2px 5px #babecc, inset -2px -2px 5px #ffffff', color: '#ff4757', fontWeight: 600 }} icon={<AlertCircle size={24} color="#ff4757" />}>
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
                                            mt: '16px',
                                            padding: '18px',
                                            borderRadius: '8px',
                                            bgcolor: '#ff4757',
                                            color: '#ffffff',
                                            fontSize: '1.1rem',
                                            fontWeight: 800,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.08em',
                                            boxShadow: '4px 4px 10px rgba(255, 71, 87, 0.3), -4px -4px 10px rgba(255, 255, 255, 0.8)',
                                            transition: 'all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                            '& .MuiButton-endIcon': {
                                                transition: 'transform 0.2s ease-in-out',
                                            },
                                            '&:hover': {
                                                bgcolor: '#ff2e44',
                                                boxShadow: '6px 6px 14px rgba(255, 71, 87, 0.4), -6px -6px 14px rgba(255, 255, 255, 0.8)',
                                                transform: 'translateY(-2px)',
                                            },
                                            '&:hover .MuiButton-endIcon': {
                                                transform: 'translateX(6px)',
                                            },
                                            '&:active': {
                                                bgcolor: '#cc3946',
                                                transform: 'translateY(1px)',
                                                boxShadow: 'inset 3px 3px 6px rgba(0, 0, 0, 0.2)',
                                            },
                                            '&.Mui-disabled': {
                                                bgcolor: '#d1d9e6',
                                                color: '#a3b1c6',
                                                boxShadow: 'none',
                                                transform: 'none',
                                                cursor: 'not-allowed',
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
                                            <CircularProgress variant="determinate" value={100} size={160} thickness={2} sx={{ color: 'rgba(0,0,0,0.04)' }} />
                                            <CircularProgress variant="determinate" value={progress} size={160} thickness={4} sx={{ color: '#ff4757', position: 'absolute', left: 0, filter: 'drop-shadow(0 0 10px rgba(255, 71, 87, 0.4))', strokeLinecap: 'round' }} />
                                            <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Typography variant="h3" component="div" sx={{ fontWeight: 800, color: '#2d3436', fontFamily: 'monospace' }}>
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
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
                                            <Box sx={{
                                                width: 96, height: 96, borderRadius: '50%', bgcolor: '#e0e5ec',
                                                color: '#22c55e', display: 'flex', alignItems: 'center', justifycontent: 'center',
                                                border: '1px solid rgba(255,255,255,0.4)', boxShadow: '4px 4px 10px #babecc, -4px -4px 10px #ffffff', flexShrink: 0
                                            }}>
                                                <CheckCircle size={48} strokeWidth={2} />
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
                                                    borderRadius: '8px',
                                                    bgcolor: '#22c55e',
                                                    color: '#ffffff',
                                                    fontSize: '1rem',
                                                    fontWeight: 800,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.05em',
                                                    boxShadow: '4px 4px 10px rgba(34, 197, 94, 0.3), -4px -4px 10px rgba(255, 255, 255, 0.8)',
                                                    transition: 'all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                    '&:hover': {
                                                        bgcolor: '#16a34a',
                                                        boxShadow: '6px 6px 14px rgba(34, 197, 94, 0.4), -6px -6px 14px rgba(255, 255, 255, 0.8)',
                                                        transform: 'translateY(-2px)',
                                                    },
                                                    '&:active': {
                                                        transform: 'translateY(1px)',
                                                        boxShadow: 'inset 3px 3px 6px rgba(0, 0, 0, 0.2)',
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
                                                    borderRadius: '8px',
                                                    border: 'none',
                                                    bgcolor: '#e0e5ec',
                                                    color: '#2d3436',
                                                    fontSize: '1rem',
                                                    fontWeight: 800,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.05em',
                                                    boxShadow: '4px 4px 10px #babecc, -4px -4px 10px #ffffff',
                                                    transition: 'all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                    '&:hover': {
                                                        bgcolor: '#e0e5ec',
                                                        boxShadow: '6px 6px 14px #babecc, -6px -6px 14px #ffffff',
                                                        transform: 'translateY(-2px)',
                                                    },
                                                    '&:active': {
                                                        transform: 'translateY(1px)',
                                                        boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff',
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

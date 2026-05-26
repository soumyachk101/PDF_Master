'use client';

import React, { useState, memo } from 'react';
import Link from 'next/link';
import { Box, Typography, Button, Container, Card, CircularProgress, TextField, InputAdornment, Alert, LinearProgress } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useFileUpload } from '@/hooks/useFileUpload';
import { getToolBySlug } from '@/utils/tools';
import DropzoneArea from '@/components/DropzoneArea';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Home, ArrowLeft, ArrowRight, Download, CheckCircle, AlertCircle, AlertTriangle, Link as LinkIcon, FileCheck2, Files, ShieldCheck } from 'lucide-react';
import { getIcon } from '@/utils/icons';
import { NeumorphicCard, NeumorphicButton, GrooveHr, cn } from '@/components/ui/IndustrialComponents';

const DynamicIcon = memo(({ name, color, size = 24, className = "" }) => {
    const IconComponent = getIcon(name);
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, className });
});

DynamicIcon.displayName = 'DynamicIcon';

const pageVariants = {
    initial: { opacity: 0, y: 12 },
    in: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    out: { opacity: 0, y: -12, transition: { duration: 0.2 } }
};

const stateVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } }
};

const neumorphicInputStyle = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '16px',
        bgcolor: '#E4EDE8',
        fontFamily: 'var(--font-body), sans-serif',
        fontWeight: 500,
        color: '#2A3A31',
        boxShadow: 'inset 4px 4px 8px rgba(189, 201, 193, 0.75), inset -4px -4px 8px rgba(255, 255, 255, 0.85)',
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '&.Mui-focused': {
            boxShadow: 'inset 6px 6px 12px rgba(189, 201, 193, 0.85), inset -6px -6px 12px rgba(255, 255, 255, 0.95)',
            ring: '2px solid #7C3AED',
        },
    },
    '& .MuiInputLabel-root': {
        fontFamily: 'var(--font-body), sans-serif',
        fontWeight: 600,
        color: '#55685C',
        '&.Mui-focused': { color: '#7C3AED' },
    },
    '& .MuiFormHelperText-root': {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#55685C',
    },
};

export default function ToolPage({ toolSlug }) {
    const tool = getToolBySlug(toolSlug);
    const {
        appState, progress, resultUrl, resultFilename,
        errorMsg, resetState, processFiles
    } = useFileUpload(toolSlug);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [splitRanges, setSplitRanges] = useState('');
    const [watermarkText, setWatermarkText] = useState('');
    const [rotateDegrees, setRotateDegrees] = useState('90');
    const [pageNumberStart, setpageNumberStart] = useState('1');
    const [signText, setSignText] = useState('');
    const [protectPassword, setProtectPassword] = useState('');
    const [unlockPassword, setUnlockPassword] = useState('');
    const [translateLang, setTranslateLang] = useState('es');
    const [urlInput, setUrlInput] = useState('');
    const [outputFormat, setOutputFormat] = useState('');

    if (!tool) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#E4EDE8] px-4 pt-24 pb-20">
                <NeumorphicCard className="max-w-md w-full text-center">
                    <AlertCircle size={48} className="text-[#E11D48] mx-auto mb-4" />
                    <h2 className="font-display font-extrabold text-xl uppercase mb-3 text-[#2A3A31]">Tool Not Found</h2>
                    <p className="text-sm text-[#55685C] mb-6">
                        The requested tool does not exist or has been moved.
                    </p>
                    <Link href="/" className="soft-btn soft-btn-primary inline-flex items-center gap-2 text-xs">
                        <ArrowLeft size={14} /> Return Home
                    </Link>
                </NeumorphicCard>
            </div>
        );
    }

    const iconComponent = getIcon(tool.icon);
    const hasMultipleOutputs = tool.slug === 'pdf-to-jpg';
    const hasUrlInput = tool.urlInput;

    const handleSubmit = async () => {
        const additionalData = {};
        if (tool.slug === 'split-pdf' && splitRanges) additionalData.ranges = splitRanges;
        if (tool.slug === 'add-watermark' && watermarkText) additionalData.text = watermarkText;
        if (tool.slug === 'rotate-pdf') additionalData.degrees = rotateDegrees;
        if (tool.slug === 'add-page-numbers') additionalData.start = pageNumberStart;
        if (tool.slug === 'sign-pdf' && signText) additionalData.text = signText;
        if (tool.slug === 'protect-pdf' && protectPassword) additionalData.password = protectPassword;
        if (tool.slug === 'unlock-pdf' && unlockPassword) additionalData.password = unlockPassword;
        if (tool.slug === 'translate-pdf') additionalData.targetLang = translateLang;
        if (hasUrlInput && urlInput) additionalData.url = urlInput;
        if (outputFormat) additionalData.format = outputFormat;
        await processFiles(selectedFiles, additionalData);
    };

    const handleDownload = () => {
        if (!resultUrl) return;
        const a = document.createElement('a');
        a.href = resultUrl;
        a.download = resultFilename || `${tool.slug}-result${tool.outputExt || '.pdf'}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    const resetAll = () => {
        resetState();
        setSelectedFiles([]);
        setSplitRanges('');
        setWatermarkText('');
        setRotateDegrees('90');
        setpageNumberStart('1');
        setSignText('');
        setProtectPassword('');
        setUnlockPassword('');
        setTranslateLang('es');
        setUrlInput('');
        setOutputFormat('');
    };

    const breadcrumbItems = [
        { name: 'HOME', href: '/', icon: Home },
        { name: tool.name.toUpperCase(), href: `/tool/${tool.slug}` }
    ];

    return (
        <div className="min-h-screen bg-[#E4EDE8] pt-6 pb-16 px-4">
            <motion.div
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                className="max-w-3xl mx-auto"
            >
                <Breadcrumbs items={breadcrumbItems} />

                {/* Tool Header */}
                <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#E4EDE8] flex items-center justify-center shadow-soft-extruded hover:scale-105 transition-transform duration-300">
                            {iconComponent && React.createElement(iconComponent, { size: 26, className: "text-[#7C3AED]" })}
                        </div>
                        <h1 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-[#2A3A31]">
                            {tool.name}
                        </h1>
                    </div>
                    <p className="text-sm text-[#55685C] max-w-xl mx-auto leading-relaxed">
                        {tool.desc}
                    </p>
                </div>

                <GrooveHr />

                {/* Main Tool Window (Neumorphic Card) */}
                <NeumorphicCard className="mt-6 p-0 sm:p-0 overflow-hidden" hoverEffect={false}>
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-[#D5DFD9] flex justify-between items-center bg-[#F2F6F4]">
                        <span className="font-mono text-xs font-bold text-[#2A3A31] tracking-wider">
                            {tool.name.toUpperCase()} - DOCSHIFT
                        </span>
                        <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#F2F6F4] shadow-soft-inset-sm" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#F2F6F4] shadow-soft-inset-sm" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#F2F6F4] shadow-soft-inset-sm" />
                        </div>
                    </div>

                    <div className="p-6 sm:p-8 bg-[#F2F6F4]">
                        <AnimatePresence mode="wait">
                            {/* ── UPLOAD STATE ── */}
                            {appState === 'upload' && (
                                <motion.div key="upload" variants={stateVariants} initial="initial" animate="animate" exit="exit">
                                    {hasUrlInput && (
                                        <div className="mb-6">
                                            <TextField
                                                fullWidth
                                                label="Website URL"
                                                placeholder="https://example.com"
                                                value={urlInput}
                                                onChange={(e) => setUrlInput(e.target.value)}
                                                size="small"
                                                sx={neumorphicInputStyle}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start"><LinkIcon size={16} className="text-[#7C3AED] mr-1" /></InputAdornment>,
                                                }}
                                            />
                                            <p className="font-mono text-[10px] text-[#55685C]/70 mt-1.5 ml-2.5">
                                                OR upload an HTML file below:
                                            </p>
                                        </div>
                                    )}

                                    <DropzoneArea
                                        onFileSelect={setSelectedFiles}
                                        selectedFiles={selectedFiles}
                                        accept={tool.accept}
                                        maxSize={100 * 1024 * 1024}
                                        hasUrl={hasUrlInput && !!urlInput}
                                        multiple={tool.multiple}
                                    />

                                    {/* Tool-specific options */}
                                    {tool.slug === 'split-pdf' && (
                                        <div className="mt-5">
                                            <TextField fullWidth size="small" label="Page ranges" placeholder="e.g., 1-3, 5, 7-10" value={splitRanges} onChange={(e) => setSplitRanges(e.target.value)} sx={neumorphicInputStyle} helperText="Leave blank to split into individual pages" />
                                        </div>
                                    )}

                                    {tool.slug === 'add-watermark' && (
                                        <div className="mt-5">
                                            <TextField fullWidth size="small" label="Watermark text" placeholder="CONFIDENTIAL" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} sx={neumorphicInputStyle} />
                                        </div>
                                    )}

                                    {tool.slug === 'rotate-pdf' && (
                                        <div className="mt-5">
                                            <TextField fullWidth size="small" label="Rotation degrees" type="number" value={rotateDegrees} onChange={(e) => setRotateDegrees(e.target.value)} sx={neumorphicInputStyle} helperText="90, 180, or 270" />
                                        </div>
                                    )}

                                    {tool.slug === 'add-page-numbers' && (
                                        <div className="mt-5">
                                            <TextField fullWidth size="small" label="Start number" type="number" value={pageNumberStart} onChange={(e) => setpageNumberStart(e.target.value)} sx={neumorphicInputStyle} />
                                        </div>
                                    )}

                                    {tool.slug === 'sign-pdf' && (
                                        <div className="mt-5">
                                            <TextField fullWidth size="small" label="Signature text" placeholder="Your Name" value={signText} onChange={(e) => setSignText(e.target.value)} sx={neumorphicInputStyle} />
                                        </div>
                                    )}

                                    {tool.slug === 'protect-pdf' && (
                                        <div className="mt-5">
                                            <TextField fullWidth size="small" label="Set password" type="password" value={protectPassword} onChange={(e) => setProtectPassword(e.target.value)} sx={neumorphicInputStyle} />
                                        </div>
                                    )}

                                    {tool.slug === 'unlock-pdf' && (
                                        <div className="mt-5">
                                            <TextField fullWidth size="small" label="PDF password" type="password" value={unlockPassword} onChange={(e) => setUnlockPassword(e.target.value)} sx={neumorphicInputStyle} />
                                        </div>
                                    )}

                                    {tool.slug === 'translate-pdf' && (
                                        <div className="mt-5">
                                            <TextField fullWidth size="small" label="Target language code" placeholder="es, fr, de..." value={translateLang} onChange={(e) => setTranslateLang(e.target.value)} sx={neumorphicInputStyle} helperText="ISO 639-1 code (es, fr, de, ja, etc.)" />
                                        </div>
                                    )}

                                    {hasMultipleOutputs && (
                                        <div className="mt-5 flex flex-wrap gap-3">
                                            {['.png', '.jpg', '.webp'].map(fmt => {
                                                const isSelected = outputFormat === fmt;
                                                return (
                                                    <button
                                                        key={fmt}
                                                        className={cn(
                                                            'h-8 px-4 text-xs font-bold rounded-xl transition-all duration-200 focus:outline-none',
                                                            isSelected
                                                                ? 'bg-[#E4EDE8] text-[#7C3AED] shadow-soft-inset-sm font-bold'
                                                                : 'bg-[#E4EDE8] text-[#55685C] shadow-soft-extruded-sm hover:-translate-y-[0.5px] hover:shadow-soft-extruded'
                                                        )}
                                                        onClick={() => setOutputFormat(fmt)}
                                                    >
                                                        {fmt.toUpperCase()}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Submit */}
                                    <div className="mt-8">
                                        <NeumorphicButton
                                            onClick={handleSubmit}
                                            disabled={(!selectedFiles || selectedFiles.length === 0) && !(hasUrlInput && urlInput)}
                                            variant="primary"
                                            className="w-full h-12 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
                                        >
                                            <ArrowRight size={16} />
                                            Process {tool.name}
                                        </NeumorphicButton>
                                    </div>
                                </motion.div>
                            )}

                            {/* ── PROCESSING STATE ── */}
                            {appState === 'processing' && (
                                <motion.div key="processing" variants={stateVariants} initial="initial" animate="animate" exit="exit" className="text-center py-10">
                                    <div className="w-12 h-12 rounded-full border-[3px] border-[#D5DFD9] border-t-[#7C3AED] animate-spin mx-auto mb-5" />
                                    <h3 className="font-display font-extrabold text-lg uppercase text-[#2A3A31] mb-2">Processing...</h3>
                                    <p className="font-body text-xs text-[#55685C] mb-6">Please wait while your document is being processed.</p>
                                    <div className="mt-4 max-w-xs mx-auto">
                                        <div className="rounded-full bg-[#E4EDE8] shadow-soft-inset h-5 relative overflow-hidden p-1">
                                            <div
                                                className="h-full bg-gradient-to-r from-[#7C3AED] to-[#9F67FF] rounded-full transition-all duration-300"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                        <p className="font-mono text-xs font-bold text-[#7C3AED] mt-2">{Math.round(progress)}%</p>
                                    </div>
                                </motion.div>
                            )}

                            {/* ── SUCCESS STATE ── */}
                            {appState === 'success' && (
                                <motion.div key="success" variants={stateVariants} initial="initial" animate="animate" exit="exit" className="text-center py-8">
                                    <div className="w-16 h-16 rounded-full bg-[#F2F6F4] shadow-soft-extruded mx-auto mb-5 flex items-center justify-center">
                                        <CheckCircle size={32} className="text-[#0D9488]" />
                                    </div>
                                    <h3 className="font-display font-extrabold text-lg uppercase text-[#2A3A31] mb-2">Complete!</h3>
                                    <p className="font-body text-xs text-[#55685C] mb-8">Your file has been processed successfully.</p>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <NeumorphicButton onClick={handleDownload} variant="green" className="h-12 px-6 flex items-center justify-center gap-2">
                                            <Download size={16} /> Download Result
                                        </NeumorphicButton>
                                        <NeumorphicButton onClick={resetAll} variant="secondary" className="h-12 px-6 flex items-center justify-center gap-2">
                                            <ArrowLeft size={16} /> Process Another
                                        </NeumorphicButton>
                                    </div>
                                </motion.div>
                            )}

                            {/* ── ERROR STATE ── */}
                            {appState === 'error' && (
                                <motion.div key="error" variants={stateVariants} initial="initial" animate="animate" exit="exit" className="text-center py-8">
                                    <div className="w-16 h-16 rounded-full bg-[#F2F6F4] shadow-soft-extruded mx-auto mb-5 flex items-center justify-center">
                                        <AlertCircle size={32} className="text-[#E11D48]" />
                                    </div>
                                    <h3 className="font-display font-extrabold text-lg uppercase text-[#2A3A31] mb-2">Error</h3>
                                    <div className="rounded-2xl bg-[#E4EDE8] shadow-soft-inset p-4 mb-6 max-w-md mx-auto border border-red-500/10">
                                        <p className="font-mono text-xs text-[#E11D48]">{errorMsg || 'An unexpected error occurred.'}</p>
                                    </div>
                                    <NeumorphicButton onClick={resetAll} variant="danger" className="h-12 px-6 flex items-center justify-center gap-2 mx-auto">
                                        <ArrowLeft size={16} /> Try Again
                                    </NeumorphicButton>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Status Bar */}
                        <div className="rounded-2xl bg-[#E4EDE8] shadow-soft-inset-sm p-3.5 flex items-center justify-between mt-8">
                            <div className="flex items-center gap-3 font-mono text-[10px] text-[#55685C]">
                                <span className="flex items-center gap-1.5 font-bold">
                                    <span className={`w-2.5 h-2.5 rounded-full inline-block ${appState === 'processing' ? 'bg-amber-500 animate-pulse' : appState === 'success' ? 'bg-[#0D9488]' : appState === 'error' ? 'bg-[#E11D48]' : 'bg-[#0D9488]'}`} />
                                    {appState === 'upload' ? 'READY' : appState === 'processing' ? 'BUSY' : appState === 'success' ? 'DONE' : 'ERROR'}
                                </span>
                                <span className="text-[#D5DFD9]">|</span>
                                <span className="font-bold">{tool.name.toUpperCase()}</span>
                            </div>
                            <span className="font-mono text-[10px] text-[#55685C]/60 hidden sm:inline tracking-wider">
                                DOCSHIFT SECURE
                            </span>
                        </div>
                    </div>
                </NeumorphicCard>

                {/* Security Badge */}
                <div className="flex justify-center mt-6">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-[#55685C]">
                        <ShieldCheck size={14} className="text-[#0D9488]" />
                        Files processed locally in your browser. Never uploaded to any server.
                    </div>
                </div>

                {/* SEO Content */}
                <div className="mt-12">
                    <ToolSEOContentWrapper toolSlug={toolSlug} />
                </div>
            </motion.div>
        </div>
    );
}

function ToolSEOContentWrapper({ toolSlug }) {
    const ToolSEOContent = require('@/views/ToolSEOContent').default;
    return <ToolSEOContent toolSlug={toolSlug} />;
}

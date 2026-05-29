'use client';

import React, { useState, memo } from 'react';
import Link from 'next/link';
import { Box, Typography, Button, Container, Card, CircularProgress, TextField, InputAdornment, Alert, LinearProgress } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useFileUpload } from '@/hooks/useFileUpload';
import { getToolBySlug, TOOLS } from '@/utils/tools';
import DropzoneArea from '@/components/DropzoneArea';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Home, ArrowLeft, ArrowRight, Download, CheckCircle, AlertCircle, AlertTriangle, Link as LinkIcon, FileCheck2, Files, ShieldCheck, HelpCircle } from 'lucide-react';
import { getIcon } from '@/utils/icons';
import { NeumorphicCard, NeumorphicButton, GrooveHr, cn } from '@/components/ui/IndustrialComponents';

const DynamicIcon = memo(({ name, color, size = 24, className = "" }) => {
    const IconComponent = getIcon(name);
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, className });
});

DynamicIcon.displayName = 'DynamicIcon';

const pageVariants = {
    initial: { opacity: 0, y: 10 },
    in: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    out: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

const stateVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.15 } }
};

// Dayos custom styling for Material UI TextFields
const dayosInputStyle = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        bgcolor: '#ffffff',
        fontFamily: 'var(--font-suisseintl), sans-serif',
        fontWeight: 500,
        color: '#000000',
        boxShadow: 'none',
        '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #000000' },
        '&:hover .MuiOutlinedInput-notchedOutline': { border: '1px solid #000000' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '2px solid #000000' },
        '& input': {
            color: '#000000',
            bgcolor: '#ffffff',
            '&::placeholder': { color: '#979797', opacity: 1 },
        },
        '& input[type="password"]': {
            color: '#000000',
            bgcolor: '#ffffff',
            letterSpacing: '0.15em',
        },
    },
    '& .MuiInputLabel-root': {
        fontFamily: 'var(--font-suisseintl), sans-serif',
        fontWeight: 500,
        color: '#444444',
        '&.Mui-focused': { color: '#000000' },
    },
    '& .MuiFormHelperText-root': {
        fontFamily: 'var(--font-suisseintlmono), monospace',
        fontSize: '10px',
        color: '#444444',
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
            <div className="min-h-screen flex items-center justify-center bg-[#e5e7eb] px-4 pt-12 pb-20">
                <NeumorphicCard className="max-w-md w-full text-center bg-[#ffffff] border border-[#000000] rounded-[32px]">
                    <AlertCircle size={48} className="text-red-600 mx-auto mb-4" />
                    <h2 className="font-suisseintl font-bold text-xl uppercase mb-3 text-[#000000]">Tool Not Found</h2>
                    <p className="text-sm text-[#444444] mb-6">
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
        <div className="min-h-screen bg-[#e5e7eb] pt-2 pb-16 px-4 font-suisseintl">
            <motion.div
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                className="max-w-5xl mx-auto"
            >
                <Breadcrumbs items={breadcrumbItems} />

                {/* Tool Header (Left-aligned as per Dayos layout guidelines) */}
                <div className="mb-8 text-left mt-2">
                    <div className="inline-flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 border border-[#000000] bg-[#ffffff] flex items-center justify-center">
                            {iconComponent && React.createElement(iconComponent, { size: 26, className: "text-[#000000]" })}
                        </div>
                        <h1 className="font-suisseintlcond font-bold text-3xl sm:text-4xl uppercase tracking-tight text-[#000000]">
                            {tool.name}
                        </h1>
                    </div>
                    <p className="text-xs sm:text-sm text-[#444444] max-w-xl leading-relaxed">
                        {tool.desc}
                    </p>
                </div>

                {/* Two Column Layout Grid to optimize space */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Interactive Workspace */}
                    <div className="lg:col-span-7">
                        <NeumorphicCard className="p-0 sm:p-0 overflow-hidden bg-[#ffffff] border border-[#000000] rounded-[32px]" hoverEffect={false}>
                            {/* Header */}
                            <div className="px-6 py-4 border-b border-[#000000]/10 flex justify-between items-center bg-[#ffffff]">
                                <span className="font-suisseintlmono text-xs font-bold text-[#000000] tracking-wider">
                                    {tool.name.toUpperCase()} - DOCSHIFT ENGINE
                                </span>
                                <div className="flex gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full border border-[#000000]/10 bg-[#e5e7eb]" />
                                    <span className="w-2.5 h-2.5 rounded-full border border-[#000000]/10 bg-[#e5e7eb]" />
                                    <span className="w-2.5 h-2.5 rounded-full border border-[#000000]/10 bg-[#e5e7eb]" />
                                </div>
                            </div>

                            <div className="p-6 sm:p-8 bg-[#ffffff]">
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
                                                        sx={dayosInputStyle}
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start"><LinkIcon size={16} className="text-[#000000] mr-1" /></InputAdornment>,
                                                        }}
                                                    />
                                                    <p className="font-suisseintlmono text-[10px] text-[#444444]/70 mt-1.5 ml-2.5">
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
                                                    <TextField fullWidth size="small" label="Page ranges" placeholder="e.g., 1-3, 5, 7-10" value={splitRanges} onChange={(e) => setSplitRanges(e.target.value)} sx={dayosInputStyle} helperText="Leave blank to split into individual pages" />
                                                </div>
                                            )}

                                            {tool.slug === 'add-watermark' && (
                                                <div className="mt-5">
                                                    <TextField fullWidth size="small" label="Watermark text" placeholder="CONFIDENTIAL" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} sx={dayosInputStyle} />
                                                </div>
                                            )}

                                            {tool.slug === 'rotate-pdf' && (
                                                <div className="mt-5">
                                                    <TextField fullWidth size="small" label="Rotation degrees" type="number" value={rotateDegrees} onChange={(e) => setRotateDegrees(e.target.value)} sx={dayosInputStyle} helperText="90, 180, or 270" />
                                                </div>
                                            )}

                                            {tool.slug === 'add-page-numbers' && (
                                                <div className="mt-5">
                                                    <TextField fullWidth size="small" label="Start number" type="number" value={pageNumberStart} onChange={(e) => setpageNumberStart(e.target.value)} sx={dayosInputStyle} />
                                                </div>
                                            )}

                                            {tool.slug === 'sign-pdf' && (
                                                <div className="mt-5">
                                                    <TextField fullWidth size="small" label="Signature text" placeholder="Your Name" value={signText} onChange={(e) => setSignText(e.target.value)} sx={dayosInputStyle} />
                                                </div>
                                            )}

                                            {tool.slug === 'protect-pdf' && (
                                                <div className="mt-5">
                                                    <TextField fullWidth size="small" label="Set password" type="password" value={protectPassword} onChange={(e) => setProtectPassword(e.target.value)} sx={dayosInputStyle} />
                                                </div>
                                            )}

                                            {tool.slug === 'unlock-pdf' && (
                                                <div className="mt-5">
                                                    <TextField fullWidth size="small" label="PDF password" type="password" value={unlockPassword} onChange={(e) => setUnlockPassword(e.target.value)} sx={dayosInputStyle} />
                                                </div>
                                            )}

                                            {tool.slug === 'translate-pdf' && (
                                                <div className="mt-5">
                                                    <TextField fullWidth size="small" label="Target language code" placeholder="es, fr, de..." value={translateLang} onChange={(e) => setTranslateLang(e.target.value)} sx={dayosInputStyle} helperText="ISO 639-1 code (es, fr, de, ja, etc.)" />
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
                                                                    'h-8 px-4 text-xs font-bold rounded-none transition-all duration-200 focus:outline-none border',
                                                                    isSelected
                                                                        ? 'bg-[#000000] text-[#ffffff] border-[#000000]'
                                                                        : 'bg-[#ffffff] text-[#444444] border-[#000000]/15 hover:border-[#000000] hover:text-[#000000]'
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
                                            <div className="w-12 h-12 rounded-full border-2 border-[#e5e7eb] border-t-[#000000] animate-spin mx-auto mb-5" />
                                            <h3 className="font-suisseintl font-bold text-base uppercase text-[#000000] mb-2">Processing...</h3>
                                            <p className="font-suisseintl text-xs text-[#444444] mb-6">Please wait while your document is being processed.</p>
                                            <div className="mt-4 max-w-xs mx-auto">
                                                <div className="border border-[#000000] bg-[#ffffff] h-5 relative overflow-hidden p-0.5">
                                                    {/* Action Green progress indicator */}
                                                    <div
                                                        className="h-full bg-[#d1ffca] transition-all duration-300"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                                <p className="font-suisseintlmono text-xs font-bold text-[#000000] mt-2">{Math.round(progress)}%</p>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* ── SUCCESS STATE ── */}
                                    {appState === 'success' && (
                                        <motion.div key="success" variants={stateVariants} initial="initial" animate="animate" exit="exit" className="text-center py-8">
                                            {/* Action green highlight well for success */}
                                            <div className="w-16 h-16 border border-[#000000] bg-[#d1ffca] mx-auto mb-5 flex items-center justify-center">
                                                <CheckCircle size={32} className="text-[#000000]" />
                                            </div>
                                            <h3 className="font-suisseintl font-bold text-base uppercase text-[#000000] mb-2">Complete!</h3>
                                            <p className="font-suisseintl text-xs text-[#444444] mb-8">Your file has been processed successfully.</p>

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
                                            {/* Alert yellow highlight well for error */}
                                            <div className="w-16 h-16 border border-[#000000] bg-[#fff100] mx-auto mb-5 flex items-center justify-center">
                                                <AlertCircle size={32} className="text-[#000000]" />
                                            </div>
                                            <h3 className="font-suisseintl font-bold text-base uppercase text-[#000000] mb-2">Error</h3>
                                            <div className="border border-[#000000] bg-[#ffffff] p-4 mb-6 max-w-md mx-auto">
                                                <p className="font-suisseintlmono text-xs text-red-600">{errorMsg || 'An unexpected error occurred.'}</p>
                                            </div>
                                            <NeumorphicButton onClick={resetAll} variant="danger" className="h-12 px-6 flex items-center justify-center gap-2 mx-auto">
                                                <ArrowLeft size={16} /> Try Again
                                            </NeumorphicButton>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Flat status bar bottom */}
                                <div className="border border-[#000000]/15 bg-[#e5e7eb]/40 p-3.5 flex items-center justify-between mt-8">
                                    <div className="flex items-center gap-3 font-suisseintlmono text-[10px] text-[#444444]">
                                        <span className="flex items-center gap-1.5 font-bold text-[#000000]">
                                            <span className={`w-2.5 h-2.5 inline-block ${appState === 'processing' ? 'bg-[#fff100] animate-pulse border border-[#000000]' : appState === 'success' ? 'bg-[#d1ffca] border border-[#000000]' : appState === 'error' ? 'bg-[#fff100] border border-[#000000]' : 'bg-[#d1ffca] border border-[#000000]'}`} />
                                            {appState === 'upload' ? 'READY' : appState === 'processing' ? 'BUSY' : appState === 'success' ? 'DONE' : 'ERROR'}
                                        </span>
                                        <span className="text-[#000000]/15">|</span>
                                        <span className="font-bold">{tool.name.toUpperCase()}</span>
                                    </div>
                                    <span className="font-suisseintlmono text-[10px] text-[#444444] hidden sm:inline tracking-wider">
                                        WASM ENGINE DIRECT
                                    </span>
                                </div>
                            </div>
                        </NeumorphicCard>
                    </div>

                    {/* Right Column: Sidebar (How-to, Security Details, Related utilities) */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Security Notice Callout (Action Green accent background) */}
                        <div className="bg-[#d1ffca] border border-[#000000] p-6 rounded-[32px] text-left">
                            <h2 className="font-suisseintl font-bold text-xs uppercase tracking-wider text-[#000000] mb-3 flex items-center gap-2">
                                <ShieldCheck size={16} /> 100% In-Browser Secure
                            </h2>
                            <p className="font-suisseintl text-xs text-[#000000] leading-relaxed">
                                Document conversion and adjustments run strictly locally via client-side WebAssembly. No files are ever sent to external cloud servers, preventing data leaks.
                            </p>
                        </div>

                        {/* Interactive Steps card */}
                        <div className="bg-[#ffffff] border border-[#000000] p-6 rounded-[32px] text-left">
                            <h2 className="font-suisseintl font-bold text-xs uppercase tracking-wider text-[#000000] mb-3 flex items-center gap-2">
                                <HelpCircle size={16} /> Quick Instructions
                            </h2>
                            <div className="font-suisseintl text-xs text-[#444444] space-y-2.5 leading-relaxed">
                                <p>1. Drag-and-drop or select your PDF document in the workspace.</p>
                                <p>2. Configure variables (e.g. signature labels, passwords) if available.</p>
                                <p>3. Select target formats and click the <strong>"Process"</strong> action.</p>
                                <p>4. Wait for local compilation and download the output asset.</p>
                            </div>
                        </div>

                        {/* Sidebar Related Utilities */}
                        <div className="bg-[#ffffff] border border-[#000000] p-6 rounded-[32px] text-left">
                            <h2 className="font-suisseintl font-bold text-xs uppercase tracking-wider text-[#000000] mb-3 flex items-center gap-2">
                                <Files size={15} /> Related Utilities
                            </h2>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                                {TOOLS.filter(t => t.category === tool.category && t.slug !== tool.slug)
                                    .slice(0, 4)
                                    .map((relatedTool) => (
                                        <Link
                                            key={relatedTool.slug}
                                            href={`/tool/${relatedTool.slug}`}
                                            className="h-8 rounded-none border border-[#000000]/15 bg-[#ffffff] flex items-center justify-center px-2 text-[10px] font-bold text-[#444444] hover:bg-[#f3f3f3] hover:text-[#000000] hover:border-[#000000] transition-all duration-150 truncate text-center"
                                        >
                                            {relatedTool.name}
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* SEO Rich Content, FAQ lists, and related tools (Bottom full width) */}
                <div className="mt-12 border-t border-[#000000]/10 pt-8">
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

'use client';

import React, { useState, memo } from 'react';
import Link from 'next/link';
import { Box, Typography, Button, Container, Card, CircularProgress, TextField, InputAdornment, Alert, LinearProgress, IconButton } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useFileUpload } from '@/hooks/useFileUpload';
import { getToolBySlug, TOOLS } from '@/utils/tools';
import DropzoneArea from '@/components/DropzoneArea';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Home, ArrowLeft, ArrowRight, Download, CheckCircle, AlertCircle, AlertTriangle, Link as LinkIcon, FileCheck2, Files, ShieldCheck, HelpCircle, Eye, EyeOff, Plus, Minus, RotateCcw, RotateCw, ArrowDown, PenTool, Globe } from 'lucide-react';
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

    const [showProtectPassword, setShowProtectPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showUnlockPassword, setShowUnlockPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedSignatureFont, setSelectedSignatureFont] = useState('font-dancing');
    const [localError, setLocalError] = useState('');

    const getPasswordStrength = (pwd) => {
        if (!pwd) return { score: 0, label: '', color: 'transparent' };
        let score = 0;
        if (pwd.length >= 6) score += 1;
        if (pwd.length >= 10) score += 1;
        if (/[A-Z]/.test(pwd)) score += 1;
        if (/[0-9]/.test(pwd)) score += 1;
        if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

        if (score <= 2) return { score, label: 'Weak', color: '#ff4d4d' };
        if (score <= 4) return { score, label: 'Medium', color: '#fff100' };
        return { score, label: 'Strong', color: '#000000' }; // matched to text style or we can use action green border/text
    };

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
        setLocalError('');
        const additionalData = {};
        if (tool.slug === 'split-pdf' && splitRanges) additionalData.ranges = splitRanges;
        if (tool.slug === 'add-watermark' && watermarkText) additionalData.text = watermarkText;
        if (tool.slug === 'rotate-pdf') additionalData.degrees = rotateDegrees;
        if (tool.slug === 'add-page-numbers') additionalData.start = pageNumberStart;
        
        if (tool.slug === 'sign-pdf') {
            if (!signText.trim()) {
                setLocalError("Please enter your name for the signature.");
                return;
            }
            additionalData.text = signText;
        }
        
        if (tool.slug === 'protect-pdf') {
            if (!protectPassword) {
                setLocalError("Please enter a password to protect the PDF.");
                return;
            }
            if (protectPassword !== confirmPassword) {
                setLocalError("Passwords do not match. Please verify and try again.");
                return;
            }
            additionalData.password = protectPassword;
        }
        
        if (tool.slug === 'unlock-pdf') {
            if (!unlockPassword) {
                setLocalError("Please enter the password to unlock the PDF.");
                return;
            }
            additionalData.password = unlockPassword;
        }
        
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
        setConfirmPassword('');
        setUnlockPassword('');
        setTranslateLang('es');
        setUrlInput('');
        setOutputFormat('');
        setLocalError('');
        setShowProtectPassword(false);
        setShowConfirmPassword(false);
        setShowUnlockPassword(false);
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
                                            {hasUrlInput ? (
                                                <div className="mb-4 space-y-4 text-left">
                                                    <div className="bg-[#d1ffca]/10 border border-[#000000] p-4 rounded-[16px] flex items-start gap-3">
                                                        <Globe size={20} className="text-[#000000] mt-0.5 flex-shrink-0" />
                                                        <div>
                                                            <h4 className="font-suisseintl font-bold text-xs uppercase text-[#000000]">
                                                                Webpage URL Capture
                                                            </h4>
                                                            <p className="font-suisseintl text-[10px] text-[#444444] mt-1 leading-normal">
                                                                Enter the URL of any public website below. Our service will fetch and compile it into a clean, print-ready PDF layout.
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1.5 text-left">
                                                        <label className="block text-xs font-bold uppercase tracking-wider text-[#000000] font-suisseintlmono">
                                                            Website URL
                                                        </label>
                                                        <div className="relative">
                                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#000000]">
                                                                <LinkIcon size={16} />
                                                            </div>
                                                            <input 
                                                                type="text"
                                                                placeholder="https://example.com"
                                                                value={urlInput}
                                                                onChange={(e) => { setUrlInput(e.target.value); setLocalError(''); }}
                                                                className="w-full h-11 pl-10 pr-4 border border-[#000000] bg-[#ffffff] text-[#000000] font-suisseintl font-medium text-sm focus:border-2 focus:outline-none rounded-[8px] transition-all"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <DropzoneArea
                                                    onFileSelect={setSelectedFiles}
                                                    selectedFiles={selectedFiles}
                                                    accept={tool.accept}
                                                    maxSize={100 * 1024 * 1024}
                                                    hasUrl={hasUrlInput && !!urlInput}
                                                    multiple={tool.multiple}
                                                />
                                            )}

                                            {/* Tool-specific options */}
                                            {tool.slug === 'split-pdf' && (
                                                <div className="mt-5 space-y-3 text-left">
                                                    <div className="space-y-1.5">
                                                        <label className="block text-xs font-bold uppercase tracking-wider text-[#000000] font-suisseintlmono">
                                                            Page ranges
                                                        </label>
                                                        <input 
                                                            type="text"
                                                            placeholder="e.g., 1-3, 5, 7-10" 
                                                            value={splitRanges} 
                                                            onChange={(e) => { setSplitRanges(e.target.value); setLocalError(''); }} 
                                                            className="w-full h-11 px-4 border border-[#000000] bg-[#ffffff] text-[#000000] font-suisseintl font-medium text-sm focus:border-2 focus:outline-none rounded-[8px] transition-all"
                                                        />
                                                        <p className="font-suisseintlmono text-[9px] text-[#444444] mt-1.5 ml-1">
                                                            Leave blank to split into individual pages
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {[
                                                            { label: 'All Pages', value: '' },
                                                            { label: 'Odd Pages', value: '1,3,5,7,9,11,13,15' },
                                                            { label: 'Even Pages', value: '2,4,6,8,10,12,14,16' },
                                                            { label: 'First Page Only', value: '1' }
                                                        ].map(preset => {
                                                            const isSelected = splitRanges === preset.value;
                                                            return (
                                                                <button
                                                                    key={preset.label}
                                                                    type="button"
                                                                    onClick={() => { setSplitRanges(preset.value); setLocalError(''); }}
                                                                    className={cn(
                                                                        'px-3 py-1.5 border text-[10px] font-bold uppercase transition-all duration-150 rounded-none font-suisseintlmono',
                                                                        isSelected
                                                                            ? 'bg-[#000000] text-[#ffffff] border-[#000000]'
                                                                            : 'bg-[#ffffff] text-[#444444] border-[#000000]/15 hover:border-[#000000] hover:text-[#000000]'
                                                                    )}
                                                                >
                                                                    {preset.label}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            {tool.slug === 'add-watermark' && (
                                                <div className="mt-5 space-y-4 text-left">
                                                    <div className="space-y-1.5">
                                                        <label className="block text-xs font-bold uppercase tracking-wider text-[#000000] font-suisseintlmono">
                                                            Watermark text
                                                        </label>
                                                        <input 
                                                            type="text"
                                                            placeholder="CONFIDENTIAL" 
                                                            value={watermarkText} 
                                                            onChange={(e) => { setWatermarkText(e.target.value); setLocalError(''); }} 
                                                            className="w-full h-11 px-4 border border-[#000000] bg-[#ffffff] text-[#000000] font-suisseintl font-medium text-sm focus:border-2 focus:outline-none rounded-[8px] transition-all"
                                                        />
                                                    </div>
                                                    {watermarkText && (
                                                        <div className="border border-[#000000] p-4 bg-[#ffffff] relative flex items-center justify-center min-h-[80px] overflow-hidden rounded-[16px]">
                                                            <div className="absolute inset-0 bg-stone-50/50 pointer-events-none" />
                                                            <div className="text-[10px] text-stone-300 font-suisseintl select-none w-full space-y-1">
                                                                <div className="h-2 w-1/3 bg-stone-200 rounded" />
                                                                <div className="h-2 w-5/6 bg-stone-200 rounded" />
                                                                <div className="h-2 w-4/5 bg-stone-200 rounded" />
                                                            </div>
                                                            <span className="absolute font-suisseintl font-bold text-lg select-none pointer-events-none opacity-20 uppercase tracking-widest text-[#000000] transform rotate-[-30deg]">
                                                                {watermarkText}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {tool.slug === 'rotate-pdf' && (
                                                <div className="mt-5 space-y-2">
                                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#000000] font-suisseintlmono">
                                                        Rotation Angle
                                                    </label>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {[
                                                            { label: '90° CW', value: '90' },
                                                            { label: '180° Flip', value: '180' },
                                                            { label: '270° CCW', value: '270' }
                                                        ].map(opt => {
                                                            const isSelected = rotateDegrees === opt.value;
                                                            return (
                                                                <button
                                                                    key={opt.value}
                                                                    type="button"
                                                                    onClick={() => { setRotateDegrees(opt.value); setLocalError(''); }}
                                                                    className={cn(
                                                                        'h-12 border transition-all duration-150 flex flex-col items-center justify-center gap-1 font-suisseintl text-[10px] font-bold rounded-none',
                                                                        isSelected
                                                                            ? 'bg-[#000000] text-[#ffffff] border-[#000000]'
                                                                            : 'bg-[#ffffff] text-[#444444] border-[#000000]/15 hover:border-[#000000] hover:text-[#000000]'
                                                                    )}
                                                                >
                                                                    {opt.value === '90' && <RotateCw size={14} />}
                                                                    {opt.value === '180' && <ArrowDown size={14} />}
                                                                    {opt.value === '270' && <RotateCcw size={14} />}
                                                                    {opt.label}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            {tool.slug === 'add-page-numbers' && (
                                                <div className="mt-5 space-y-2">
                                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#000000] font-suisseintlmono">
                                                        Starting Page Number
                                                    </label>
                                                    <div className="flex items-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => { setpageNumberStart(prev => String(Math.max(1, parseInt(prev || '1') - 1))); setLocalError(''); }}
                                                            className="h-10 w-10 border border-r-0 border-[#000000] bg-[#ffffff] text-[#000000] flex items-center justify-center hover:bg-[#f3f3f3] active:bg-[#e5e7eb] rounded-l-[8px] transition-colors"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <input
                                                            type="number"
                                                            value={pageNumberStart}
                                                            onChange={(e) => { setpageNumberStart(String(Math.max(1, parseInt(e.target.value) || 1))); setLocalError(''); }}
                                                            className="h-10 w-16 border border-[#000000] text-center font-suisseintl font-bold text-sm text-[#000000] focus:outline-none focus:ring-0"
                                                            style={{ MozAppearance: 'textfield' }}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => { setpageNumberStart(prev => String(parseInt(prev || '1') + 1)); setLocalError(''); }}
                                                            className="h-10 w-10 border border-l-0 border-[#000000] bg-[#ffffff] text-[#000000] flex items-center justify-center hover:bg-[#f3f3f3] active:bg-[#e5e7eb] rounded-r-[8px] transition-colors"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {tool.slug === 'sign-pdf' && (
                                                <div className="mt-5 space-y-4 text-left">
                                                    <link 
                                                        href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Caveat:wght@700&family=Dancing+Script:wght@600&family=Great+Vibes&family=Reenie+Beanie&family=Sacramento&display=swap" 
                                                        rel="stylesheet" 
                                                    />
                                                                                              <div className="space-y-1.5">
                                                        <label className="block text-xs font-bold uppercase tracking-wider text-[#000000] font-suisseintlmono">
                                                            Signature text
                                                        </label>
                                                        <div className="relative">
                                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#000000]">
                                                                <PenTool size={16} />
                                                            </div>
                                                            <input 
                                                                type="text"
                                                                placeholder="Your Name" 
                                                                value={signText} 
                                                                onChange={(e) => { setSignText(e.target.value); setLocalError(''); }} 
                                                                className="w-full h-11 pl-10 pr-4 border border-[#000000] bg-[#ffffff] text-[#000000] font-suisseintl font-medium text-sm focus:border-2 focus:outline-none rounded-[8px] transition-all"
                                                            />
                                                        </div>
                                                    </div>

                                                    {signText && (
                                                        <div className="space-y-3">
                                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#444444] font-suisseintlmono">
                                                                Select Font Style
                                                            </label>
                                                            <div className="grid grid-cols-2 gap-2">
                                                                {[
                                                                    { id: 'font-dancing', name: 'Elegant Cursive', fontStyle: { fontFamily: "'Dancing Script', cursive" } },
                                                                    { id: 'font-greatvibes', name: 'Calligraphy', fontStyle: { fontFamily: "'Great Vibes', cursive" } },
                                                                    { id: 'font-alex', name: 'Classic Script', fontStyle: { fontFamily: "'Alex Brush', cursive" } },
                                                                    { id: 'font-caveat', name: 'Modern Hand', fontStyle: { fontFamily: "'Caveat', cursive" } }
                                                                ].map(styleOpt => {
                                                                    const isSelected = selectedSignatureFont === styleOpt.id;
                                                                    return (
                                                                        <button
                                                                            key={styleOpt.id}
                                                                            type="button"
                                                                            onClick={() => setSelectedSignatureFont(styleOpt.id)}
                                                                            className={cn(
                                                                                'p-2.5 border transition-all duration-150 flex flex-col text-left justify-center gap-1.5 rounded-none min-h-[64px]',
                                                                                isSelected
                                                                                    ? 'bg-[#000000] text-[#ffffff] border-[#000000]'
                                                                                    : 'bg-[#ffffff] text-[#000000] border-[#000000]/15 hover:border-[#000000]'
                                                                            )}
                                                                        >
                                                                            <span className="text-[9px] uppercase tracking-wider font-suisseintlmono opacity-50 block">
                                                                                {styleOpt.name}
                                                                            </span>
                                                                            <span className="text-lg leading-none block truncate" style={styleOpt.fontStyle}>
                                                                                {signText}
                                                                            </span>
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>

                                                            {/* Digital Seal / Certificate Design Card */}
                                                            <div className="border border-[#000000] bg-[#d1ffca]/20 p-4 rounded-[16px] relative overflow-hidden flex flex-col gap-1.5 mt-4">
                                                                <div className="absolute right-[-10px] bottom-[-15px] opacity-10 pointer-events-none">
                                                                    <ShieldCheck size={100} className="text-[#000000]" />
                                                                </div>
                                                                
                                                                <span className="font-suisseintlmono text-[8px] font-bold text-[#000000]/60 uppercase tracking-widest block">
                                                                    COMPLIANT ELECTRONIC SEAL
                                                                </span>
                                                                
                                                                <div className="flex justify-between items-end border-b border-[#000000]/10 pb-2 mb-1.5">
                                                                    <div>
                                                                        <span className="text-[18px] font-medium leading-none block" style={{
                                                                            fontFamily: selectedSignatureFont === 'font-dancing' ? "'Dancing Script', cursive" :
                                                                                        selectedSignatureFont === 'font-greatvibes' ? "'Great Vibes', cursive" :
                                                                                        selectedSignatureFont === 'font-alex' ? "'Alex Brush', cursive" :
                                                                                        selectedSignatureFont === 'font-caveat' ? "'Caveat', cursive" : "'Dancing Script', cursive"
                                                                        }}>
                                                                            {signText}
                                                                        </span>
                                                                        <span className="text-[9px] font-suisseintlmono text-[#444444] mt-1 block">
                                                                            DocID: SECURE-WASM-{(selectedFiles[0]?.name || 'DOC').replace(/[^a-zA-Z0-9]/g, '').substring(0, 6).toUpperCase()}
                                                                        </span>
                                                                    </div>
                                                                    <div className="bg-[#d1ffca] border border-[#000000] text-[9px] font-bold px-2 py-0.5 uppercase tracking-wide flex items-center gap-1 font-suisseintlmono h-fit">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#000000]" />
                                                                        VERIFIED
                                                                    </div>
                                                                </div>
                                                                
                                                                <span className="text-[9px] text-[#444444] font-suisseintl leading-normal">
                                                                    This signature is generated and stamped client-side using local cryptography. The document is protected against unauthorized layout manipulation.
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {tool.slug === 'protect-pdf' && (
                                                <div className="mt-5 space-y-4 text-left">
                                                    <div className="space-y-1.5">
                                                        <label className="block text-xs font-bold uppercase tracking-wider text-[#000000] font-suisseintlmono">
                                                            Set password
                                                        </label>
                                                        <div className="relative">
                                                            <input 
                                                                type={showProtectPassword ? 'text' : 'password'} 
                                                                value={protectPassword} 
                                                                onChange={(e) => { setProtectPassword(e.target.value); setLocalError(''); }} 
                                                                placeholder="Enter password"
                                                                className="w-full h-11 px-4 pr-10 border border-[#000000] bg-[#ffffff] text-[#000000] font-suisseintl font-medium text-sm focus:border-2 focus:outline-none rounded-[8px] transition-all"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowProtectPassword(prev => !prev)}
                                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#000000] hover:text-[#444444] focus:outline-none"
                                                            >
                                                                {showProtectPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    
                                                    {protectPassword && (
                                                        <div className="space-y-1.5">
                                                            <div className="flex justify-between items-center text-[10px] font-suisseintlmono uppercase text-[#444444]">
                                                                <span>Password Strength</span>
                                                                <span className="font-bold text-xs" style={{ color: getPasswordStrength(protectPassword).color }}>
                                                                    {getPasswordStrength(protectPassword).label}
                                                                </span>
                                                            </div>
                                                            <div className="h-1.5 w-full bg-[#e5e7eb] border border-[#000000]/10 overflow-hidden rounded-full">
                                                                <div 
                                                                    className="h-full transition-all duration-300"
                                                                    style={{ 
                                                                        width: `${(getPasswordStrength(protectPassword).score / 5) * 100}%`,
                                                                        backgroundColor: getPasswordStrength(protectPassword).score <= 2 ? '#ff4d4d' : getPasswordStrength(protectPassword).score <= 4 ? '#fff100' : '#d1ffca'
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="space-y-1.5">
                                                        <label className="block text-xs font-bold uppercase tracking-wider text-[#000000] font-suisseintlmono">
                                                            Confirm password
                                                        </label>
                                                        <div className="relative">
                                                            <input 
                                                                type={showConfirmPassword ? 'text' : 'password'} 
                                                                value={confirmPassword} 
                                                                onChange={(e) => { setConfirmPassword(e.target.value); setLocalError(''); }} 
                                                                placeholder="Re-enter password"
                                                                className="w-full h-11 px-4 pr-10 border border-[#000000] bg-[#ffffff] text-[#000000] font-suisseintl font-medium text-sm focus:border-2 focus:outline-none rounded-[8px] transition-all"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowConfirmPassword(prev => !prev)}
                                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#000000] hover:text-[#444444] focus:outline-none"
                                                            >
                                                                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                            </button>
                                                        </div>
                                                        {protectPassword !== confirmPassword && confirmPassword.length > 0 && (
                                                            <span className="text-[10px] text-red-600 font-suisseintlmono mt-1.5 block">
                                                                Passwords do not match
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {tool.slug === 'unlock-pdf' && (
                                                <div className="mt-5 space-y-1.5 text-left">
                                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#000000] font-suisseintlmono">
                                                        PDF password
                                                    </label>
                                                    <div className="relative">
                                                        <input 
                                                            type={showUnlockPassword ? 'text' : 'password'} 
                                                            value={unlockPassword} 
                                                            onChange={(e) => { setUnlockPassword(e.target.value); setLocalError(''); }} 
                                                            placeholder="Enter password"
                                                            className="w-full h-11 px-4 pr-10 border border-[#000000] bg-[#ffffff] text-[#000000] font-suisseintl font-medium text-sm focus:border-2 focus:outline-none rounded-[8px] transition-all"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowUnlockPassword(prev => !prev)}
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#000000] hover:text-[#444444] focus:outline-none"
                                                        >
                                                            {showUnlockPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {tool.slug === 'translate-pdf' && (
                                                <div className="mt-5 space-y-2 text-left">
                                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#000000] font-suisseintlmono">
                                                        Target Language
                                                    </label>
                                                    <select
                                                        value={translateLang}
                                                        onChange={(e) => { setTranslateLang(e.target.value); setLocalError(''); }}
                                                        className="w-full h-10 border border-[#000000] bg-[#ffffff] px-3 font-suisseintl font-medium text-sm text-[#000000] focus:border-2 focus:outline-none rounded-[8px]"
                                                    >
                                                        {[
                                                            { code: 'es', name: 'Spanish (Español)' },
                                                            { code: 'fr', name: 'French (Français)' },
                                                            { code: 'de', name: 'German (Deutsch)' },
                                                            { code: 'it', name: 'Italian (Italiano)' },
                                                            { code: 'pt', name: 'Portuguese (Português)' },
                                                            { code: 'ja', name: 'Japanese (日本語)' },
                                                            { code: 'zh', name: 'Chinese (中文)' },
                                                            { code: 'hi', name: 'Hindi (हिन्दी)' },
                                                            { code: 'ar', name: 'Arabic (العربية)' },
                                                            { code: 'ru', name: 'Russian (Русский)' },
                                                            { code: 'ko', name: 'Korean (한국어)' }
                                                        ].map(lang => (
                                                            <option key={lang.code} value={lang.code}>
                                                                {lang.name}
                                                            </option>
                                                        ))}
                                                    </select>
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
                                                {localError && (
                                                    <div className="mb-4 p-3 border border-red-600 bg-red-50 text-red-600 text-xs font-suisseintlmono rounded-[8px] flex items-center gap-2">
                                                        <AlertCircle size={14} className="flex-shrink-0" />
                                                        <span>{localError}</span>
                                                    </div>
                                                )}
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

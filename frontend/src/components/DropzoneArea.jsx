'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  CloudUpload,
  Search,
  FileType,
  HardDrive,
  ShieldCheck,
  FileText,
  Trash2,
  Plus
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function DropzoneArea({ onFileSelect, accept, maxSize, selectedFiles, hasUrl, multiple }) {
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles?.length > 0) {
            onFileSelect(multiple ? acceptedFiles : [acceptedFiles[0]]);
        }
    }, [onFileSelect, multiple]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxSize,
        maxFiles: multiple ? 50 : 1,
        disabled: hasUrl
    });

    const formatSize = (bytes) => {
        if (!bytes || bytes === 0) return '0 B';
        const k = 1024;
        const dm = 2;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    const handleRemoveFile = (index, e) => {
        e.stopPropagation();
        if (multiple) {
            const newFiles = [...selectedFiles];
            newFiles.splice(index, 1);
            onFileSelect(newFiles);
        } else {
            onFileSelect([]);
        }
    };

    return (
        <div className={`w-full transition-opacity duration-400 ${hasUrl ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <motion.div className="relative z-10 w-full">
                <div
                    {...getRootProps()}
                    className={`relative rounded-2xl p-8 sm:p-12 text-center cursor-pointer min-h-[300px] flex flex-col items-center justify-center transition-all duration-300 ${
                        isDragActive 
                            ? 'bg-chassis/80 shadow-[inset_4px_4px_10px_rgba(0,0,0,0.1),0_0_15px_rgba(255,71,87,0.2)] border border-accent/40' 
                            : 'bg-chassis shadow-neu-recessed border border-white/20'
                    }`}
                >
                    <input {...getInputProps()} aria-label="Upload files" />

                    <AnimatePresence mode="wait">
                        {!selectedFiles || selectedFiles.length === 0 ? (
                            <motion.div 
                                key="upload-prompt" 
                                initial={{ opacity: 0, scale: 0.95 }} 
                                animate={{ opacity: 1, scale: 1 }} 
                                exit={{ opacity: 0, scale: 1.05 }} 
                                className="flex flex-col items-center w-full gap-6"
                            >
                                <div className="relative">
                                    <motion.div 
                                        animate={{ 
                                            scale: isDragActive ? 1.1 : 1
                                        }}
                                        className="w-20 h-20 rounded-full bg-chassis border border-white/40 shadow-neu flex items-center justify-center hover:scale-105 transition-transform duration-300"
                                    >
                                        <CloudUpload size={32} className="text-accent" />
                                    </motion.div>
                                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-chassis border border-white/40 shadow-neu flex items-center justify-center z-10">
                                        <span className="led-indicator led-green w-2 h-2" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h2 className="font-display font-bold text-2xl tracking-tight text-ink drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">
                                        {isDragActive ? "Drop files to load" : "Load PDF Documents"}
                                    </h2>
                                    <p className="font-mono text-[10px] uppercase tracking-wider text-ink-secondary max-w-[320px] mx-auto">
                                        Processing occurs 100% locally. File contents are never transmitted.
                                    </p>
                                </div>

                                <div className="px-6 h-11 rounded-lg bg-chassis border border-white/50 text-ink shadow-neu hover:-translate-y-0.5 active:translate-y-0 active:shadow-neu-pressed transition-all duration-150 flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-xs select-none">
                                    <Search size={14} />
                                    Browse Files
                                </div>

                                <div className="flex flex-wrap justify-center gap-3 mt-4">
                                    {[
                                        { txt: "PDF Format", icon: FileType },
                                        { txt: `Max: ${maxSize ? formatSize(maxSize) : '100 MB'}`, icon: HardDrive },
                                        { txt: "Offline Secure", icon: ShieldCheck }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/40 bg-chassis text-ink-secondary shadow-neu-sharp font-mono text-[10px] uppercase tracking-wider">
                                            <item.icon size={12} className="text-accent" />
                                            {item.txt}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="file-selected" 
                                initial={{ opacity: 0, x: -20 }} 
                                animate={{ opacity: 1, x: 0 }} 
                                exit={{ opacity: 0, x: 20 }} 
                                className="w-full flex flex-col gap-4"
                            >
                                <div className="flex items-center justify-between border-b border-black/5 pb-3">
                                    <span className="font-mono font-bold text-xs uppercase tracking-widest text-accent flex items-center gap-2">
                                        <span className="led-indicator led-green animate-pulse" />
                                        Files Loaded ({selectedFiles.length})
                                    </span>
                                    <span className="font-mono font-bold text-xs text-ink-secondary">
                                        SYSTEM READY
                                    </span>
                                </div>
                                
                                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {selectedFiles.map((file, i) => (
                                        <motion.div 
                                            key={i} 
                                            layout
                                            className="flex items-center gap-4 p-4 rounded-xl bg-chassis border border-white/40 shadow-neu hover:shadow-neu-float transition-all duration-200"
                                        >
                                            <div className="w-12 h-12 rounded-lg bg-chassis border border-white/30 shadow-neu-pressed flex items-center justify-center text-accent flex-shrink-0">
                                                <FileText size={20} />
                                            </div>
                                            <div className="flex-1 min-w-0 text-left">
                                                <p className="font-mono font-extrabold text-sm text-ink truncate">
                                                    {file.name}
                                                </p>
                                                <div className="flex items-center gap-2.5 mt-1 font-mono text-[10px]">
                                                    <span className="text-ink-secondary">
                                                        {formatSize(file.size)}
                                                    </span>
                                                    <span className="w-1 h-1 rounded-full bg-border-dark/50" />
                                                    <span className="text-emerald-500 font-extrabold flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                        LOCAL READY
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => handleRemoveFile(i, e)}
                                                className="w-10 h-10 flex items-center justify-center rounded-full bg-chassis border border-white/40 text-accent shadow-neu hover:shadow-neu-sharp active:shadow-neu-pressed active:translate-y-[1px] transition-all flex-shrink-0"
                                                aria-label={`Remove ${file.name}`}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                                
                                {multiple && (
                                    <button 
                                        className="mt-3 self-center flex items-center gap-2 h-10 px-5 rounded-lg bg-chassis border border-white/50 text-ink shadow-neu hover:-translate-y-0.5 active:translate-y-0 active:shadow-neu-pressed transition-all duration-150 font-mono font-bold uppercase tracking-wider text-xs select-none"
                                        onClick={(e) => { e.stopPropagation(); document.querySelector('input[type="file"]').click(); }}
                                    >
                                        <Plus size={16} />
                                        Add More Files
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}

'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
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
        <div className={`w-full ${hasUrl ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <motion.div className="relative z-10 w-full">
                <div
                    {...getRootProps()}
                    className={`relative p-4 sm:p-8 text-center cursor-pointer min-h-[250px] flex flex-col items-center justify-center rounded-[20px] sm:rounded-[32px] bg-[#ffffff] transition-all duration-200 select-none ${
                        isDragActive
                            ? 'border-2 border-[#000000] bg-[#d1ffca]'
                            : 'border border-dashed border-[#000000] hover:bg-[#f3f3f3]/50'
                    }`}
                >
                    <input {...getInputProps()} aria-label="Upload files" />

                    <AnimatePresence mode="wait">
                        {!selectedFiles || selectedFiles.length === 0 ? (
                            <motion.div
                                key="upload-prompt"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                className="flex flex-col items-center w-full gap-5"
                            >
                                {/* Upload Icon Container */}
                                <div className="w-16 h-16 border border-[#000000] bg-[#ffffff] flex items-center justify-center hover:scale-102 transition-transform duration-200">
                                    <FileText size={28} className="text-[#000000]" />
                                </div>

                                <div className="space-y-1">
                                    <h2 className="font-suisseintl font-bold text-base uppercase tracking-wider text-[#000000]">
                                        {isDragActive ? "Drop files here!" : "Load PDF Documents"}
                                    </h2>
                                    <p className="font-suisseintl text-xs text-[#444444] max-w-[320px] mx-auto">
                                        Processing occurs 100% locally. File contents are never transmitted.
                                    </p>
                                </div>

                                <div className="soft-btn soft-btn-primary flex items-center gap-2 h-10 px-5 text-xs font-bold uppercase tracking-wider select-none">
                                    <Search size={14} />
                                    Browse Files
                                </div>

                                <div className="flex flex-wrap justify-center gap-3 mt-2">
                                    {[
                                        { txt: "PDF Format", icon: FileType },
                                        { txt: `Max: ${maxSize ? formatSize(maxSize) : '100 MB'}`, icon: HardDrive },
                                        { txt: "Offline Secure", icon: ShieldCheck }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-1.5 px-3 py-1 border border-[#000000]/15 bg-[#e5e7eb] font-suisseintlmono text-[9px] uppercase tracking-wider text-[#000000]">
                                            <item.icon size={10} className="text-[#000000]" />
                                            {item.txt}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="file-selected"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="w-full flex flex-col gap-4"
                            >
                                <div className="flex items-center justify-between border-b border-[#000000]/10 pb-3 mb-2">
                                    <span className="font-suisseintlmono font-bold text-xs uppercase tracking-wider text-[#000000] flex items-center gap-2">
                                        <span className="w-2 h-2 bg-[#000000] animate-pulse inline-block" />
                                        Files Loaded ({selectedFiles.length})
                                    </span>
                                    <span className="font-suisseintlmono font-bold text-[10px] text-[#444444]">
                                        SYSTEM READY
                                    </span>
                                </div>

                                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                                    {selectedFiles.map((file, i) => (
                                        <motion.div
                                            key={i}
                                            layout
                                            className="flex items-center gap-3 p-3 border border-[#000000] bg-[#ffffff] hover:bg-[#f3f3f3] transition-all duration-200"
                                        >
                                            <div className="w-10 h-10 border border-[#000000]/10 bg-[#e5e7eb]/20 flex items-center justify-center flex-shrink-0">
                                                <FileText size={18} className="text-[#000000]" />
                                            </div>
                                            <div className="flex-1 min-w-0 text-left">
                                                <p className="font-suisseintlmono font-bold text-xs text-[#000000] truncate">
                                                    {file.name}
                                                </p>
                                                <div className="flex items-center gap-2 mt-0.5 font-suisseintlmono text-[10px]">
                                                    <span className="text-[#444444]">
                                                        {formatSize(file.size)}
                                                    </span>
                                                    <span className="text-[#000000]/15">|</span>
                                                    <span className="text-[#000000] font-bold flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 bg-[#d1ffca] border border-[#000000] inline-block" />
                                                        READY
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => handleRemoveFile(i, e)}
                                                className="w-8 h-8 border border-[#000000] bg-[#ffffff] flex items-center justify-center text-red-600 hover:bg-red-50 hover:text-red-700 transition-all focus:outline-none"
                                                aria-label={`Remove ${file.name}`}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>

                                {multiple && (
                                    <button
                                        className="mt-2 self-center soft-btn text-xs hover:bg-[#f3f3f3]"
                                        onClick={(e) => { e.stopPropagation(); document.querySelector('input[type="file"]').click(); }}
                                    >
                                        <Plus size={14} />
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

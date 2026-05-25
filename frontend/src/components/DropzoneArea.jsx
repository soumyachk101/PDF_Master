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
            <motion.div
                className="relative z-10 w-full"
            >
                <div
                    {...getRootProps()}
                    className={`relative border-8 border-bauhaus-black p-8 sm:p-12 text-center cursor-pointer min-h-[300px] flex flex-col items-center justify-center transition-all duration-300 ${
                        isDragActive 
                            ? 'bg-bauhaus-yellow shadow-none translate-x-1 translate-y-1' 
                            : 'bg-white shadow-bauhaus-lg'
                    }`}
                >
                    <input {...getInputProps()} aria-label="Upload files" />

                    {/* Decorative Corner Shapes */}
                    <div className="absolute top-0 left-0 w-8 h-8 bg-bauhaus-red border-r-4 border-b-4 border-bauhaus-black" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-bauhaus-blue border-l-4 border-t-4 border-bauhaus-black" />

                    <AnimatePresence mode="wait">
                        {!selectedFiles || selectedFiles.length === 0 ? (
                            <motion.div 
                                key="upload-prompt" 
                                initial={{ opacity: 0, scale: 0.9 }} 
                                animate={{ opacity: 1, scale: 1 }} 
                                exit={{ opacity: 0, scale: 1.1 }} 
                                className="flex flex-col items-center w-full gap-6"
                            >
                                <div className="relative">
                                    <motion.div 
                                        animate={{ 
                                            rotate: isDragActive ? 180 : 0,
                                            scale: isDragActive ? 1.2 : 1
                                        }}
                                        className="w-20 h-20 bg-bauhaus-red border-4 border-bauhaus-black flex items-center justify-center shadow-bauhaus"
                                    >
                                        <CloudUpload size={40} className="text-white" />
                                    </motion.div>
                                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-bauhaus-blue border-4 border-bauhaus-black" />
                                </div>

                                <div className="space-y-2">
                                    <h2 className="font-display font-black text-3xl uppercase tracking-tighter text-bauhaus-black">
                                        {isDragActive ? "Drop Now" : "Upload PDF"}
                                    </h2>
                                    <p className="font-display font-bold uppercase text-xs tracking-widest text-bauhaus-black/70 max-w-[280px] mx-auto">
                                        Secure, private, and lightning fast. Your files never leave your browser.
                                    </p>
                                </div>

                                <div className="px-8 py-4 border-4 border-bauhaus-black bg-white shadow-bauhaus hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-3 font-display font-black uppercase tracking-widest text-sm">
                                    <Search size={18} />
                                    Browse Files
                                </div>

                                <div className="flex flex-wrap justify-center gap-3 mt-4">
                                    {[
                                        { txt: "PDF Format", icon: FileType, color: "bg-bauhaus-red" },
                                        { txt: `Up to ${maxSize ? formatSize(maxSize) : '100 MB'}`, icon: HardDrive, color: "bg-bauhaus-blue" },
                                        { txt: "Client-side", icon: ShieldCheck, color: "bg-bauhaus-yellow" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2 px-3 py-1 border-2 border-bauhaus-black bg-white font-display font-bold text-[10px] uppercase tracking-widest">
                                            <item.icon size={12} className="text-bauhaus-black" />
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
                                <div className="flex items-center justify-between border-b-4 border-bauhaus-black pb-2">
                                    <span className="font-display font-black text-sm uppercase tracking-widest text-bauhaus-red">
                                        Selected File{selectedFiles.length > 1 ? 's' : ''}
                                    </span>
                                    <span className="font-display font-black text-sm text-bauhaus-black">
                                        {selectedFiles.length} TOTAL
                                    </span>
                                </div>
                                
                                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {selectedFiles.map((file, i) => (
                                        <motion.div 
                                            key={i} 
                                            layout
                                            className="flex items-center gap-4 p-4 bg-white border-4 border-bauhaus-black shadow-bauhaus hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group"
                                        >
                                            <div className="w-12 h-12 flex-shrink-0 bg-bauhaus-blue border-2 border-bauhaus-black flex items-center justify-center text-white">
                                                <FileText size={24} />
                                            </div>
                                            <div className="flex-1 min-w-0 text-left">
                                                <p className="font-display font-black text-lg uppercase tracking-tighter truncate text-bauhaus-black">
                                                    {file.name}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-display font-bold text-[10px] uppercase tracking-widest text-bauhaus-black/70">
                                                        {formatSize(file.size)}
                                                    </span>
                                                    <span className="w-1 h-1 bg-bauhaus-black/20 rounded-full" />
                                                    <span className="font-display font-black text-[10px] uppercase tracking-widest text-green-600">
                                                        READY
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => handleRemoveFile(i, e)}
                                                className="w-10 h-10 flex items-center justify-center border-2 border-bauhaus-black bg-bauhaus-red text-white shadow-[2px_2px_0px_0px_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                                                aria-label={`Remove ${file.name}`}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                                
                                {multiple && (
                                    <button 
                                        className="mt-2 self-center flex items-center gap-2 px-6 py-3 border-4 border-bauhaus-black bg-bauhaus-blue text-white font-display font-black uppercase tracking-widest text-xs shadow-bauhaus hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                                        onClick={(e) => { e.stopPropagation(); document.querySelector('input[type="file"]').click(); }}
                                    >
                                        <Plus size={18} />
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

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, IconButton, Button } from '@mui/material';
import * as LucideIcons from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function DropzoneArea({ onFileSelect, accept, maxSize, selectedFiles, hasUrl, multiple }) {
    const [isHovered, setIsHovered] = useState(false);

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
        <Box sx={{
            width: '100%', 
            opacity: hasUrl ? 0.5 : 1, 
            pointerEvents: hasUrl ? 'none' : 'auto', 
            transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            background: 'linear-gradient(145deg, rgba(26,10,0,0.8) 0%, rgba(13,13,13,0.9) 50%, rgba(0,26,26,0.8) 100%)',
            padding: { xs: '32px 20px', sm: '48px 32px' },
            borderRadius: '28px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 24px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}>
            {/* Animated Background Mesh/Gradient */}
            <Box sx={{
                position: 'absolute', inset: 0, zIndex: 0, opacity: 0.6,
                background: 'radial-gradient(circle at 50% -20%, rgba(255,90,20,0.15), transparent 60%), radial-gradient(circle at 100% 120%, rgba(20,200,180,0.1), transparent 50%)',
                animation: 'pulse-bg 8s ease-in-out infinite alternate',
                '@keyframes pulse-bg': {
                    '0%': { transform: 'scale(1)', opacity: 0.5 },
                    '100%': { transform: 'scale(1.05)', opacity: 0.8 }
                }
            }} />

            <motion.div
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                style={{ position: 'relative', zIndex: 1, width: '100%' }}
            >
                <Box
                    {...getRootProps()}
                    className={isDragActive ? 'dragging' : ''}
                    sx={{
                        position: 'relative', 
                        borderRadius: '24px', 
                        padding: { xs: '40px 20px', sm: '56px 32px' },
                        background: isDragActive ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '2px dashed',
                        borderColor: isDragActive ? 'rgba(255,90,20,0.6)' : isHovered ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        textAlign: 'center',
                        cursor: 'pointer',
                        minHeight: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&.dragging': {
                            transform: 'scale(1.02)',
                            boxShadow: '0 0 60px rgba(255,90,20,0.25), inset 0 0 30px rgba(255,255,255,0.05)'
                        }
                    }}
                >
                    <input {...getInputProps()} />

                    <AnimatePresence mode="wait">
                        {!selectedFiles || selectedFiles.length === 0 ? (
                            <motion.div 
                                key="upload-prompt" 
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                exit={{ opacity: 0, y: -20 }} 
                                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} 
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
                            >
                                {/* Interactive Upload Icon */}
                                <motion.div 
                                    animate={{ 
                                        y: isDragActive ? -15 : (isHovered ? -8 : 0),
                                        scale: isDragActive ? 1.1 : 1
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <Box sx={{
                                        width: '88px', height: '88px', margin: '0 auto 24px', position: 'relative',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {/* Outer Rotating Dash */}
                                        <Box sx={{
                                            position: 'absolute', inset: 0, borderRadius: '50%',
                                            border: '2px dashed',
                                            borderColor: isDragActive ? 'rgba(255,90,20,0.8)' : 'rgba(255,255,255,0.2)',
                                            animation: isDragActive ? 'spin 3s linear infinite' : 'spin 8s linear infinite',
                                            '@keyframes spin': { '100%': { transform: 'rotate(360deg)' } }
                                        }} />
                                        
                                        {/* Inner Glass Circle */}
                                        <Box sx={{
                                            width: '68px', height: '68px', borderRadius: '50%',
                                            background: isDragActive ? 'rgba(255,90,20,0.2)' : 'rgba(255,255,255,0.06)',
                                            backdropFilter: 'blur(12px)',
                                            border: '1px solid',
                                            borderColor: isDragActive ? 'rgba(255,90,20,0.5)' : 'rgba(255,255,255,0.15)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            transition: 'all 0.3s ease',
                                            boxShadow: isDragActive ? '0 0 30px rgba(255,90,20,0.4)' : '0 10px 30px rgba(0,0,0,0.2)'
                                        }}>
                                            <LucideIcons.CloudUpload size={32} color={isDragActive ? "#fff" : "rgba(255,255,255,0.9)"} strokeWidth={isDragActive ? 2.5 : 2} />
                                        </Box>
                                    </Box>
                                </motion.div>

                                <Typography sx={{ color: '#fff', fontSize: { xs: '1.25rem', sm: '1.5rem' }, fontWeight: 700, letterSpacing: '-0.02em', mb: 1 }}>
                                    {isDragActive ? "Drop to upload instantly" : "Drag & Drop your files"}
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.6, mb: 4, maxWidth: '300px' }}>
                                    Secure, private, and lightning fast. Your files never leave your browser.
                                </Typography>

                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Box sx={{
                                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                                        background: isHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255,255,255,0.2)', 
                                        borderRadius: '12px',
                                        padding: '12px 28px', color: '#fff', fontSize: '0.9rem', fontWeight: 600,
                                        transition: 'all 0.3s',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                                    }}>
                                        <LucideIcons.Search size={18} />
                                        Browse Files
                                    </Box>
                                </motion.div>

                                <Box sx={{ display: 'flex', gap: 1.5, mt: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {["PDF Format", `Up to ${maxSize ? formatSize(maxSize) : '100 MB'}`, "Client-side only"].map((txt, idx) => (
                                        <motion.div key={txt} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 * idx }}>
                                            <Box sx={{
                                                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '8px', padding: '6px 14px', color: 'rgba(255,255,255,0.6)',
                                                fontSize: '0.75rem', fontWeight: 500, backdropFilter: 'blur(4px)',
                                                display: 'flex', alignItems: 'center', gap: 1
                                            }}>
                                                {idx === 0 && <LucideIcons.FileType size={14} />}
                                                {idx === 1 && <LucideIcons.HardDrive size={14} />}
                                                {idx === 2 && <LucideIcons.ShieldCheck size={14} />}
                                                {txt}
                                            </Box>
                                        </motion.div>
                                    ))}
                                </Box>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="file-selected" 
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                exit={{ opacity: 0, y: -20 }} 
                                transition={{ duration: 0.4, staggerChildren: 0.1 }} 
                                style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}
                            >
                                <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: 600, textAlign: 'left', mb: 1, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    Ready for processing
                                </Typography>
                                
                                {selectedFiles.map((file, i) => (
                                    <motion.div 
                                        key={i} 
                                        initial={{ opacity: 0, x: -20 }} 
                                        animate={{ opacity: 1, x: 0 }}
                                        layout
                                    >
                                        <Box sx={{ 
                                            display: 'flex', alignItems: 'center', gap: 3, p: 2.5, 
                                            borderRadius: '16px', background: 'rgba(255,255,255,0.04)', 
                                            border: '1px solid rgba(255,255,255,0.08)', 
                                            textAlign: 'left', backdropFilter: 'blur(12px)',
                                            transition: 'all 0.3s',
                                            '&:hover': { background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', transform: 'translateY(-2px)' }
                                        }}>
                                            <Box sx={{ 
                                                p: 2, borderRadius: '12px', background: 'linear-gradient(135deg, rgba(255,90,20,0.2), rgba(255,90,20,0.05))', 
                                                color: '#ff5a14', boxShadow: 'inset 0 0 0 1px rgba(255,90,20,0.2)' 
                                            }}>
                                                <LucideIcons.FileText size={28} strokeWidth={1.5} />
                                            </Box>
                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600, color: '#fff', fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
                                                    {file.name}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
                                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                                                        {formatSize(file.size)}
                                                    </Typography>
                                                    <Box sx={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                                                    <Typography variant="body2" sx={{ color: '#20c997', fontSize: '0.85rem', fontWeight: 500 }}>
                                                        Valid PDF
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <IconButton 
                                                onClick={(e) => handleRemoveFile(i, e)} 
                                                sx={{ 
                                                    color: 'rgba(255,255,255,0.4)', 
                                                    background: 'rgba(255,255,255,0.05)',
                                                    '&:hover': { background: 'rgba(255,50,50,0.2)', color: '#ff6b6b' } 
                                                }}
                                            >
                                                <LucideIcons.Trash2 size={18} />
                                            </IconButton>
                                        </Box>
                                    </motion.div>
                                ))}
                                
                                {multiple && (
                                    <motion.div layout>
                                        <Button 
                                            variant="outlined" 
                                            startIcon={<LucideIcons.Plus size={18} />}
                                            sx={{ 
                                                mt: 2, alignSelf: 'center', borderRadius: '12px', textTransform: 'none', 
                                                borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)', 
                                                py: 1.5, px: 3, fontSize: '0.95rem', fontWeight: 600,
                                                '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,0.1)', color: '#fff' } 
                                            }} 
                                            onClick={(e) => { e.stopPropagation(); document.querySelector('input[type="file"]').click(); }}
                                        >
                                            Add more files
                                        </Button>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Box>
            </motion.div>
        </Box>
    );
}

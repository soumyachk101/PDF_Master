import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, IconButton, Button } from '@mui/material';
import * as LucideIcons from 'lucide-react';
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
        <Box sx={{
            width: '100%', 
            opacity: hasUrl ? 0.5 : 1, 
            pointerEvents: hasUrl ? 'none' : 'auto', 
            transition: 'opacity 0.3s',
            background: 'linear-gradient(135deg, #1a0a00 0%, #0d0d0d 50%, #001a1a 100%)',
            padding: { xs: '32px 20px', sm: '48px 32px' },
            borderRadius: '24px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative Blurred Orbs */}
            <Box sx={{
                position: 'absolute', pointerEvents: 'none', zIndex: 0,
                width: '300px', height: '300px', top: '-80px', left: '-60px',
                background: 'radial-gradient(circle, rgba(255,80,20,0.18) 0%, transparent 70%)'
            }} />
            <Box sx={{
                position: 'absolute', pointerEvents: 'none', zIndex: 0,
                width: '250px', height: '250px', bottom: '-60px', right: '-40px',
                background: 'radial-gradient(circle, rgba(20,200,180,0.1) 0%, transparent 70%)'
            }} />

            <Box
                {...getRootProps()}
                className={isDragActive ? 'dragging' : ''}
                sx={{
                    position: 'relative', 
                    zIndex: 1,
                    borderRadius: '20px', 
                    padding: '44px 24px 36px',
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease',
                    textAlign: 'center',
                    cursor: 'pointer',
                    minHeight: '280px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&.dragging': {
                        background: 'rgba(255,90,20,0.08)',
                        borderColor: 'rgba(255,90,20,0.5)',
                        boxShadow: '0 0 40px rgba(255,80,20,0.2), inset 0 1px 0 rgba(255,255,255,0.15)'
                    }
                }}
            >
                {/* Glow Ring div inside dropzone */}
                <Box sx={{
                    position: 'absolute',
                    inset: '-1px',
                    background: 'linear-gradient(135deg, rgba(255,90,20,0.4), rgba(255,255,255,0.05), rgba(20,200,180,0.2))',
                    opacity: isDragActive ? 1 : 0,
                    animation: isDragActive ? 'glow-pulse 1.5s ease-in-out infinite' : 'none',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    padding: '1px',
                    borderRadius: 'inherit',
                    pointerEvents: 'none',
                    '@keyframes glow-pulse': {
                        '0%, 100%': { opacity: 0.5 },
                        '50%': { opacity: 1 }
                    }
                }} />
                
                <input {...getInputProps()} />

                <AnimatePresence mode="wait">
                    {!selectedFiles || selectedFiles.length === 0 ? (
                        <motion.div key="upload-prompt" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position: 'relative', zIndex: 2 }}>
                            
                            {/* Upload Icon Container */}
                            <Box sx={{
                                width: '76px', height: '76px', margin: '0 auto 20px', position: 'relative',
                                animation: 'float 3.5s ease-in-out infinite',
                                '@keyframes float': {
                                    '0%, 100%': { transform: 'translateY(0)' },
                                    '50%': { transform: 'translateY(-8px)' }
                                }
                            }}>
                                {/* Spinning Ring */}
                                <Box sx={{
                                    position: 'absolute', inset: '-6px', borderRadius: '50%',
                                    border: '1px solid rgba(255,90,20,0.2)',
                                    borderTopColor: 'rgba(255,90,20,0.6)',
                                    animation: 'rotate 4s linear infinite',
                                    '@keyframes rotate': {
                                        from: { transform: 'rotate(0deg)' },
                                        to: { transform: 'rotate(360deg)' }
                                    }
                                }} />
                                {/* Inner Circle */}
                                <Box sx={{
                                    width: '76px', height: '76px', borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.06)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <LucideIcons.Upload size={28} color="rgba(255,120,60,0.9)" />
                                </Box>
                            </Box>

                            <Typography sx={{ color: '#fff', fontSize: '1.15rem', fontWeight: 600, letterSpacing: '-0.02em', mb: 0.5 }}>
                                Drop your PDF here
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.82rem', lineHeight: 1.6, mb: 3, whiteSpace: 'pre-line' }}>
                                {"Drag & drop or click to browse.\nFiles never leave your browser."}
                            </Typography>

                            <Box sx={{
                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px',
                                padding: '9px 22px', color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: '#fff'
                                }
                            }}>
                                Browse Files
                            </Box>

                            <Box sx={{ display: 'flex', gap: { xs: 1, sm: 1.5 }, mt: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
                                {["PDF only", `Max ${maxSize ? formatSize(maxSize) : '100 MB'}`, "100% private"].map(txt => (
                                    <Box key={txt} sx={{
                                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                                        borderRadius: '999px', padding: '4px 12px', color: 'rgba(255,255,255,0.35)',
                                        fontSize: '0.7rem', backdropFilter: 'blur(4px)'
                                    }}>
                                        {txt}
                                    </Box>
                                ))}
                            </Box>
                        </motion.div>
                    ) : (
                        <motion.div key="file-selected" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25 }} style={{ width: '100%', position: 'relative', zIndex: 2 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
                                {selectedFiles.map((file, i) => (
                                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 2.5, borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: `1px solid rgba(255,255,255,0.1)`, textAlign: 'left', backdropFilter: 'blur(10px)' }}>
                                        <Box sx={{ p: 2, borderRadius: '12px', background: 'rgba(255,90,20,0.15)', color: '#ff5a14' }}>
                                            <LucideIcons.File size={32} />
                                        </Box>
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600, color: '#fff', fontSize: '1rem' }}>
                                                {file.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mt: 0.5 }}>
                                                {formatSize(file.size)}
                                            </Typography>
                                        </Box>
                                        <IconButton onClick={(e) => handleRemoveFile(i, e)} color="inherit" sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { background: 'rgba(255,255,255,0.1)', color: '#fff' } }}>
                                            <LucideIcons.X size={20} />
                                        </IconButton>
                                    </Box>
                                ))}
                                
                                {multiple && (
                                    <Button variant="outlined" sx={{ mt: 2, alignSelf: 'center', borderRadius: '12px', textTransform: 'none', borderColor: 'rgba(255,255,255,0.2)', color: '#fff', '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,0.05)' } }} onClick={(e) => { e.stopPropagation(); document.querySelector('input[type="file"]').click(); }}>
                                        + Add more files
                                    </Button>
                                )}
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>
        </Box>
    );
}

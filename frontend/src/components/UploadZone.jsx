import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileUp, AlertCircle } from 'lucide-react'

export default function UploadZone({ onFiles, accept, multiple, acceptLabel, error }) {
  const onDrop = useCallback(
    (accepted, rejected) => {
      if (accepted.length > 0) onFiles(accepted)
    },
    [onFiles]
  )

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    multiple,
    maxSize: 100 * 1024 * 1024,
  })

  const hasError = isDragReject || error

  return (
    <div
      {...getRootProps()}
      className={`
        max-w-upload mx-auto rounded-[32px]
        p-12 sm:p-20 text-center select-none cursor-pointer
        transition-all duration-400 group relative
        ${hasError
          ? 'glass border-red-500/50 hover:bg-red-500/5 dark:hover:bg-red-500/10'
          : isDragActive
            ? 'glass border-primary border-2 scale-[0.98] bg-primary/5 dark:bg-primary/10 shadow-[0_0_40px_rgba(139,92,246,0.2)]'
            : 'glass border-dashed border-2 hover:border-primary/50 hover:shadow-glass-hover bg-surface/50 dark:bg-surface-dark/50'
        }`}
    >
      <input {...getInputProps()} />

      {/* Background glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-[60px] opacity-20 bg-primary pointer-events-none transition-opacity duration-300 group-hover:opacity-40" />

      {/* Icon Area */}
      <div className={`w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center relative z-10
        transition-all duration-500 glass shadow-glass
        ${hasError ? 'text-red-500' : 'text-primary'}
        ${isDragActive ? 'scale-110 shadow-glow-primary' : 'group-hover:scale-110 group-hover:shadow-glow-primary'}`}
      >
        {hasError
          ? <AlertCircle size={36} strokeWidth={2.5} />
          : isDragActive
            ? <FileUp size={36} strokeWidth={2.5} className="animate-bounce" />
            : <Upload size={36} strokeWidth={2.5} />
        }
      </div>

      {/* Text */}
      <h3 className="font-display font-bold text-2xl sm:text-3xl
        text-ink-primary dark:text-white mb-4 relative z-10 transition-colors duration-300">
        {hasError
          ? 'Unsupported file'
          : isDragActive
            ? 'Drop it right here!'
            : `Select ${acceptLabel?.split(',')[0]?.trim() || 'PDF'} file`
        }
      </h3>

      <p className="text-lg font-medium text-ink-secondary dark:text-ink-muted mb-10 relative z-10">
        {hasError
          ? error || 'Please upload a valid file type'
          : 'or drag and drop it here'
        }
      </p>

      {!hasError && (
        <button
          type="button"
          className="btn-primary text-base px-8 py-3.5 pointer-events-none relative z-10"
        >
          <Upload size={18} strokeWidth={2.5} />
          Choose File{multiple ? 's' : ''}
        </button>
      )}

      <p className="text-sm font-bold text-ink-muted/70 mt-8 uppercase tracking-wider relative z-10">
        Accepted: {acceptLabel} · Max {multiple ? 'per file: ' : ''}100 MB
      </p>
    </div>
  )
}

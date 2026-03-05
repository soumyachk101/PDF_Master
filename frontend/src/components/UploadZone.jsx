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
        max-w-upload mx-auto rounded-3xl
        p-12 sm:p-20 text-center select-none cursor-pointer
        transition-all duration-300 group
        border border-white/40 dark:border-white/5
        ${hasError
          ? 'bg-red-50 dark:bg-red-900/10 shadow-skeuo-inset-dark'
          : isDragActive
            ? 'bg-pdfkit-dim/40 dark:bg-pdfkit-dark shadow-[inset_8px_8px_16px_rgba(0,0,0,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.7)] scale-[0.98]'
            : 'bg-pdfkit-dim/20 dark:bg-[#151525] shadow-skeuo-inset dark:shadow-skeuo-inset-dark hover:bg-pdfkit-dim/30'
        }`}
    >
      <input {...getInputProps()} />

      {/* Icon Area */}
      <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center
        transition-all duration-300
        ${hasError ? 'bg-red-100 dark:bg-red-900/30 shadow-skeuo-up' : 'bg-pdfkit-soft dark:bg-[#252540] shadow-skeuo-up dark:shadow-skeuo-up-dark'}
        ${isDragActive ? 'scale-110 shadow-skeuo-down' : 'group-hover:scale-110 group-hover:shadow-skeuo-down dark:group-hover:shadow-skeuo-down-dark'}`}
      >
        {hasError
          ? <AlertCircle size={32} className="text-pdfkit-red" strokeWidth={2.5} />
          : isDragActive
            ? <FileUp size={32} className="text-pdfkit-red" strokeWidth={2.5} />
            : <Upload size={32} className="text-pdfkit-red" strokeWidth={2.5} />
        }
      </div>

      {/* Text */}
      <h3 className="font-display font-extrabold text-xl sm:text-2xl
        text-pdfkit-dark dark:text-white mb-3 drop-shadow-sm">
        {hasError
          ? 'Unsupported file'
          : isDragActive
            ? 'Drop to upload'
            : `Select ${acceptLabel?.split(',')[0]?.trim() || 'PDF'} file`
        }
      </h3>

      <p className="text-base font-medium text-pdfkit-dark/60 dark:text-white/50 mb-8">
        {hasError
          ? error || 'Please upload a valid file type'
          : 'or drag and drop it here'
        }
      </p>

      {!hasError && (
        <button
          type="button"
          className="btn-primary text-base px-8 py-3.5 pointer-events-none"
        >
          <Upload size={18} strokeWidth={2.5} />
          Choose File{multiple ? 's' : ''}
        </button>
      )}

      <p className="text-sm font-bold text-pdfkit-dark/40 dark:text-white/30 mt-6 uppercase tracking-wider">
        Accepted: {acceptLabel} · Max {multiple ? 'per file: ' : ''}100 MB
      </p>
    </div>
  )
}

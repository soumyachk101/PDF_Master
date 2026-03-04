import * as React from "react"
import { useDropzone, DropzoneOptions, DropzoneState } from "react-dropzone"
import { UploadCloud, File as FileIcon, X, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface UploadZoneProps {
    onFilesChange: (files: File[]) => void
    options?: DropzoneOptions
    maxSizeText?: string
    acceptText?: string
    limitReached?: boolean
}

export function UploadZone({
    onFilesChange,
    options,
    maxSizeText = "Max: 25MB per file",
    acceptText = "Supports: PDF",
    limitReached = false,
}: UploadZoneProps) {
    const [files, setFiles] = React.useState<File[]>([])
    const [errorText, setErrorText] = React.useState<string | null>(null)

    const onDrop = React.useCallback(
        (acceptedFiles: File[], fileRejections: any[]) => {
            if (limitReached) return;

            if (fileRejections.length > 0) {
                const error = fileRejections[0].errors[0]
                if (error.code === 'file-too-large') {
                    setErrorText('File is larger than the allowed maximum size.')
                } else if (error.code === 'file-invalid-type') {
                    setErrorText('File type not supported.')
                } else {
                    setErrorText(error.message)
                }

                // Auto dismiss error
                setTimeout(() => setErrorText(null), 5000);
                return;
            }

            setErrorText(null)
            const newFiles = [...files, ...acceptedFiles]
            setFiles(newFiles)
            onFilesChange(newFiles)
        },
        [files, onFilesChange, limitReached]
    )

    const removeFile = (index: number) => {
        const newFiles = [...files]
        newFiles.splice(index, 1)
        setFiles(newFiles)
        onFilesChange(newFiles)
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        ...options,
        disabled: limitReached,
    })

    return (
        <div className="w-full">
            <div
                {...getRootProps()}
                className={cn(
                    "relative flex flex-col items-center justify-center w-full min-h-[250px] p-8 mt-6 border-2 border-dashed rounded-xl transition-all duration-200 ease-in-out cursor-pointer",
                    isDragActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50",
                    limitReached && "pointer-events-none opacity-60 bg-slate-100"
                )}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <div className={cn(
                        "p-4 rounded-full bg-blue-50 text-blue-600 transition-transform duration-200",
                        isDragActive && "scale-110 bg-blue-100"
                    )}>
                        <UploadCloud className="w-10 h-10" />
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-xl font-semibold text-slate-800">
                            {isDragActive ? "Drop the files here" : "Choose files or drop them here"}
                        </h3>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-sm text-slate-500 mt-2">
                            <span>{acceptText}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{maxSizeText}</span>
                        </div>
                    </div>
                </div>
            </div>

            {errorText && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg flex items-center gap-2 animate-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">{errorText}</p>
                </div>
            )}

            {files.length > 0 && (
                <div className="mt-6">
                    <h4 className="text-sm font-medium text-slate-700 mb-3 px-1">Selected Files ({files.length})</h4>
                    <ul className="space-y-3">
                        {files.map((file, i) => (
                            <li
                                key={`${file.name}-${i}`}
                                className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow transition-shadow group animate-in slide-in-from-right-4 duration-300"
                            >
                                <div className="flex items-center space-x-4 overflow-hidden">
                                    <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                                        <FileIcon className="w-6 h-6" />
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="text-sm font-medium text-slate-900 truncate">
                                            {file.name}
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        removeFile(i)
                                    }}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    aria-label="Remove file"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

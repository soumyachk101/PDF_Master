import { useState } from 'react'
import { X, GripVertical, File, ChevronUp, ChevronDown } from 'lucide-react'
import { formatSize, truncateFilename } from '../utils/format'
import ToolOptions from './ToolOptions'

export default function FileQueue({
  files, onRemove, onReorder,
  tool, options, onOptionChange,
  onProcess, isProcessing,
}) {
  return (
    <div className="max-w-upload mx-auto space-y-6">
      {/* File list */}
      <div className="glass rounded-[24px] overflow-hidden p-2 space-y-2">
        {files.map((file, i) => (
          <FileRow
            key={`${file.name}-${i}`}
            file={file}
            index={i}
            total={files.length}
            canReorder={tool.multiple && files.length > 1}
            onRemove={() => onRemove(i)}
            onMoveUp={() => i > 0 && onReorder(i, i - 1)}
            onMoveDown={() => i < files.length - 1 && onReorder(i, i + 1)}
          />
        ))}
      </div>

      {/* Add more files (for multi-file tools) */}
      {tool.multiple && (
        <AddMoreFiles onFiles={newFiles => {
          // Handled via the parent — just a trigger hint
        }} />
      )}

      {/* Tool-specific options */}
      {tool.options?.length > 0 && (
        <div className="glass rounded-[24px] p-6">
          <ToolOptions
            options={tool.options}
            values={options}
            onChange={onOptionChange}
          />
        </div>
      )}

      {/* Process button */}
      <button
        onClick={onProcess}
        disabled={isProcessing || files.length < (tool.minFiles || 1)}
        className="btn-primary w-full py-4 text-lg shadow-glow-primary hover:shadow-glow-primary-hover disabled:opacity-50
          disabled:cursor-not-allowed disabled:transform-none"
      >
        {isProcessing ? 'Processing request...' : `${tool.name} Now →`}
      </button>

      {tool.minFiles > 1 && files.length < tool.minFiles && (
        <p className="text-center font-bold text-sm text-ink-muted">
          Add at least {tool.minFiles} files to proceed
        </p>
      )}
    </div>
  )
}

function FileRow({ file, index, total, canReorder, onRemove, onMoveUp, onMoveDown }) {
  const isImage = file.type.startsWith('image/')
  const [preview, setPreview] = useState(() =>
    isImage ? URL.createObjectURL(file) : null
  )

  return (
    <div className="flex items-center gap-4 px-4 py-3 rounded-[16px]
      bg-transparent hover:bg-black/5 dark:hover:bg-white/5
      transition-colors group relative overflow-hidden">

      {/* Reorder controls */}
      {canReorder && (
        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onMoveUp} disabled={index === 0}
            className="p-1 rounded bg-black/5 dark:bg-white/5 disabled:opacity-30 hover:bg-primary/20 hover:text-primary transition-colors">
            <ChevronUp size={14} />
          </button>
          <button onClick={onMoveDown} disabled={index === total - 1}
            className="p-1 rounded bg-black/5 dark:bg-white/5 disabled:opacity-30 hover:bg-primary/20 hover:text-primary transition-colors">
            <ChevronDown size={14} />
          </button>
        </div>
      )}

      {/* File icon / preview */}
      <div className="w-12 h-12 rounded-[12px] bg-primary/10 flex items-center
        justify-center shrink-0 overflow-hidden border border-primary/20">
        {preview
          ? <img src={preview} alt="" className="w-full h-full object-cover" />
          : <File size={20} className="text-primary" strokeWidth={2.5} />
        }
      </div>

      {/* File info */}
      <div className="flex-1 min-w-0">
        <p className="font-display font-bold text-base text-ink-primary dark:text-white truncate">
          {truncateFilename(file.name)}
        </p>
        <p className="text-sm font-medium text-ink-secondary dark:text-ink-muted">{formatSize(file.size)}</p>
      </div>

      {/* Remove */}
      <button
        onClick={onRemove}
        className="w-8 h-8 rounded-full flex items-center justify-center
          text-ink-muted hover:text-red-500 hover:bg-red-500/10
          transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
        aria-label={`Remove ${file.name}`}
      >
        <X size={18} strokeWidth={2.5} />
      </button>
    </div>
  )
}

function AddMoreFiles({ onFiles }) {
  return (
    <label className="hidden">
      <input
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={e => onFiles(Array.from(e.target.files || []))}
      />
    </label>
  )
}

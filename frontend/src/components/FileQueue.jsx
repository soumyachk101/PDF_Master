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
    <div className="max-w-upload mx-auto space-y-4">
      {/* File list */}
      <div className="card divide-y divide-border dark:divide-border-dark overflow-hidden">
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
        <ToolOptions
          options={tool.options}
          values={options}
          onChange={onOptionChange}
        />
      )}

      {/* Process button */}
      <button
        onClick={onProcess}
        disabled={isProcessing || files.length < (tool.minFiles || 1)}
        className="btn-primary w-full py-3.5 text-base disabled:opacity-50
          disabled:cursor-not-allowed disabled:transform-none"
      >
        {isProcessing ? 'Processing...' : `${tool.name} →`}
      </button>

      {tool.minFiles > 1 && files.length < tool.minFiles && (
        <p className="text-center text-xs text-ink-muted">
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
    <div className="flex items-center gap-3 px-4 py-3
      bg-white dark:bg-surface-dark
      group hover:bg-surface dark:hover:bg-surface-deeper
      transition-colors">
      {/* Reorder controls */}
      {canReorder && (
        <div className="flex flex-col gap-0.5 opacity-40 group-hover:opacity-100">
          <button onClick={onMoveUp} disabled={index === 0}
            className="p-0.5 hover:text-primary disabled:opacity-30 transition-colors">
            <ChevronUp size={14} />
          </button>
          <button onClick={onMoveDown} disabled={index === total - 1}
            className="p-0.5 hover:text-primary disabled:opacity-30 transition-colors">
            <ChevronDown size={14} />
          </button>
        </div>
      )}

      {/* File icon / preview */}
      <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center
        justify-center shrink-0 overflow-hidden">
        {preview
          ? <img src={preview} alt="" className="w-full h-full object-cover" />
          : <File size={16} className="text-primary" />
        }
      </div>

      {/* File info */}
      <div className="flex-1 min-w-0">
        <p className="font-mono text-sm text-ink-primary dark:text-white truncate">
          {truncateFilename(file.name)}
        </p>
        <p className="text-xs text-ink-muted">{formatSize(file.size)}</p>
      </div>

      {/* Remove */}
      <button
        onClick={onRemove}
        className="w-7 h-7 rounded-full flex items-center justify-center
          text-ink-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20
          transition-all opacity-60 group-hover:opacity-100"
        aria-label={`Remove ${file.name}`}
      >
        <X size={14} />
      </button>
    </div>
  )
}

function AddMoreFiles({ onFiles }) {
  return (
    <label className="btn-ghost w-full py-2.5 text-sm cursor-pointer text-center">
      <input
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={e => onFiles(Array.from(e.target.files || []))}
      />
      + Add more files
    </label>
  )
}

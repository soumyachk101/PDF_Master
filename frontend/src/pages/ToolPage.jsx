import { useState, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronRight, AlertCircle, PlusCircle } from 'lucide-react'
import * as Icons from 'lucide-react'
import { getToolBySlug, TOOLS } from '../utils/tools'
import { useFileUpload } from '../hooks/useFileUpload'
import UploadZone from '../components/UploadZone'
import FileQueue from '../components/FileQueue'
import ProcessingScreen from '../components/ProcessingScreen'
import DownloadScreen from '../components/DownloadScreen'
import ToolCard from '../components/ToolCard'

export default function ToolPage() {
  const { toolSlug } = useParams()
  const navigate = useNavigate()
  const tool = getToolBySlug(toolSlug)

  const {
    files, addFiles, removeFile, reorderFiles,
    options, setOption,
    step, progress, result, error,
    process, reset,
  } = useFileUpload(toolSlug)

  // Redirect if invalid slug
  if (!tool) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-ink-muted mb-4">Tool not found.</p>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </main>
    )
  }

  const Icon = Icons[tool.icon] || Icons.FileText

  // Related tools (same category, excluding current)
  const relatedTools = TOOLS
    .filter(t => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 4)

  return (
    <main className="min-h-screen bg-white dark:bg-bg-dark">
      <div className="pt-20">

        {/* ─── Tool header ─── */}
        <div className="bg-surface dark:bg-surface-dark border-b
          border-border dark:border-border-dark py-8 mb-10">
          <div className="max-w-tool mx-auto px-4 sm:px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-ink-muted mb-5">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight size={14} />
              <span className="text-ink-primary dark:text-white capitalize">
                {tool.name}
              </span>
            </nav>

            {/* Title row */}
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${tool.color}18` }}
              >
                <Icon size={26} style={{ color: tool.color }} strokeWidth={1.75} />
              </div>
              <div>
                <h1 className="font-display font-bold text-2xl sm:text-3xl
                  text-ink-primary dark:text-white mb-1">
                  {tool.name}
                </h1>
                <p className="text-ink-secondary dark:text-ink-muted">
                  {tool.desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Main content ─── */}
        <div className="max-w-tool mx-auto px-4 sm:px-6 pb-24">

          {/* STEP: Upload */}
          {step === 'upload' && (
            <div className="animate-fade-in">
              {files.length === 0 ? (
                <UploadZone
                  onFiles={addFiles}
                  accept={tool.accept}
                  multiple={tool.multiple}
                  acceptLabel={tool.acceptLabel}
                />
              ) : (
                <FileQueue
                  files={files}
                  onRemove={removeFile}
                  onReorder={reorderFiles}
                  tool={tool}
                  options={options}
                  onOptionChange={setOption}
                  onProcess={process}
                  isProcessing={false}
                />
              )}

              {/* Upload another batch if files exist but want to re-upload */}
              {files.length > 0 && tool.multiple && (
                <div className="mt-3 max-w-upload mx-auto">
                  <label className="flex items-center justify-center gap-2
                    text-sm text-ink-secondary dark:text-ink-muted
                    hover:text-primary cursor-pointer transition-colors py-2">
                    <PlusCircle size={15} />
                    Add more files
                    <input
                      type="file"
                      multiple
                      accept={tool.acceptLabel}
                      className="hidden"
                      onChange={e => addFiles(Array.from(e.target.files || []))}
                    />
                  </label>
                </div>
              )}
            </div>
          )}

          {/* STEP: Processing */}
          {step === 'processing' && (
            <ProcessingScreen
              progress={progress}
              fileName={files[0]?.name}
            />
          )}

          {/* STEP: Done */}
          {step === 'done' && result && (
            <DownloadScreen
              result={result}
              toolName={tool.name}
              onReset={reset}
            />
          )}

          {/* STEP: Error */}
          {step === 'error' && (
            <ErrorScreen error={error} onReset={reset} />
          )}

          {/* ─── How it works ─── */}
          {step === 'upload' && (
            <HowItWorks toolName={tool.name} />
          )}

          {/* ─── Related tools ─── */}
          {relatedTools.length > 0 && step === 'upload' && (
            <section className="mt-16">
              <h2 className="font-display font-semibold text-lg
                text-ink-primary dark:text-white mb-4">
                Related Tools
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedTools.map((t, i) => (
                  <ToolCard key={t.slug} tool={t} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}

/* ── Error Screen ── */
function ErrorScreen({ error, onReset }) {
  return (
    <div className="max-w-[480px] mx-auto text-center py-16 animate-fade-in">
      <div className="w-16 h-16 mx-auto mb-5 rounded-full
        bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
        <AlertCircle size={30} className="text-red-500" />
      </div>
      <h3 className="font-display font-semibold text-lg
        text-ink-primary dark:text-white mb-2">
        Something went wrong
      </h3>
      <p className="text-sm text-ink-secondary dark:text-ink-muted mb-7
        max-w-xs mx-auto leading-relaxed">
        {error || 'An unexpected error occurred. Please try again.'}
      </p>
      <button onClick={onReset} className="btn-primary mx-auto">
        Try Again
      </button>
    </div>
  )
}

/* ── How It Works ── */
function HowItWorks({ toolName }) {
  const steps = [
    { n: '01', label: 'Select your file', desc: 'Click or drag & drop your file into the upload area.' },
    { n: '02', label: 'Configure options', desc: 'Adjust any settings specific to your task if needed.' },
    { n: '03', label: `Run ${toolName}`, desc: 'Hit the process button and wait a few seconds.' },
    { n: '04', label: 'Download result', desc: 'Click download to save your processed file instantly.' },
  ]

  return (
    <section className="mt-14 pt-10 border-t border-border dark:border-border-dark">
      <h2 className="font-display font-semibold text-lg
        text-ink-primary dark:text-white mb-6">
        How it works
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        {steps.map((s, i) => (
          <div key={s.n} className="relative">
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="absolute top-5 left-1/2 w-full h-px
                bg-border dark:bg-border-dark hidden sm:block" />
            )}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-primary-light
                flex items-center justify-center mb-3 mx-auto">
                <span className="font-mono text-xs font-bold text-primary">
                  {s.n}
                </span>
              </div>
              <p className="font-semibold text-sm text-ink-primary dark:text-white
                mb-1 text-center">
                {s.label}
              </p>
              <p className="text-xs text-ink-secondary dark:text-ink-muted
                text-center leading-relaxed">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

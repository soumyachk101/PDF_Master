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
    <main className="min-h-screen relative overflow-hidden">
      {/* Background glow for tool page */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-primary-gradientStart/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="pt-20 relative z-10">

        {/* ─── Tool header ─── */}
        <div className="py-10 mb-8">
          <div className="max-w-tool mx-auto px-4 sm:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-ink-secondary mb-6 font-medium">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight size={14} className="text-ink-muted" />
              <span className="text-ink-primary dark:text-white capitalize font-semibold">
                {tool.name}
              </span>
            </nav>

            {/* Title row */}
            <div className="flex items-center gap-5">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 glass shadow-glass"
                style={{
                  backgroundColor: `${tool.color}15`,
                  border: `1px solid ${tool.color}30`
                }}
              >
                <Icon size={30} style={{ color: tool.color }} strokeWidth={2} />
              </div>
              <div>
                <h1 className="font-display font-black text-3xl sm:text-4xl
                  text-ink-primary dark:text-white mb-2 tracking-tight">
                  {tool.name}
                </h1>
                <p className="text-ink-secondary dark:text-ink-muted text-lg font-medium">
                  {tool.desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Main content ─── */}
        <div className="max-w-tool mx-auto px-4 sm:px-8 pb-32">

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
                <div className="mt-4 max-w-upload mx-auto">
                  <label className="flex items-center justify-center gap-2
                    text-sm font-semibold text-ink-secondary dark:text-ink-muted
                    hover:text-primary cursor-pointer transition-colors py-3
                    glass rounded-xl hover:shadow-glow-primary">
                    <PlusCircle size={18} />
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
            <HowItWorks toolName={tool.name} toolColor={tool.color} />
          )}

          {/* ─── Related tools ─── */}
          {relatedTools.length > 0 && step === 'upload' && (
            <section className="mt-20">
              <h2 className="font-display font-black text-2xl
                text-ink-primary dark:text-white mb-6">
                Related Tools
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
    <div className="max-w-[500px] mx-auto text-center py-20 px-8 glass rounded-[32px] border-red-500/20 shadow-[0_8px_32px_rgba(239,68,68,0.1)] animate-fade-in relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
      <div className="w-20 h-20 mx-auto mb-6 rounded-full
        bg-red-500/10 flex items-center justify-center">
        <AlertCircle size={40} className="text-red-500" />
      </div>
      <h3 className="font-display font-bold text-2xl
        text-ink-primary dark:text-white mb-3">
        Something went wrong
      </h3>
      <p className="text-base text-ink-secondary dark:text-ink-muted mb-8
        max-w-xs mx-auto leading-relaxed">
        {error || 'An unexpected error occurred. Please try again.'}
      </p>
      <button onClick={onReset} className="btn-primary w-full sm:w-auto">
        Try Again
      </button>
    </div>
  )
}

/* ── How It Works ── */
function HowItWorks({ toolName, toolColor }) {
  const steps = [
    { n: '1', label: 'Select your file', desc: 'Click or drag & drop your file into the upload area.' },
    { n: '2', label: 'Configure options', desc: 'Adjust any settings specific to your task if needed.' },
    { n: '3', label: `Run ${toolName}`, desc: 'Hit the process button and wait a few seconds.' },
    { n: '4', label: 'Download result', desc: 'Click download to save your processed file instantly.' },
  ]

  return (
    <section className="mt-20 pt-16 border-t border-border dark:border-border-dark relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <h2 className="font-display font-black text-2xl text-center
        text-ink-primary dark:text-white mb-12">
        How it works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <div key={s.n} className="relative group text-center">
            {/* Connector line (desktop) */}
            {i < steps.length - 1 && (
              <div className="absolute top-7 left-[60%] w-[80%] h-[2px] bg-border dark:bg-border-dark hidden sm:block overflow-hidden">
                <div className="h-full w-0 bg-primary opacity-50 group-hover:w-full transition-all duration-700 ease-out" />
              </div>
            )}
            <div className="relative z-10 w-14 h-14 rounded-2xl glass shadow-glass mx-auto mb-5 flex items-center justify-center transition-transform group-hover:-translate-y-1">
              <span className="font-display font-black text-xl text-primary">
                {s.n}
              </span>
            </div>
            <p className="font-bold text-base text-ink-primary dark:text-white
              mb-2 transition-colors group-hover:text-primary">
              {s.label}
            </p>
            <p className="text-sm font-medium text-ink-secondary dark:text-ink-muted
              leading-relaxed max-w-[200px] mx-auto">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Alert } from '@/components/ui/alert'

interface Screenshot {
  id: string
  dataUrl: string
  pageNumber: number
}

interface FileUploadProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
  isProcessing: boolean
  pdfLibLoaded: boolean
  error: string | null
  file: File | null
  screenshots: Screenshot[]
}

export const FileUpload = ({
  onFileUpload,
  onClear,
  isProcessing,
  pdfLibLoaded,
  error,
  file,
  screenshots,
}: FileUploadProps) => {
   const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const hasScreenshots = screenshots.length > 0

  return (
    <Card className="p-4">
      <div
        className={`relative flex flex-col ${hasScreenshots ? 'md:flex-row gap-6 items-start' : 'items-center'}`}
      >
        <div
          className={`flex flex-col items-center py-4 ${hasScreenshots ? 'md:w-1/2 w-full' : 'w-full max-w-xl'} space-y-6`}
        >
          {/* Upload Area */}
          <div
            onClick={handleUploadClick}
            className="w-full max-w-xl win95-inset bg-white p-6 cursor-pointer text-center"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={onFileUpload}
              className="hidden"
            />

            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 border-2 border-t-[#fff] border-l-[#fff] border-b-[#808080] border-r-[#808080] bg-[#000080] flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg uppercase text-black mb-1">
                  {!pdfLibLoaded ? 'Initializing...' : 'Drop your PDF here'}
                </h3>
                <p className="font-mono text-[11px] text-[#808080]">
                  {!pdfLibLoaded ? 'Setting up PDF processor...' : 'or click to browse from your computer'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleUploadClick} disabled={!pdfLibLoaded || isProcessing} size="default">
              {!pdfLibLoaded ? 'Loading...' : 'Select File'}
            </Button>
            {screenshots.length > 0 && (
              <Button onClick={onClear} variant="outline" size="default">
                Clear All
              </Button>
            )}
          </div>

          {file && (
            <div className="hidden md:flex items-center w-full max-w-md">
              <div className="win95-inset bg-white p-3 flex items-center gap-3 w-full">
                <div className="w-10 h-10 border-2 border-t-[#fff] border-l-[#fff] border-b-[#808080] border-r-[#808080] bg-[#C0C0C0] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#000080]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75h6.379a2.25 2.25 0 011.591.659l4.121 4.121a2.25 2.25 0 01.659 1.591V18a2.25 2.25 0 01-2.25 2.25h-10.5A2.25 2.25 0 015 18V6a2.25 2.25 0 012.25-2.25z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-mono font-bold text-xs text-black truncate" title={file.name}>{file.name}</p>
                  <div className="flex items-center gap-2 mt-0.5 font-mono text-[10px] text-[#808080]">
                    <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    <span>|</span>
                    <span>{screenshots.length} {screenshots.length === 1 ? 'Page' : 'Pages'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {isProcessing && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="win95-loader mx-auto mb-3" style={{ borderColor: '#808080', borderTopColor: '#FFFFFF' }} />
              <p className="font-display font-bold text-sm uppercase text-white">Processing PDF pages...</p>
            </div>
          </div>
        )}

        {hasScreenshots && (
          <div className="w-full md:w-1/2 max-h-[500px] overflow-auto pr-1">
            <div className="grid grid-cols-1 gap-3">
              {screenshots.map((shot) => (
                <div key={shot.id} className="win95-window">
                  <div className="win95-titlebar text-[10px] py-0.5 px-2">
                    <span>Page {shot.pageNumber}</span>
                  </div>
                  <div className="p-1 bg-white">
                    <img src={shot.dataUrl} alt={`Page ${shot.pageNumber}`} className="w-full h-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4">
          {error}
        </Alert>
      )}
    </Card>
  );
};

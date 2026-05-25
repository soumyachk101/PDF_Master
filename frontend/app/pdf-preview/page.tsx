'use client';

import { FileUpload } from "@/components/ui/pdf-preview-page";
import React, { useState, useEffect } from 'react'

interface Screenshot {
  id: string
  dataUrl: string
  pageNumber: number
}

declare global {
  interface Window {
    pdfjsLib: any
  }
}

export default function PdfPreviewPage() {
  const [pdfLibLoaded, setPdfLibLoaded] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [screenshots, setScreenshots] = useState<Screenshot[]>([])
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load PDF.js library
  useEffect(() => {
    if (window.pdfjsLib) {
      console.log("PDF.js already loaded")
      setPdfLibLoaded(true)
      return
    }

    console.log("Loading PDF.js library...")

    const mainScript = document.createElement("script")
    mainScript.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js"
    mainScript.async = true
    mainScript.onload = () => {
      console.log("Main PDF.js script loaded")
      setScriptLoaded(true)
    }
    mainScript.onerror = (e) => {
      console.error("Failed to load PDF.js script", e)
      setError("Failed to load PDF processing library")
    }

    document.body.appendChild(mainScript)

    return () => {
      if (document.body.contains(mainScript)) {
        document.body.removeChild(mainScript)
      }
    }
  }, [])

  useEffect(() => {
    if (!scriptLoaded) return

    console.log("Setting up PDF.js worker...")
    const workerUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js"
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl

    setTimeout(() => {
      if (window.pdfjsLib) {
        console.log("PDF.js is fully loaded and worker is configured")
        setPdfLibLoaded(true)
      } else {
        console.error("PDF.js failed to initialize properly")
        setError("PDF processing library failed to initialize")
      }
    }, 500)
  }, [scriptLoaded])

  const convertPageToScreenshot = async (page: any, pageNumber: number): Promise<Screenshot> => {
    const viewport = page.getViewport({ scale: 1.5 })
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    canvas.height = viewport.height
    canvas.width = viewport.width

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    }

    await page.render(renderContext).promise

    return {
      id: `page-${pageNumber}`,
      dataUrl: canvas.toDataURL('image/png'),
      pageNumber
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !pdfLibLoaded) return

    setIsProcessing(true)
    setError(null)
    setScreenshots([])
    setUploadedFile(file)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise

      const newScreenshots: Screenshot[] = []

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum)
        const screenshot = await convertPageToScreenshot(page, pageNum)
        newScreenshots.push(screenshot)
      }

      setScreenshots(newScreenshots)
    } catch (err) {
      console.error('Error processing PDF:', err)
      setError('Failed to process PDF file')
    } finally {
      setIsProcessing(false)
    }
  }

  const clearScreenshots = () => {
    setScreenshots([])
    setError(null)
    setUploadedFile(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto px-4 py-12 mt-5">
        <div className="space-y-8">
          <FileUpload
            onFileUpload={handleFileUpload}
            onClear={clearScreenshots}
            isProcessing={isProcessing}
            pdfLibLoaded={pdfLibLoaded}
            error={error}
            file={uploadedFile}
            screenshots={screenshots}
          />
        </div>
      </div>
    </div>
  )
}

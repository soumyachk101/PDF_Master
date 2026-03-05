import { useState, useCallback } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export function useFileUpload(toolSlug) {
  const [files, setFiles] = useState([])
  const [options, setOptions] = useState({})
  const [step, setStep] = useState('upload') // 'upload' | 'processing' | 'done' | 'error'
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const addFiles = useCallback((newFiles) => {
    setFiles(prev => [...prev, ...newFiles])
  }, [])

  const removeFile = useCallback((index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }, [])

  const reorderFiles = useCallback((fromIndex, toIndex) => {
    setFiles(prev => {
      const next = [...prev]
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
      return next
    })
  }, [])

  const setOption = useCallback((key, value) => {
    setOptions(prev => ({ ...prev, [key]: value }))
  }, [])

  const process = useCallback(async () => {
    if (!files.length) return
    setStep('processing')
    setProgress(15)
    setError(null)

    const formData = new FormData()
    files.forEach(f => formData.append('files', f))
    Object.entries(options).forEach(([k, v]) => formData.append(k, String(v)))

    // Simulate progress while waiting
    let fake = 15
    const fakeTimer = setInterval(() => {
      fake = Math.min(fake + 6, 80)
      setProgress(fake)
    }, 350)

    try {
      const res = await axios.post(
        `${API_URL}/api/pdf/${toolSlug}`,
        formData,
        {
          responseType: 'blob',
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: e => {
            const uploadPct = Math.round((e.loaded / (e.total || 1)) * 40) + 10
            setProgress(Math.max(fake, uploadPct))
          },
        }
      )

      clearInterval(fakeTimer)
      setProgress(100)

      const disposition = res.headers['content-disposition'] || ''
      const nameMatch = disposition.match(/filename="?([^";\n]+)"?/)
      const filename = nameMatch
        ? nameMatch[1]
        : res.headers['x-filename'] || `result-${toolSlug}${getExt(res.headers['content-type'])}`

      const url = URL.createObjectURL(res.data)
      setResult({
        url,
        filename,
        size: res.data.size,
        originalSize: files.reduce((acc, f) => acc + f.size, 0),
        mime: res.data.type,
      })

      setTimeout(() => setStep('done'), 500)
    } catch (err) {
      clearInterval(fakeTimer)
      setProgress(0)
      const message = err.response?.data
        ? await err.response.data.text().then(t => {
            try { return JSON.parse(t).message } catch { return t }
          })
        : 'Processing failed. Please try again.'
      setError(message)
      setStep('error')
    }
  }, [files, options, toolSlug])

  const reset = useCallback(() => {
    setFiles([])
    setOptions({})
    setStep('upload')
    setProgress(0)
    setResult(null)
    setError(null)
  }, [])

  return {
    files, addFiles, removeFile, reorderFiles,
    options, setOption,
    step, progress, result, error,
    process, reset,
  }
}

function getExt(mime) {
  const map = {
    'application/pdf': '.pdf',
    'application/zip': '.zip',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'image/jpeg': '.jpg',
  }
  return map[mime] || '.bin'
}

import { useState, useCallback } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

// Health check function
async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_URL}/health`, { method: 'GET' })
    if (!res.ok) return false
    const data = await res.json()
    return data.status === 'ok'
  } catch (err) {
    console.error('[health] Backend unreachable:', err.message)
    return false
  }
}

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

    // Check backend health first
    const isHealthy = await checkBackendHealth()
    if (!isHealthy) {
      setError('Cannot connect to server. Please try again later or check your internet connection.')
      setStep('error')
      return
    }

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
      console.log('[upload] Starting upload to:', `${API_URL}/api/pdf/${toolSlug}`)
      console.log('[upload] Files:', files.length)
      console.log('[upload] Options:', options)

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

      console.error('[upload] Error details:', err)
      console.error('[upload] Response status:', err.response?.status)
      console.error('[upload] Response data:', err.response?.data)

      let message = 'Processing failed. Please try again.'

      if (err.code === 'ERR_NETWORK') {
        message = 'Cannot connect to server. Please check your internet connection or try again later.'
      } else if (err.response?.status === 413) {
        message = 'File is too large. Maximum size is 100MB.'
      } else if (err.response?.status === 415) {
        message = 'Unsupported file type. Please use a supported format.'
      } else if (err.response?.status === 400) {
        message = 'Invalid request. Please check your file and try again.'
      } else if (err.response?.status === 500) {
        message = 'Server error. Please try again in a few moments.'
      } else if (err.response?.data) {
        try {
          // If the backend returned a Blob (because responseType: 'blob')
          if (err.response.data instanceof Blob) {
            const text = await err.response.data.text()
            console.error('[upload] Raw error response text:', text.substring(0, 500))
            try {
              const json = JSON.parse(text)
              message = json.message || json.error || message
            } catch {
              // If it's HTML, it's likely a proxy/gateway error (e.g., Railway 502 Bad Gateway)
              if (text.includes('<html')) {
                message = `Server unreachable or proxy error (Status ${err.response.status}). The service might be booting up or crashing.`
              } else {
                message = text.substring(0, 100) || message
              }
            }
          }
        } catch (e) {
          console.error('[upload] Failed to parse error response:', e)
          message = 'Processing failed. Please try again.'
        }
      }

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

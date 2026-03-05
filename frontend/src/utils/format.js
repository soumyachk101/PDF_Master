// File size formatter
export function formatSize(bytes) {
  if (!bytes || bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

// Compression reduction percentage
export function reductionPercent(original, compressed) {
  if (!original || !compressed) return 0
  return Math.max(0, Math.round((1 - compressed / original) * 100))
}

// Truncate long file names
export function truncateFilename(name, maxLen = 40) {
  if (name.length <= maxLen) return name
  const ext = name.lastIndexOf('.')
  if (ext === -1) return name.slice(0, maxLen - 3) + '...'
  const base = name.slice(0, ext)
  const extension = name.slice(ext)
  const allowed = maxLen - extension.length - 3
  return base.slice(0, allowed) + '...' + extension
}

// Validate file size
export function isFileTooLarge(file, maxMB = 100) {
  return file.size > maxMB * 1024 * 1024
}

// Get file extension
export function getExtension(filename) {
  return filename.slice(filename.lastIndexOf('.')).toLowerCase()
}

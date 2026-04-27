import { useRef, useState } from 'react'
import styles from './DropZone.module.css'

interface Props {
  onFile: (file: File) => void
}

export default function DropZone({ onFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) onFile(file)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onFile(file)
  }

  return (
    <div
      className={`${styles.zone} ${dragOver ? styles.dragOver : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      aria-label="Upload PDF file"
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className={styles.input}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
      />
      <svg className={styles.icon} viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect x="8" y="4" width="18" height="24" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M22 4l6 6v22H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M22 4v6h6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 28l5 4 5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 32v-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <p className={styles.label}>Drop PDF here</p>
      <p className={styles.sub}>or click to browse</p>
    </div>
  )
}

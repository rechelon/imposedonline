import { useState, useCallback } from 'react'
import Header from './components/Header'
import DropZone from './components/DropZone'
import FileInfo from './components/FileInfo'
import StatsGrid from './components/StatsGrid'
import ProgressBar from './components/ProgressBar'
import ImpositionDiagram from './components/ImpositionDiagram'
import ExplainerGraphic from './components/ExplainerGraphic'
import { loadPdfMeta, imposeZine, formatBytes, type PdfMeta } from './lib/impose'
import styles from './App.module.css'

interface Progress {
  pct: number
  label: string
}

interface Result {
  downloadUrl: string
  downloadName: string
  totalSpreads: number
  numSheets: number
  spreadW: number
  height: number
  outputSize: number
}

export default function App() {
  const [file, setFile] = useState<File | null>(null)
  const [meta, setMeta] = useState<PdfMeta | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState<Progress | null>(null)
  const [result, setResult] = useState<Result | null>(null)

  const handleFile = useCallback(async (f: File) => {
    if (!f.name.endsWith('.pdf') && f.type !== 'application/pdf') {
      setError('Please select a PDF file.')
      return
    }
    setError(null)
    setFile(f)
    setResult(null)
    setProgress(null)
    try {
      const m = await loadPdfMeta(f)
      setMeta(m)
    } catch (e) {
      setError('Could not read PDF: ' + (e as Error).message)
      setMeta(null)
    }
  }, [])

  const handleClear = useCallback(() => {
    setFile(null)
    setMeta(null)
    setError(null)
    setProgress(null)
    setResult(null)
  }, [])

  const handleImpose = useCallback(async () => {
    if (!file || !meta) return
    setError(null)
    setResult(null)
    setProgress({ pct: 0, label: 'Starting…' })

    try {
      const bytes = await imposeZine(meta, (pct, label) => {
        setProgress({ pct, label })
      })

      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const baseName = file.name.replace(/\.pdf$/i, '')

      const numSheets = meta.total / 4
      setResult({
        downloadUrl: url,
        downloadName: baseName + '_zine.pdf',
        totalSpreads: numSheets * 2,
        numSheets,
        spreadW: meta.width * 2,
        height: meta.height,
        outputSize: bytes.length,
      })
    } catch (e) {
      setError('Imposition failed: ' + (e as Error).message)
    } finally {
      setProgress(null)
    }
  }, [file, meta])

  const inputStats = meta
    ? [
        { label: 'Pages in', value: String(meta.n) },
        { label: 'Padding', value: meta.padding === 0 ? '0' : `+${meta.padding}`, accent: meta.padding > 0 },
        { label: 'Sheets out', value: String(meta.sheets) },
      ]
    : null

  const outputStats = result
    ? [
        { label: 'Output spreads', value: String(result.totalSpreads) },
        { label: 'Physical sheets', value: String(result.numSheets) },
        { label: 'Spread size', value: `${Math.round(result.spreadW)}×${Math.round(result.height)} pt` },
        { label: 'Output size', value: formatBytes(result.outputSize) },
      ]
    : null

  return (
    <div className={styles.page}>
      <Header />

      {!file ? (
        <DropZone onFile={handleFile} />
      ) : (
        <FileInfo name={file.name} size={file.size} onClear={handleClear} />
      )}

      {error && <div className={styles.error}>{error}</div>}

      {inputStats && <StatsGrid stats={inputStats} />}

      <button
        className={styles.imposeBtn}
        onClick={handleImpose}
        disabled={!meta || progress !== null}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <rect x="1" y="2" width="5" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
          <rect x="8" y="2" width="5" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        Impose zine
      </button>

      {progress && <ProgressBar pct={progress.pct} label={progress.label} />}

      {result && (
        <div className={styles.resultArea}>
          <hr className={styles.rule} />
          {outputStats && <StatsGrid stats={outputStats} />}
          <a
            className={styles.downloadBtn}
            href={result.downloadUrl}
            download={result.downloadName}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M7 2v7M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 11h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Download imposed PDF
          </a>
          {meta && <ImpositionDiagram total={meta.total} n={meta.n} />}
        </div>
      )}

      <ExplainerGraphic />
    </div>
  )
}

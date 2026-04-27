import { formatBytes } from '../lib/impose'
import styles from './FileInfo.module.css'

interface Props {
  name: string
  size: number
  onClear: () => void
}

export default function FileInfo({ name, size, onClear }: Props) {
  return (
    <div className={styles.bar}>
      <div className={styles.icon} aria-hidden>
        <svg viewBox="0 0 14 18" fill="none">
          <path d="M1 1h8l4 4v12H1V1z" stroke="white" strokeWidth="1.2" />
          <path d="M9 1v4h4" stroke="white" strokeWidth="1.2" />
          <path d="M4 9h6M4 12h4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      <div className={styles.meta}>
        <div className={styles.name} title={name}>{name}</div>
        <div className={styles.size}>{formatBytes(size)}</div>
      </div>
      <button
        className={styles.clear}
        onClick={onClear}
        title="Remove file"
        aria-label="Remove file"
      >
        ×
      </button>
    </div>
  )
}

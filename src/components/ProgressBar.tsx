import styles from './ProgressBar.module.css'

interface Props {
  pct: number
  label: string
}

export default function ProgressBar({ pct, label }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  )
}

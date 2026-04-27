import styles from './StatsGrid.module.css'

interface Stat {
  label: string
  value: string
  accent?: boolean
}

interface Props {
  stats: Stat[]
}

export default function StatsGrid({ stats }: Props) {
  return (
    <div className={styles.grid}>
      {stats.map((s) => (
        <div key={s.label} className={styles.cell}>
          <div className={styles.label}>{s.label}</div>
          <div className={`${styles.value} ${s.accent ? styles.accent : ''}`}>
            {s.value}
          </div>
        </div>
      ))}
    </div>
  )
}

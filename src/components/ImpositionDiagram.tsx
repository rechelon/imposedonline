import styles from './ImpositionDiagram.module.css'

interface Props {
  total: number
  n: number
}

function pageLabel(i: number, n: number) {
  return i < n ? `pg ${i + 1}` : 'blank'
}

export default function ImpositionDiagram({ total, n }: Props) {
  const numSheets = total / 4
  const sheets = Array.from({ length: numSheets }, (_, s) => ({
    frontLeft:  total - 2 * s - 1,
    frontRight: 2 * s,
    backLeft:   2 * s + 1,
    backRight:  total - 2 * s - 2,
  }))

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Imposition layout</div>
      {sheets.map((sheet, s) => (
        <div key={s} className={styles.sheetGroup}>
          <Row label={`Sheet ${s + 1} front`} left={sheet.frontLeft} right={sheet.frontRight} n={n} showFold />
          <Row label={`Sheet ${s + 1} back`}  left={sheet.backLeft}  right={sheet.backRight}  n={n} />
        </div>
      ))}
    </div>
  )
}

function Row({
  label,
  left,
  right,
  n,
  showFold = false,
}: {
  label: string
  left: number
  right: number
  n: number
  showFold?: boolean
}) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <div className={styles.spread}>
        <Half idx={left} n={n} />
        <div className={`${styles.fold} ${showFold ? styles.foldVisible : ''}`} aria-hidden />
        <Half idx={right} n={n} />
      </div>
    </div>
  )
}

function Half({ idx, n }: { idx: number; n: number }) {
  const blank = idx >= n
  return (
    <div className={`${styles.half} ${blank ? styles.blank : styles.content}`}>
      {pageLabel(idx, n)}
    </div>
  )
}

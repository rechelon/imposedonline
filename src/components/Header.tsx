import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.masthead}>
        <h1 className={styles.title}>Zine Imposer</h1>
        <span className={styles.badge}>Saddle-stitch</span>
      </div>
      <p className={styles.tagline}>
        Upload a PDF and get a print-ready imposed booklet — pages arranged
        for short-edge duplex printing, folding, and stapling.
      </p>
    </header>
  )
}

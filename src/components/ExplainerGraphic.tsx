import styles from './ExplainerGraphic.module.css'

export default function ExplainerGraphic() {
  return (
    <div className={styles.wrap}>
      <svg
        width="100%"
        viewBox="0 0 600 340"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        <title>Page imposition diagram</title>
        <desc>
          Shows how 8 source pages are rearranged into 4 imposed spreads for
          saddle-stitch printing
        </desc>
        <defs>
          <marker
            id="imp-arr"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path
              d="M2 1L8 5L2 9"
              fill="none"
              stroke="#c84b2f"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>

        {/* Section headers */}
        <text className={styles.ih} x="0" y="14">BEFORE</text>
        <text className={styles.ih} x="270" y="14">AFTER — print order</text>
        <text className={styles.ih} x="500" y="14">RESULT</text>

        {/* Source pages — row 1: pg 1–4 */}
        {[0,1,2,3].map((i) => (
          <g key={i}>
            <rect x={i * 42} y="26" width="36" height="48" rx="2" fill="#ede9df" stroke="#c8c4b8" strokeWidth="0.75" />
            <text className={styles.ip} x={i * 42 + 18} y="55" textAnchor="middle" dominantBaseline="central">{i + 1}</text>
          </g>
        ))}
        {/* Source pages — row 2: pg 5–8 */}
        {[4,5,6,7].map((i) => (
          <g key={i}>
            <rect x={(i - 4) * 42} y="82" width="36" height="48" rx="2" fill="#ede9df" stroke="#c8c4b8" strokeWidth="0.75" />
            <text className={styles.ip} x={(i - 4) * 42 + 18} y="111" textAnchor="middle" dominantBaseline="central">{i + 1}</text>
          </g>
        ))}

        {/* Impose arrow */}
        <line x1="178" y1="83" x2="220" y2="83" stroke="#c84b2f" strokeWidth="1.5" markerEnd="url(#imp-arr)" />
        <text className={styles.il} x="199" y="78" textAnchor="middle">impose</text>

        {/* Imposed spreads */}
        {/* Sheet 1 front */}
        <text className={styles.il} x="230" y="37" textAnchor="start">sheet 1 · front</text>
        <rect x="230" y="44" width="60" height="48" rx="2" fill="#ede9df" stroke="#c8c4b8" strokeWidth="0.75" />
        <text className={styles.ip} x="260" y="69" textAnchor="middle" dominantBaseline="central">8</text>
        <line x1="290" y1="44" x2="290" y2="92" stroke="#c84b2f" strokeWidth="1.2" strokeDasharray="3 2" />
        <rect x="290" y="44" width="60" height="48" rx="2" fill="#e5dece" stroke="#b8b0a0" strokeWidth="0.75" />
        <text className={styles.ip} x="320" y="62" textAnchor="middle" dominantBaseline="central">1</text>
        <text className={styles.ic} x="320" y="76" textAnchor="middle" dominantBaseline="central">cover</text>

        {/* Sheet 1 back */}
        <text className={styles.il} x="230" y="112" textAnchor="start">sheet 1 · back</text>
        <rect x="230" y="118" width="60" height="48" rx="2" fill="#ede9df" stroke="#c8c4b8" strokeWidth="0.75" />
        <text className={styles.ip} x="260" y="143" textAnchor="middle" dominantBaseline="central">2</text>
        <line x1="290" y1="118" x2="290" y2="166" stroke="#c84b2f" strokeWidth="1.2" strokeDasharray="3 2" />
        <rect x="290" y="118" width="60" height="48" rx="2" fill="#ede9df" stroke="#c8c4b8" strokeWidth="0.75" />
        <text className={styles.ip} x="320" y="143" textAnchor="middle" dominantBaseline="central">7</text>

        {/* Sheet 2 front */}
        <text className={styles.il} x="230" y="186" textAnchor="start">sheet 2 · front</text>
        <rect x="230" y="192" width="60" height="48" rx="2" fill="#ede9df" stroke="#c8c4b8" strokeWidth="0.75" />
        <text className={styles.ip} x="260" y="217" textAnchor="middle" dominantBaseline="central">6</text>
        <line x1="290" y1="192" x2="290" y2="240" stroke="#c84b2f" strokeWidth="1.2" strokeDasharray="3 2" />
        <rect x="290" y="192" width="60" height="48" rx="2" fill="#ede9df" stroke="#c8c4b8" strokeWidth="0.75" />
        <text className={styles.ip} x="320" y="217" textAnchor="middle" dominantBaseline="central">3</text>

        {/* Sheet 2 back */}
        <text className={styles.il} x="230" y="260" textAnchor="start">sheet 2 · back</text>
        <rect x="230" y="266" width="60" height="48" rx="2" fill="#ede9df" stroke="#c8c4b8" strokeWidth="0.75" />
        <text className={styles.ip} x="260" y="291" textAnchor="middle" dominantBaseline="central">4</text>
        <line x1="290" y1="266" x2="290" y2="314" stroke="#c84b2f" strokeWidth="1.2" strokeDasharray="3 2" />
        <rect x="290" y="266" width="60" height="48" rx="2" fill="#ede9df" stroke="#c8c4b8" strokeWidth="0.75" />
        <text className={styles.ip} x="320" y="291" textAnchor="middle" dominantBaseline="central">5</text>

        {/* Result arrow */}
        <line x1="366" y1="155" x2="408" y2="155" stroke="#c84b2f" strokeWidth="1.5" markerEnd="url(#imp-arr)" />

        {/* Booklet illustration */}
        <rect x="422" y="80" width="58" height="76" rx="3" fill="#d8d4c8" stroke="#bbb7ac" strokeWidth="0.5" />
        <rect x="418" y="76" width="58" height="76" rx="3" fill="#e2ddd4" stroke="#c0bcb0" strokeWidth="0.5" />
        <rect x="414" y="72" width="58" height="76" rx="3" fill="#ede9df" stroke="#b5b0a4" strokeWidth="0.75" />
        <line x1="414" y1="72" x2="414" y2="148" stroke="#c84b2f" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="411" y="87" width="6" height="3" rx="1" fill="#c84b2f" />
        <rect x="411" y="129" width="6" height="3" rx="1" fill="#c84b2f" />
        <text className={styles.ip} x="443" y="107" textAnchor="middle" dominantBaseline="central">1 → 8</text>
        <text className={styles.il} x="443" y="122" textAnchor="middle">reads in order</text>
        <path d="M 420 155 Q 443 174 466 155" fill="none" stroke="#c8c4b8" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#imp-arr)" />
        <text className={styles.il} x="443" y="186" textAnchor="middle">fold here</text>
        <text className={styles.il} x="405" y="110" textAnchor="end">staple</text>
        <line x1="406" y1="108" x2="412" y2="103" stroke="#c8c4b8" strokeWidth="0.75" />
      </svg>
    </div>
  )
}

import { PDFDocument } from 'pdf-lib'

export interface PdfMeta {
  n: number
  padding: number
  total: number
  sheets: number
  width: number
  height: number
  buf: ArrayBuffer
}

export function formatBytes(b: number): string {
  if (b < 1024) return b + ' B'
  if (b < 1048576) return (b / 1024).toFixed(1) + ' KB'
  return (b / 1048576).toFixed(1) + ' MB'
}

export async function loadPdfMeta(file: File): Promise<PdfMeta> {
  const buf = await file.arrayBuffer()
  const doc = await PDFDocument.load(buf, { ignoreEncryption: true })
  const n = doc.getPageCount()
  const padding = (4 - (n % 4)) % 4
  const total = n + padding
  const sheets = total / 4
  const page = doc.getPage(0)
  const { width, height } = page.getSize()
  return { n, padding, total, sheets, width, height, buf }
}

export type ProgressCallback = (pct: number, label: string) => void

export async function imposeZine(
  meta: PdfMeta,
  onProgress: ProgressCallback,
): Promise<Uint8Array> {
  const { n, total, width, height, buf } = meta
  const spreadW = width * 2

  onProgress(5, 'Loading source PDF…')
  const srcDoc = await PDFDocument.load(buf)

  onProgress(15, 'Creating output document…')
  const outDoc = await PDFDocument.create()

  const numSheets = total / 4
  const totalSpreads = numSheets * 2

  for (let s = 0; s < numSheets; s++) {
    // Saddle-stitch short-edge imposition order:
    //   Front: left = total-2s-1,  right = 2s
    //   Back:  left = 2s+1,        right = total-2s-2
    const pairs: [number, number][] = [
      [total - 2 * s - 1, 2 * s],
      [2 * s + 1, total - 2 * s - 2],
    ]

    for (let side = 0; side < 2; side++) {
      const [leftIdx, rightIdx] = pairs[side]
      const spreadPage = outDoc.addPage([spreadW, height])
      const pct = 15 + Math.round(80 * (s * 2 + side) / totalSpreads)
      onProgress(pct, `Imposing sheet ${s + 1} of ${numSheets}…`)

      for (const [srcIdx, xOffset] of [[leftIdx, 0], [rightIdx, width]] as [number, number][]) {
        if (srcIdx >= n) continue // blank padding page

        // embedPdf wraps the source page as a Form XObject — robust for all
        // PDF content types including images, fonts, and clipping paths.
        const [embeddedPage] = await outDoc.embedPdf(srcDoc, [srcIdx])
        spreadPage.drawPage(embeddedPage, { x: xOffset, y: 0, width, height })
      }
    }
  }

  onProgress(97, 'Saving…')
  const bytes = await outDoc.save()
  onProgress(100, 'Done!')
  return bytes
}

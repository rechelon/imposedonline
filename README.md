# ImposedOnline

Placeholder while I work on the react revamp.  

## Getting started

```bash
npm install
npm run dev

npm run build && gh-pages -d dist
npm run preview 
```


## How imposition works

For a booklet with N pages (padded to the next multiple of 4), each physical sheet s (0-based) gets:

| Side  | Left page      | Right page     |
|-------|----------------|----------------|
| Front | N − 2s         | 2s + 1         |
| Back  | 2s + 2         | N − 2s − 1     |

Pages are embedded as PDF Form XObjects via pdf-lib's embedPdf()

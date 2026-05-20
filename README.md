# Приглашение · Александр & Ксения · 27.06.2026

https://stdogbert.github.io/invitation

---

## Run locally

```bash
python3 -m http.server 8743
# open http://localhost:8743
```

## Edit content

Everything is in **`src/data.js`** — text, specs, colors, fonts, notes.

> ⚠️ After any design change, regenerate the PDFs (see below).

## Export PDFs for print

```bash
npm install             # once (requires Node.js)
node scripts/export-pdfs.js     # generates pdfs/card-0{1..4}.pdf
```

PDFs are sized to the with-bleed dimensions.

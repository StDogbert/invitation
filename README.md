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
brew install ghostscript  # once — enables CMYK output (recommended for printing)
npm install               # once (requires Node.js)
npm run export            # server must be running on port 8743
```

Generates in `pdfs/`:
- `card-01.pdf` … `card-04.pdf` — artwork at with-bleed dimensions, CMYK if Ghostscript is installed
- `card-01-spec.pdf` … `card-04-spec.pdf` — technical spec sheets (A4 landscape)

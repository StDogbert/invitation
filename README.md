# Приглашение · Александр & Ксения · 27.06.2026

**Live preview:** https://stdogbert.github.io/invitation

Wedding invitation design tool — 4 layered cards, 1:1 mm preview, stack view,
and sidebar with print specs.

---

## Local development

**Requirements:** Python 3 (for the HTTP server). No build step, no npm needed.

```bash
# from the project directory
python3 -m http.server 8743
```

Then open **http://localhost:8743** in Chrome or Safari.

> A plain HTTP server is required because the page loads multiple files.
> Opening `index.html` directly as `file://` won't work.

---

## Editing content

All text, sizes, colors, and notes live in **`data.js`** — that's the only file
you need to touch for content changes.

```
data.js          ← single source of truth (text, specs, colors, fonts, notes)
app.js           ← renders everything from data.js; rarely needs editing
styles.css       ← shared chrome (header, tabs, sidebar, stage)
card1.css … card4.css  ← per-card dimensions and layout
```

After editing `data.js`, reload the browser to see changes immediately.

> ⚠️ **If you changed any text, colors, or dimensions that affect the final
> design, regenerate the print PDFs** — see the section below.

---

## Exporting PDFs for the printing house

Each card must be exported as a separate PDF at its **with-bleed** dimensions
(trim + 3 mm on every side).

| Card | Trim | With bleed |
|------|------|------------|
| 01 · Базовая | 110 × 155 mm | **116 × 161 mm** |
| 02 · Регистрация | 80 × 135 mm | **86 × 141 mm** |
| 03 · Ужин | 80 × 120 mm | **86 × 126 mm** |
| 04 · Ждем вас (arch) | 80 × 105 mm | **86 × 111 mm** |

### Option A — Manual export from Chrome (no extra tools)

1. Open **http://localhost:8743** in Chrome.
2. Select a card tab.
3. Click **БЕЗ МЕТОК** (clean view, no crop marks — the print house adds their own).
4. Open print dialog: **⌘P** (Mac) or **Ctrl+P** (Windows).
5. Set:
   - **Destination** → Save as PDF
   - **Paper size** → Custom — enter the *with-bleed* dimensions from the table above
   - **Margins** → None
   - **Scale** → 100%
   - **Background graphics** → ☑ (must be checked for card colors to appear)
   - Headers and footers → unchecked
6. Save as `card-01.pdf`, `card-02.pdf`, etc.
7. Repeat for each card.

### Option B — Automated script (requires Node.js)

```bash
npm install puppeteer          # one-time setup
node export-pdfs.js            # generates ./pdfs/card-01.pdf … card-04.pdf
```

The script (`export-pdfs.js`) expects the local server to be running on port 8743.
PDFs are saved to `./pdfs/`.

> **Color note:** browser-generated PDFs use the sRGB color space. If the printing
> house requires CMYK, open the PDFs in Adobe Acrobat and use
> *Edit → Convert Colors → Document Colors → CMYK* before sending.

### ⚠️ When to regenerate PDFs

Regenerate all four PDFs whenever you change:
- any **text** on a card (headings, body, details)
- **colors** (`colors` array in `data.js` or the CSS variables in `card*.css`)
- **dimensions** (`dims` in `data.js` or the `--trim-*` variables in `card*.css`)
- **fonts** (weights, sizes, or which font is used where)

Keep the exported PDFs next to the source:

```
pdfs/
  card-01.pdf    ← regenerate whenever design changes
  card-02.pdf
  card-03.pdf
  card-04.pdf
```

---

## File structure

```
index.html            shell — loads CSS and JS, provides <div id="app">
data.js               ALL content (text, specs, colors, fonts, notes)
app.js                renderer — builds UI from data.js
styles.css            shared chrome styles
card1.css             Card 01 layout and dimensions (110×155 mm)
card2.css             Card 02 layout and dimensions (80×135 mm)
card3.css             Card 03 layout and dimensions (80×120 mm)
card4.css             Card 04 layout and arch shape (80×105 mm)
export-pdfs.js        automated PDF export script (requires Node.js + puppeteer)
pdfs/                 exported PDFs for the printing house (git-ignored)
Invitation Standalone.html   original bundled file — kept as reference
```

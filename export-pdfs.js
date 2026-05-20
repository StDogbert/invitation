/**
 * export-pdfs.js — generates print-ready PDFs from the local dev server
 *
 * Requirements:
 *   node >= 18
 *   npm install puppeteer
 *
 * Usage:
 *   1. Start the local server:  python3 -m http.server 8743
 *   2. Run:                     node export-pdfs.js
 *
 * Output: ./pdfs/card-01.pdf … card-04.pdf
 * Each PDF is sized to the with-bleed dimensions (trim + 3 mm per side).
 *
 * ⚠️  Regenerate whenever text, colors, or dimensions change in data.js or card*.css
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:8743/index.html';

// With-bleed dimensions (trim + 3 mm on every side)
const CARDS = [
  { id: 'card1', file: 'card-01.pdf', bleedW: 116, bleedH: 161, label: 'Card 01 · Базовая' },
  { id: 'card2', file: 'card-02.pdf', bleedW:  86, bleedH: 141, label: 'Card 02 · Регистрация' },
  { id: 'card3', file: 'card-03.pdf', bleedW:  86, bleedH: 126, label: 'Card 03 · Ужин' },
  { id: 'card4', file: 'card-04.pdf', bleedW:  86, bleedH: 111, label: 'Card 04 · Ждем вас' },
];

async function exportPDFs() {
  const outDir = path.join(__dirname, 'pdfs');
  fs.mkdirSync(outDir, { recursive: true });

  console.log('Launching browser…');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  console.log(`Loading ${BASE_URL}…`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

  for (const card of CARDS) {
    // Switch to this card's tab
    await page.evaluate(id => {
      document.querySelector(`.tab-btn[data-card="${id}"]`).click();
    }, card.id);

    // Switch to "без меток" view (index 1 in toolbar) — clean, no crop marks
    await page.evaluate(id => {
      const section = document.getElementById(`${id}-section`);
      const btns = section.querySelectorAll('.toolbar button');
      btns.forEach(b => b.classList.remove('active'));
      btns[1].click();
    }, card.id);

    // Wait for any style transitions
    await new Promise(r => setTimeout(r, 300));

    const outPath = path.join(outDir, card.file);
    await page.pdf({
      path: outPath,
      width: `${card.bleedW}mm`,
      height: `${card.bleedH}mm`,
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });

    console.log(`  ✓  ${card.file}  (${card.bleedW} × ${card.bleedH} mm)  — ${card.label}`);
  }

  await browser.close();
  console.log(`\nDone. PDFs saved to ${outDir}`);
  console.log('\nNext steps for the printing house:');
  console.log('  · Verify dimensions and bleed in Acrobat or Affinity Publisher');
  console.log('  · Convert to CMYK if required by the print house');
  console.log('  · Confirm fonts are embedded (File → Properties → Fonts in Acrobat)');
}

exportPDFs().catch(err => {
  console.error('\nError:', err.message);
  console.error('Make sure the local server is running: python3 -m http.server 8743');
  process.exit(1);
});

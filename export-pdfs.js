/**
 * export-pdfs.js — generates print-ready PDFs from the local dev server
 *
 * Requirements:
 *   node >= 18
 *   npm install   (installs puppeteer)
 *
 * Usage:
 *   1. Start the local server:  python3 -m http.server 8743
 *   2. Run:                     node export-pdfs.js
 *
 * Output:
 *   pdfs/card-01.pdf … card-04.pdf         artwork at with-bleed dimensions
 *   pdfs/card-01-spec.pdf … card-04-spec.pdf  per-card technical spec sheet (A4 landscape)
 *   pdfs/specs.pdf                           combined 4-page spec sheet (A4 landscape)
 *
 * ⚠️  Regenerate whenever text, colors, or dimensions change in data.js or card*.css
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const BASE_URL  = 'http://localhost:8743/index.html';
const SPECS_URL = 'http://localhost:8743/specs.html';

// With-bleed dimensions (trim + 3 mm on every side)
const CARDS = [
  { id: 'card1', file: 'card-01.pdf', bleedW: 116, bleedH: 161, label: 'Card 01 · Базовая' },
  { id: 'card2', file: 'card-02.pdf', bleedW:  86, bleedH: 141, label: 'Card 02 · Регистрация' },
  { id: 'card3', file: 'card-03.pdf', bleedW:  86, bleedH: 126, label: 'Card 03 · Ужин' },
  { id: 'card4', file: 'card-04.pdf', bleedW:  86, bleedH: 111, label: 'Card 04 · Ждем вас' },
];

async function exportArtwork(browser, outDir) {
  const page = await browser.newPage();
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

  for (const card of CARDS) {
    await page.evaluate(id => {
      document.querySelector(`.tab-btn[data-card="${id}"]`).click();
    }, card.id);

    // Switch to "без меток" — clean artwork, no crop marks
    await page.evaluate(id => {
      const section = document.getElementById(`${id}-section`);
      const btns = section.querySelectorAll('.toolbar button');
      btns.forEach(b => b.classList.remove('active'));
      btns[1].click();
    }, card.id);

    await new Promise(r => setTimeout(r, 300));

    await page.pdf({
      path: path.join(outDir, card.file),
      width: `${card.bleedW}mm`,
      height: `${card.bleedH}mm`,
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });

    console.log(`  ✓  ${card.file}  (${card.bleedW} × ${card.bleedH} mm)  — ${card.label}`);
  }

  await page.close();
}

async function exportSpecs(browser, outDir) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  // Combined 4-page spec sheet
  await page.goto(SPECS_URL, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: path.join(outDir, 'specs.pdf'),
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: { top: '10mm', right: '15mm', bottom: '10mm', left: '15mm' },
  });
  console.log('  ✓  specs.pdf  (A4 landscape, 4 pages)');

  // Per-card spec sheets
  for (const card of CARDS) {
    await page.goto(`${SPECS_URL}?card=${card.id}`, { waitUntil: 'networkidle0' });
    const file = card.file.replace('.pdf', '-spec.pdf');
    await page.pdf({
      path: path.join(outDir, file),
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: '10mm', right: '15mm', bottom: '10mm', left: '15mm' },
    });
    console.log(`  ✓  ${file}  — ${card.label}`);
  }

  await page.close();
}

async function main() {
  const outDir = path.join(__dirname, 'pdfs');
  fs.mkdirSync(outDir, { recursive: true });

  console.log('Launching browser…');
  const browser = await puppeteer.launch({ headless: 'new' });

  console.log('\nArtwork PDFs:');
  await exportArtwork(browser, outDir);

  console.log('\nSpec sheet:');
  await exportSpecs(browser, outDir);

  await browser.close();
  console.log(`\nAll files saved to ${outDir}`);
}

main().catch(err => {
  console.error('\nError:', err.message);
  console.error('Make sure the local server is running: python3 -m http.server 8743');
  process.exit(1);
});

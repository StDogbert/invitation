/**
 * export-pdfs.js — generates print-ready PDFs from the local dev server
 *
 * Requirements:
 *   node >= 18
 *   npm install            (installs puppeteer)
 *   ghostscript (optional) for CMYK conversion: brew install ghostscript
 *
 * Usage:
 *   1. Start the local server:  python3 -m http.server 8743
 *   2. Run:                     npm run export
 *
 * Output:
 *   pdfs/card-01.pdf … card-04.pdf               artwork — CMYK if Ghostscript available, RGB otherwise
 *   pdfs/card-01-spec.pdf … card-04-spec.pdf      per-card technical spec sheet (A4 landscape, RGB)
 *
 * ⚠️  Regenerate whenever text, colors, or dimensions change in src/data.js or css/card*.css
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');

const BASE_URL  = 'http://localhost:8743/index.html';
const SPECS_URL = 'http://localhost:8743/specs.html';

function ghostscriptAvailable() {
  try {
    execFileSync('gs', ['--version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Converts a PDF in-place from RGB to CMYK using Ghostscript.
function convertToCmyk(filePath) {
  const tmp = filePath.replace('.pdf', '-rgb-tmp.pdf');
  fs.renameSync(filePath, tmp);
  try {
    execFileSync('gs', [
      '-dSAFER', '-dBATCH', '-dNOPAUSE', '-dQUIET',
      '-sDEVICE=pdfwrite',
      '-sColorConversionStrategy=CMYK',
      '-dProcessColorModel=/DeviceCMYK',
      '-dCompatibilityLevel=1.4',
      `-sOutputFile=${filePath}`,
      tmp,
    ]);
    fs.unlinkSync(tmp);
  } catch (err) {
    fs.renameSync(tmp, filePath); // restore original on failure
    throw err;
  }
}

// With-bleed dimensions (trim + 3 mm on every side)
const CARDS = [
  { id: 'card1', file: 'card-01.pdf', bleedW: 116, bleedH: 161, label: 'Card 01 · Базовая' },
  { id: 'card2', file: 'card-02.pdf', bleedW:  86, bleedH: 141, label: 'Card 02 · Регистрация' },
  { id: 'card3', file: 'card-03.pdf', bleedW:  86, bleedH: 126, label: 'Card 03 · Ужин' },
  { id: 'card4', file: 'card-04.pdf', bleedW:  86, bleedH: 111, label: 'Card 04 · Ждем вас' },
];

async function exportArtwork(browser, outDir, hasGs) {
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

    const outPath = path.join(outDir, card.file);
    await page.pdf({
      path: outPath,
      width: `${card.bleedW}mm`,
      height: `${card.bleedH}mm`,
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });

    if (hasGs) {
      convertToCmyk(outPath);
      console.log(`  ✓  ${card.file}  (${card.bleedW} × ${card.bleedH} mm)  CMYK  — ${card.label}`);
    } else {
      console.log(`  ✓  ${card.file}  (${card.bleedW} × ${card.bleedH} mm)  RGB   — ${card.label}`);
    }
  }

  await page.close();
}

async function exportSpecs(browser, outDir) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  // Use screen CSS so the sidebar (.side) is visible — print CSS hides it
  await page.emulateMediaType('screen');

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
  const outDir = path.join(__dirname, '..', 'pdfs');
  fs.mkdirSync(outDir, { recursive: true });

  const hasGs = ghostscriptAvailable();
  if (!hasGs) {
    console.warn('\n⚠️  Ghostscript not found — artwork PDFs will be RGB (not print-ready CMYK).');
    console.warn('   Install with: brew install ghostscript\n');
  }

  console.log('Launching browser…');
  const browser = await puppeteer.launch({ headless: 'new' });

  console.log('\nArtwork PDFs:');
  await exportArtwork(browser, outDir, hasGs);

  console.log('\nSpec sheets:');
  await exportSpecs(browser, outDir);

  await browser.close();
  console.log(`\nAll files saved to ${outDir}`);
}

main().catch(err => {
  console.error('\nError:', err.message);
  console.error('Make sure the local server is running: python3 -m http.server 8743');
  process.exit(1);
});

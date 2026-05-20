/**
 * app.js — renders all 4 cards from data.js, handles navigation & view modes
 * Wedding invitation · Александр & Ксения · 27.06.2026
 */

(function () {
  'use strict';

  const d = INVITATION_DATA;

  // ── Helpers ───────────────────────────────────────────────────
  function el(tag, attrs, ...children) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (k === 'cls') node.className = v;
        else if (k === 'html') node.innerHTML = v;
        else node.setAttribute(k, v);
      }
    }
    for (const child of children) {
      if (child == null) continue;
      node.append(typeof child === 'string' ? child : child);
    }
    return node;
  }

  // ── Crop marks HTML ───────────────────────────────────────────
  function cropMarks() {
    return `<div class="crop-marks">
      <span class="h tl-h"></span><span class="v tl-v"></span>
      <span class="h tr-h"></span><span class="v tr-v"></span>
      <span class="h bl-h"></span><span class="v bl-v"></span>
      <span class="h br-h"></span><span class="v br-v"></span>
    </div>`;
  }

  // ── Sidebar helpers ───────────────────────────────────────────
  function buildSpecs(card) {
    const items = card.specs.map(s =>
      `<dt>${s.label}</dt><dd>${s.value}</dd>`
    ).join('');
    return `<div class="panel">
      <h3>Технические характеристики</h3>
      <dl>${items}</dl>
    </div>`;
  }

  function buildColors(card) {
    const rows = card.colors.map(c => {
      const swatchStyle = c.hex === 'transparent'
        ? `background:transparent; border:${c.border || '1px solid rgba(0,0,0,.15)'};`
        : `background:${c.hex};`;
      const opacity = c.muted ? ' style="opacity:.55"' : '';
      const code = c.hex && c.hex !== 'transparent' ? ` <code>${c.hex}</code>` : '';
      return `<div class="row"${opacity}>
        <span class="swatch" style="${swatchStyle}"></span>
        ${c.name}${c.role ? ' · ' + c.role : ''}${code}
      </div>`;
    }).join('');
    const note = card.colorNote
      ? `<p style="font-size:10px;opacity:.7;margin-top:10px;line-height:1.5;">${card.colorNote}</p>`
      : '';
    return `<div class="panel">
      <h3>Цвета (для типографии)</h3>
      ${rows}
      ${note}
    </div>`;
  }

  function buildFonts(card) {
    const items = card.fonts.map(f => {
      const style = [
        `font-family:${f.family}`,
        f.size ? `font-size:${f.size}` : 'font-size:14px',
        'opacity:1',
        f.italic ? 'font-style:italic' : '',
      ].filter(Boolean).join(';');
      return `<dt style="${style}">${f.label}</dt><dd style="opacity:.6">${f.role}</dd>`;
    }).join('');
    const note = card.fontNote
      ? `<p style="font-size:10px;opacity:.6;margin-top:10px;line-height:1.5;">${card.fontNote}</p>`
      : '';
    return `<div class="panel">
      <h3>Шрифт${card.fonts.length > 1 ? 'ы' : ''}</h3>
      <dl>${items}</dl>
      ${note}
    </div>`;
  }

  function buildNotes(card) {
    const paragraphs = card.notes.map(n => {
      if (n === '<hr>') return `<hr>`;
      return `<p>${n}</p>`;
    }).join('');
    return `<div class="notes">${paragraphs}</div>`;
  }

  // ── Details list helper (cards 2, 3) ──────────────────────────
  function detailRows(details) {
    return details.map(d => {
      const em = d.descEm ? ` <em>${d.descEm}</em>` : '';
      return `<dt>${d.term}</dt><dd>${d.desc}${em}</dd>`;
    }).join('');
  }

  // ── Legend ────────────────────────────────────────────────────
  function legendStandard() {
    return `<div class="legend">
      <span class="l-bleed"><i></i>Линия вылета (+3&nbsp;мм)</span>
      <span class="l-trim"><i></i>Линия реза</span>
      <span class="l-safe"><i></i>Безопасная зона (−5&nbsp;мм)</span>
    </div>`;
  }

  function legendCard4() {
    return `<div class="legend">
      <span class="l-bleed"><i></i>Линия вылета (+3&nbsp;мм)</span>
      <span class="l-trim"><i></i>Линия плоттерной резки</span>
      <span class="l-bbox"><i></i>Габаритная рамка</span>
    </div>`;
  }

  // ── Paperclip SVG ─────────────────────────────────────────────
  function paperclipSVG() {
    return `<svg class="paperclip" viewBox="0 0 40 110" fill="none" stroke="#7a6a55" stroke-width="2.5">
      <path d="M 14 8 L 14 92 Q 14 102 22 102 Q 30 102 30 92 L 30 22 Q 30 14 23 14 Q 18 14 18 22 L 18 86" stroke-linecap="round"></path>
    </svg>`;
  }

  // ── Card 01 ───────────────────────────────────────────────────
  function buildCard1() {
    const card = d.cards[0];
    const coupleNames = `<span class="name-1">${d.couple.name1}</span>
      <span class="amp">&amp;</span>
      <span class="name-2">${d.couple.name2}</span>`;
    const dateNums = d.couple.dateShort.map(n => `<span class="num">${n}</span>`).join('\n');

    const cardHTML = `
      <div class="card-clip">
        <div class="card">
          <div class="card-inner">
            <aside class="date-col" aria-label="Дата">${dateNums}</aside>
            <p class="invite-text">${card.inviteText.replace('\n', '\n              ')}</p>
            <h2 class="names">${coupleNames}</h2>
          </div>
        </div>
      </div>`;

    const stackHTML = `
      <div class="stack-stage">
        <div class="stack">
          <div class="ghost g4"></div>
          <div class="ghost g3"></div>
          <div class="ghost g2"></div>
          <div class="stack-mini-card">
            <div class="card-inner">
              <aside class="date-col">${dateNums}</aside>
              <p class="invite-text">${card.inviteText.replace('\n', '<br>')}</p>
              <h2 class="names">${coupleNames}</h2>
            </div>
          </div>
          ${paperclipSVG()}
        </div>
        <p style="text-align:center;margin-top:20px;font-size:11px;opacity:.6;letter-spacing:0.1em;text-transform:uppercase;">
          ${card.stackCaption}
        </p>
      </div>`;

    const sidebar = buildSpecs(card) + buildColors(card) + buildFonts(card) + buildNotes(card);

    return { cardInner: cardHTML, stack: stackHTML, sidebar, legend: legendStandard() };
  }

  // ── Card 02 ───────────────────────────────────────────────────
  function buildCard2() {
    const card = d.cards[1];
    const details = detailRows(card.details);
    const cardContent = `
      <div class="card-clip">
        <div class="card">
          <div class="card-inner">
            <h2 class="c2-head"><span class="line">${card.heading}</span></h2>
            <div class="c2-content">
              <p class="c2-body">${card.body.replace('\n', '<br>')}</p>
              <dl class="c2-details">${details}</dl>
            </div>
          </div>
        </div>
      </div>`;

    const dateNums = d.couple.dateShort.map(n => `<span>${n}</span>`).join('');
    const stackHTML = `
      <div class="stack-stage">
        <div class="stack">
          <div class="stack-c1">
            <div class="inner">
              <div class="s-names">
                <span class="s-name">${d.couple.name1}</span>
                <span class="s-amp">&amp;</span>
                <span class="s-name">${d.couple.name2}</span>
              </div>
              <div class="s-date">${dateNums}</div>
            </div>
          </div>
          <div class="stack-c2">
            <div class="card-inner">
              <h2 class="c2-head"><span class="line">${card.heading}</span></h2>
              <div class="c2-content">
                <p class="c2-body">${card.body.replace('\n', '<br>')}</p>
                <dl class="c2-details">${details}</dl>
              </div>
            </div>
          </div>
          ${paperclipSVG()}
        </div>
        <p class="stack-caption">${card.stackCaption}</p>
      </div>`;

    const sidebar = buildSpecs(card) + buildColors(card) + buildFonts(card) + buildNotes(card);

    return { cardInner: cardContent, stack: stackHTML, sidebar, legend: legendStandard() };
  }

  // ── Card 03 ───────────────────────────────────────────────────
  function buildCard3() {
    const card = d.cards[2];
    const details = detailRows(card.details);
    const card2 = d.cards[1];
    const card2Details = detailRows(card2.details);

    const cardContent = `
      <div class="card-clip">
        <div class="card">
          <div class="card-inner">
            <h2 class="c3-head"><span class="line">${card.heading}</span></h2>
            <div class="c3-content">
              <p class="c3-body">${card.body}</p>
              <dl class="c3-details">${details}</dl>
            </div>
          </div>
        </div>
      </div>`;

    const dateNums = d.couple.dateShort.map(n => `<span>${n}</span>`).join('');
    const stackHTML = `
      <div class="stack-stage">
        <div class="stack">
          <div class="stack-c1">
            <div class="inner">
              <div class="s-names">
                <span class="s-name">${d.couple.name1}</span>
                <span class="s-amp">&amp;</span>
                <span class="s-name">${d.couple.name2}</span>
              </div>
              <div class="s-date">${dateNums}</div>
            </div>
          </div>
          <div class="stack-c2">
            <div class="inner">
              <h2 class="c2-head"><span>${card2.heading}</span></h2>
            </div>
          </div>
          <div class="stack-c3">
            <div class="card-inner">
              <h2 class="c3-head"><span class="line">${card.heading}</span></h2>
              <div class="c3-content">
                <p class="c3-body">${card.body}</p>
                <dl class="c3-details">${details}</dl>
              </div>
            </div>
          </div>
          ${paperclipSVG()}
        </div>
        <p class="stack-caption">${card.stackCaption}</p>
      </div>`;

    const sidebar = buildSpecs(card) + buildColors(card) + buildFonts(card) + buildNotes(card);

    return { cardInner: cardContent, stack: stackHTML, sidebar, legend: legendStandard() };
  }

  // ── Card 04 ───────────────────────────────────────────────────
  function buildCard4() {
    const card = d.cards[3];
    const card2 = d.cards[1];
    const card3 = d.cards[2];
    const card2Details = detailRows(card2.details);
    const card3Details = detailRows(card3.details);

    const cardContent = `
      <span class="bbox"></span>
      <svg class="card-svg" viewBox="0 0 80 105" preserveAspectRatio="none">
        <defs>
          <path id="c4-arch-path" d="M 8 40 A 32 32 0 0 1 72 40"/>
        </defs>
        <path class="cut"       d="M 0 105 L 0 40 A 40 40 0 0 1 80 40 L 80 105 Z"></path>
        <path class="cut-line"  d="M 0 105 L 0 40 A 40 40 0 0 1 80 40 L 80 105 Z"></path>
        <path class="bleed-line" d="M -3 108 L -3 40 A 43 43 0 0 1 83 40 L 83 108 Z"></path>
        <text class="l-slove" text-anchor="middle">
          <textPath href="#c4-arch-path" startOffset="50%">${card.textLine1}</textPath>
        </text>
      </svg>
      <p class="card-text">
        <span class="l-initials">${card.textLine2}</span>
      </p>`;

    const dateNums = d.couple.dateShort.map(n => `<span>${n}</span>`).join('');
    const stackHTML = `
      <div class="stack-stage">
        <div class="stack">
          <div class="stack-c1">
            <div class="inner">
              <div class="s-names">
                <span class="s-name">${d.couple.name1}</span>
                <span class="s-amp">&amp;</span>
                <span class="s-name">${d.couple.name2}</span>
              </div>
              <div class="s-date">${dateNums}</div>
            </div>
          </div>
          <div class="stack-c2">
            <div class="inner">
              <h2 class="c2-head">${card2.heading}</h2>
              <div class="c2-content">
                <p class="c2-body">${card2.body.replace('\n', '<br>')}</p>
                <dl class="c2-details">${card2Details}</dl>
              </div>
            </div>
          </div>
          <div class="stack-c3">
            <div class="inner">
              <h2 class="c3-head">${card3.heading}</h2>
              <div class="c3-content">
                <p class="c3-body">${card3.body}</p>
                <dl class="c3-details">${card3Details}</dl>
              </div>
            </div>
          </div>
          <div class="stack-c4">
            <svg viewBox="0 0 80 105" preserveAspectRatio="none">
              <path fill="#F86D68" d="M 0 105 L 0 40 A 40 40 0 0 1 80 40 L 80 105 Z"></path>
            </svg>
            <p class="c4-text">
              <span class="l-slove">${card.textLine1}</span>
              <span class="l-initials">${card.textLine2}</span>
            </p>
          </div>
          ${paperclipSVG()}
        </div>
        <p class="stack-caption">${card.stackCaption}</p>
      </div>`;

    const sidebar = buildSpecs(card) + buildColors(card) + buildFonts(card) + buildNotes(card);

    return { cardInner: cardContent, stack: stackHTML, sidebar, legend: legendCard4() };
  }

  // ── Build page header HTML for a card ────────────────────────
  function buildHeaderHTML(card) {
    const metaHTML = card.meta.map(m =>
      `<div><b>${m.label}</b><span>${m.value}</span></div>`
    ).join('');
    return `
      <div>
        <h1>Приглашение · Карточка ${card.num}</h1>
        <div class="subtitle">${card.subtitle}</div>
      </div>
      <div class="meta">${metaHTML}</div>`;
  }

  // ── Build a section for one card ─────────────────────────────
  function buildSection(card, content, cardIdx) {
    const toolbarBtns = card.toolbarLabels.map((label, i) =>
      `<button data-view="${['marks', 'clean', 'stack'][i]}"${i === 0 ? ' class="active"' : ''}>${label}</button>`
    ).join('');

    // Card frame safe-mark: not for card4 (uses SVG bbox instead)
    const safeMarkHTML = cardIdx < 3 ? '<span class="safe-mark"></span>' : '';
    const cropMarksHTML = cardIdx < 3 ? cropMarks() : '';

    return `
    <section id="${card.id}-section" class="card-section" style="display:none">

      <div class="workspace">
        <section class="stage" id="${card.id}-stage">
          <span class="stage-label">Превью · 1:1 · мм</span>

          <div class="toolbar">
            ${toolbarBtns}
          </div>

          <div class="card-frame show-marks" id="${card.id}-frame">
            ${cropMarksHTML}
            ${safeMarkHTML}
            ${content.cardInner}
          </div>

          ${content.stack}

          ${content.legend}
        </section>

        <aside class="side">
          ${content.sidebar}
        </aside>
      </div>

    </section>`;
  }

  // ── Main render ───────────────────────────────────────────────
  function render() {
    const app = document.getElementById('app');
    if (!app) return;

    // Dynamic page header (above tabs, updated on card switch)
    const headerEl = document.createElement('header');
    headerEl.className = 'app-head';
    headerEl.innerHTML = buildHeaderHTML(d.cards[0]);
    app.appendChild(headerEl);

    // Build tabs
    const tabsHTML = d.cards.map((card, i) =>
      `<button class="tab-btn${i === 0 ? ' tab-active' : ''}" data-card="${card.id}">${card.title}</button>`
    ).join('');

    const tabsEl = document.createElement('nav');
    tabsEl.className = 'tabs';
    tabsEl.innerHTML = tabsHTML;
    app.appendChild(tabsEl);

    // Build card sections
    const builders = [buildCard1, buildCard2, buildCard3, buildCard4];
    d.cards.forEach((card, i) => {
      const content = builders[i]();
      const sectionWrapper = document.createElement('div');
      sectionWrapper.innerHTML = buildSection(card, content, i);
      const section = sectionWrapper.firstElementChild;
      card.fonts.forEach(f => { if (f.cssVar) section.style.setProperty(f.cssVar, f.family); });
      if (i === 0) section.style.display = '';  // show first card
      app.appendChild(section);
    });

    // ── Navigation ─────────────────────────────────────────────
    function showCard(cardId) {
      document.querySelectorAll('.card-section').forEach(s => s.style.display = 'none');
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('tab-active'));

      const section = document.getElementById(cardId + '-section');
      if (section) section.style.display = '';

      const btn = document.querySelector(`.tab-btn[data-card="${cardId}"]`);
      if (btn) btn.classList.add('tab-active');

      const card = d.cards.find(c => c.id === cardId);
      if (card) headerEl.innerHTML = buildHeaderHTML(card);
    }

    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => showCard(btn.dataset.card));
    });

    // ── Toolbar view-mode toggle ────────────────────────────────
    document.querySelectorAll('.card-section').forEach(section => {
      const stage = section.querySelector('.stage');
      const frame = section.querySelector('.card-frame');

      section.querySelectorAll('.toolbar button').forEach(btn => {
        btn.addEventListener('click', () => {
          section.querySelectorAll('.toolbar button').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const v = btn.dataset.view;
          stage.classList.toggle('show-stack', v === 'stack');
          frame.classList.toggle('show-marks', v === 'marks');
        });
      });
    });
  }

  // ── Boot ──────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }

})();

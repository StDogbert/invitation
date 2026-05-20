/**
 * data.js — single source of truth for all wedding invitation content
 * Александр & Ксения · 27.06.2026
 *
 * ⚠️  After changing any text, color, or dimension here, regenerate the print PDFs:
 *       node export-pdfs.js   (server must be running on port 8743)
 *     or follow the manual Chrome export steps in README.md.
 */

const INVITATION_DATA = {

  // ── Couple & date ──────────────────────────────────────────────
  couple: {
    name1: 'Александр',
    name2: 'Ксения',
    date: '27.06.2026',
    dateShort: ['27', '06', '26'],
  },

  // ── Global palette ─────────────────────────────────────────────
  palette: {
    tomato:  '#C42B34',
    orange:  '#FC8A2D',
    blush:   '#DC4F7C',
    vanilla: '#FCE9AB',
    baby:    '#F7D4D8',
    bubblegum: '#F691A9',
    coral:   '#F86D68',
    olive:   '#9E9820',
    ink:     '#1a1612',
    paper:   '#f1ebe2',
    line:    '#d8cdbb',
  },

  // ── Cards ──────────────────────────────────────────────────────
  cards: [

    // ── Card 01 ──────────────────────────────────────────────────
    {
      id: 'card1',
      num: '01',
      title: 'Карточка 01 · Базовая',
      subtitle: 'Базовая (нижняя) карточка многослойного приглашения · Александр & Ксения · 27.06.2026',

      cardBg:     '#F7D4D8',
      cardInk:    '#C42B34',
      cardRadius: '6mm',

      dims: {
        trimW: '110mm',
        trimH: '155mm',
        bleed: '3mm',
        safe:  '5mm',
      },

      meta: [
        { label: 'Формат конверта', value: 'C6 · 114×162 мм' },
        { label: 'Карточка',        value: '110×155 мм'      },
        { label: 'С вылетами',      value: '116×161 мм'      },
        { label: 'Версия',          value: 'v1.0'                 },
      ],

      specs: [
        { label: 'Финальный размер',       value: '110 × 155 мм'        },
        { label: 'С вылетами',             value: '116 × 161 мм'        },
        { label: 'Вылет (bleed)',           value: '3 мм'                },
        { label: 'Безопасная зона',        value: '5 мм'                },
        { label: 'Конверт',                value: 'C6 (114×162)'             },
        { label: 'Ориентация',             value: 'портрет'                  },
        { label: 'Рекомендуемая бумага',   value: 'дизайнерская, 300–350 г/м²' },
        { label: 'Цветовой режим',         value: 'CMYK / Pantone'           },
        { label: 'Разрешение',             value: '300 dpi'             },
      ],

      colors: [
        { hex: '#FCE9AB', name: 'Vanilla Custard',   role: 'фон'   },
        { hex: '#FC8A2D', name: 'Princeton Orange',  role: 'текст' },
        { hex: '#C42B34', name: 'Tomato Jam',        role: '',  muted: true },
        { hex: '#DC4F7C', name: 'Blush Rose',        role: '',  muted: true },
      ],

      fonts: [
        { family: "'Bodoni Moda', serif",           cssVar: '--font-display',  label: 'Bodoni Moda',         role: 'имена, дата'       },
        { family: "'Cormorant Garamond', serif",    cssVar: '--font-body',     label: 'Cormorant Garamond',  role: 'основной текст'    },
      ],

      fontNote: 'Перед отправкой в печать шрифты должны быть переведены в кривые.',

      notes: [
        '<b>Размещение на карточке 01:</b>',
        '↑ Сверху по центру — имена «АЛЕКСАНДР &amp; КСЕНИЯ» в одну строку.',
        '↙ Левый нижний угол — дата столбиком <b>27 / 06 / 26</b>.',
        '→ Ниже середины, справа — текст приглашения по центру.',
        '<hr>',
        '<b>Дальше:</b> 2-я карточка — прямоугольник поменьше со скруглением справа.',
      ],

      toolbarLabels: ['с метками реза', 'без меток', 'в стопке'],

      // Card-specific content
      inviteText: 'Приглашаем вас разделить с нами день нашей свадьбы.\nБудем счастливы отметить его в кругу самых близких.',

      stackCaption: 'Превью стопки · скрепка справа · видна верхняя кромка + левая колонка с датой',
    },

    // ── Card 02 ──────────────────────────────────────────────────
    {
      id: 'card2',
      num: '02',
      title: 'Карточка 02 · Регистрация',
      subtitle: 'Информационная карточка — регистрация · Александр & Ксения',

      cardBg:     '#F691A9',
      cardInk:    '#FCE9AB',
      cardRadius: '6mm',

      dims: {
        trimW: '80mm',
        trimH: '135mm',
        bleed: '3mm',
        safe:  '5mm',
      },

      meta: [
        { label: 'Карточка',    value: '80 × 135 мм' },
        { label: 'С вылетами',  value: '86 × 141 мм' },
        { label: 'Скругление',  value: 'R 6 мм'      },
        { label: 'Версия',      value: 'v1.0'             },
      ],

      specs: [
        { label: 'Финальный размер',    value: '80 × 135 мм'           },
        { label: 'С вылетами',          value: '86 × 141 мм'           },
        { label: 'Вылет (bleed)',        value: '3 мм'                  },
        { label: 'Безопасная зона',     value: '5 мм'                  },
        { label: 'Скругление углов',    value: 'R 6 мм (×4)'      },
        { label: 'Ориентация',          value: 'портрет'                    },
        { label: 'Бумага',              value: 'дизайнерская, 300–350 г/м²' },
        { label: 'Цветовой режим',      value: 'CMYK / Pantone'             },
        { label: 'Разрешение',          value: '300 dpi'               },
      ],

      colors: [
        { hex: '#F691A9', name: 'Bubblegum',       role: 'фон'   },
        { hex: '#FCE9AB', name: 'Vanilla Custard', role: 'текст' },
      ],

      fonts: [
        { family: "'Bodoni Moda', serif",           cssVar: '--font-display',  label: 'Bodoni Moda',         role: 'заголовок'        },
        { family: "'Cormorant Garamond', serif",    cssVar: '--font-body',     label: 'Cormorant Garamond',  role: 'текст, реквизиты' },
        { family: "'JetBrains Mono', monospace",    label: 'JetBrains Mono',      role: 'лейблы',  size: '11px' },
      ],

      fontNote: 'Перед отправкой в печать шрифты должны быть переведены в кривые.',

      notes: [
        '<b>Карточка 02 — регистрация:</b>',
        '↑ Сверху — заголовок «Регистрация» в одну строку.',
        '· Под ним — текст приглашения по центру.',
        '↓ Снизу — реквизиты: время, локация, адрес.',
        '<hr>',
        '<b>В стопке:</b> размещается на карточке 01 правым и нижним краем заподлицо. Левая полоса (≈30 мм) и верхняя (≈55 мм) карточки 01 остаются открыты — там видны имена и дата.',
      ],

      toolbarLabels: ['с метками реза', 'без меток', 'в стопке с 01'],

      // Card-specific content
      heading: 'Регистрация',
      body: 'Ждём вас на нашей торжественной регистрации.\nБудем счастливы видеть ваши улыбки и поддержку в этот важный миг!',
      details: [
        { term: 'Время',    desc: '12:00' },
        { term: 'Локация',  desc: 'ЗАГС', descEm: '(Sala de solimnitați)' },
        { term: 'Адрес',    desc: 'ул. Дечебал, 6' },
      ],

      stackCaption: 'Карта 02 на карте 01 · правый край заподлицо · видны имена сверху и дата слева',
    },

    // ── Card 03 ──────────────────────────────────────────────────
    {
      id: 'card3',
      num: '03',
      title: 'Карточка 03 · Ужин',
      subtitle: 'Праздничный ужин · Александр & Ксения',

      cardBg:     '#FC8A2D',
      cardInk:    '#FCE9AB',
      cardRadius: '6mm',

      dims: {
        trimW: '80mm',
        trimH: '120mm',
        bleed: '3mm',
        safe:  '5mm',
      },

      meta: [
        { label: 'Карточка',    value: '80 × 120 мм' },
        { label: 'С вылетами',  value: '86 × 126 мм' },
        { label: 'Скругление',  value: 'R 6 мм'      },
        { label: 'Версия',      value: 'v1.0'             },
      ],

      specs: [
        { label: 'Финальный размер',    value: '80 × 120 мм'           },
        { label: 'С вылетами',          value: '86 × 126 мм'           },
        { label: 'Вылет (bleed)',        value: '3 мм'                  },
        { label: 'Безопасная зона',     value: '5 мм'                  },
        { label: 'Скругление углов',    value: 'R 6 мм (×4)'      },
        { label: 'Ориентация',          value: 'портрет'                    },
        { label: 'Бумага',              value: 'дизайнерская, 300–350 г/м²' },
        { label: 'Цветовой режим',      value: 'CMYK / Pantone'             },
        { label: 'Разрешение',          value: '300 dpi'               },
      ],

      colors: [
        { hex: '#FC8A2D', name: 'Princeton Orange', role: 'фон'   },
        { hex: '#FCE9AB', name: 'Vanilla Custard',  role: 'текст' },
      ],

      colorNote: 'Контраст ≈3.0:1 — хорошо для заголовка и крупного текста.',

      fonts: [
        { family: "'Bodoni Moda', serif",           cssVar: '--font-display',  label: 'Bodoni Moda',         role: 'заголовок'        },
        { family: "'Cormorant Garamond', serif",    cssVar: '--font-body',     label: 'Cormorant Garamond',  role: 'текст, реквизиты' },
        { family: "'JetBrains Mono', monospace",    label: 'JetBrains Mono',      role: 'лейблы',  size: '11px' },
      ],

      notes: [
        '<b>Карточка 03 — праздничный ужин:</b>',
        '↑ Сверху — заголовок «Ужин» в одну строку.',
        '· Под ним — текст приглашения по центру.',
        '↓ Снизу — реквизиты: время, локация, адрес.',
        '<hr>',
        'В стопке: ложится поверх К-02, правый и нижний край заподлицо. Заголовок К-02 («Регистрация») остаётся виден сверху.',
      ],

      toolbarLabels: ['с метками реза', 'без меток', 'в стопке'],

      // Card-specific content
      heading: 'Ужин',
      body: 'После регистрации продолжим праздник за общим столом — в тёплой и весёлой компании!',
      details: [
        { term: 'Время',    desc: '17:00' },
        { term: 'Локация',  desc: 'Ресторан', descEm: 'Baf bulvar' },
        { term: 'Адрес',    desc: 'Bd. Traian, 25' },
      ],

      stackCaption: 'К-03 поверх К-02 · правый край заподлицо · виден заголовок К-02 сверху',
    },

    // ── Card 04 ──────────────────────────────────────────────────
    {
      id: 'card4',
      num: '04',
      title: 'Карточка 04 · Ждем вас',
      subtitle: 'Лицевая карточка · полукруг сверху · «Ждем вас»',

      cardBg:  '#F86D68',
      cardInk: '#FCE9AB',

      dims: {
        trimW: '80mm',
        trimH: '105mm',
        bleed: '3mm',
        safe:  '5mm',
      },

      meta: [
        { label: 'Габарит',     value: '80 × 105 мм'    },
        { label: 'С вылетами',  value: '86 × 111 мм'    },
        { label: 'Форма',       value: 'Арочный медальон'    },
        { label: 'Резка',       value: 'плоттер по контуру' },
      ],

      specs: [
        { label: 'Габарит',             value: '80 × 105 мм'           },
        { label: 'С вылетами',          value: '86 × 111 мм'           },
        { label: 'Вылет (bleed)',        value: '3 мм по контуру'  },
        { label: 'Безопасная зона',     value: '5 мм от реза'     },
        { label: 'Резка',               value: 'плоттер по контуру'    },
        { label: 'Форма',               value: 'арочный медальон — полукруг сверху, прямые стороны и низ' },
        { label: 'Радиус арки',         value: 'R = 40 мм (= ½ ширины, полукруг)' },
        { label: 'Прямой участок',      value: 'h = 65 мм (нижняя часть)' },
        { label: 'Бумага',              value: '300–350 г/м²'          },
        { label: 'Цветовой режим',      value: 'CMYK / Pantone'             },
        { label: 'Разрешение',          value: '300 dpi'               },
      ],

      colors: [
        { hex: '#F86D68', name: 'Coral / Fuchsia',  role: 'фон'   },
        { hex: 'transparent', name: 'Pantone 15-0343 TCX', role: '', border: '1px solid #999' },
        { hex: '#FCE9AB', name: 'Vanilla Custard',  role: 'текст' },
      ],

      colorNote: 'Контраст ≈2.1:1 — приемлемо для крупного декоративного текста. Ваниль перекликается с К-02 и К-03.',

      fonts: [
        { family: "'Bodoni Moda', serif", cssVar: '--font-display', label: 'Bodoni Moda', role: '«Ждем вас» italic', size: '18px', italic: true },
      ],

      notes: [
        '<b>Карточка 04 — полукруг (лицо):</b>',
        '· 80 × 105 мм — те же габариты, что у К-02 и К-03.',
        '· Гладкая дуга полукруга сверху, прямой низ — плоттер режет по этому контуру.',
        '· Нижний край выравнивается с нижним краем карточки 01.',
        '<hr>',
        '<b>В стопке:</b> сверху, лицевая. Дуга полукруга образует органичный силуэт на фоне прямоугольных карточек снизу.',
      ],

      toolbarLabels: ['с контуром реза', 'без меток', 'вся стопка'],

      // Card-specific content
      textLine1: 'ждем',
      textLine2: 'вас',

      stackCaption: 'Полная стопка · К-04 (арка) сверху, прикрывает низ К-03 / К-02 / К-01 · видна верхняя часть даты',
    },

  ],

};

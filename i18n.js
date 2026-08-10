/* ═══════════════════════════════════════════════════════════════
   ARABIC / ENGLISH TOGGLE
   ───────────────────────────────────────────────────────────────
   Arabic is the invitation's home language; English is a guest
   layer. Every visible string lives in DICT as an { ar, en } pair
   keyed by selector (+ optional index); MSG mirrors the runtime
   strings in script.js. The choice is remembered per device.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var CAL_ICO =
    '<svg class="btn-ico" viewBox="0 0 24 24" aria-hidden="true">' +
    '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>';
  var PIN_ICO =
    '<svg class="btn-ico" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>';
  var SHARE_ICO =
    '<svg class="btn-ico" viewBox="0 0 24 24" aria-hidden="true">' +
    '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>' +
    '<path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>';

  /* s: selector · i: which match · en/ar: innerHTML · attr: attribute */
  var DICT = [
    /* envelope */
    { s: '#introHint', ar: 'اضغط الختم لفتح الدعوة', en: 'Tap the seal to open' },
    { s: '#envSeal', attr: 'aria-label', ar: 'اضغط الختم لفتح الدعوة', en: 'Tap the seal to open the invitation' },
    { s: '.ec-kicker', ar: 'حفل تخرّج', en: 'Graduation Ceremony' },
    { s: '.ec-name', ar: 'محمّد', en: 'Mohammad' },
    { s: '.ec-sub', ar: 'عبدالله الرمحي', en: 'Abdullah Al-Ramhi' },
    { s: '#musicBtn', attr: 'aria-label', ar: 'الموسيقى', en: 'Music' },

    /* hero */
    { s: '.hero .verse', i: 0, ar: 'أشرق هذا اليوم بالبشرى<br>الحمدلله على تباشير الأفراح', en: 'The day has dawned with joyful news —<br>praise be to God for these glad tidings' },
    { s: '.hero .verse', i: 1, ar: 'الحمدلله الذي بلّغني نجاح ابني<br>وقرّة عيني بالتوجيهي', en: 'Praise be to God, who blessed my son,<br>the light of my eyes, with success in Tawjihi' },
    { s: '.name', ar: 'محمّد', en: 'Mohammad' },
    { s: '.family', ar: 'عبدالله الرمحي', en: 'Abdullah Al-Ramhi' },
    { s: '.grade', ar: 'بمعدل <b>92.80%</b>', en: 'With an average of <b>92.80%</b>' },
    { s: '.honour', ar: 'يشرّفنا حضوركم ومشاركتنا فرحة التخرّج', en: 'We would be honoured by your presence at the graduation celebration' },
    { s: '.cue-label', ar: 'التفاصيل', en: 'Details' },
    { s: '.scroll-cue', attr: 'aria-label', ar: 'التفاصيل', en: 'Details' },

    /* when & where */
    { s: '#details-h', ar: 'الموعد والمكان', en: 'When &amp; Where' },
    { s: '.detail-grid .d-card:nth-child(1) .d-label', ar: 'التاريخ', en: 'Date' },
    { s: '.detail-grid .d-card:nth-child(1) .d-title', ar: 'الأربعاء<br>12 آب 2026', en: 'Wednesday<br>12 August 2026' },
    { s: '.detail-grid .d-card:nth-child(1) .d-text', ar: 'الساعة 8:00 مساءً', en: 'At 8:00 in the evening' },
    { s: '.detail-grid .d-card:nth-child(2) .d-label', ar: 'المكان', en: 'Venue' },
    { s: '.detail-grid .d-card:nth-child(2) .d-title', ar: 'ديوان<br>أبناء الشمال', en: 'Abnaa Al-Shamal<br>Diwan' },
    { s: '.detail-grid .d-card:nth-child(2) .d-text', ar: 'طبربور، عمّان', en: 'Tabarbour, Amman' },

    /* the evening */
    { s: '#run-h', ar: 'برنامج السهرة', en: 'The Evening' },
    { s: '.run .section-lede', ar: 'بإذن الله يبدأ الحفل على فترتين', en: 'God willing, the celebration unfolds in two parts' },
    { s: '.run-list .run-item:nth-child(1) .run-title', ar: 'استقبال السيدات', en: "Ladies' reception" },
    { s: '.run-list .run-item:nth-child(1) .run-text', ar: 'الفترة الأولى للنساء فقط.', en: 'The first hour is for women only.' },
    { s: '.run-list .run-item:nth-child(2) .run-title', ar: 'دخول الخريج بالزفّة', en: "The graduate's procession" },
    { s: '.run-list .run-item:nth-child(2) .run-text', ar: 'يدخل الخريج بالزفّة مع الشباب بإذن الله. 💐', en: 'The graduate enters in a zaffa with the young men, God willing. 💐' },

    /* countdown */
    { s: '#count-h', ar: 'باقي على الحفل', en: 'Counting down to the celebration' },
    { s: '.cd-unit:nth-child(1) small', ar: 'يوم', en: 'days' },
    { s: '.cd-unit:nth-child(2) small', ar: 'ساعة', en: 'hours' },
    { s: '.cd-unit:nth-child(3) small', ar: 'دقيقة', en: 'min' },
    { s: '.cd-unit:nth-child(4) small', ar: 'ثانية', en: 'sec' },
    { s: '#calBtn', ar: CAL_ICO + ' أضف الموعد للتقويم', en: CAL_ICO + ' Add to calendar' },
    { s: '#calGoogle', ar: 'تقويم جوجل', en: 'Google Calendar' },
    { s: '#calOutlook', ar: 'أوتلوك', en: 'Outlook' },
    { s: '#calApple', ar: 'آبل / iCal', en: 'Apple / iCal' },

    /* venue */
    { s: '#venue-h', ar: 'كيف تصلون', en: 'Getting there' },
    { s: '.v-name', ar: 'ديوان أبناء الشمال', en: 'Abnaa Al-Shamal Diwan' },
    { s: '.v-addr', ar: 'طبربور — عمّان، الأردن', en: 'Tabarbour — Amman, Jordan' },
    { s: '.v-actions .btn-solid', ar: PIN_ICO + ' افتح الموقع على الخريطة', en: PIN_ICO + ' Open in Google Maps' },

    /* share */
    { s: '#share-h', ar: 'شاركوا الدعوة', en: 'Share the invitation' },
    { s: '.share-panel .section-lede', ar: 'أرسلوا الرابط لمن تحبّون حضورهم.', en: "Send the link to everyone you'd love to see there." },
    { s: '#shareBtn', ar: SHARE_ICO + ' مشاركة الدعوة', en: SHARE_ICO + ' Share' },
    { s: '#copyBtn', ar: 'نسخ الرابط', en: 'Copy link' },

    /* footer + sticky */
    { s: '.foot-line', ar: 'بحضوركم تكتمل فرحتنا', en: 'Your presence completes our joy' },
    { s: '#stickyCta .btn', ar: 'الموقع على الخريطة', en: 'Map & directions' },
  ];

  var MSG_AR = Object.assign({}, window.MSG);
  var MSG_EN = {
    live    : 'The celebration is underway',
    thanks  : 'Thank you for sharing our joy',
    copied  : 'Link copied ✓',
    copyFail: 'Copy failed — use the address bar instead.',
    shareText: 'You are invited — the graduation of Mohammad Abdullah Al-Ramhi, Wednesday 12 August 2026, Abnaa Al-Shamal Diwan, Tabarbour.',
  };

  var TITLE = {
    ar: 'دعوة تخرّج محمد عبدالله الرمحي',
    en: 'Graduation of Mohammad Abdullah Al-Ramhi',
  };

  var btn = document.getElementById('langBtn');

  function pick(item){
    var els = document.querySelectorAll(item.s);
    return els[item.i || 0] || null;
  }

  function apply(lang){
    var root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = TITLE[lang];

    DICT.forEach(function (item) {
      var el = pick(item);
      if (!el) return;
      if (item.attr) el.setAttribute(item.attr, item[lang]);
      else el.innerHTML = item[lang];
    });

    Object.assign(window.MSG, lang === 'ar' ? MSG_AR : MSG_EN);

    btn.textContent = lang === 'ar' ? 'EN' : 'ع';
    btn.setAttribute('lang', lang === 'ar' ? 'en' : 'ar');
    btn.setAttribute('aria-label', lang === 'ar' ? 'English' : 'العربية');

    try { localStorage.setItem('ramahi-lang', lang); } catch (e) {}
  }

  btn.addEventListener('click', function () {
    apply(document.documentElement.lang === 'ar' ? 'en' : 'ar');
  });

  var saved = null;
  try { saved = localStorage.getItem('ramahi-lang'); } catch (e) {}
  if (saved === 'en') apply('en');
})();

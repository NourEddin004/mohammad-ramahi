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

  var PIN_ICO =
    '<svg class="btn-ico" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>';
  var PHONE_ICO =
    '<svg class="btn-ico" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M6.6 3h2.2c.5 0 .9.3 1 .8l.7 3c.1.4 0 .9-.4 1.2l-1.4 1.2a13.6 13.6 0 0 0 6.1 6.1l1.2-1.4c.3-.4.8-.5 1.2-.4l3 .7c.5.1.8.5.8 1v2.2c0 .6-.5 1.1-1.1 1.1C10.8 18.9 5.1 13.2 4.5 4.1 4.5 3.5 5 3 5.6 3h1Z"/></svg>';
  var WA_ICO =
    '<svg class="btn-ico" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path fill="currentColor" stroke="none" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.14.2 2.09 3.2 5.07 4.49.71.3 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35ZM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26C2.17 6.44 6.6 2 12.06 2a9.8 9.8 0 0 1 6.98 2.9 9.82 9.82 0 0 1 2.9 7c0 5.45-4.44 9.89-9.89 9.89Zm8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.95L0 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.44h.01c6.55 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41Z"/></svg>';

  /* s: selector · i: which match · en/ar: innerHTML · attr: attribute */
  var DICT = [
    /* envelope */
    { s: '#introHint', ar: 'اضغط الختم لفتح الدعوة', en: 'Tap the seal to open' },
    { s: '#envSeal', attr: 'aria-label', ar: 'اضغط الختم لفتح الدعوة', en: 'Tap the seal to open the invitation' },
    { s: '.ec-kicker', ar: 'حفل تخرّج', en: 'Graduation Ceremony' },
    { s: '.ec-name', ar: 'محمّد', en: 'Mohammad' },
    { s: '.ec-sub', ar: 'عبدالله الرمحي', en: 'Abdullah Al-Ramhi' },
    { s: '#musicBtn', attr: 'aria-label', ar: 'الموسيقى', en: 'Music' },
    { s: '.intro-credit', ar: 'دعوات رقمية بتصميم <b>Invite Sites</b> ↗', en: 'Digital invitations by <b>Invite Sites</b> ↗' },

    /* hero */
    { s: '.hero .verse', i: 0, ar: 'أشرق هذا اليوم بالبشرى<br>الحمدلله على تباشير الأفراح', en: 'The day has dawned with joyful news —<br>praise be to God for these glad tidings' },
    { s: '.hero .verse', i: 1, ar: 'الحمدلله الذي بلّغني نجاح ابني<br>وقرّة عيني بالتوجيهي', en: 'Praise be to God, who blessed my son,<br>the light of my eyes, with success in Tawjihi' },
    { s: '.name', ar: 'محمّد', en: 'Mohammad' },
    { s: '.family', ar: 'عبدالله الرمحي', en: 'Abdullah Al-Ramhi' },
    { s: '.portrait img', attr: 'alt', ar: 'محمد عبدالله الرمحي بثوب التخرّج', en: 'Mohammad Abdullah Al-Ramhi in his graduation gown' },
    { s: '.portrait', attr: 'aria-label', ar: 'محمد عبدالله الرمحي', en: 'Mohammad Abdullah Al-Ramhi' },
    { s: '.grade-label', ar: 'المعدل', en: 'The Average' },
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

    /* venue */
    { s: '#venue-h', ar: 'الموقع', en: 'The Venue' },
    { s: '.v-name', ar: 'ديوان أبناء الشمال', en: 'Abnaa Al-Shamal Diwan' },
    { s: '.v-addr', ar: 'طبربور — عمّان، الأردن', en: 'Tabarbour — Amman, Jordan' },
    { s: '.v-actions .btn-solid', ar: PIN_ICO + ' افتح الموقع على الخريطة', en: PIN_ICO + ' Open in Google Maps' },

    /* contact */
    { s: '#contact-h', ar: 'للتواصل والاستفسار', en: 'Contact & Inquiries' },
    { s: '.contact-actions .btn-solid', ar: PHONE_ICO + ' اتصال', en: PHONE_ICO + ' Call' },
    { s: '.contact-actions .btn-line', ar: WA_ICO + ' واتساب', en: WA_ICO + ' WhatsApp' },

    /* footer + sticky */
    { s: '.foot-line', ar: 'بحضوركم تكتمل فرحتنا', en: 'Your presence completes our joy' },
    { s: '.foot-credit a', ar: 'صُمّمت الدعوة بواسطة <b>Invite Sites</b> — تعرّفوا علينا', en: 'Invitation crafted by <b>Invite Sites</b> — learn more about us' },
    { s: '#stickyCta .btn', ar: 'الموقع على الخريطة', en: 'Map & directions' },
  ];

  var MSG_AR = Object.assign({}, window.MSG);
  var MSG_EN = {
    live    : 'The celebration is underway',
    thanks  : 'Thank you for sharing our joy',
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

/* ═══════════════════════════════════════════════════════════════
   دعوة تخرّج محمد عبدالله الرمحي — behaviour
   Everything you need to change is in CONFIG below.
   ═══════════════════════════════════════════════════════════════ */

/* ⚙️ ─────────── EVENT CONFIGURATION ─────────── */
const CONFIG = {
  name  : 'محمد عبدالله الرمحي',
  title : 'حفل تخرّج محمد عبدالله الرمحي',

  // ⚠️ months are 0-indexed: 7 = August
  start : new Date(2026, 7, 12, 20, 0),   // Wednesday 12 August 2026, 8:00 pm
  end   : new Date(2026, 7, 12, 22, 30),  // 10:30 pm

  venueName    : 'ديوان أبناء الشمال',
  venueAddress : 'طبربور، عمّان، الأردن',
  mapUrl       : 'https://maps.app.goo.gl/zgfTd7A1XE3Cv6Mg9',
  details      : 'من 8:00 إلى 9:00 للسيدات، ومن 9:00 إلى 10:30 دخول الخريج بالزفّة مع الشباب بإذن الله.',
};
/* ─────────────────────────────────────────────── */

/* Runtime strings live here so i18n.js can swap the whole set. */
const MSG = {
  live    : 'الحفل قائم الآن',
  thanks  : 'شكراً لمشاركتكم فرحتنا',
  copied  : 'تم نسخ الرابط ✓',
  copyFail: 'تعذّر النسخ — انسخ الرابط من شريط العنوان.',
  shareText: 'يشرّفنا حضوركم — حفل تخرّج محمد عبدالله الرمحي، الأربعاء 12 آب 2026، ديوان أبناء الشمال.',
};
window.MSG = MSG;

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ═══ 1 · BREAK THE SEAL ═══
   Tap → the wax pops off, the flap swings open, the card rises out
   of the pocket, then the page fades in under a confetti burst. */
const intro = $('#intro');
const env   = $('#env');
const seal  = $('#envSeal');
const site  = $('#site');
let entered = false, opening = false;

function enterSite(){
  if (entered) return;
  entered = true;
  intro.classList.add('gone');
  document.body.classList.remove('is-locked');
  site.classList.add('on');
  musicBtn.hidden = false;
  burst(80);
  runGrade();
  startReveal();
  setTimeout(() => { intro.hidden = true; }, 900);
}

function openEnvelope(){
  if (opening || entered) return;
  opening = true;
  env.classList.add('open');
  setMusic(true);                             // the tap is our user gesture
  burst(26);                                  // a first spark as the wax pops
  setTimeout(enterSite, REDUCED ? 0 : 1900);  // flap + card, then enter
}

seal.addEventListener('click', openEnvelope);
/* the rest of the envelope also opens it — a bigger target for small hands */
intro.addEventListener('click', e => { if (e.target !== seal) openEnvelope(); });
seal.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEnvelope(); }
});

/* ═══ 1b · BACKGROUND MUSIC ═══
   A hidden YouTube player. It loads muted (browsers allow that),
   and the tap on the seal unmutes it — that counts as the user
   gesture mobile browsers require before playing sound. */
const MUSIC_ID = 'nkYT96-Mr3s';
const musicBtn = $('#musicBtn');
let player = null, playerReady = false, musicOn = false;

const ytTag = document.createElement('script');
ytTag.src = 'https://www.youtube.com/iframe_api';
document.head.appendChild(ytTag);

window.onYouTubeIframeAPIReady = () => {
  player = new YT.Player('ytBg', {
    width: 2, height: 2,
    videoId: MUSIC_ID,
    playerVars: {
      autoplay: 1, mute: 1, loop: 1, playlist: MUSIC_ID,
      controls: 0, disablekb: 1, playsinline: 1, rel: 0,
    },
    events: {
      onReady: e => {
        playerReady = true;
        e.target.setVolume(70);
        if (musicOn) { e.target.unMute(); e.target.playVideo(); }
      },
    },
  });
};

function setMusic(on){
  musicOn = on;
  if (playerReady) {
    if (on) { player.unMute(); player.playVideo(); }
    else player.mute();
  }
  musicBtn.classList.toggle('muted', !on);
  musicBtn.setAttribute('aria-pressed', String(on));
}
musicBtn.addEventListener('click', () => setMusic(!musicOn));

/* ═══ 2 · SCROLL REVEAL ═══ */
let revealStarted = false;
function startReveal(){
  if (revealStarted) return;
  revealStarted = true;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    });
  }, { threshold:0.14, rootMargin:'0px 0px -6% 0px' });

  $$('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    io.observe(el);
  });
}

/* ═══ 3 · COUNTDOWN ═══ */
const cd = { d:$('#cdD'), h:$('#cdH'), m:$('#cdM'), s:$('#cdS') };
function setDigits(el, value){
  const v = String(value).padStart(2, '0');
  if (el.textContent === v) return;
  el.textContent = v;
  el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick');
}
function tickCountdown(){
  const diff = CONFIG.start - Date.now();
  if (diff <= 0) {
    const live = Date.now() < CONFIG.end;
    $('#countdown').innerHTML =
      `<p class="cd-msg">${live ? MSG.live : MSG.thanks}</p>`;
    return true;
  }
  const sec = Math.floor(diff / 1000);
  setDigits(cd.d, Math.floor(sec / 86400));
  setDigits(cd.h, Math.floor(sec / 3600) % 24);
  setDigits(cd.m, Math.floor(sec / 60) % 60);
  setDigits(cd.s, sec % 60);
  return false;
}
tickCountdown();
const cdTimer = setInterval(() => { if (tickCountdown()) clearInterval(cdTimer); }, 1000);

/* ═══ 4 · GRADE COUNT-UP ═══
   The big average in the hero counts from 0 up to its real value
   the moment the page is revealed. */
const gradeNum = $('#gradeNum');
const GRADE = 92.80;
let gradeDone = false;
function runGrade(){
  if (gradeDone || !gradeNum) return;
  gradeDone = true;
  if (REDUCED) { gradeNum.textContent = GRADE.toFixed(2) + '%'; return; }
  const t0 = performance.now(), dur = 2400;
  (function step(now){
    const p = Math.min((now - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    gradeNum.textContent = (GRADE * eased).toFixed(2) + '%';
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

/* ═══ 5 · SHARE ═══ */
const shareBtn = $('#shareBtn'), copyBtn = $('#copyBtn'), shareNote = $('#shareNote');
const shareData = () => ({
  title: CONFIG.title,
  text : MSG.shareText,
  url  : location.href,
});

function flash(msg){
  shareNote.textContent = msg;
  shareNote.hidden = false;
  clearTimeout(flash.t);
  flash.t = setTimeout(() => { shareNote.hidden = true; }, 2600);
}

shareBtn.addEventListener('click', async () => {
  if (navigator.share) {
    try { await navigator.share(shareData()); return; } catch { /* dismissed */ }
  }
  // no share sheet (desktop): fall back to WhatsApp
  const d = shareData();
  window.open(
    `https://wa.me/?text=${encodeURIComponent(d.text + '\n' + d.url)}`,
    '_blank', 'noopener'
  );
});

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(location.href);
    flash(MSG.copied);
  } catch {
    flash(MSG.copyFail);
  }
});

/* ═══ 6 · STICKY MAP BUTTON ═══ */
const sticky = $('#stickyCta');
let pastHero = false, atVenue = false;
function syncSticky(){
  const show = pastHero && !atVenue && !document.body.classList.contains('is-locked');
  sticky.hidden = !show;
  requestAnimationFrame(() => sticky.classList.toggle('on', show));
}
new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting; syncSticky(); },
  { threshold:0.2 }).observe($('.hero'));
new IntersectionObserver(([e]) => { atVenue = e.isIntersecting; syncSticky(); },
  { threshold:0.25 }).observe($('#venue'));

/* ═══ 7 · GOLD CONFETTI ═══
   Slim foil ribbons in the card's own palette, drifting down. */
const canvas = $('#confetti');
const ctx = canvas.getContext('2d');
const GOLD = ['#C9A227','#E0C878','#F0E3BE','#A9861B','#FFFFFF'];
let bits = [], W, H;

function resize(){
  const dpr = Math.min(devicePixelRatio || 1, 2);
  W = innerWidth; H = innerHeight;
  canvas.width = Math.round(W * dpr);
  canvas.height = Math.round(H * dpr);
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resize();
let resizeTimer;
addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 150); });
addEventListener('orientationchange', () => setTimeout(resize, 250));

function makeBit(isBurst){
  return {
    x: Math.random() * W,
    y: isBurst ? H * 0.42 + (Math.random() - .5) * 140 : -20 - Math.random() * H,
    w: 3 + Math.random() * 4,
    h: 6 + Math.random() * 7,
    vx: isBurst ? (Math.random() - .5) * 9 : (Math.random() - .5) * 0.45,
    vy: isBurst ? -4.5 - Math.random() * 7 : 0.35 + Math.random() * 0.7,
    spin: (Math.random() - .5) * 0.22,
    angle: Math.random() * Math.PI * 2,
    flutter: Math.random() * Math.PI * 2,
    tone: GOLD[(Math.random() * GOLD.length) | 0],
    alpha: 1,
    decay: isBurst ? 0.007 + Math.random() * 0.006 : 0,
    burst: isBurst
  };
}

const AMBIENT = innerWidth < 700 ? 16 : 26;
if (!REDUCED) {
  for (let i = 0; i < AMBIENT; i++){ const b = makeBit(false); b.y = Math.random() * H; bits.push(b); }
}
function burst(n){ if (!REDUCED) for (let i = 0; i < n; i++) bits.push(makeBit(true)); }

function frame(){
  ctx.clearRect(0, 0, W, H);

  bits = bits.filter(b => {
    b.x += b.vx; b.y += b.vy;
    b.angle += b.spin; b.flutter += 0.05;

    if (b.burst) { b.vy += 0.15; b.vx *= 0.99; b.alpha -= b.decay; }
    else {
      b.x += Math.sin(b.flutter) * 0.35;
      if (b.y > H + 20) { b.y = -20; b.x = Math.random() * W; }
    }

    ctx.save();
    ctx.globalAlpha = Math.max(b.alpha, 0) * 0.85;
    ctx.translate(b.x, b.y);
    ctx.rotate(b.angle);
    ctx.scale(Math.cos(b.flutter) * 0.5 + 0.75, 1);   // the foil turning over
    ctx.fillStyle = b.tone;
    ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
    ctx.restore();

    return b.alpha > 0.02 && b.y < H + 80;
  });

  requestAnimationFrame(frame);
}
if (!REDUCED) frame();

/* ═══ 8 · REDUCED MOTION / DIRECT ENTRY ═══ */
if (REDUCED) {
  entered = true;
  intro.classList.add('gone');
  intro.hidden = true;
  document.body.classList.remove('is-locked');
  site.classList.add('on');
  musicBtn.hidden = false;
  runGrade();
  $$('.reveal').forEach(el => el.classList.add('in'));
}

/* The reveal must never gate the content: if the observer has not run
   within a few seconds (a background tab throttles it), show everything. */
setTimeout(() => $$('.reveal').forEach(el => el.classList.add('in')), 2500);

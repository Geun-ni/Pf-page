(() => {
  /* 테마 토글 */
  const sw = document.getElementById('theme-switch');
  const label = sw.querySelector('.theme-label');
  const sys = matchMedia('(prefers-color-scheme: dark)');
  let pref = null;
  try { pref = localStorage.getItem('geun-ni-pf-page-theme'); } catch (e) {}
  function apply() {
    const attr = document.documentElement.dataset.theme;
    const dark = (pref ?? attr ?? (sys.matches ? 'dark' : 'light')) === 'dark';
    if (pref) document.documentElement.dataset.theme = pref;
    sw.setAttribute('aria-checked', String(dark));
    label.textContent = dark ? '다크 모드' : '라이트 모드';
  }
  sw.addEventListener('click', () => {
    pref = sw.getAttribute('aria-checked') === 'true' ? 'light' : 'dark';
    apply();
    try { localStorage.setItem('geun-ni-pf-page-theme', pref); } catch (e) {}
  });
  sys.addEventListener('change', apply);
  apply();

  /* 이메일: 소스에 주소를 그대로 두지 않고 화면에서 조립 */
  const mail = document.getElementById('mail');
  mail.textContent = mail.dataset.u + '@' + mail.dataset.d;

  /* 복사: Main Prompt 문장 밖에서는 막음 */
  document.addEventListener('copy', (e) => {
    const sel = getSelection();
    const node = sel && sel.anchorNode;
    const el = node && (node.nodeType === 1 ? node : node.parentElement);
    if (!el || !el.closest('.prompt-line, #mail')) e.preventDefault();
  });
  document.addEventListener('contextmenu', (e) => { if (!e.target.closest('.prompt-line, #mail')) e.preventDefault(); });

  /* 맨 위로 버튼: 첫 화면에서는 숨기고 스크롤하면 표시 */
  const toTop = document.querySelector('.to-top');
  const syncTop = () => toTop.classList.toggle('is-hidden', scrollY < 400);
  addEventListener('scroll', syncTop, { passive: true });
  syncTop();

  /* Main Prompt 복사 버튼 */
  const live = document.getElementById('copy-live');
  for (const li of document.querySelectorAll('.habits > li')) {
    const summary = li.querySelector('summary');
    const prompt = li.querySelector('.prompt-line');
    const num = li.querySelector('.habit-num').textContent;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.textContent = 'COPY';
    btn.setAttribute('aria-label', num + '번 프롬프트 복사');
    summary.insertBefore(btn, summary.lastChild.nextSibling);
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const text = prompt.textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'COPIED';
        btn.classList.add('done');
        live.textContent = num + '번 프롬프트를 복사했어요.';
      } catch (err) {
        li.querySelector('details').open = true;
        const range = document.createRange();
        range.selectNodeContents(prompt);
        const sel = getSelection(); sel.removeAllRanges(); sel.addRange(range);
        live.textContent = '자동 복사가 막혀 있어요. 선택된 문장을 직접 복사해 주세요.';
      }
      setTimeout(() => { btn.textContent = 'COPY'; btn.classList.remove('done'); }, 1600);
    });
  }

  /* 픽셀 스프라이트: 글자 지도 → SVG 사각형 */
  const NS = 'http://www.w3.org/2000/svg';
  function sprite(rows, colors, scale, blink) {
    const w = rows[0].length, h = rows.length;
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'sprite');
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.setAttribute('width', w * scale);
    svg.setAttribute('height', h * scale);
    rows.forEach((row, y) => [...row].forEach((ch, x) => {
      if (!colors[ch]) return;
      const r = document.createElementNS(NS, 'rect');
      r.setAttribute('x', x); r.setAttribute('y', y);
      r.setAttribute('width', 1.02); r.setAttribute('height', 1.02);
      r.setAttribute('fill', colors[ch]);
      if (blink && blink[ch]) r.setAttribute('class', blink[ch]);
      svg.appendChild(r);
    }));
    return svg;
  }
  const v = (name) => `var(--${name})`;
  const catColors = { k: v('cat'), d: v('cat-head'), y: v('eye'), p: v('nose'), r: v('berry'), w: '#f4f4f0', g: v('pine') };
  const catTop = [
    '.............w....',
    '............rr....',
    '...........rrr....',
    '..........wwwww...',
    '.........dwwwwwd..',
    '.........dddddddd.',
    'k........ddyddyd..',
    'k........dddddpd..',
    '.k.......gggddd...',
    '.kkkkkkkkkgggkk...',
    '..kkkkkkkkkkkkk...',
    '..kkkkkkkkkkkkk...',
  ];
  const catA = catTop.concat(['..k..k.....k..k...', '..k..k.....k..k...']);
  const catB = catTop.concat(['...k..k...k..k....', '..k....k.k....k...']);
  const cat = document.getElementById('cat');
  const fa = sprite(catA, catColors, 4); fa.classList.add('frame-a');
  const fb = sprite(catB, catColors, 4); fb.classList.add('frame-b');
  document.getElementById('cat-flip').append(fa, fb);

  const tree = [
    '.......y.......',
    '......yyy......',
    '.......y.......',
    '.......g.......',
    '......ggg......',
    '.....ggRgg.....',
    '....ggggggg....',
    '......gBg......',
    '.....ggggg.....',
    '....gYggggg....',
    '...gggggggRg...',
    '.....ggggg.....',
    '....ggggBgg....',
    '...gggggggggg..',
    '..gRgggggYgggg.',
    '.ggggggggggggBg',
    '......bbb......',
    '......bbb......',
  ];
  document.getElementById('tree').appendChild(sprite(tree,
    { y: v('gold'), g: v('pine'), R: v('berry'), B: '#7fc6ff', Y: v('gold'), b: v('wood') }, 6,
    { R: 'blink-a', Y: 'blink-b', B: 'blink-a', y: 'blink-b' }));

  const gift = ['.y...y.', '..y.y..', 'rrryrrr', 'rrryrrr', 'yyyyyyy', 'rrryrrr', 'rrryrrr'];
  const gift2 = ['..w.w..', '...w...', 'gggwggg', 'gggwggg', 'wwwwwww', 'gggwggg'];
  const gifts = document.getElementById('gifts');
  function giftButton(rows, colors, scale, lidRows, label, message) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'gift';
    b.setAttribute('aria-label', label);
    b.dataset.message = message;
    const lid = sprite(rows.slice(0, lidRows), colors, scale); lid.classList.add('lid');
    b.append(lid, sprite(rows.slice(lidRows), colors, scale));
    return b;
  }
  gifts.append(
    giftButton(gift, { r: v('berry'), y: v('gold') }, 5, 4, '빨간 선물 상자 열기', 'Merry Christmas!'),
    giftButton(gift2, { g: v('pine'), w: '#f4f4f0' }, 4, 4, '초록 선물 상자 열기', 'Thanks for visiting!'));

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 미니 게임: 고양이 점프, JUMP! 힌트, 선물 상자 */
  const hint = document.getElementById('cat-hint');
  const giftMsg = document.getElementById('gift-msg');
  const say = (text) => { const l = document.getElementById('copy-live'); if (l) l.textContent = text; };
  let msgTimer = 0;

  function openGift(btn) {
    for (const g of gifts.querySelectorAll('.gift')) g.classList.toggle('open', g === btn);
    giftMsg.textContent = btn.dataset.message;
    giftMsg.classList.add('show');
    say(btn.dataset.message);
    clearTimeout(msgTimer);
    msgTimer = setTimeout(() => {
      giftMsg.classList.remove('show');
      btn.classList.remove('open');
    }, 2600);
  }
  for (const g of gifts.querySelectorAll('.gift')) g.addEventListener('click', () => openGift(g));

  function nearestGift() {
    const c = cat.getBoundingClientRect();
    let best = null, gap = 48;
    for (const g of gifts.querySelectorAll('.gift')) {
      const r = g.getBoundingClientRect();
      if (!r.width) continue;
      const d = Math.max(r.left - c.right, c.left - r.right, 0);
      if (d < gap) { gap = d; best = g; }
    }
    return best;
  }

  function dust() {
    for (let i = 0; i < 5; i++) {
      const d = document.createElement('span');
      d.className = 'dust';
      d.style.left = (22 + i * 8) + 'px';
      d.style.bottom = '0px';
      d.style.setProperty('--dx', ((i - 2) * 6) + 'px');
      d.addEventListener('animationend', () => d.remove());
      cat.appendChild(d);
    }
  }

  let alertTimer = 0;
  cat.addEventListener('click', () => {
    hint.hidden = true;
    cat.classList.add('alert');
    clearTimeout(alertTimer);
    alertTimer = setTimeout(() => cat.classList.remove('alert'), 900);
    if (reduce) { const g = nearestGift(); if (g) openGift(g); return; }
    cat.classList.remove('jumping');
    void cat.offsetWidth;
    cat.classList.add('jumping');
    dust();
  });
  cat.addEventListener('animationend', (e) => {
    if (e.animationName !== 'jump') return;
    cat.classList.remove('jumping');
    const g = nearestGift();
    if (g) openGift(g);
  });

  /* 화면에 보일 때만 움직임 (모바일 스크롤 중 다시 그리기 부담 줄이기) */
  const hero = document.querySelector('.hero');
  const lightsBar = document.querySelector('.lights');
  let heroOn = true, lightsOn = true;
  const active = () => !reduce && !document.hidden;

  setInterval(() => { if (active() && heroOn) cat.classList.toggle('step'); }, 240);

  /* 전구 줄: 크기는 폭이 바뀔 때만 다시 잡음 */
  const lc = document.getElementById('lights');
  const lctx = lc.getContext('2d');
  let lw = 0, lh = 0, lt = 0;
  function sizeLights() {
    const dpr = window.devicePixelRatio || 1;
    const w = lc.clientWidth, h = lc.clientHeight;
    if (w === lw && h === lh) return;
    lw = w; lh = h;
    lc.width = Math.round(w * dpr); lc.height = Math.round(h * dpr);
    lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function drawLights() {
    lctx.clearRect(0, 0, lw, lh);
    const cs = getComputedStyle(document.documentElement);
    const cols = [cs.getPropertyValue('--berry'), cs.getPropertyValue('--pine'), cs.getPropertyValue('--gold'), '#7fc6ff'];
    const line = cs.getPropertyValue('--line');
    for (let i = 0, x = 10; x < lw; i++, x += 28) {
      lctx.globalAlpha = (reduce || (i + lt) % 2 === 0) ? 1 : .35;
      lctx.fillStyle = line;
      lctx.fillRect(x + 2, 2, 4, 3);
      lctx.fillStyle = cols[i % cols.length].trim();
      lctx.fillRect(x, 5, 8, 8);
    }
    lctx.globalAlpha = 1;
  }
  sizeLights(); drawLights();
  setInterval(() => { if (active() && lightsOn) { lt++; drawLights(); } }, 700);
  sys.addEventListener('change', drawLights);
  sw.addEventListener('click', drawLights);

  /* 픽셀 눈: 크기는 폭이 바뀔 때만 다시 잡음 (모바일 주소창이 접힐 때는 무시) */
  const sc = document.getElementById('snowfall');
  const sctx = sc.getContext('2d');
  let flakes = [], sw0 = 0, running = false;
  function sizeSnow() {
    const r = sc.getBoundingClientRect();
    if (Math.round(r.width) === sw0) return;
    sw0 = Math.round(r.width);
    sc.width = Math.max(1, Math.round(r.width / 3));
    sc.height = Math.max(1, Math.round(r.height / 3));
    sc.style.imageRendering = 'pixelated';
    const n = Math.round(sc.width * sc.height / 900);
    flakes = Array.from({ length: n }, () => ({ x: Math.random() * sc.width, y: Math.random() * sc.height, s: Math.random() < .25 ? 2 : 1, v: .08 + Math.random() * .18, d: Math.random() * 6.28 }));
  }
  function drawSnow() {
    sctx.clearRect(0, 0, sc.width, sc.height);
    const dark = document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && sys.matches);
    sctx.fillStyle = dark ? 'rgba(238,244,240,.8)' : 'rgba(150,180,170,.7)';
    for (const f of flakes) sctx.fillRect(Math.round(f.x), Math.round(f.y), f.s, f.s);
  }
  function tick() {
    if (!active() || !heroOn) { running = false; return; }
    for (const f of flakes) {
      f.y += f.v; f.d += .01; f.x += Math.sin(f.d) * .08;
      if (f.y > sc.height) { f.y = -2; f.x = Math.random() * sc.width; }
    }
    drawSnow();
    requestAnimationFrame(tick);
  }
  function startSnow() {
    if (running || !active() || !heroOn) return;
    running = true;
    requestAnimationFrame(tick);
  }
  sizeSnow(); drawSnow(); startSnow();

  addEventListener('resize', () => { sizeLights(); drawLights(); sizeSnow(); drawSnow(); });
  document.addEventListener('visibilitychange', startSnow);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) { heroOn = e.isIntersecting; startSnow(); }
        else lightsOn = e.isIntersecting;
      }
    }).observe(hero);
    new IntersectionObserver(([e]) => { lightsOn = e.isIntersecting; }).observe(lightsBar);
  }
})();

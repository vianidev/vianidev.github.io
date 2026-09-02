// barra de progreso de scroll
const scrollBar = document.getElementById('scrollBar');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  if (scrollBar) scrollBar.style.width = pct + '%';
});

// reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- PROYECTOS: datos y render ----------
// Para sumar un proyecto nuevo, agregá un objeto acá abajo. No hace falta tocar el HTML.
// status: "done" (proyecto real, con link) o "pending" (casillero "Próximamente").

// Si el repo de las plantillas cambia de nombre o de carpeta, solo hay que editar esta línea:
// OJO: las páginas viven dentro de /Paginas-Web/, por eso va incluido acá.
const REPO_BASE = 'https://vianidev.github.io/plantillas-web/Paginas-Web/';

const projects = [
  { category:'ropa', label:'Ropa', status:'done', title:'Ropa — plantilla 01', desc:'Editá este título y descripción con lo que realmente hace esta plantilla.', link: REPO_BASE + 'tienda-ropa-01/' },
  { category:'ropa', label:'Ropa', status:'done', title:'Ropa — plantilla 02', desc:'Editá este título y descripción con lo que realmente hace esta plantilla.', link: REPO_BASE + 'tienda-ropa-02/' },
  { category:'ropa', label:'Ropa', status:'done', title:'Ropa — plantilla 03', desc:'Editá este título y descripción con lo que realmente hace esta plantilla.', link: REPO_BASE + 'tienda-ropa-03/' },
  { category:'ropa', label:'Ropa', status:'done', title:'Ropa — plantilla 04', desc:'Editá este título y descripción con lo que realmente hace esta plantilla.', link: REPO_BASE + 'tienda-ropa-04/' },

  { category:'camperas', label:'Camperas', status:'done', title:'Camperas — plantilla 01', desc:'Editá este título y descripción con lo que realmente hace esta plantilla.', link: REPO_BASE + 'tienda-camperas-01/' },
  { category:'camperas', label:'Camperas', status:'done', title:'Camperas — plantilla 02', desc:'Editá este título y descripción con lo que realmente hace esta plantilla.', link: REPO_BASE + 'tienda-camperas-02/' },
  { category:'camperas', label:'Camperas', status:'done', title:'Camperas — plantilla 03', desc:'Editá este título y descripción con lo que realmente hace esta plantilla.', link: REPO_BASE + 'tienda-camperas-03/' },
  { category:'camperas', label:'Camperas', status:'done', title:'Camperas — plantilla 04', desc:'Editá este título y descripción con lo que realmente hace esta plantilla.', link: REPO_BASE + 'tienda-camperas-04/' },

  { category:'zapatillas', label:'Zapatillas', status:'done', title:'Zapatillas — plantilla 01', desc:'Editá este título y descripción con lo que realmente hace esta plantilla.', link: REPO_BASE + 'tienda-zapatillas-01/' },
  { category:'zapatillas', label:'Zapatillas', status:'done', title:'Zapatillas — plantilla 02', desc:'Editá este título y descripción con lo que realmente hace esta plantilla.', link: REPO_BASE + 'tienda-zapatillas-02/' },
  { category:'zapatillas', label:'Zapatillas', status:'done', title:'Zapatillas — plantilla 03', desc:'Editá este título y descripción con lo que realmente hace esta plantilla.', link: REPO_BASE + 'tienda-zapatillas-03/' },
  { category:'zapatillas', label:'Zapatillas', status:'done', title:'Zapatillas — plantilla 04', desc:'Editá este título y descripción con lo que realmente hace esta plantilla.', link: REPO_BASE + 'tienda-zapatillas-04/' },

  { category:'accesorios', label:'Accesorios', status:'done', title:'Accesorios — plantilla 01', desc:'Editá este título y descripción con lo que realmente hace esta plantilla.', link: REPO_BASE + 'tienda-accesorios-01/' },
  { category:'accesorios', label:'Accesorios', status:'done', title:'Accesorios — plantilla 02', desc:'Editá este título y descripción con lo que realmente hace esta plantilla.', link: REPO_BASE + 'tienda-accesorios-02/' },
  { category:'accesorios', label:'Accesorios', status:'done', title:'Accesorios — plantilla 03', desc:'Editá este título y descripción con lo que realmente hace esta plantilla.', link: REPO_BASE + 'tienda-accesorios-03/' },
  { category:'accesorios', label:'Accesorios', status:'done', title:'Accesorios — plantilla 04', desc:'Editá este título y descripción con lo que realmente hace esta plantilla.', link: REPO_BASE + 'tienda-accesorios-04/' },

  { category:'deportiva', label:'Indumentaria deportiva', status:'done', title:'Deportiva — plantilla 01', desc:'Editá este título y descripción con lo que realmente hace esta plantilla.', link: REPO_BASE + 'tienda-deportiva-01/' },
  { category:'deportiva', label:'Indumentaria deportiva', status:'done', title:'Deportiva — plantilla 02', desc:'Editá este título y descripción con lo que realmente hace esta plantilla.', link: REPO_BASE + 'tienda-deportiva-02/' },
  { category:'deportiva', label:'Indumentaria deportiva', status:'done', title:'Deportiva — plantilla 03', desc:'Editá este título y descripción con lo que realmente hace esta plantilla.', link: REPO_BASE + 'tienda-deportiva-03/' },
  { category:'deportiva', label:'Indumentaria deportiva', status:'done', title:'Deportiva — plantilla 04', desc:'Editá este título y descripción con lo que realmente hace esta plantilla.', link: REPO_BASE + 'tienda-deportiva-04/' }
];

function renderProjectCard(p){
  const pendingClass = p.status === 'pending' ? ' pending' : '';
  const tagWord = p.status === 'done' ? 'Demo' : 'Plantilla en camino';
  const linkHtml = p.status === 'done'
    ? `<a href="${p.link}" class="project-link" target="_blank" rel="noopener noreferrer"><span class="link-text">Explorar plantilla</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg></a>`
    : `<span class="project-link pending-label">Próximamente</span>`;
  return `
    <div class="project-card${pendingClass}" data-cat="${p.category}">
      <div class="project-thumb">
        <div class="mini-browser">
          <div class="mini-bar"><span class="mini-dot"></span><span class="mini-dot"></span><span class="mini-dot"></span></div>
          <div class="mini-body">
            <div class="mini-line" style="width:60%"></div>
            <div class="mini-line" style="width:85%"></div>
            <div class="mini-line" style="width:40%; background:var(--gold);"></div>
          </div>
        </div>
      </div>
      <div class="project-body">
        <span class="project-tag">${tagWord} · ${p.label}</span>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        ${linkHtml}
      </div>
    </div>`;
}

function renderProjects(){
  const grid = document.getElementById('projectsGrid');
  const filterRow = document.getElementById('filterRow');
  const moreBtn = document.getElementById('projectsMore');
  const seen = [];
  const labels = { all: 'Todos' };
  projects.forEach(p => { if (!seen.includes(p.category)) { seen.push(p.category); labels[p.category] = p.label; } });
  const cats = ['all', ...seen];

  filterRow.innerHTML = cats.map(c =>
    `<button class="filter-btn${c === 'all' ? ' active' : ''}" data-filter="${c}">${labels[c]}</button>`
  ).join('');

  grid.innerHTML = projects.map(renderProjectCard).join('');
  const cards = Array.from(grid.querySelectorAll('.project-card'));
  if (!moreBtn) return;

  const PAGE_SIZE = 6;
  let visibleCount = PAGE_SIZE;
  let activeFilter = 'all';

  function applyView(){
    const matching = cards.filter(c => activeFilter === 'all' || c.dataset.cat === activeFilter);
    cards.forEach(c => c.classList.add('hide'));
    matching.slice(0, visibleCount).forEach(c => c.classList.remove('hide'));
    moreBtn.style.display = matching.length > visibleCount ? 'inline-flex' : 'none';
  }

  filterRow.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterRow.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      visibleCount = PAGE_SIZE;
      applyView();
    });
  });

  moreBtn.addEventListener('click', () => {
    visibleCount += PAGE_SIZE;
    applyView();
  });

  applyView();
}
renderProjects();

// ---------- utilidades de movimiento reducido ----------
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- BARRIDO (efecto iris al cambiar tema o paleta) ----------
const sweepEl = document.getElementById('themeSweep');
function sweepTransition(x, y, color, applyFn){
  if (reduceMotion || !sweepEl) { applyFn(); return; }
  const diag = Math.hypot(window.innerWidth, window.innerHeight);
  const size = diag * 2.3;
  sweepEl.style.width = size + 'px';
  sweepEl.style.height = size + 'px';
  sweepEl.style.left = x + 'px';
  sweepEl.style.top = y + 'px';
  sweepEl.style.background = color;
  sweepEl.classList.remove('sweep-anim');
  void sweepEl.offsetWidth; // reinicia la animación
  sweepEl.classList.add('sweep-anim');
  let applied = false;
  const mid = 0.52 * 950; // debe coincidir con el 52% del keyframe (950ms de duración)
  setTimeout(() => { if (!applied) { applied = true; applyFn(); } }, mid);
  sweepEl.addEventListener('animationend', function handler(){
    sweepEl.classList.remove('sweep-anim');
    sweepEl.removeEventListener('animationend', handler);
  });
}

// ---------- TEMA CLARO / OSCURO ----------
const root = document.documentElement;
const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
let currentTheme = prefersLight ? 'light' : 'dark';
setThemeAttr(currentTheme);

document.getElementById('themeToggle').addEventListener('click', (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  const nextBg = nextTheme === 'light' ? '#f7f0df' : '#17110d';
  sweepTransition(x, y, nextBg, () => {
    currentTheme = nextTheme;
    setThemeAttr(currentTheme);
  });
});

function setThemeAttr(theme){
  if (theme === 'light') root.setAttribute('data-theme', 'light');
  else root.removeAttribute('data-theme');
}

// ---------- PALETAS DE COLOR ----------
// El cambio de paleta ya no usa el barrido de pantalla completa: --gold y --gold-deep
// están registradas como @property en el CSS, así que el propio navegador anima el
// cruce de color de forma suave. Acá solo dejamos un pulso chiquito en el punto
// donde se hizo clic, a modo de confirmación visual, sin tapar la pantalla.
root.setAttribute('data-palette', 'amber');
const paletteDots = document.querySelectorAll('.palette-dot');
const liveColorPicker = document.getElementById('liveColorPicker');
paletteDots.forEach(dot => {
  dot.addEventListener('click', () => {
    if (dot.classList.contains('active')) return;
    const palette = dot.dataset.palette;
    // El selector RGB en vivo pisa --gold con un estilo inline en <html>, que tiene
    // más especificidad que html[data-palette="..."]. Si no se limpia acá, las
    // paletas prefijadas dejan de reaccionar después de haber usado el selector libre.
    root.style.removeProperty('--gold');
    root.style.removeProperty('--gold-deep');
    root.setAttribute('data-palette', palette);
    paletteDots.forEach(d => d.classList.toggle('active', d === dot));
    if (liveColorPicker) liveColorPicker.value = dot.dataset.color;

    if (!reduceMotion) {
      const ripple = document.createElement('span');
      ripple.className = 'palette-ripple';
      ripple.style.background = dot.dataset.color;
      dot.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    }
  });
});

// ---------- SELECTOR DE COLOR EN VIVO ----------
// Mientras se arrastra el selector nativo, se apaga la transición de color un instante
// para que el cambio siga al cursor sin retraso; al soltar, vuelve a animarse suave.
let liveColorTimeout;
liveColorPicker.addEventListener('input', (e) => {
  root.classList.add('no-color-transition');
  root.style.setProperty('--gold', e.target.value);
  root.style.setProperty('--gold-deep', e.target.value);
  paletteDots.forEach(d => d.classList.remove('active')); // ninguna paleta fija representa ya el color custom
  clearTimeout(liveColorTimeout);
  liveColorTimeout = setTimeout(() => root.classList.remove('no-color-transition'), 200);
});

// ---------- VOLVER ARRIBA ----------
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.classList.toggle('show', window.scrollY > 500);
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

// ---------- AGENDA DE CONTENIDO: filtro + paginado ----------
(function initAgenda(){
  const grid = document.getElementById('agendaGrid');
  const filterRow = document.getElementById('agendaFilterRow');
  const moreBtn = document.getElementById('agendaMore');
  if (!grid || !filterRow || !moreBtn) return;

  const cards = Array.from(grid.querySelectorAll('.agenda-card'));
  const today = new Date(); today.setHours(0,0,0,0);
  cards.forEach(card => {
    // Si la tarjeta ya trae data-status en el HTML (confirmado a mano tras revisar Notion),
    // se respeta ese valor. Si no, se calcula solo comparando la fecha con hoy.
    if (!card.dataset.status) {
      const d = new Date(card.dataset.date + 'T00:00:00');
      card.dataset.status = d < today ? 'publicado' : 'proximo';
    }
  });

  const filters = [
    { key: 'proximo', label: 'Próximos' },
    { key: 'publicado', label: 'Publicados' },
    { key: 'all', label: 'Todos' },
  ];
  filterRow.innerHTML = filters.map((f, i) =>
    `<button class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${f.key}">${f.label}</button>`
  ).join('');

  const PAGE_SIZE = 6;
  let visibleCount = PAGE_SIZE;
  let activeFilter = 'proximo';

  function applyView(){
    const matching = cards.filter(c => activeFilter === 'all' || c.dataset.status === activeFilter);
    cards.forEach(c => c.classList.add('hide'));
    matching.slice(0, visibleCount).forEach(c => c.classList.remove('hide'));
    moreBtn.style.display = matching.length > visibleCount ? 'inline-flex' : 'none';
  }

  filterRow.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterRow.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      visibleCount = PAGE_SIZE;
      applyView();
    });
  });

  moreBtn.addEventListener('click', () => {
    visibleCount += PAGE_SIZE;
    applyView();
  });

  applyView();
})();

// ---------- NAVEGADOR INTERACTIVO ----------
const demoTabs = document.querySelectorAll('.demo-tab');
const demoScreens = document.querySelectorAll('.demo-screen');
const demoUrl = document.getElementById('demoUrl');
const urls = { landing: 'tulanding.com', venta: 'tucurso.com', institucional: 'tunegocio.com', login: 'tuapp.com/login' };
demoTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    demoTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const key = tab.dataset.demo;
    demoScreens.forEach(s => s.classList.toggle('active', s.dataset.screen === key));
    demoUrl.textContent = urls[key];
  });
});

// ---------- FONDO AMBIENTE (motas cálidas, sutiles, en toda la página) ----------
// Antes esto solo vivía en el hero (canvas absoluto dentro de esa sección) y con
// muchas partículas bien visibles. Ahora es un canvas fijo detrás de todo el sitio:
// se ve durante todo el scroll pero con muy poca densidad y opacidad baja, para
// que acompañe sin robarle protagonismo al contenido. Además toma el color de la
// paleta activa, así combina con ámbar, verde, violeta, celeste o el color elegido a mano.
const bgCanvas = document.getElementById('bgCanvas');
if (bgCanvas && !reduceMotion) {
  const bctx = bgCanvas.getContext('2d');
  let motes = [];

  function hexToRgb(hex){
    const m = /^#?([0-9a-f]{6})$/i.exec((hex || '').trim());
    if (!m) return { r: 230, g: 171, b: 77 };
    const int = parseInt(m[1], 16);
    return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
  }

  function resizeBg(){
    bgCanvas.width = window.innerWidth * devicePixelRatio;
    bgCanvas.height = window.innerHeight * devicePixelRatio;
    bgCanvas.style.width = window.innerWidth + 'px';
    bgCanvas.style.height = window.innerHeight + 'px';
    bctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  function makeMotes(){
    const w = window.innerWidth, h = window.innerHeight;
    const count = Math.min(46, Math.floor(w / 34));
    motes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 1.1,
      speedY: Math.random() * 0.16 + 0.05,
      drift: Math.random() * 0.2 - 0.1,
      baseAlpha: Math.random() * 0.26 + 0.14,
      twinkle: Math.random() * Math.PI * 2
    }));
  }
  const LINK_DIST = 130;
  function tickBg(){
    const w = window.innerWidth, h = window.innerHeight;
    const { r, g, b } = hexToRgb(getComputedStyle(root).getPropertyValue('--gold'));
    bctx.clearRect(0, 0, w, h);

    // líneas finas entre motas cercanas: da sensación de red/constelación
    // en vez de dejar el fondo vacío, sin sumar peso visual
    for (let i = 0; i < motes.length; i++){
      for (let j = i + 1; j < motes.length; j++){
        const a = motes[i], m = motes[j];
        const dx = a.x - m.x, dy = a.y - m.y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK_DIST){
          const lineAlpha = (1 - dist / LINK_DIST) * 0.16;
          bctx.beginPath();
          bctx.moveTo(a.x, a.y);
          bctx.lineTo(m.x, m.y);
          bctx.strokeStyle = `rgba(${r},${g},${b},${lineAlpha})`;
          bctx.lineWidth = 1;
          bctx.stroke();
        }
      }
    }

    motes.forEach(p => {
      p.y -= p.speedY;
      p.x += p.drift;
      p.twinkle += 0.012;
      if (p.y < -8) { p.y = h + 8; p.x = Math.random() * w; }
      const alpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(p.twinkle));
      bctx.beginPath();
      bctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      bctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      bctx.fill();
    });
    requestAnimationFrame(tickBg);
  }
  resizeBg();
  makeMotes();
  tickBg();
  window.addEventListener('resize', () => { resizeBg(); makeMotes(); });
}

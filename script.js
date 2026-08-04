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
const projects = [
  { category:'servicios', label:'Servicios y cursos', status:'done', title:'Landing para curso online', desc:'Propuesta, beneficios, testimonios y botón de inscripción. HTML, CSS y JS puro.', link:'#' },
  { category:'servicios', label:'Servicios y cursos', status:'done', title:'Presentación de negocio local', desc:'Sitio de una página para un emprendimiento, con contacto directo por WhatsApp.', link:'#' },

  { category:'ropa', label:'Ropa', status:'pending', title:'Tienda de ropa — plantilla 1', desc:'Catálogo con filtro por talle y color, pensado para marcas chicas de indumentaria.' },
  { category:'ropa', label:'Ropa', status:'pending', title:'Tienda de ropa — plantilla 2', desc:'Landing de lanzamiento de colección, con countdown y lista de espera.' },
  { category:'ropa', label:'Ropa', status:'pending', title:'Tienda de ropa — plantilla 3', desc:'Catálogo simple con pedido directo por WhatsApp, sin pasarela de pago.' },

  { category:'camperas', label:'Camperas', status:'pending', title:'Camperas — plantilla 1', desc:'Foco en fotos de producto grandes y guía de talles interactiva.' },
  { category:'camperas', label:'Camperas', status:'pending', title:'Camperas — plantilla 2', desc:'Landing de colección de invierno con storytelling de materiales.' },
  { category:'camperas', label:'Camperas', status:'pending', title:'Camperas — plantilla 3', desc:'Página de preventa con countdown para lanzamiento limitado.' },

  { category:'zapatillas', label:'Zapatillas', status:'pending', title:'Zapatillas — plantilla 1', desc:'Grid de modelos con vista rápida y selector de color.' },
  { category:'zapatillas', label:'Zapatillas', status:'pending', title:'Zapatillas — plantilla 2', desc:'Landing tipo "drop" para lanzamiento en edición limitada.' },
  { category:'zapatillas', label:'Zapatillas', status:'pending', title:'Zapatillas — plantilla 3', desc:'Comparador simple entre 2-3 modelos, ideal para tiendas chicas.' },

  { category:'joyas', label:'Joyas', status:'pending', title:'Joyas — plantilla 1', desc:'Catálogo elegante con fotos en detalle y fondo minimalista.' },
  { category:'joyas', label:'Joyas', status:'pending', title:'Joyas — plantilla 2', desc:'Landing para colección cápsula, con foco en la historia de la marca.' },
  { category:'joyas', label:'Joyas', status:'pending', title:'Joyas — plantilla 3', desc:'Página para regalos personalizados, con formulario de pedido a medida.' },

  { category:'accesorios', label:'Accesorios', status:'pending', title:'Accesorios — plantilla 1', desc:'Carteras y cinturones: catálogo con categorías cruzadas.' },
  { category:'accesorios', label:'Accesorios', status:'pending', title:'Accesorios — plantilla 2', desc:'Landing de producto único, ideal para un lanzamiento puntual.' },
  { category:'accesorios', label:'Accesorios', status:'pending', title:'Accesorios — plantilla 3', desc:'Página de combos/sets armados, con precio por pack.' },

  { category:'deportiva', label:'Indumentaria deportiva', status:'pending', title:'Deportiva — plantilla 1', desc:'Landing de ropa técnica de entrenamiento, con foco en rendimiento.' },
  { category:'deportiva', label:'Indumentaria deportiva', status:'pending', title:'Deportiva — plantilla 2', desc:'Catálogo por disciplina (running, gym, outdoor).' },
  { category:'deportiva', label:'Indumentaria deportiva', status:'pending', title:'Deportiva — plantilla 3', desc:'Página de equipo/uniformes para clubes o academias.' }
];

function renderProjectCard(p){
  const pendingClass = p.status === 'pending' ? ' pending' : '';
  const tagWord = p.status === 'done' ? 'Demo' : 'Plantilla en camino';
  const linkHtml = p.status === 'done'
    ? `<a href="${p.link}" class="project-link">Ver en GitHub →</a>`
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
  const seen = [];
  const labels = { all: 'Todos' };
  projects.forEach(p => { if (!seen.includes(p.category)) { seen.push(p.category); labels[p.category] = p.label; } });
  const cats = ['all', ...seen];

  filterRow.innerHTML = cats.map(c =>
    `<button class="filter-btn${c === 'all' ? ' active' : ''}" data-filter="${c}">${labels[c]}</button>`
  ).join('');

  grid.innerHTML = projects.map(renderProjectCard).join('');

  filterRow.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterRow.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      grid.querySelectorAll('.project-card').forEach(card => {
        card.classList.toggle('hide', f !== 'all' && card.dataset.cat !== f);
      });
    });
  });
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
root.setAttribute('data-palette', 'amber');
const paletteDots = document.querySelectorAll('.palette-dot');
paletteDots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    if (dot.classList.contains('active')) return;
    const rect = dot.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const palette = dot.dataset.palette;
    const flashColor = dot.dataset.color;
    sweepTransition(x, y, flashColor, () => {
      root.setAttribute('data-palette', palette);
      paletteDots.forEach(d => d.classList.toggle('active', d === dot));
    });
  });
});

// ---------- VOLVER ARRIBA ----------
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.classList.toggle('show', window.scrollY > 500);
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

// ---------- NAVEGADOR INTERACTIVO ----------
const demoTabs = document.querySelectorAll('.demo-tab');
const demoScreens = document.querySelectorAll('.demo-screen');
const demoUrl = document.getElementById('demoUrl');
const urls = { landing: 'tulanding.com', venta: 'tucurso.com', institucional: 'tunegocio.com' };
demoTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    demoTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const key = tab.dataset.demo;
    demoScreens.forEach(s => s.classList.toggle('active', s.dataset.screen === key));
    demoUrl.textContent = urls[key];
  });
});

// ---------- PARTÍCULAS CÁLIDAS EN EL HERO ----------
const canvas = document.getElementById('heroCanvas');
if (canvas && !reduceMotion) {
  const ctx = canvas.getContext('2d');
  const heroSection = canvas.closest('.hero');
  let particles = [];

  function resize(){
    canvas.width = heroSection.clientWidth * devicePixelRatio;
    canvas.height = heroSection.clientHeight * devicePixelRatio;
    canvas.style.width = heroSection.clientWidth + 'px';
    canvas.style.height = heroSection.clientHeight + 'px';
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  function makeParticles(){
    const w = heroSection.clientWidth, h = heroSection.clientHeight;
    const count = Math.min(70, Math.floor(w / 16));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.6 + 1.4,
      speedY: Math.random() * 0.35 + 0.12,
      drift: Math.random() * 0.4 - 0.2,
      baseAlpha: Math.random() * 0.45 + 0.35,
      twinkle: Math.random() * Math.PI * 2
    }));
  }
  function tick(){
    const w = heroSection.clientWidth, h = heroSection.clientHeight;
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.drift;
      p.twinkle += 0.02;
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      const alpha = p.baseAlpha * (0.65 + 0.35 * Math.sin(p.twinkle));
      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      glow.addColorStop(0, `rgba(230,171,77,${alpha})`);
      glow.addColorStop(1, 'rgba(230,171,77,0)');
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(250,224,170,${Math.min(alpha + 0.25, 1)})`;
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  resize();
  makeParticles();
  tick();
  window.addEventListener('resize', () => { resize(); makeParticles(); });
}

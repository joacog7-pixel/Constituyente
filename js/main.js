// ============================================
// COMITÉ CONSTITUYENTE REPUBLICANO
// main.js — carga dinámica de contenido
// ============================================

// Utilidad: parsea front-matter YAML simple de archivos markdown
function parseFrontMatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { data: {}, content: text };
  const data = {};
  match[1].split('\n').forEach(line => {
    const [key, ...val] = line.split(':');
    if (key && val.length) data[key.trim()] = val.join(':').trim().replace(/^["']|["']$/g, '');
  });
  const content = text.slice(match[0].length).trim();
  return { data, content };
}

// Formatea fecha legible
function formatDate(str) {
  if (!str) return '';
  const d = new Date(str + 'T00:00:00');
  return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ---- CARGAR NOTICIAS ----
async function cargarNoticias(limite = 3) {
  try {
    const res = await fetch('content/noticias/index.json');
    if (!res.ok) throw new Error('No se encontró el índice de noticias');
    const lista = await res.json();
    const recientes = lista.slice(0, limite);

    // Ticker
    const tickerText = document.getElementById('ticker-text');
    if (tickerText) {
      tickerText.textContent = recientes.map(n => n.titulo).join(' · ');
    }

    const contenedor = document.getElementById('noticias-lista');
    if (!contenedor) return;
    contenedor.innerHTML = '';

    recientes.forEach((noticia, i) => {
      const num = String(i + 1).padStart(2, '0');
      const div = document.createElement('div');
      div.className = 'noticia';
      div.innerHTML = `
        <div class="noticia-meta">
          <span class="noticia-num">${num} —</span>
          <span class="noticia-fuente">${noticia.fuente || ''}</span>
          <span class="noticia-fecha">${formatDate(noticia.fecha)}</span>
        </div>
        <a class="noticia-titulo" href="${noticia.url || '#'}" target="_blank" rel="noopener">${noticia.titulo}</a>
        <p class="noticia-desc">${noticia.resumen || ''}</p>
      `;
      contenedor.appendChild(div);
    });
  } catch (e) {
    const contenedor = document.getElementById('noticias-lista');
    if (contenedor) contenedor.innerHTML = '<p class="loading">Las noticias se cargarán pronto.</p>';
  }
}

// ---- CARGAR BLOG ----
async function cargarBlog(limite = 3) {
  try {
    const res = await fetch('content/blog/index.json');
    if (!res.ok) throw new Error('No se encontró el índice del blog');
    const lista = await res.json();
    const recientes = lista.slice(0, limite);

    const contenedor = document.getElementById('blog-lista');
    if (!contenedor) return;
    contenedor.innerHTML = '';

    recientes.forEach(art => {
      const div = document.createElement('div');
      div.className = 'blog-card';
      div.innerHTML = `
        <div class="blog-cat">${art.categoria || 'Artículo'}</div>
        <a class="blog-titulo" href="blog/${art.slug}.html">${art.titulo}</a>
        <div class="blog-autor">${art.autor || 'El Comité'} · ${formatDate(art.fecha)}</div>
      `;
      contenedor.appendChild(div);
    });
  } catch (e) {
    const contenedor = document.getElementById('blog-lista');
    if (contenedor) contenedor.innerHTML = '<p class="loading-dark">Los artículos se cargarán pronto.</p>';
  }
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  cargarNoticias(3);
  cargarBlog(3);
});

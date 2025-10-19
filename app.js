
const WHATSAPP_NUMBER = "525643195153";
const waLink = (name, price) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola Dinamita! Quiero: ${name} - $${price}`)}`;

let DATA = [];

async function loadData(){
  const res = await fetch('products.json');
  DATA = await res.json();
}

function card(p){
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <div class="img"><img src="${p.img}" alt="${p.name}" loading="lazy" width="420" height="420"></div>
    <h3>${p.name}</h3>
    <div class="brand">${p.brand||''}</div>
    <div class="price">$ ${Number(p.price).toLocaleString('es-MX')}</div>
    ${p.shortDesc?`<p class="desc">${p.shortDesc}</p>`:''}
    <div class="actions"><a class="btn" target="_blank" rel="noopener" href="${waLink(p.name, p.price)}">Pedir por WhatsApp</a></div>
  `;
  return div;
}

function renderList(rootId, arr, limit=null){
  const root = document.getElementById(rootId);
  if (!root) return;
  root.innerHTML = '';
  (limit?arr.slice(0,limit):arr).forEach(p => root.appendChild(card(p)));
}

function initSidebar(){
  const aside = document.querySelector('.sidebar');
  const collapse = document.querySelector('.collapse');
  const isMobile = () => window.matchMedia('(max-width:720px)').matches;

  const toggle = () => {
    if (isMobile()) {
      aside.classList.toggle('open');
    } else {
      aside.classList.toggle('collapsed');
    }
  }
  collapse?.addEventListener('click', toggle);

  // Mobile floating button
  const btn = document.createElement('button');
  btn.textContent = '☰';
  btn.className = 'sticky-toggle btn';
  btn.addEventListener('click', toggle);
  document.body.appendChild(btn);
}

function setupFilters(){
  const s = document.getElementById('search');
  const sort = document.getElementById('sort');
  if (!s && !sort) return;

  const page = document.body.dataset.page;
  const cat = document.body.dataset.category;
  const best = document.body.dataset.best === '1';

  const apply = () => {
    let list = [...DATA];
    if (cat) list = list.filter(p => p.category === cat);
    if (best) list = list.filter(p => p.bestSeller);

    const term = (s?.value||'').toLowerCase().trim();
    if (term) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(term) ||
        (p.brand||'').toLowerCase().includes(term) ||
        (p.tags||[]).some(t => (t||'').toLowerCase().includes(term))
      );
    }
    const ord = sort?.value;
    if (ord === 'price-asc') list.sort((a,b)=>a.price-b.price);
    if (ord === 'price-desc') list.sort((a,b)=>b.price-a.price);
    renderList('catalogList', list);
  };

  s?.addEventListener('input', apply);
  sort?.addEventListener('change', apply);
  apply();
}

function initHome(){
  renderList('topList', DATA.filter(p=>p.bestSeller), 8);
  renderList('supPreview', DATA.filter(p=>p.category==='suplementos'), 4);
  renderList('accPreview', DATA.filter(p=>p.category==='accesorios'), 4);
  renderList('customPreview', DATA.filter(p=>p.category==='custom'), 4);
  renderList('cafePreview', DATA.filter(p=>p.category==='cafeteria'), 4);
}

document.addEventListener('DOMContentLoaded', async () => {
  initSidebar();
  await loadData();
  const page = document.body.dataset.page;
  if (page === 'home') initHome();
  if (page === 'catalog') setupFilters();
});

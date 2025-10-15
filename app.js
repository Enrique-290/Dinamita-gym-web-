// Demo data with temporary placeholders.
// You can replace image URLs with brand images later.
// WhatsApp helper
const WAPP = (name) => `https://wa.me/525643195153?text=Hola%20Dinamita!%20Quiero%20el%20producto:%20${encodeURIComponent(name)}`;

// TOP sellers
const TOP = [
  {name:'Mutant Mass 2.27kg', brand:'Mutant', price:1499, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=Mutant+Mass'},
  {name:'NitroTech Whey', brand:'MuscleTech', price:1349, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=NitroTech'},
  {name:'C4 Original Pre-Workout', brand:'Cellucor', price:899, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=C4+Original'},
  {name:'Creatina Monohidratada', brand:'RC', price:599, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=Creatina'}
];

// Supplements by category
const SUPLEMENTOS = {
  proteinas: [
    {name:'Whey Protein Isolate 2lb', brand:'Gold Standard', price:1149, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=Whey+Isolate'},
    {name:'Mass Gainer 6lb', brand:'Serious Mass', price:1399, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=Mass+Gainer'},
    {name:'Whey Protein 5lb', brand:'MuscleTech', price:1599, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=Whey+5lb'},
    {name:'Proteína Vegetal', brand:'Plant', price:999, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=Vegana'}
  ],
  aminoacidos: [
    {name:'BCAA 2:1:1 300g', brand:'Nutrex', price:699, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=BCAA'},
    {name:'EAA Essential Aminos', brand:'Scivation', price:749, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=EAA'},
    {name:'Glutamina 500g', brand:'Universal', price:549, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=Glutamina'},
    {name:'Arginina 120 caps', brand:'Now', price:399, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=Arginina'}
  ],
  creatinas: [
    {name:'Creatina Monohidratada 300g', brand:'Cell-Tech', price:599, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=Creatina+300g'},
    {name:'Creatina Micronizada 500g', brand:'ON', price:899, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=Creatina+500g'}
  ],
  preentrenos: [
    {name:'Pre-Entreno Explosivo', brand:'C4', price:799, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=Pre+Entreno'},
    {name:'Pump Formula', brand:'Nitraflex', price:899, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=Pump'}
  ],
  vitaminas: [
    {name:'Multivitamínico Diario', brand:'GNC', price:499, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=Multi'},
    {name:'Omega 3', brand:'Now', price:449, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=Omega+3'}
  ]
};

// Accessories
const ACCESORIOS = [
  {name:'Faja de Soporte', brand:'Dinamita', price:399, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=Faja'},
  {name:'Cinturón de Cuero', brand:'Dinamita', price:699, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=Cintur%C3%B3n'},
  {name:'Guantes de Entrenamiento', brand:'Dinamita', price:299, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=Guantes'},
  {name:'Shaker 700ml', brand:'Dinamita', price:199, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=Shaker'}
];

// Custom Gear
const CUSTOM = [
  {name:'Playera Dinamita (personalizable)', brand:'Custom', price:299, img:'https://dummyimage.com/420x420/0f0f0f/aaaaaa.png&text=Playera'},
  {name:'Cinturón Grabado', brand:'Custom', price:799, img:'https://dummyimage.com/420x420/0f0f0f/aaaaaa.png&text=Cintur%C3%B3n'},
  {name:'Shaker Dinamita', brand:'Custom', price:249, img:'https://dummyimage.com/420x420/0f0f0f/aaaaaa.png&text=Shaker'},
  {name:'Termo Inox 1L', brand:'Custom', price:399, img:'https://dummyimage.com/420x420/0f0f0f/aaaaaa.png&text=Termo'}
];

// Cafe
const CAFE = [
  {name:'Café Latte', brand:'Barra', price:45, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=Latte'},
  {name:'Americano', brand:'Barra', price:35, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=Americano'},
  {name:'Batido Proteico', brand:'Barra', price:65, img:'https://dummyimage.com/420x420/ffffff/aaaaaa.png&text=Batido'}
];

function card(p){
  const el = document.createElement('div');
  el.className = 'card';
  el.innerHTML = `
    <div class="img"><img alt="${p.name}" src="${p.img}"></div>
    <h3>${p.name}</h3>
    <div class="brand">${p.brand}</div>
    <div class="price">$ ${p.price.toLocaleString('es-MX')}</div>
    <div class="actions">
      <a class="btn" href="${WAPP(p.name)}" target="_blank" rel="noopener">Pedir por WhatsApp</a>
    </div>`;
  return el;
}

function renderList(id, arr){
  const root = document.getElementById(id);
  root.innerHTML = '';
  arr.forEach(p => root.appendChild(card(p)));
}

function initTabs(){
  const tabs = document.querySelectorAll('#supTabs button');
  let current = 'proteinas';
  const switchTo = (cat) => {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.cat === cat));
    renderList('supList', SUPLEMENTOS[cat] || []);
    current = cat;
  };
  tabs.forEach(t => t.addEventListener('click', () => switchTo(t.dataset.cat)));
  switchTo(current);
}

function initNav(){
  const hamb = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  hamb.addEventListener('click', () => {
    nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderList('topList', TOP);
  initTabs();
  renderList('accList', ACCESORIOS);
  renderList('customList', CUSTOM);
  renderList('cafeList', CAFE);
  initNav();
});

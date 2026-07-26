/* Proyectos Maderé — script.js
   Renderiza portafolio, proceso, materiales y carrusel automático.
   ============================================================== */

const PROJECTS = [
  { title: "Closet empotrado en dormitorio principal", category: "Closet a medida", material: "Melamina + Madera maciza", image: "assets/proyecto-closet.jpg" },
  { title: "Biblioteca de piso a techo con escritorio", category: "Biblioteca", material: "Madera maciza + MDF", image: "assets/proyecto-biblioteca.jpg" },
  { title: "Cocina integral con mueble alto vidriado", category: "Cocina modular", material: "Madera + Mesón oscuro", image: "assets/proyecto-cocina.jpg" },
  { title: "Mesa de comedor en madera maciza", category: "Mesa de comedor", material: "Madera maciza pulida", image: "assets/proyecto-mesa.jpg" },
  { title: "Vestidor con iluminación integrada", category: "Walk-in closet", material: "Melamina + LED", image: "assets/proyecto-vestidor.jpg" },
  { title: "Cocina moderna con isla central", category: "Cocina moderna", material: "Laminado compacto + Madera", image: "assets/cocina-moderna.jpg" },
  { title: "Mueble de baño flotante con lavamanos", category: "Baño", material: "Laminado compacto (HPL)", image: "assets/mueble-baño.jpg" },
  { title: "Centro de entretenimiento para sala", category: "Sala moderna", material: "MDF + Chapa de madera", image: "assets/centro-entretenimiento.jpg" },
  { title: "Estantería flotante modular", category: "Estantes flotantes", material: "Madera maciza", image: "assets/estanteria-flotante.jpg" },
  { title: "Escritorio de home office a medida", category: "Home office", material: "Melamina + Triplex", image: "assets/escritorio-homeoffice.jpg" },
];

const PROCESO = [
  { n: "01", title: "Nos cuentas tu proyecto", desc: "Describe el mueble o proyecto que necesitas: medidas, material preferido, uso y estilo. Fotos y bocetos ayudan.", tag: "WhatsApp / Telegram" },
  { n: "02", title: "Cotización a medida", desc: "Preparamos una cotización personalizada según tu proyecto exacto — no genérica, no de catálogo.", tag: "Cotización personalizada" },
  { n: "03", title: "Fecha de entrega estimada", desc: "Al iniciar la fabricación te damos una fecha aproximada de entrega, con seguimiento durante el proceso.", tag: "Planificación clara" },
  { n: "04", title: "Fabricación con seguimiento", desc: "Puedes pedir evidencia del avance en cualquier momento: fotos, videos o visita al taller.", tag: "Evidencia bajo pedido" },
  { n: "05", title: "Entrega e instalación", desc: "Tu mueble o proyecto terminado, listo para instalar o usar en tu espacio.", tag: "Proyecto entregado" },
];

const MATERIALS = [
  { name: "Madera maciza", hint: "Piezas nobles, duraderas, con veta natural", gradient: "linear-gradient(120deg,#8B5A2B,#B37940)" },
  { name: "Melamina",      hint: "Acabado limpio, resistente, gran variedad de colores", gradient: "linear-gradient(120deg,#D8CBB4,#B7A98C)" },
  { name: "MDF",           hint: "Ideal para diseños con detalle y lacado",  gradient: "linear-gradient(120deg,#A9836A,#7C5C43)" },
  { name: "Triplex",       hint: "Resistente, versátil, excelente para estructuras", gradient: "linear-gradient(120deg,#C9AE83,#9B7E56)" },
];

/* ---------- Render portafolio ---------- */
const portfolioGrid = document.getElementById("portfolioGrid");
if (portfolioGrid) {
  PROJECTS.forEach((p, i) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4";
    const media = p.placeholder
      ? `<div class="portfolio-placeholder" style="background:${p.gradient}"></div><span class="placeholder-tag mono">Ejemplo referencial</span>`
      : `<img src="${p.image}" alt="${p.title}" loading="${i < 2 ? "eager" : "lazy"}" />`;
    col.innerHTML = `
      <div class="portfolio-card reveal">
        ${media}
        <div class="overlay"></div>
        <div class="caption">
          <span class="cat">${p.category}</span>
          <h3>${p.title}</h3>
          <span class="mat">${p.material}</span>
        </div>
      </div>`;
    portfolioGrid.appendChild(col);
  });
  // Tarjeta CTA
  const cta = document.createElement("div");
  cta.className = "col-12 col-sm-6 col-lg-4";
  cta.innerHTML = `
    <div class="portfolio-cta reveal">
      <div>
        <span class="eyebrow">Tu proyecto</span>
        <h3 style="margin-top:16px; font-size:1.35rem;">El próximo puede ser el tuyo.</h3>
        <p class="mt-3 text-paper-dim" style="font-size:.9rem">
          Cuéntanos qué necesitas construir. Cotización personalizada según medidas, material y uso.
        </p>
      </div>
      <a href="cotizar.html" class="btn-wood mt-4" style="width:fit-content">Iniciar mi proyecto →</a>
    </div>`;
  portfolioGrid.appendChild(cta);
}

/* ---------- Render proceso ---------- */
const procesoList = document.getElementById("procesoList");
if (procesoList) {
  PROCESO.forEach((s) => {
    const row = document.createElement("div");
    row.className = "proceso-item reveal";
    row.innerHTML = `
      <div class="mono n">${s.n}</div>
      <div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>
      <div class="tag">${s.tag}</div>`;
    procesoList.appendChild(row);
  });
}

/* ---------- Render materiales ---------- */
const materialsGrid = document.getElementById("materialsGrid");
if (materialsGrid) {
  MATERIALS.forEach((m) => {
    const card = document.createElement("div");
    card.className = "mat-card";
    card.innerHTML = `
      <div class="mat-swatch" style="background:${m.gradient}"></div>
      <h3>${m.name}</h3>
      <p>${m.hint}</p>`;
    materialsGrid.appendChild(card);
  });
}

/* ---------- Carrusel automático ---------- */
const track = document.getElementById("carouselTrack");
if (track) {
  // Duplicamos 3x para loop (solo proyectos con foto real)
  const conFoto = PROJECTS.filter((p) => !p.placeholder);
  const slides = [...conFoto, ...conFoto, ...conFoto];
  slides.forEach((p) => {
    const fig = document.createElement("figure");
    fig.innerHTML = `
      <img src="${p.image}" alt="${p.title}" loading="lazy" />
      <figcaption>
        <span class="text-amber">${p.category}</span>
        <span class="text-paper-dim">${p.material}</span>
      </figcaption>`;
    track.appendChild(fig);
  });
}

/* ---------- Header scroll state ---------- */
const header = document.getElementById("siteHeader");
if (header) {
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Mobile drawer ---------- */
const burger = document.getElementById("burgerBtn");
const drawer = document.getElementById("drawer");
const backdrop = document.getElementById("drawerBackdrop");
const close = document.getElementById("drawerClose");
const setDrawer = (open) => {
  if (!drawer) return;
  drawer.classList.toggle("open", open);
  backdrop.classList.toggle("open", open);
  document.body.style.overflow = open ? "hidden" : "";
};
burger && burger.addEventListener("click", () => setDrawer(true));
close && close.addEventListener("click", () => setDrawer(false));
backdrop && backdrop.addEventListener("click", () => setDrawer(false));
drawer && drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setDrawer(false)));

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------- Año footer ---------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

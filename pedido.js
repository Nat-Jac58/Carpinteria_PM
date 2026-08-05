/* Pedido directo — Proyectos Maderé
   Si el cliente viene desde cotizar.html, se recupera lo ya
   calculado desde localStorage ("madere_pedido_aprox") para no
   pedirle los datos de nuevo.
   Requiere catalogo-datos.js cargado antes de este archivo.
   ============================================================ */

const WHATSAPP = "593982486175";
const TELEGRAM = "vinicioserrano";

const state = { tipo: "closet", material: "melamina", otroNombre: "" };
let pedidoAprox = null;

/* ---------- Render option grids (mismo patrón que el cotizador) ---------- */
function renderOptions(containerId, items, key, subFn) {
  const c = document.getElementById(containerId);
  c.innerHTML = "";
  items.forEach((it) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "option-card" + (state[key] === it.id ? " active" : "");
    b.innerHTML = `<div class="title">${it.label}</div><div class="sub">${subFn(it)}</div>`;
    b.addEventListener("click", () => { state[key] = it.id; renderAll(); actualizarEnlaces(); });
    c.appendChild(b);
  });
}

function renderOtroCampo() {
  const wrap = document.getElementById("otroWrap");
  wrap.style.display = state.tipo === "otro" ? "block" : "none";
  const datalist = document.getElementById("muebleOtroList");
  if (datalist && !datalist.dataset.filled) {
    datalist.innerHTML = MUEBLES_CATALOGO.map((m) => `<option value="${m.nombre}"></option>`).join("");
    datalist.dataset.filled = "1";
  }
  const input = document.getElementById("p_otroNombre");
  if (input && state.otroNombre && !input.value) input.value = state.otroNombre;
}

function renderAll() {
  renderOptions("tipoGrid",     TIPOS,      "tipo",     (t) => `Base referencial USD ${t.base}`);
  renderOptions("materialGrid", MATERIALES, "material", (m) => m.nota);
  renderOtroCampo();
}

/* ---------- Saludo según la hora del día ---------- */
function saludoHora() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12)  return "Buenos días";
  if (h >= 12 && h < 19) return "Buenas tardes";
  return "Buenas noches";
}

/* ---------- Prellenado desde el cotizador ---------- */
function cargarPedidoAprox() {
  const raw = localStorage.getItem("madere_pedido_aprox");
  if (!raw) return;
  try { pedidoAprox = JSON.parse(raw); } catch (e) { return; }
  if (!pedidoAprox) return;

  if (pedidoAprox.nombre) document.getElementById("p_nombre").value = pedidoAprox.nombre;
  if (pedidoAprox.detalles) document.getElementById("p_detalles").value = pedidoAprox.detalles;

  const tipoMatch = TIPOS.find((t) => t.label === pedidoAprox.tipo);
  if (tipoMatch) {
    state.tipo = tipoMatch.id;
  } else if (pedidoAprox.tipo) {
    state.tipo = "otro";
    state.otroNombre = pedidoAprox.tipo;
  }
  const matMatch = MATERIALES.find((m) => m.label === pedidoAprox.material);
  if (matMatch) state.material = matMatch.id;

  const bloque = document.getElementById("referenciaBlock");
  const texto = document.getElementById("referenciaTexto");
  bloque.style.display = "block";
  texto.textContent =
    `Proyecto: ${pedidoAprox.tipo} · Material: ${pedidoAprox.material} · Acabado: ${pedidoAprox.acabado} · ` +
    `Medidas: ${pedidoAprox.medidas} · Presupuesto estimado: USD ${pedidoAprox.rangoMin} – ${pedidoAprox.rangoMax}. ` +
    `Ya incluimos esto en tu mensaje, no necesitas volver a escribirlo.`;

  document.getElementById("introText").textContent =
    "Recuperamos los datos de tu presupuesto — revisa que todo esté correcto y envíalo al taller.";
}

/* ---------- Construir y enlazar el mensaje ---------- */
function actualizarEnlaces() {
  const nombre = document.getElementById("p_nombre").value.trim();
  const detalles = document.getElementById("p_detalles").value.trim();

  const tipo = TIPOS.find((t) => t.id === state.tipo);
  let tipoLabel = tipo.label;
  if (state.tipo === "otro") {
    const otro = document.getElementById("p_otroNombre").value.trim();
    tipoLabel = otro || tipo.label;
  }
  const mat = MATERIALES.find((m) => m.id === state.material);

  const lines = [
    `${saludoHora()}, soy ${nombre || "(sin nombre)"} y quería solicitar información sobre el siguiente pedido:`,
    "",
    `📐 Proyecto: ${tipoLabel}`,
    `🪵 Material: ${mat.label}`,
  ];
  if (detalles) lines.push("", "📝 Detalles adicionales:", detalles);

  if (pedidoAprox) {
    lines.push(
      "",
      `✨ Acabado: ${pedidoAprox.acabado}`,
      `📏 Medidas: ${pedidoAprox.medidas}`,
      `💰 Presupuesto referencial (calculado previamente): USD ${pedidoAprox.rangoMin} – ${pedidoAprox.rangoMax}`
    );
  }

  const resumen = lines.join("\n");
  document.getElementById("sendWa").href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(resumen)}`;
  document.getElementById("sendTg").href = `https://t.me/${TELEGRAM}?text=${encodeURIComponent(resumen)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  cargarPedidoAprox();
  renderAll();
  actualizarEnlaces();

  ["p_nombre", "p_detalles", "p_otroNombre"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", actualizarEnlaces);
  });
  document.getElementById("sendWa").addEventListener("click", actualizarEnlaces);
  document.getElementById("sendTg").addEventListener("click", actualizarEnlaces);

  const header = document.getElementById("siteHeader");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});

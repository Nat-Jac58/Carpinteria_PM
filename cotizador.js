/* Cotizador automático — Proyectos Maderé
   Fórmula: precio = base × material × acabado × areaFactor
   Muestra el resultado en una ventana flotante (modal) y permite
   pasar a "pedido.html" con los datos ya recopilados.
   Requiere catalogo-datos.js cargado antes de este archivo.
   ============================================================ */

/* Estado */
const state = {
  tipo: "closet",
  material: "melamina",
  acabado: "estandar",
  otroNombre: "",
};

/* ---------- Render option grids ---------- */
function renderOptions(containerId, items, key, subFn) {
  const c = document.getElementById(containerId);
  c.innerHTML = "";
  items.forEach((it) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "option-card" + (state[key] === it.id ? " active" : "");
    b.dataset.id = it.id;
    b.innerHTML = `<div class="title">${it.label}</div><div class="sub">${subFn(it)}</div>`;
    b.addEventListener("click", () => { state[key] = it.id; renderAll(); });
    c.appendChild(b);
  });
}

/* ---------- "Otro proyecto": autocompletado contra el catálogo alterno ---------- */
function renderOtroCampo() {
  const wrap = document.getElementById("otroWrap");
  if (!wrap) return;
  wrap.style.display = state.tipo === "otro" ? "block" : "none";
  if (state.tipo !== "otro") return;

  const datalist = document.getElementById("muebleOtroList");
  if (datalist && !datalist.dataset.filled) {
    datalist.innerHTML = MUEBLES_CATALOGO
      .map((m) => `<option value="${m.nombre}">USD ${m.precio} aprox.</option>`)
      .join("");
    datalist.dataset.filled = "1";
  }

  const hint = document.getElementById("otroHint");
  const match = MUEBLES_CATALOGO.find(
    (m) => m.nombre.trim().toLowerCase() === state.otroNombre.trim().toLowerCase()
  );
  if (state.otroNombre.trim() === "") {
    hint.textContent = "Escribe el mueble que necesitas — te sugerimos opciones con precio referencial.";
  } else if (match) {
    hint.textContent = `Coincide con nuestro catálogo: base referencial USD ${match.precio}.`;
  } else {
    hint.textContent = "No encontramos una coincidencia exacta: se usará un precio base genérico, sujeto a revisión del taller.";
  }
}

/* ---------- Cálculo ---------- */
function compute() {
  const tipo = TIPOS.find((t) => t.id === state.tipo);
  let base = tipo.base;
  let tipoLabel = tipo.label;

  if (state.tipo === "otro") {
    const nombre = document.getElementById("q_otroNombre").value.trim();
    const match = MUEBLES_CATALOGO.find(
      (m) => m.nombre.toLowerCase() === nombre.toLowerCase()
    );
    if (match) base = match.precio;
    tipoLabel = nombre ? nombre : tipo.label;
  }

  const mat   = MATERIALES.find((m) => m.id === state.material);
  const acab  = ACABADOS.find((a) => a.id === state.acabado);
  const ancho = parseFloat(document.getElementById("q_ancho").value) || 0;
  const alto  = parseFloat(document.getElementById("q_alto").value)  || 0;
  const fondo = parseFloat(document.getElementById("q_fondo").value) || 0;
  const area  = ancho * alto;
  const areaFactor = Math.max(1, area / 2.5);

  const est = base * mat.factor * acab.factor * areaFactor;
  const estimado = Math.round(est / 10) * 10;

  return {
    tipoLabel, mat, acab, ancho, alto, fondo, area,
    estimado,
    rangoMin: Math.round((estimado * 0.9)  / 10) * 10,
    rangoMax: Math.round((estimado * 1.15) / 10) * 10,
  };
}

/* ---------- Mensaje / resumen (mismo orden para modal y WhatsApp/Telegram) ---------- */
function buildResumen(c, nombre, presupuesto, detalles) {
  const lines = ["*Nueva solicitud de presupuesto — Proyectos Maderé*", ""];

  const excedePresupuesto = presupuesto && c.estimado > parseFloat(presupuesto);

  if (nombre) lines.push(`👋 Hola ${nombre}.`, "");
  if (presupuesto) {
    if (excedePresupuesto) {
      lines.push("⚠️ Lo que has seleccionado ha superado tu presupuesto máximo.", "");
    } else {
      lines.push(`Presupuesto máximo: USD ${presupuesto}.`, "");
    }
  }

  lines.push(
    `📐 Proyecto: ${c.tipoLabel}`,
    `🪵 Material: ${c.mat.label}`,
    `✨ Acabado: ${c.acab.label}`,
    `📏 Medidas: ${c.ancho} m ancho × ${c.alto} m alto × ${c.fondo} m fondo (${c.area.toFixed(2)} m²)`,
    "",
    `💰 Presupuesto estimado: USD ${c.rangoMin} – ${c.rangoMax}`
  );
  if (detalles) lines.push("", "📝 Detalles adicionales:", detalles);
  lines.push("", "El precio final se debe acordar con el taller.");
  return lines.join("\n");
}

/* ---------- Modal de resultado ---------- */
let resultModal;
let lastResultado = null; // se guarda en localStorage solo si el cliente confirma con "Realizar un pedido"

function mostrarResultado() {
  const c = compute();
  const nombre = document.getElementById("q_nombre").value.trim();
  const presupuesto = document.getElementById("q_presupuesto").value.trim();
  const detalles = document.getElementById("q_detalles").value.trim();

  const excedePresupuesto = presupuesto && c.estimado > parseFloat(presupuesto);

  let saludoHtml = "";
  if (nombre) saludoHtml += `<p class="result-greet">👋 Hola ${nombre}.</p>`;
  if (presupuesto) {
    if (excedePresupuesto) {
      saludoHtml += `<p class="result-greet result-warning">Lo que has seleccionado ha superado tu presupuesto máximo.</p>`;
    } else {
      saludoHtml += `<p class="result-greet">Presupuesto máximo: USD ${presupuesto}.</p>`;
    }
  }

  document.getElementById("resultBody").innerHTML = `
    ${saludoHtml}
    <div class="result-rows">
      <div class="row"><span class="k">Proyecto</span><span class="v">${c.tipoLabel}</span></div>
      <div class="row"><span class="k">Material</span><span class="v">${c.mat.label}</span></div>
      <div class="row"><span class="k">Acabado</span><span class="v">${c.acab.label}</span></div>
      <div class="row"><span class="k">Medidas</span><span class="v">${c.ancho} × ${c.alto} × ${c.fondo} m (${c.area.toFixed(2)} m²)</span></div>
    </div>
    <div class="result-amount">
      <span class="eyebrow">Presupuesto estimado</span>
      <div class="amount">USD ${c.rangoMin.toLocaleString()} – ${c.rangoMax.toLocaleString()}</div>
    </div>
    ${detalles ? `<div class="result-detalles"><span class="k">Detalles adicionales</span><p>${detalles}</p></div>` : ""}
    <p class="result-disclaimer">El precio final se debe acordar con el taller.</p>
  `;

  // Dejamos el resultado listo, pero SOLO se guarda en localStorage si el
  // cliente confirma con el botón "Realizar un pedido" dentro de este modal.
  lastResultado = {
    nombre, presupuesto,
    tipo: c.tipoLabel, material: c.mat.label, acabado: c.acab.label,
    medidas: `${c.ancho} × ${c.alto} × ${c.fondo} m (${c.area.toFixed(2)} m²)`,
    rangoMin: c.rangoMin, rangoMax: c.rangoMax,
    detalles,
  };

  if (!resultModal) resultModal = new bootstrap.Modal(document.getElementById("resultModal"));
  resultModal.show();
}

/* ---------- Init ---------- */
function renderAll() {
  renderOptions("tipoGrid",     TIPOS,      "tipo",     (t) => `Base referencial USD ${t.base}`);
  renderOptions("materialGrid", MATERIALES, "material", (m) => m.nota);
  renderOptions("acabadoGrid",  ACABADOS,   "acabado",  (a) => `Factor ×${a.factor}`);
  renderOtroCampo();
  const ancho = parseFloat(document.getElementById("q_ancho").value) || 0;
  const alto  = parseFloat(document.getElementById("q_alto").value)  || 0;
  document.getElementById("q_area").textContent = (ancho * alto).toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
  renderAll();
  ["q_ancho", "q_alto"].forEach((id) => {
    document.getElementById(id).addEventListener("input", renderAll);
  });
  document.getElementById("q_otroNombre").addEventListener("input", (e) => {
    state.otroNombre = e.target.value;
    renderOtroCampo();
  });
  document.getElementById("btnCalcular").addEventListener("click", mostrarResultado);
  document.getElementById("btnIrPedido").addEventListener("click", () => {
    if (lastResultado) {
      localStorage.setItem("madere_pedido_aprox", JSON.stringify(lastResultado));
    }
    window.location.href = "pedido.html";
  });

  // Header scroll
  const header = document.getElementById("siteHeader");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});

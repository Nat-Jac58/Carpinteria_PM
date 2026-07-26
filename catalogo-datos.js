/* =========================================================
   Proyectos Maderé — catalogo-datos.js
   Fuente única de datos para cotizador.js y pedido.js.
   Editar SOLO este archivo para actualizar precios, materiales
   o el catálogo de muebles alternos — no requiere tocar el
   resto del código.
   ========================================================= */

/* Tipos de proyecto base (con precio referencial de partida) */
const TIPOS = [
  { id: "closet",     label: "Closet a medida",           base:  800 },
  { id: "cocina",     label: "Cocina modular",            base: 1500 },
  { id: "biblioteca", label: "Biblioteca / repisas",      base:  600 },
  { id: "mesa",       label: "Mesa / mueble suelto",      base:  400 },
  { id: "vestidor",   label: "Walk-in closet / vestidor", base: 1200 },
  { id: "otro",       label: "Otro proyecto",             base:  500 },
];

/* Materiales usados en carpintería moderna */
const MATERIALES = [
  { id: "melamina",  label: "Melamina",                factor: 1.00, nota: "Acabado limpio, gran variedad de colores" },
  { id: "mdf",       label: "MDF",                      factor: 1.15, nota: "Ideal para detalle y lacado" },
  { id: "madera",    label: "Madera maciza",            factor: 1.70, nota: "Piezas nobles con veta natural" },
  { id: "triplex",   label: "Triplex / contrachapado",  factor: 0.95, nota: "Resistente y versátil" },
  { id: "chapa",     label: "Chapa de madera (enchapado)", factor: 1.30, nota: "Apariencia de madera maciza a menor costo" },
  { id: "laminado",  label: "Laminado compacto (HPL)",  factor: 1.25, nota: "Alta resistencia a humedad y golpes: ideal cocina/baño" },
  { id: "osb",       label: "OSB",                      factor: 0.80, nota: "Estética industrial, económico y resistente" },
  { id: "reciclada", label: "Madera reciclada",         factor: 1.10, nota: "Piezas únicas, opción sostenible" },
];

/* Niveles de acabado */
const ACABADOS = [
  { id: "basico",   label: "Básico",   factor: 1.00 },
  { id: "estandar", label: "Estándar", factor: 1.20 },
  { id: "premium",  label: "Premium",  factor: 1.50 },
];

/* Catálogo alterno: muebles frecuentes con precio referencial.
   Se usa como autocompletado cuando el cliente elige "Otro proyecto".
   Si escribe un nombre que coincide (o se parece) a uno de esta lista,
   el cotizador toma ese precio base en lugar del genérico de "otro". */
const MUEBLES_CATALOGO = [
  { nombre: "Perchero de pie",              precio:  90 },
  { nombre: "Perchero de pared",             precio:  60 },
  { nombre: "Zapatero",                      precio: 150 },
  { nombre: "Mueble de TV",                  precio: 350 },
  { nombre: "Escritorio flotante",           precio: 220 },
  { nombre: "Cabecera de cama",              precio: 280 },
  { nombre: "Isla de cocina",                precio: 600 },
  { nombre: "Barra desayunadora",            precio: 380 },
  { nombre: "Mueble de baño con lavamanos",  precio: 420 },
  { nombre: "Estante flotante",              precio:  70 },
  { nombre: "Banca para entrada",            precio: 180 },
  { nombre: "Juguetero",                     precio: 160 },
  { nombre: "Organizador de closet interno", precio: 130 },
  { nombre: "Mueble para lavadora/secadora",  precio: 260 },
  { nombre: "Puerta corrediza a medida",     precio: 340 },
];

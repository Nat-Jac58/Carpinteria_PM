# Proyectos Maderé

Sitio estático para el taller de carpintería a medida **Proyectos Maderé**.

## Estructura

```
madere/
├── index.html          # Landing (hero, carrusel, portafolio, proceso, materiales, contacto)
├── cotizar.html         # Calculadora de presupuesto temporal (modal de resultado)
├── pedido.html          # Formulario de pedido directo → WhatsApp / Telegram
├── styles.css           # Estilos custom (paleta wood-dark) sobre Bootstrap 5
├── script.js             # Portafolio, proceso, materiales y carrusel (usado por index.html)
├── catalogo-datos.js     # ÚNICA fuente de datos: tipos, materiales, acabados y catálogo "otro"
├── cotizador.js          # Lógica de cálculo (usado por cotizar.html)
├── pedido.js             # Lógica de envío del pedido (usado por pedido.html)
└── assets/               # Logo + fotos de proyectos + taller
```

## Qué cambió respecto a la versión anterior

- **Menú Actualizado**: El Menú lateral para dispositivos móviles se actualizó y ahora es complétamente funcional.
- **Interfaz Mejorada**: Se añaden las secciones de:
    Carrusel.- Un carrusel donde se muestran algunos ejemplos de los proyectos que se elaboran con pequeñas etiquetas para identificar el tipo de mueble y sus materiales.
    Protafolio.- Un pequeño portafolio a modo de galería donde se detalla qué es cada proyecto y sus materiales, además de una última tarjeta donde el cliente puede detallar su propio proyecto.
- **Collage del taller**: la sección "Del taller" arma un collage con las fotos de proyectos existentes (`script.js`/`index.html`, clase `.collage-grid`). No se generó ninguna foto nueva.
- **`catalogo-datos.js` (nuevo)**: antes cada archivo JS tenía sus propios precios. Ahora `TIPOS`, `MATERIALES`, `ACABADOS` y `MUEBLES_CATALOGO` viven en un solo archivo que usan tanto `cotizador.js` como `pedido.js`. Para actualizar un precio o agregar un material, se edita un solo lugar.
- **Materiales ampliados**: se agregaron chapa de madera, laminado compacto (HPL), OSB y madera reciclada, con su nota y factor de precio.
- **"Otro proyecto" con catálogo alterno**: en vez de un campo de texto libre sin control, al elegir "Otro proyecto" aparece un campo con autocompletado (`<datalist>`) contra `MUEBLES_CATALOGO` (perchero, zapatero, mueble de TV, estante flotante, etc., cada uno con precio referencial). Si el cliente escribe un nombre que coincide, se usa ese precio; si no coincide, se usa un precio genérico y se avisa que quedará sujeto a revisión. Es la solución más simple sin backend: para crecerla más adelante, ese arreglo se puede migrar a una hoja de Google Sheets publicada como JSON, pero para GitHub Pages un archivo JS editable es lo más práctico.
- **Cotizador simplificado**: se quitó "Ciudad" (ahora es "Presupuesto para el proyecto (opcional)") y se eliminó la sección de "Extras". "Detalles adicionales" queda para especificaciones generales.
- **Resultado en ventana flotante**: ya no hay tarjeta lateral fija. Al pulsar "Calcular presupuesto" se abre un modal (Bootstrap) con el mismo orden que antes iba al mensaje de WhatsApp: saludo (si hay nombre o presupuesto), proyecto, material, acabado, medidas, **Presupuesto temporal**, detalles adicionales y el aviso "El presupuesto final se debe acordar con el taller". Botones: **Cerrar** y **Realizar un pedido**.
- **`pedido.html` (nuevo)**: formulario de pedido directo (nombre, tipo de proyecto, material, detalles adicionales). Si el cliente llegó desde "Realizar un pedido" en el cotizador, los datos ya calculados se recuperan de `localStorage` y se muestran/incluyen automáticamente en el mensaje, sin pedirlos de nuevo. El botón "Enviar pedido" arma el mensaje con un saludo según la hora (Buenos días / Buenas tardes / Buenas noches) y lo manda por WhatsApp o Telegram.
- **Sección de "Proximamente"**: Se añade una sección de próximamente para futuras secciones o actualizaciones informadas. Se trasladó la sección de "Tiktok" a este apartado.

## Cómo funciona el cálculo

```
presupuesto = base_tipo × factor_material × factor_acabado × factor_area
```

- **Base tipo**: closet 800, cocina 1500, biblioteca 600, mesa 400, vestidor 1200, otro 500 (o el precio del catálogo si coincide)
- **Material**: ver `catalogo-datos.js` (8 opciones con su factor)
- **Acabado**: básico ×1.00 · estándar ×1.20 · premium ×1.50
- **Área**: `max(1, ancho × alto / 2.5)`
- Se muestra como **rango** ±10-15 % para dar margen al taller.

## Personalización rápida

- **Números de contacto**: `WHATSAPP` y `TELEGRAM` en `cotizador.js`... espera, ahora solo en `pedido.js` (y los enlaces `wa.me/...` de `index.html`).
- **Paleta**: variables CSS en `:root` dentro de `styles.css`.
- **Proyectos del portafolio**: array `PROJECTS` en `script.js`.
- **Precios, materiales, acabados y catálogo de "otro proyecto"**: todo en `catalogo-datos.js`.

## Publicar

Subir la carpeta completa a un repo de GitHub y activar GitHub Pages (rama `main`, carpeta `/`).

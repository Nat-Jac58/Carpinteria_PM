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

- **Cambio en los textos**: Se ha cambiado el texto de ciertas partes en el cotizador y en la sección para fabricar pedidos.
- **Mensaje de advertencia**: Si el cotizador detecta que la cotización máxima que el usuario proporciona opcionalmente es superada, en la ventana de resultados se le indica al usuario que ha superado el límite propouesto con un pequeño mensaje de color rojo en la parte superior.

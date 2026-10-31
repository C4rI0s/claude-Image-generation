# Color

## La fórmula sobria
- **Neutros cálidos o fríos** (no mezcles): un papel, una tinta, un gris de texto, un gris suave, una línea.
- **Un acento** (el de la marca o el del producto) para: botón, palabra clave del titular, una barra o cifra.
  Menos del 10 % de la superficie.
- Sin degradados, sin brillos, sin sombras de color. Si hace falta profundidad: un cambio de fondo plano o una línea
  de 1-2 px neutra.

## Contraste (WCAG)
- Texto normal ≥ 4,5:1; texto grande (≥ 24 px o ≥ 19 px en negrita en pantalla) ≥ 3:1.
- El exportador mide el contraste real de cada texto sobre su fondo y avisa.
- Acentos claros (ámbar, verde agua, amarillo): **nunca como texto sobre claro**. Haz una versión oscura del acento
  para texto (`--acento-texto`) y deja el claro para rellenos y fondos oscuros.

## Modo oscuro
- En **redes**, el oscuro es una decisión de diseño (portadas, cierres). Fondo casi negro cálido (#17150f), nunca
  #000; texto #f4f1ea, no #fff puro en bloques largos.
- En **correo**, el fondo es **blanco** y se declara `color-scheme: light`. Aun así, Gmail en el móvil y Outlook.com
  invierten colores: el comprobador genera `oscuro.png` para ver qué pasa (logos con fondo transparente que
  desaparecen, iconos que se vuelven bloques). Los logos van en PNG con su propio fondo o con un contorno que
  funcione en ambos.

## Paletas de partida
| Tono | Papel | Tinta | Texto | Suave | Línea |
|---|---|---|---|---|---|
| Cálido (GamzyHost) | #faf8f4 / #ffffff | #1d1a15 | #33302b | #6b655c | #e2ddd4 |
| Frío (tipo Proton) | #ffffff | #1b1b1f | #3b3b45 | #6d6d7a | #e5e5ea |

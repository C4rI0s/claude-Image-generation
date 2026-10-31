---
name: direccion-de-arte
description: Dirección de arte para piezas de marketing de cualquier marca con nivel de agencia (Proton, Linear, Stripe) y estética sobria y plana. Úsala SIEMPRE antes de diseñar o revisar cualquier pieza visual (correo HTML, carrusel de Instagram, portada, banner, miniatura, OG, story, anuncio o vídeo) y cuando pidan «que quede más profesional», «menos IA», «más limpio», una guía de estilo, la marca de un cliente o proyecto, tipografía, rejillas, paleta, jerarquía o textos de una pieza. Empieza pidiendo o leyendo el brief de marca y lo convierte en un marca.json que usan todas las plantillas; termina con la revisión visual obligatoria.
---

# Dirección de arte · la base de todas las piezas

Esta skill decide **cómo tiene que verse y leerse** una pieza, para la marca que sea. Las skills de formato
(`correo-marketing-html`, `carrusel-instagram`, `piezas-graficas`, `imagen-ia`, `reel-de-marketing`) deciden **cómo
se fabrica**. Léela primero; luego abre la del formato.

Ninguna marca va metida en las plantillas: la marca es un **parámetro**, un `marca.json` (nombre, colores, tipografía,
logo, web, tono). Las plantillas traen de ejemplo una marca ficticia, **Pliego** (facturación para autónomos), para
que se vean solas; con tu `marca.json` se convierten en las de tu marca sin tocar su HTML.

## El listón
Nivel agencia: **sobrio, plano, con aire y con contenido real**. Una pieza buena se reconoce porque:
- tiene **una sola idea** y se entiende en 2 segundos;
- la jerarquía es obvia: **titular → apoyo → acción**, y nada compite con el titular;
- usa **una familia tipográfica** (dos como mucho: una de texto y una mono para datos);
- el color es **neutro + un acento** que ocupa menos del 10 % de la superficie;
- todo cae en una **rejilla**: mismos márgenes, mismas distancias, alineado a la izquierda;
- enseña **el producto de verdad** (capturas reales, o maquetas de interfaz dibujadas en HTML con los tokens), no
  decoración.

**Prohibido** (es lo que delata a una IA o a una plantilla barata): brillos y resplandores (glow, neón, `text-shadow`),
sombras difusas grandes, degradados de colores, **bordes o barras laterales de color**, emojis, mayúsculas en todo el
titular, exclamaciones, iconos 3D brillantes, fondos con texturas, más de un acento, texto centrado en bloques largos,
efectos «cristal», palabras de relleno («increíble», «revolucionario», «descubre», «potencia»), stock genérico de
gente señalando.

## Flujo (no te saltes pasos)
0. **Brief de marca → `marca.json`** (`references/marca.md`). Si ya hay un `marca.json` en la carpeta del trabajo,
   léelo y compruébalo. Si no, consíguelo en este orden: el manual o la guía de la marca que te den; su web (saca
   `font-family`, colores de botones y fondos, radios y logo del CSS y del HTML); y lo que falte, **pregúntalo**
   (nombre, web, colores, tipografía, logo, tono). Parte de `plantillas/marca.json` y compruébalo:
   ```bash
   node <skill>/scripts/comprobar-marca.mjs marca.json
   ```
   Mide el contraste de cada pareja que usan las plantillas (texto sobre papel, acento sobre oscuro, texto del
   botón…). Errores = se corrige la paleta (normalmente oscureciendo `acento-texto`) antes de diseñar.
1. **Brief de la pieza** (`references/brief.md`): objetivo, público, una idea, una acción, formato y canal, y los
   **datos verificados**. Las cifras se comprueban en la fuente viva (web, panel, base de datos) y se fechan, nunca
   en un material viejo: los heros y correos antiguos suelen arrastrar cifras caducadas.
2. **Copy primero** (`references/copy.md`): titular, apoyo y botón escritos y recortados ANTES de maquetar. Si el
   texto no funciona en un .txt, el diseño no lo salva.
3. **Sistema** (`references/tipografia.md`, `references/rejilla-y-espacio.md`, `references/color.md`): escala
   tipográfica, márgenes, rejilla y paleta como tokens (variables CSS que salen del `marca.json`). Nada de valores
   sueltos.
4. **Maqueta** con la skill del formato, partiendo de su plantilla y pasando `--marca marca.json` al exportador.
5. **Revisión visual obligatoria** (`references/revision-visual.md`): renderiza con Chrome de verdad, **abre el PNG y
   míralo**, pasa la lista, corrige y vuelve a renderizar. No se entrega nada que no hayas visto renderizado.

## Reglas rápidas que más mejoran una pieza
- **Escala con contraste**: el titular al menos 2,5 veces el cuerpo. Titulares de 3-8 palabras.
- **Interletra negativa en titulares** (−0,03 a −0,045 em) y positiva en etiquetas en mayúsculas (+0,08 a +0,14 em).
- **Interlineado**: titulares 0,95-1,05; texto 1,35-1,65.
- **Cortes de línea a mano** en titulares: `<br>` donde respira la frase y `&nbsp;` entre número y unidad o en las dos
  últimas palabras. Ni viudas ni «no / en 45».
- **Ancho de línea**: 45-75 caracteres en texto corrido (correo), 20-35 en redes.
- **Márgenes generosos**: 8 % del lado corto como mínimo en redes (88 px en 1080), 40 px en correo.
- **Números**: cifras reales, con su unidad separada por espacio duro (`20&nbsp;GB`), tabulares en tablas.
- **Una acción**: un botón. Si hay dos, el segundo es un enlace de texto.
- **Acento con contraste**: un acento claro (amarillo, ámbar, coral, verde agua) no se usa como texto sobre claro;
  va de relleno (botón, etiqueta) o como texto sobre oscuro. Para texto sobre claro, `acento-texto`.
- **Maquetas de producto** cuando no hay capturas buenas: tarjetas planas con la tipografía y los colores de la
  marca (factura, pedido, panel, mensaje), con datos verosímiles. Más nítidas y coherentes que una captura borrosa.
- **Capturas reales**: recortadas a lo que importa, con radio coherente y una línea fina neutra; el fondo de la
  captura tiene que casar con el lienzo.
- **Coherencia entre formatos**: una campaña = mismo `marca.json`, mismo titular, misma maqueta en todos los tamaños.

## Ficheros
- `plantillas/marca.json` · la marca de ejemplo (Pliego, ficticia): cópiala y rellénala con la tuya
- `scripts/comprobar-marca.mjs` · campos obligatorios, formato de colores y contraste de cada pareja (sin dependencias)
- `references/marca.md` · cómo sacar la marca (preguntas, de una web, de un manual), qué es cada campo y cómo derivar
  la paleta cuando solo te dan un color
- `references/brief.md` · plantilla de brief y preguntas que hay que contestar antes de diseñar
- `references/copy.md` · titulares, botones, tono, palabras prohibidas
- `references/tipografia.md` · escalas, emparejamientos, ajustes finos, fuentes seguras en correo
- `references/rejilla-y-espacio.md` · márgenes, rejillas por formato, ritmo vertical, zonas seguras
- `references/color.md` · paletas sobrias, contraste, acento, modo oscuro
- `references/revision-visual.md` · la lista de la revisión obligatoria (común a todas las skills)

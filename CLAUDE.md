# claude-skills-marketing

Marketplace **privado** de plugins de Claude Code con skills de marketing visual **para cualquier marca**.
Repositorio: https://github.com/C4rI0s/claude-Image-generation (privado: no cambiar la visibilidad). El nombre del
marketplace (para instalar) sigue siendo `claude-skills-marketing`.

- **General, sin marca propia**: ninguna marca real (tampoco las del dueño) en skills, plantillas, referencias ni
  manifiestos (orden de Carlos, 31-10-2026). La marca entra siempre por `marca.json` (skill `direccion-de-arte`).
  Los ejemplos usan marcas ficticias: **Pliego** (facturación; plantillas base y look 1), **Vértice** (trading;
  oscuro-glow), **Pulso** (periféricos y esports; editorial-recorte y tech-grid), **Cometa** (tienda gaming;
  producto-3d-mascota) y **Nimbo** (prueba de cambio de marca). Nombrar un estilo de referencia («como las imágenes
  de Proton») vale; usar su marca, sus fotos o sus capturas, no. Nada de personas reales: las personas de los
  ejemplos son generadas con IA y con los logos inventados tapados.
- Cada skill tiene `SKILL.md`, plantillas con contenido de ejemplo y un script de render y revisión con Chrome.
- Plantillas HTML: colores y fuente solo como `var(--…)`; nombre, web y logo en elementos `data-marca`. Correos:
  marcadores `%%colores.x%%`, `%%nombre%%`… que rellena `aplicar-marca.mjs`.
- Ficheros repetidos a propósito (cada plugin se instala solo): `exportar.mjs` es el mismo en `carrusel-instagram` y
  `piezas-graficas`; `producto.css` y `producto.js` son los mismos en `producto-en-contexto`, `piezas-graficas` y
  `carrusel-instagram`. Si cambias uno, copia los otros (compruébalo con `md5sum`).
- Antes de subir un cambio en una plantilla: renderízala con su script (con `--marca`), mira los PNG, prueba también
  con otra marca y actualiza `docs/ejemplos/`.
- **Cinco looks + plano** (orden de Carlos 31-10-2026, una referencia por look; el selector está en
  `direccion-de-arte/references/looks.md`). Cada look es una skill de `piezas-graficas` con `references/estilo.md`
  (reglas medidas), plantillas en hero 16:9, 1:1, 4:5, banner X y story, y su `data-estilo` en el exportador:
  - `producto-en-contexto` (`producto`, ref. Proton Pass): app sobre degradado suave, 1-2 capas con borde de ~1 px
    degradado y sombra oscura suave; nada de glow, sombras de color ni desenfoque.
  - `oscuro-glow` (ref. Impulse World): azul marino, datos desenfocados, 2 tarjetas con borde luminoso y cifra,
    titular plateado en mayúsculas. Resplandor **contenido**: alfa ≤ 0,6, desenfoque ≤ 8 % del lado corto, ≤ 3
    elementos, sin text-shadow.
  - `editorial-recorte` (ref. Logitech esports): collage de recortes sobre negro, líneas finas de construcción; plano.
  - `producto-3d-mascota` (ref. Instant Gaming): banner redondeado azul-violeta, producto 3D + mascota solapados,
    partículas y bokeh sutiles, sombras de contacto.
  - `tech-grid` (ref. Logitech Deal Days): cuadrícula, marcos de borde fino azul y lima, pistas de circuito, titular
    ancho en mayúsculas; plano.
  - **Plano** (correos HTML, piezas de texto): sin brillos, sombras ni bordes laterales de color.
- Exportador: `data-fondo` = capa decorativa (blur permitido, su texto no se revisa); `img data-recorte` = recorte con
  alfa (error si no la trae o si un texto pisa su parte opaca); `tipografia.display` → `--fuente-display`.
- `_ref/` (renders, marcas de prueba en `_ref/marcas/`, recortes originales, herramientas de 3D y de quitar fondo en
  `_ref/herramientas/`), `_ref-proton/` (referencias de marcas reales) y `node_modules/` no se suben.
- Si cambias algo que el usuario tiene que recoger, sube la `version` del plugin y de `metadata.version`.
- **Nivel de las referencias** (pulido v2.3.0, 31-10-2026): cada look se revisa con su hero **al lado de su
  referencia** (`node _ref/herramientas/3d/collage.mjs salida.png "Ref=_ref-proton/x.png" "Muestra=_ref/v4/…/hero.png"`)
  y mirando los detalles al 200-400 % (`techgrid-zoom.mjs`). Lo que delata lo amateur: 3D sin detalle interior,
  productos «de juguete», halos en orejas y mechones, huecos vacíos en las ventanas, fondos pobres. Las reglas
  medidas de cada look están en su `references/estilo.md`. Muestras finales en
  `C:\AgenticOS\workspace\documentos\muestras-marketplace\v4`.

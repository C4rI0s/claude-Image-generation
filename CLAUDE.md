# claude-skills-marketing

Marketplace **privado** de plugins de Claude Code con skills de marketing visual **para cualquier marca**.
Repositorio: https://github.com/C4rI0s/claude-Image-generation (privado: no cambiar la visibilidad). El nombre del
marketplace (para instalar) sigue siendo `claude-skills-marketing`.

- **General, sin marca propia**: ninguna marca real (tampoco las del dueño) en skills, plantillas, referencias ni
  manifiestos (orden de Carlos, 31-10-2026). La marca entra siempre por `marca.json` (skill `direccion-de-arte`).
  Los ejemplos usan marcas ficticias: **Pliego** (la de las plantillas) y **Nimbo** (prueba de cambio de marca).
  Nombrar un estilo de referencia («como las imágenes de Proton») vale; usar su marca o sus capturas, no.
- Cada skill tiene `SKILL.md`, plantillas con contenido de ejemplo y un script de render y revisión con Chrome.
- Plantillas HTML: colores y fuente solo como `var(--…)`; nombre, web y logo en elementos `data-marca`. Correos:
  marcadores `%%colores.x%%`, `%%nombre%%`… que rellena `aplicar-marca.mjs`.
- Ficheros repetidos a propósito (cada plugin se instala solo): `exportar.mjs` es el mismo en `carrusel-instagram` y
  `piezas-graficas`; `producto.css` y `producto.js` son los mismos en `producto-en-contexto`, `piezas-graficas` y
  `carrusel-instagram`. Si cambias uno, copia los otros (compruébalo con `md5sum`).
- Antes de subir un cambio en una plantilla: renderízala con su script (con `--marca`), mira los PNG, prueba también
  con otra marca y actualiza `docs/ejemplos/`.
- Dos estilos. **Plano** (correos HTML, piezas de texto): sin brillos, sombras ni bordes laterales de color.
  **Producto en contexto** (orden de Carlos 31-10-2026, referencia Proton Pass): la app sobre un degradado suave con
  1-2 capas flotantes, borde de ~1 px degradado y una sombra oscura suave; con contención: nada de glow, neón,
  sombras de color ni desenfoque. Esas piezas llevan `data-estilo="producto"` y el exportador lo vigila.
- `_ref/`, `_ref-proton/` (renders, marcas de prueba y referencias de marcas reales) y `node_modules/` no se suben.
- Si cambias algo que el usuario tiene que recoger, sube la `version` del plugin y de `metadata.version`.

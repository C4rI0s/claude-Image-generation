# claude-skills-marketing

Marketplace **privado** de plugins de Claude Code con skills de marketing visual **para cualquier marca**.
Repositorio: https://github.com/C4rI0s/claude-skills-marketing (privado: no cambiar la visibilidad).

- **General, sin marca propia**: ninguna marca real (tampoco las del dueño) en skills, plantillas, referencias ni
  manifiestos (orden de Carlos, 31-10-2026). La marca entra siempre por `marca.json` (skill `direccion-de-arte`).
  Los ejemplos usan marcas ficticias: **Pliego** (la de las plantillas) y **Nimbo** (prueba de cambio de marca).
- Cada skill tiene `SKILL.md`, plantillas con contenido de ejemplo y un script de render y revisión con Chrome.
- Plantillas HTML: colores y fuente solo como `var(--…)`; nombre, web y logo en elementos `data-marca`. Correos:
  marcadores `%%colores.x%%`, `%%nombre%%`… que rellena `aplicar-marca.mjs`.
- `exportar.mjs` es el mismo en `carrusel-instagram` y `piezas-graficas`: si cambias uno, copia el otro.
- Antes de subir un cambio en una plantilla: renderízala con su script (con `--marca`), mira los PNG, prueba también
  con otra marca y actualiza `docs/ejemplos/`.
- Objetivo: imágenes con aspecto de agencia (diseño visual), planas y sobrias: sin brillos ni bordes laterales de color.
- `_ref/` (renders, marcas de prueba y recursos de trabajo) y `node_modules/` no se suben.
- Si cambias algo que el usuario tiene que recoger, sube la `version` del plugin y de `metadata.version`.

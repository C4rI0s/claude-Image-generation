---
name: carrusel-instagram
description: Crea carruseles de Instagram (y LinkedIn) profesionales a 1080x1350 con tipografía cuidada, jerarquía clara, ritmo entre diapositivas y exportación a PNG con un Chrome real, más una hoja de contacto y la vista de la rejilla del perfil para revisarlos. Úsala cuando pidan un carrusel, «un post de varias imágenes», diapositivas para Instagram, una guía o un listado en formato post, o rehacer un carrusel que se ve amateur.
---

# Carruseles de Instagram (1080x1350)

Antes, si está instalada, lee **`direccion-de-arte`** (brief, copy, marca, revisión). Aquí está cómo se fabrica.

## Qué hay aquí
- `plantillas/carrusel.html` · sistema completo de 7 diapositivas con todos los tipos: **portada**, **punto con
  ficha**, **punto con progreso**, **lista**, **cifra**, **tabla** y **cierre**. Tokens en `:root`, tema claro y
  `.oscuro`, cabecera y pie fijos con contador y barra de progreso. Ejemplo real: GamzyDrive.
- `scripts/exportar.mjs` · exporta cada `[data-pieza]` a PNG exacto y revisa: tamaño, texto fuera o cortado,
  margen de seguridad, letra mínima, contraste real, sombras/brillos, imágenes rotas o ampliadas, fuentes que no
  cargan. Con `--carrusel` añade `hoja.png` (toda la secuencia a tamaño de móvil) y la rejilla 3:4 del perfil.
- `references/estructura-y-ritmo.md` · cómo construir la historia de un carrusel y su ritmo.

## Flujo
1. **Guion antes que diseño** (`references/estructura-y-ritmo.md`): 5-10 diapositivas, una idea por diapositiva,
   titulares de ≤ 8 palabras escritos en una lista. Portada = gancho; última = una acción. Datos comprobados.
2. **Copia la plantilla** a la carpeta del trabajo: `cp <skill>/plantillas/carrusel.html ./carrusel-drive.html`.
3. **Tokens**: cambia `--acento` / `--acento-texto` (y la marca de la cabecera) para el producto. Nada de colores
   sueltos en el HTML.
4. **Monta las diapositivas** duplicando el tipo que toque y cambiando solo el texto. Mantén `data-pieza` numerado
   (`01-portada`, `02-…`), el contador `0X / 0N` y la barra `style="--paso:X/N"`.
5. **Exporta y revisa** (obligatorio):
   ```bash
   cd <skill>/scripts && npm install          # solo la primera vez (usa el Chrome o Edge del sistema)
   node <skill>/scripts/exportar.mjs ./carrusel-drive.html --carrusel
   ```
   Arregla todos los errores y avisos (o justifica el aviso, p. ej. «texto sobre foto, comprobado a ojo»).
6. **Mira** `out/<nombre>/hoja.png` (ritmo, coherencia, legibilidad a tamaño de móvil, la portada en la rejilla
   3:4) y **cada PNG a tamaño real** (cortes, viudas, alineaciones, erratas). Pasa la lista de
   `direccion-de-arte/references/revision-visual.md`. Corrige y repite.
7. **Entrega** los PNG en orden y el texto del pie de la publicación (≤ 125 caracteres antes del «más», 3-5 hashtags
   concretos al final, sin emojis si la marca no los usa).

## Reglas que hacen que un carrusel parezca de agencia
- **Mismo esqueleto en todas**: cabecera (marca + sección) arriba, pie (contador + barra) abajo, mismo margen
  (88 px). Es lo que hace que deslizar se sienta como un documento.
- **Portada**: titular grande (104-132 px), una línea de apoyo, «Desliza →» y una imagen real que **sangre** por un
  borde. Nada de logotipos enormes ni «HILO 🧵».
- **Una idea por diapositiva**; si el titular necesita «y», son dos diapositivas.
- **Ritmo**: alterna una cargada (lista, tabla, ficha) con una ligera (cifra, frase). Fondo oscuro solo para
  portada, una cifra de impacto y cierre.
- **Texto grande**: titulares 72-84 px, apoyo 38-44 px, nada por debajo de 22 px. Se lee en un móvil a 1/3 de tamaño.
- **Pruebas visuales** (fichas, tablas, barras) dibujadas en HTML con los tokens, no capturas borrosas.
- **Capturas**: sin texto quemado que duplique o contradiga el de la diapositiva (recórtalas); nunca ampliadas.
- **Rejilla del perfil**: Instagram enseña la portada recortada a 3:4 (pierde ~34 px por lado). Nada importante
  pegado a los laterales; comprueba la vista `perfil` de la hoja.
- **Cierre**: una acción (botón dibujado + URL o «enlace en la bio») y, si cabe, «Guárdalo».

## Problemas conocidos
- Fuente de sistema en el PNG → la fuente de Google no cargó (sin red o nombre mal escrito); el exportador lo marca.
- Imagen rota → URL relativa a una carpeta que no existe o sin conexión; usa rutas relativas al HTML o https.
- `—` o comillas raras → guarda el HTML en UTF-8.
- Plus Jakarta Sans separa el punto final en tamaños grandes («control .»): es la fuente; asúmelo o quita el punto.

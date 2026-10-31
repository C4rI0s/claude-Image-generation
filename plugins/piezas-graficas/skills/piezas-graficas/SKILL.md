---
name: piezas-graficas
description: Diseña y exporta piezas gráficas estáticas de marketing con nivel de agencia — portadas, banners (X, Discord, YouTube), miniaturas de YouTube, imágenes OG para enlaces, stories, heros para correos y portadas de tienda — como HTML renderizado con Chrome a PNG exacto, con el texto nítido y una revisión automática y visual. Úsala cuando pidan una portada, un banner, una miniatura, una imagen para compartir un enlace, una story, la imagen de cabecera de un correo o «la misma campaña en todos los formatos».
---

# Piezas gráficas (portadas, banners, miniaturas, OG, stories, heros)

Antes, si está instalada, lee **`direccion-de-arte`**. Para fondos o escenas generadas con IA, **`imagen-ia`**.

## Principio
**El texto se compone en HTML, nunca dentro de la imagen generada.** La pieza es un `<section>` con su tamaño
exacto; debajo va el material (captura real, foto, fondo de IA) y encima el texto con la tipografía de la marca.
Así sale nítido, sin faltas, corregible en segundos y coherente en todos los formatos.

## Qué hay aquí
- `plantillas/piezas.html` · una campaña en 5 formatos: `hero-correo` (1200x680, para 600 a 2x), `og` (1200x630),
  `miniatura` (1280x720), `banner-x` (1500x500) y `story` (1080x1920). Incluye el **recortador**
  `.recorte[data-crop="x,y,ancho,alto"]` para sacar exactamente una parte de una captura. Ejemplo real: GamzyDrive.
- `references/formatos.md` · tamaños, zonas seguras y qué funciona en cada canal (incluye Discord y BuiltByBit).
- `scripts/exportar.mjs` · el mismo exportador que los carruseles (ver más abajo).

## Flujo
1. **Brief** y **copy** (skill `direccion-de-arte`): un titular que sirva para todos los formatos, una versión
   corta para la miniatura (2-4 palabras) y los datos comprobados.
2. **Material**: capturas reales a buena resolución (al menos el tamaño al que se van a ver; mejor 2x). Si hay
   que hacerlas: navegador sin cabeza a 1600-1920 px, con datos de ejemplo y sin datos personales.
   Fondos de ambiente: skill `imagen-ia` (sin texto en la imagen).
3. **Copia la plantilla** a la carpeta del trabajo y borra los formatos que no hagan falta. Para uno nuevo, duplica
   una `<section>` y pon `data-pieza`, `data-ancho`, `data-alto`, `data-margen` (zona segura) y `data-min-letra`.
4. **Recortes**: mide el rectángulo en la captura original (en píxeles) y ponlo en `data-crop`. Si la caja es más
   grande que el rectángulo, la imagen se amplía y el exportador avisa: haz la caja más pequeña o consigue una
   captura mayor. Comprueba que **el fondo de la captura casa con el lienzo** (captura con fondo crema → pieza clara)
   y que no arrastra texto quemado que contradiga la pieza.
5. **Exporta y revisa** (obligatorio):
   ```bash
   cd <skill>/scripts && npm install           # solo la primera vez
   node <skill>/scripts/exportar.mjs ./piezas-drive.html
   node <skill>/scripts/exportar.mjs ./piezas-drive.html --solo og      # una sola
   ```
6. **Mira** `out/<nombre>/hoja.png` (coherencia de la campaña) y cada PNG a tamaño real. Además, juzga cada pieza
   **al tamaño al que se verá**: la miniatura a 320 px de ancho, el OG a 500 px, la story en un móvil. Pasa la lista
   de `direccion-de-arte/references/revision-visual.md`. Corrige y repite.
7. **Entrega** los PNG (y súbelos donde toque: el hero del correo a una URL pública https).

## Reglas por tipo
- **Miniatura**: 2-4 palabras enormes, contraste máximo, una sola imagen o elemento. Nada en la esquina inferior
  derecha (duración).
- **OG**: marca + titular corto + URL. Se ve a ~500 px: nada de texto pequeño.
- **Banner**: el texto fuera de la zona de la foto de perfil; la imagen puede sangrar por la derecha.
- **Story**: 250 px arriba y 340 abajo son de Instagram; texto grande; una acción.
- **Hero de correo**: 1200 px de ancho, texto ≥ 26 px (se verá a la mitad), fondo plano que case con el correo
  (blanco o crema), nada esencial que solo esté en la imagen (repítelo en el HTML del correo).

## Exportar otras cosas
`exportar.mjs` vale para cualquier HTML: `--selector` elige qué exportar, `--escala 2` para retina, `--estricto`
para fallar también con avisos. Las piezas existentes de otros proyectos (p. ej. portadas de BuiltByBit hechas en
HTML) se pueden exportar igual marcando sus contenedores con `data-pieza`.

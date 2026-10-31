# claude-skills-marketing

Marketplace privado de plugins para **Claude Code** con skills para hacer piezas de marketing visual con nivel de
agencia **para cualquier marca o proyecto**: imágenes de producto en contexto, correos HTML, carruseles de
Instagram, portadas, banners, miniaturas, imágenes OG, stories, heros de correo y reels.

## Cinco looks y un selector

Cada look es una skill con su guía medida (radios, bordes, sombras, degradados, tipografía, composición), plantillas
en **hero 16:9, 1:1, 4:5, banner de X y story** exportadas a PNG 2x, y su propio criterio en el revisor automático.
La skill `direccion-de-arte` elige el look según la marca y el objetivo (`references/looks.md`):

| Look | Skill | Úsalo para | Qué lo define |
|---|---|---|---|
| **1 · Producto en contexto** | `producto-en-contexto` | SaaS y apps: enseñar una función | la interfaz real en una ventana sobre un degradado suave, 1-2 capas flotantes con borde de 1 px degradado y sombra oscura suave (estilo Proton/Linear) |
| **2 · Oscuro glow** | `oscuro-glow` | lanzamientos y ofertas de fintech, trading, cripto o SaaS en oscuro; referidos | azul marino con datos desenfocados, dos tarjetas con borde luminoso y cifra grande, titular plateado en mayúsculas, CTA en píldora; resplandor **contenido** |
| **3 · Editorial recorte** | `editorial-recorte` | gaming, esports, equipos, lifestyle | collage de recortes con jerarquía de tamaños sobre negro, arco y marco de líneas finas de construcción, cruces de registro, mucho aire y nada de texto encima |
| **4 · Producto 3D + mascota** | `producto-3d-mascota` | producto físico o gaming con mascota o personaje; tiendas | banner redondeado azul-violeta con partículas y bokeh, producto 3D y mascota solapados, sombras de contacto y luz de color coherente |
| **5 · Tech grid** | `tech-grid` | catálogo y ofertas de gaming, periféricos, hardware | cuadrícula fina sobre negro-azul, productos que se salen de marcos de borde fino azul y lima, pistas de circuito con nodos, titular ancho en mayúsculas |
| Plano | `piezas-graficas`, correos, carruseles de texto | correos HTML y piezas solo de texto | una tipografía, neutros y un acento, sin brillos, sombras ni bordes de color |

Fuera de los looks, todo es **plano**. Cada look solo levanta sus excepciones medidas (el resplandor, solo en
oscuro-glow y con alfa ≤ 0,6 en 3 elementos como mucho; las mayúsculas, solo en oscuro-glow y tech-grid…) y ninguno
permite texto encima del sujeto.

La marca es un **parámetro**. La skill `direccion-de-arte` empieza pidiendo o leyendo el brief de marca (nombre,
colores, tipografía, logo, tono) y lo guarda en un `marca.json`; las plantillas lo aplican solas (variables CSS en
las piezas, marcadores en los correos), incluidos los fondos y los tokens de cada look, que salen del acento si la
marca no los trae. Los ejemplos usan marcas ficticias: **Pliego** (facturación, look 1), **Vértice** (trading,
look 2), **Pulso** (periféricos y esports, looks 3 y 5) y **Cometa** (tienda gaming, look 4); **Nimbo** es la marca
con la que se prueba que todo cambia sin tocar el HTML.

Todas las skills siguen la misma regla: **no se entrega nada que no se haya renderizado con un Chrome real y mirado**.
Los scripts exportan a PNG (a 2x si se pide) y revisan lo que suele salir mal: texto cortado o fuera, textos que se
pisan, texto que choca con una tarjeta, bloques sin aire, viudas en titulares, márgenes, contraste (también de
titulares con degradado), brillos según el look, recortes sin transparencia, texto encima de un recorte (píxel a
píxel), fuentes que no cargan, imágenes rotas o ampliadas y, en correos, compatibilidad con Gmail, Outlook y Apple
Mail.

| Producto en contexto · hero 16:9 | Cabecera de correo |
|---|---|
| ![Hero](docs/ejemplos/producto-hero.png) | ![Cabecera](docs/ejemplos/producto-cabecera-correo.png) |

| Campaña de producto en 7 formatos | Carrusel 1080x1350 | Correo «producto» |
|---|---|---|
| ![Producto](docs/ejemplos/producto-hoja.png) | ![Carrusel](docs/ejemplos/carrusel-hoja.png) | ![Correo](docs/ejemplos/correo-producto.png) |

Las mismas plantillas con otra marca (otro `marca.json`, sin tocar el HTML):
![Otra marca](docs/ejemplos/producto-otra-marca.png)

### Looks 2-5

| Oscuro glow · Vértice (trading) | Editorial recorte · Pulso (esports) |
|---|---|
| ![Oscuro glow](docs/ejemplos/look-oscuro-glow.jpg) | ![Editorial recorte](docs/ejemplos/look-editorial-recorte.jpg) |
| **Producto 3D + mascota · Cometa (tienda gaming)** | **Tech grid · Pulso (periféricos)** |
| ![Producto 3D + mascota](docs/ejemplos/look-producto-3d-mascota.jpg) | ![Tech grid](docs/ejemplos/look-tech-grid.jpg) |

Cada look en sus 5 formatos (hero 16:9, 1:1, 4:5, banner de X y story):
[oscuro glow](docs/ejemplos/look-oscuro-glow-hoja.jpg) ·
[editorial recorte](docs/ejemplos/look-editorial-recorte-hoja.jpg) ·
[producto 3D + mascota](docs/ejemplos/look-producto-3d-mascota-hoja.jpg) ·
[tech grid](docs/ejemplos/look-tech-grid-hoja.jpg).

Los cuatro con otra marca (Nimbo), sin tocar el HTML:
![Looks con otra marca](docs/ejemplos/looks-otra-marca.jpg)

Las personas de los ejemplos están generadas con IA (no son reales) y el producto y la mascota son renders 3D
propios; las marcas son ficticias.

## Novedades

**2.3.0 · pasada de pulido de los cinco looks.** Cada muestra se ha puesto al lado de su referencia y se ha
rehecho lo que se notaba amateur; lo aprendido está en el `references/estilo.md` de cada look como reglas medidas.
- **Producto 3D + mascota**: la torre, por dentro como una de verdad (ventiladores con aspas barridas y aro de luz,
  radiador con aletas, bomba, gráfica con su carcasa, memorias, cableado trenzado, cristal con reflejos) y la
  mascota con más acabado (vinilo con aspecto de subsurface, luz de recorte, ojos con iris y brillos, mano que
  saluda).
- **Tech grid**: ratón gaming creíble (carcasa ergonómica, botones laterales, rueda estriada, agarre texturizado,
  tira de luz) que se sale del marco con intención; teclado con leyendas y luz entre teclas; luz y sombras comunes.
- **Editorial recorte**: recortes sin halo junto a orejas y mechones (`preparar-recortes.mjs` gana `contorno` y
  `limpiar`) y un grupo más compacto.
- **Oscuro glow**: fondo con gráfico de velas de verdad (volumen, medias, eje de precios) y un portátil con panel
  detallado y base de aluminio con reflejo.
- **Producto en contexto**: la ventana ya no deja huecos vacíos; el contexto atenuado llega hasta el borde.

## Instalación

Como el repositorio es privado, Claude Code necesita acceso a GitHub: `gh auth login` hecho, o `GITHUB_TOKEN` /
`GH_TOKEN` en el entorno.

```
/plugin marketplace add C4rI0s/claude-Image-generation
/plugin install direccion-de-arte@claude-skills-marketing
/plugin install correos-marketing@claude-skills-marketing
/plugin install carruseles-instagram@claude-skills-marketing
/plugin install piezas-graficas@claude-skills-marketing
/plugin install video-marketing@claude-skills-marketing
```

Desde una copia local: `claude plugin marketplace add ./claude-skills-marketing`.

Para los vídeos, instala también el motor de animación:

```
/plugin marketplace add FefeRP/motion-graphics-skills
/plugin install motion-graphics@motion-graphics-skills
```

Para actualizar: `/plugin marketplace update claude-skills-marketing`.

### Requisitos de los scripts
- **Node 18 o superior.**
- **Chrome o Edge** recientes (el estilo de producto usa `color-mix()` y colores relativos de CSS). Los scripts los
  usan directamente, así que no hace falta descargar ningún navegador. Si no hay ninguno, define `CHROME_PATH` o
  ejecuta `npx playwright install chromium`.
- La primera vez, en la carpeta `scripts/` de cada skill: `npm install` (solo instala `playwright-core`). Claude lo
  hace solo cuando sigue la skill. `comprobar-marca.mjs` y `aplicar-marca.mjs` no necesitan nada.
- `recortar.mjs` (quitar fondos, en `imagen-ia/scripts`) instala un modelo local de segmentación (≈ 330 MB) la
  primera vez que se usa; solo hace falta para los looks con recortes si no traes ya los PNG sin fondo.
- **ffmpeg** para revisar vídeos por fotogramas (`reel-de-marketing`).

## Plugins y skills

| Plugin | Skill | Para qué |
|---|---|---|
| `direccion-de-arte` | `direccion-de-arte` | La base: **brief de marca → `marca.json`** con `comprobar-marca.mjs` (campos, tokens de los looks y contraste de cada pareja de color), **selector de look** (`references/looks.md`), brief de la pieza, copy, tipografía, rejillas y zonas seguras, color y la **revisión visual obligatoria**. Las demás skills la usan |
| `piezas-graficas` | `producto-en-contexto` | **Look 1 · imágenes de producto al nivel de Proton o Linear**: la app en una ventana (lateral, buscador, lista, iconos de línea) sobre un degradado, con modal, fila destacada y avisos flotantes. Cabecera de correo, hero 16:9, post 1:1 y 4:5, banner de X, miniatura y story a PNG 2x. Componentes en `producto.css` + `producto.js` y reglas medidas en `references/estilo.md` |
| `piezas-graficas` | `oscuro-glow` | **Look 2 · lanzamientos y ofertas en oscuro** (fintech, trading, SaaS): fondo azul marino con gráfico y dashboard desenfocados, dos tarjetas con borde luminoso y cifra grande, titular plateado en mayúsculas y CTA en píldora, con un resplandor medido |
| `piezas-graficas` | `editorial-recorte` | **Look 3 · editorial de gaming y lifestyle**: collage de personas o producto recortados con jerarquía de tamaños, arco, marco y cruces de líneas finas, mucho aire y el texto siempre fuera de la imagen |
| `piezas-graficas` | `producto-3d-mascota` | **Look 4 · producto 3D con mascota**: banner redondeado azul-violeta con partículas y bokeh, render del producto y mascota solapados con sombras de contacto y luz de color de la marca |
| `piezas-graficas` | `tech-grid` | **Look 5 · catálogo tech y gaming**: cuadrícula fina, productos que rompen marcos de borde fino en dos acentos, pistas de circuito con nodos y titular en grotesca ancha en mayúsculas |
| `piezas-graficas` | `piezas-graficas` | Base plana y **exportador común** de todos los looks: hero de correo, OG, miniatura de YouTube, banner de X, story y otros formatos con titular, maquetas de producto y un recortador exacto de capturas |
| `piezas-graficas` | `imagen-ia` | Imágenes de apoyo con IA (Higgsfield u otro) sin el «look IA»: prompts con la paleta de la marca, control de gasto, revisión y **`recortar.mjs`** para quitar el fondo de personas, productos y mascotas (modelo local) |
| `correos-marketing` | `correo-marketing-html` | Correos de marketing sobrios con **cabecera de producto en contexto**. Plantillas `producto`, `anuncio` y `oferta`; `aplicar-marca.mjs` las pasa a tu marca y `comprobar-correo.mjs` hace comprobaciones estáticas y renderiza **escritorio, móvil, sin imágenes y modo oscuro** |
| `carruseles-instagram` | `carrusel-instagram` | Carruseles 1080x1350 con diapositivas de **producto en contexto** (portada, punto en claro, punto en oscuro) y de texto (lista, cifra, tabla, cierre). `exportar.mjs --marca marca.json --carrusel --escala 2` genera los PNG, la hoja de contacto y la rejilla 3:4 del perfil |
| `video-marketing` | `reel-de-marketing` | Reels y vídeos cortos: guion por segundos, zonas seguras 9:16, subtítulos y revisión por fotogramas, sobre motion-graphics (Remotion) |

## Uso rápido

Puedes pedirlo en lenguaje normal; Claude elige la skill:

- «Hazme las imágenes del lanzamiento de la función de recordatorios: cabecera de correo, hero y post, estilo Proton».
- «Campaña de referidos de mi app de trading en oscuro, con dos cifras grandes» (oscuro-glow).
- «Presenta a los jugadores del nuevo equipo, estilo editorial con recortes» (editorial-recorte).
- «Banner de la tienda con nuestro producto y la mascota en 3D» (producto-3d-mascota).
- «Rebajas de periféricos en todos los formatos, con cuadrícula y marcos» (tech-grid).
- «¿Qué look le va a esta marca?» (selector de `direccion-de-arte`).
- «Esta es la web de mi cliente: saca su marca y hazme un carrusel de 6 diapositivas sobre su nuevo servicio».
- «Correo de lanzamiento con la plantilla de producto para la marca de `./marca.json`, y compruébalo».
- «La misma campaña en OG, miniatura, banner de X y story».

O a mano:

```bash
# Marca
node plugins/direccion-de-arte/skills/direccion-de-arte/scripts/comprobar-marca.mjs marca.json
# Producto en contexto o cualquier look (a 2x): el HTML de la plantilla del look, con su CSS al lado
node plugins/piezas-graficas/skills/piezas-graficas/scripts/exportar.mjs producto-en-contexto.html --marca marca.json --escala 2
node plugins/piezas-graficas/skills/piezas-graficas/scripts/exportar.mjs tech-grid.html --marca marca.json --escala 2
# Quitar el fondo de una foto o un render (para los looks con recortes)
node plugins/piezas-graficas/skills/imagen-ia/scripts/recortar.mjs foto.png recorte.png
# Carrusel o piezas
node plugins/carruseles-instagram/skills/carrusel-instagram/scripts/exportar.mjs mi-carrusel.html --marca marca.json --carrusel --escala 2
node plugins/piezas-graficas/skills/piezas-graficas/scripts/exportar.mjs mis-piezas.html --marca marca.json
# Correo
node plugins/correos-marketing/skills/correo-marketing-html/scripts/aplicar-marca.mjs plantillas/producto.html marca.json -o correo.html
node plugins/correos-marketing/skills/correo-marketing-html/scripts/comprobar-correo.mjs correo.html --marketing
```

## Estructura

```
.claude-plugin/marketplace.json        catálogo del marketplace
plugins/<plugin>/.claude-plugin/plugin.json
plugins/<plugin>/skills/<skill>/SKILL.md
                                /plantillas/   HTML de partida con una marca ficticia de ejemplo (y su
                                               marca-ejemplo.json en los looks); el CSS del look
                                               (producto.css + producto.js, oscuro-glow.css…) y sus recortes
                                /scripts/      exportadores y comprobadores (Node + playwright-core)
                                /references/   guías que la skill carga cuando las necesita
docs/ejemplos/                         renders de las plantillas
```

## Añadir o cambiar una skill
1. Crea `plugins/<plugin>/skills/<nombre>/SKILL.md` con el frontmatter `name` y `description`. La descripción dice
   **cuándo** usarla, porque es lo que hace que Claude la elija.
2. Si es un plugin nuevo, añade su `plugin.json` y su entrada en `.claude-plugin/marketplace.json`.
3. Si trae plantillas, que lean la marca de `marca.json` (variables CSS o marcadores `%%…%%`), renderízalas con su
   script, míralas y deja el resultado en `docs/ejemplos/`. Nada de marcas reales en las plantillas.
4. `producto.css`/`producto.js` y `exportar.mjs` están repetidos en varias skills a propósito (cada plugin se instala
   solo): si cambias uno, copia los demás.
5. Sube la `version` del plugin y `metadata.version` para que `/plugin marketplace update` lo recoja.

Uso privado. No se publica.

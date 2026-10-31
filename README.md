**English** · [Español](README.es.md)

# claude-skills-marketing

A plugin marketplace for **Claude Code** with skills that produce agency-grade visual marketing pieces **for any brand
or project**: product-in-context images, HTML emails, Instagram carousels, covers, banners, thumbnails, OG images,
stories, email heroes and reels.

## Five looks and a selector

Each look is a skill with its own measured guide (radii, borders, shadows, gradients, typography, composition),
templates in **16:9 hero, 1:1, 4:5, X banner and story** exported to 2x PNG, and its own rules in the automatic
checker. The `direccion-de-arte` (art direction) skill picks the look from the brand and the goal
(`references/looks.md`):

| Look | Skill | Use it for | What defines it |
|---|---|---|---|
| **1 · Product in context** | `producto-en-contexto` | SaaS and apps: showing one feature | the real interface in a window over a soft gradient, 1-2 floating layers with a 1 px gradient border and a soft dark shadow (Proton/Linear style) |
| **2 · Dark glow** | `oscuro-glow` | launches and offers for fintech, trading, crypto or dark SaaS; referral campaigns | navy blue with blurred data, two cards with a luminous border and a big figure, silver all-caps headline, pill CTA; **restrained** glow |
| **3 · Editorial cutout** | `editorial-recorte` | gaming, esports, teams, lifestyle | collage of cutouts with size hierarchy on black, thin construction-line arc and frame, registration crosses, lots of air and no text on top |
| **4 · 3D product + mascot** | `producto-3d-mascota` | physical products or gaming with a mascot or character; stores | rounded blue-violet banner with particles and bokeh, overlapping 3D product and mascot, contact shadows and coherent colored light |
| **5 · Tech grid** | `tech-grid` | gaming, peripherals and hardware catalogs and offers | fine grid on black-blue, products breaking out of thin blue and lime frames, circuit tracks with nodes, wide all-caps headline |
| Flat | `piezas-graficas`, emails, text carousels | HTML emails and text-only pieces | one typeface, neutrals and one accent; no glows, shadows or colored borders |

Outside the looks, everything is **flat**. Each look only lifts its own measured exceptions (glow only in dark-glow,
at alpha ≤ 0.6 on at most 3 elements; all caps only in dark-glow and tech-grid…) and none of them allows text on top of
the subject.

The brand is a **parameter**. The `direccion-de-arte` skill starts by asking for (or reading) the brand brief (name,
colors, typography, logo, tone) and stores it in a `marca.json`; the templates apply it automatically (CSS variables in
the pieces, placeholders in the emails), including each look's backgrounds and tokens, which are derived from the
accent color if the brand does not provide them. The examples use fictional brands: **Pliego** (invoicing, look 1),
**Vértice** (trading, look 2), **Pulso** (peripherals and esports, looks 3 and 5) and **Cometa** (gaming store, look 4);
**Nimbo** is the brand used to prove that everything changes without touching the HTML.

All skills follow the same rule: **nothing is delivered that has not been rendered in a real Chrome and looked at**.
The scripts export to PNG (at 2x on request) and check what usually goes wrong: cut-off or off-canvas text,
overlapping text, text colliding with a card, blocks without breathing room, widows in headlines, margins, contrast
(including gradient headlines), glows according to the look, cutouts without transparency, text over a cutout
(pixel by pixel), fonts that fail to load, broken or upscaled images and, in emails, Gmail, Outlook and Apple Mail
compatibility.

| Product in context · 16:9 hero | Email header |
|---|---|
| ![Hero](docs/ejemplos/producto-hero.png) | ![Header](docs/ejemplos/producto-cabecera-correo.png) |

| Product campaign in 7 formats | 1080x1350 carousel | "Product" email |
|---|---|---|
| ![Product](docs/ejemplos/producto-hoja.png) | ![Carousel](docs/ejemplos/carrusel-hoja.png) | ![Email](docs/ejemplos/correo-producto.png) |

The same templates with another brand (another `marca.json`, HTML untouched):
![Another brand](docs/ejemplos/producto-otra-marca.png)

### Looks 2-5

| Dark glow · Vértice (trading) | Editorial cutout · Pulso (esports) |
|---|---|
| ![Dark glow](docs/ejemplos/look-oscuro-glow.jpg) | ![Editorial cutout](docs/ejemplos/look-editorial-recorte.jpg) |
| **3D product + mascot · Cometa (gaming store)** | **Tech grid · Pulso (peripherals)** |
| ![3D product + mascot](docs/ejemplos/look-producto-3d-mascota.jpg) | ![Tech grid](docs/ejemplos/look-tech-grid.jpg) |

Each look in its 5 formats (16:9 hero, 1:1, 4:5, X banner and story):
[dark glow](docs/ejemplos/look-oscuro-glow-hoja.jpg) ·
[editorial cutout](docs/ejemplos/look-editorial-recorte-hoja.jpg) ·
[3D product + mascot](docs/ejemplos/look-producto-3d-mascota-hoja.jpg) ·
[tech grid](docs/ejemplos/look-tech-grid-hoja.jpg).

The four looks with another brand (Nimbo), HTML untouched:
![Looks with another brand](docs/ejemplos/looks-otra-marca.jpg)

The people in the examples are AI-generated (not real), the product and the mascot are our own 3D renders, and the
brands are fictional.

## Style references

Each look starts from a visual reference that was studied and measured (radii, borders, shadows, gradients,
typography and composition). They are only **named** here: **their images and anything from their brands are not
included**, and the examples use fictional brands.

| Look | Style reference | What is taken from it |
|---|---|---|
| 1 · Product in context | the product images of **Proton Pass** (and sites such as Linear, Stripe or Vercel) | the real interface full-bleed over a soft gradient, one or two floating layers with a 1 px gradient border, dimmed context, medium-weight headlines |
| 2 · Dark glow | the "Refer and earn" campaign by **Impulse World** | navy blue with blurred data, two cards with a luminous border and a big figure, silver headline, pill CTA |
| 3 · Editorial cutout | an esports editorial piece by **Logitech** | collage of cutouts with size hierarchy on black, thin construction lines, registration crosses |
| 4 · 3D product + mascot | a banner by **Instant Gaming** | 3D product and mascot overlapping on a blue-violet gradient with particles, contact shadows |
| 5 · Tech grid | the **Deal Days** campaign by **Logitech** | fine grid, products in thin frames joined by circuit tracks, wide all-caps headline |

The brands mentioned belong to their owners. Inside each skill, `referencia/golden.jpg` is **our own** demo of the look
(the one to match), not the original image.

## Demos

All pieces use fictional brands; the people are AI-generated and the product and mascot are our own renders.

| 3D product + mascot · hero | 3D product + mascot · 4:5 |
|---|---|
| ![](docs/demos/01-producto-3d-mascota-hero.jpg) | ![](docs/demos/02-producto-3d-mascota-4x5.jpg) |
| **Tech grid · hero** | **Tech grid · X banner** |
| ![](docs/demos/03-tech-grid-hero.jpg) | ![](docs/demos/04-tech-grid-banner-x.jpg) |
| **Editorial cutout · hero** | **Editorial cutout · 1:1** |
| ![](docs/demos/05-editorial-recorte-hero.jpg) | ![](docs/demos/06-editorial-recorte-1x1.jpg) |
| **Dark glow · hero** | **Dark glow · 4:5** |
| ![](docs/demos/07-oscuro-glow-hero.jpg) | ![](docs/demos/08-oscuro-glow-4x5.jpg) |
| **Product in context · hero** | |
| ![](docs/demos/09-producto-en-contexto-hero.jpg) | |

### Clean-room tests (the skill alone, with brands it had never seen)

| Product in context · Tilde | Dark glow · Arca |
|---|---|
| ![](docs/pruebas-en-limpio/01-producto-en-contexto-tilde.jpg) | ![](docs/pruebas-en-limpio/02-oscuro-glow-arca.jpg) |
| **Editorial cutout · Orbe** | **3D product + mascot · Nami** |
| ![](docs/pruebas-en-limpio/03-editorial-recorte-orbe.jpg) | ![](docs/pruebas-en-limpio/04-producto-3d-mascota-nami.jpg) |
| **Tech grid · Orbe (no photos)** | **Tech grid · Rumbo (with photos)** |
| ![](docs/pruebas-en-limpio/05-tech-grid-orbe-sin-fotos.jpg) | ![](docs/pruebas-en-limpio/06-tech-grid-rumbo-con-fotos.jpg) |

## What to expect (clean-room tested)

Version 2.4.0 was tested the way another person would use it: a freshly installed Claude Code, no memory or helpers,
only this marketplace and a normal brief ("make me a hero for my brand X with look Y"), with brands and products the
skill had not seen. Average score: **6.8/10 with 2.3.0 and 8.5/10 with 2.4.0** (8 new brands, no serious flaws in
the final version). The honest summary:

- **Product in context and dark glow come out on their own at demo level** (8.5-9 out of 10): the interface, the
  cards and the background are HTML. What raises the score most: screenshots or the real structure of your app, and
  real figures.
- **Tech grid**: with **photos of your products** (best on a plain background) it cuts them out, removes the halo and
  matches the light. Without photos, if you sell keyboards, mice or headsets, the 3D library paints them in your
  colors (8/10), but they are generic products, not your model. Other products (controllers, chairs, consoles) need
  photos or AI.
- **Editorial cutout needs photographic people**: your photos or AI (Higgsfield, about $0.07 for 3 people) and it
  reaches 8-8.5 (with AI it warns that the people are not the real ones). Without photos or AI it cannot be done: the
  exporter does not allow silhouettes or drawn figures.
- **3D product + mascot is the most demanding**: with AI it generates your product and your mascot with a 3D finish
  for cents (9/10 in both tests, about 12 min); without AI, only the library products and a recolored generic
  mascot.
- **Time and cost**: 5-15 min per hero with the 2 polish rounds. AI: $0 if you bring photos; $0.02-0.10 per piece if
  subjects have to be generated (always with your permission or within the cap you set).
- **What it does not do on its own**: your logo if you do not provide it (it uses the name as text), the exact model
  of your product without photos or a 3D model, or a mascot that only exists in your head without a good description
  or images.

![Clean-room test with new brands](docs/ejemplos/prueba-en-limpio.jpg)
## What's new

**2.4.0 · the skill alone, at demo level.** Tested clean-room (Claude Code without memory or helpers, with only the
marketplace installed and a normal brief) with 6 invented brands and different products; what failed was built into
the skill:
- **Mandatory polish loop** (`piezas-graficas/references/pulido.md`): each look ships its **golden**
  (`<look>/referencia/golden.jpg` + `golden.md` with what to imitate and a scorable checklist). `comparar.mjs` puts the
  piece next to the golden with a 100 % detail; you score from 1 to 10, at least 2 rounds, and deliver with everything
  at 8 or more.
- **Real subjects** (`piezas-graficas/references/sujetos.md`): user photos → `recortar.mjs` + `preparar-recorte.mjs`
  (halo, WebP, fingerprint) + `armonizar.mjs` (the light and whites of the look) + `ver-recorte.mjs`; without photos →
  the **3D library** in the brand colors (keyboard, mouse, headset, tower and generic mascot) or **AI** with
  `generar.mjs` (Higgsfield API: free estimate, spending cap, 2 jobs at a time, user permission).
- **What to ask before starting** (in `direccion-de-arte`): brand and logo, the piece, the subject (screenshots,
  product photos, people, mascot) and whether there is an AI budget.
- **The exporter sees more**: error if a look with cutouts has none or if a cutout is a flat fill (drawn silhouettes);
  warnings for a halo on the edge of a cutout, small subjects, too few frames or cards, text or cutouts from the example
  template in another brand piece, and deliveries below 2x.

**2.3.0 · polish pass on the five looks.** Each sample was put next to its reference and whatever looked amateur was
redone; what was learned is in each look `references/estilo.md` as measured rules.
- **3D product + mascot**: the tower, inside like a real one (fans with swept blades and a light ring, finned
  radiator, pump, graphics card with its shroud, memory, braided cabling, glass with reflections) and the mascot with
  more finish (subsurface-looking vinyl, rim light, eyes with iris and highlights, a waving hand).
- **Tech grid**: a believable gaming mouse (ergonomic shell, side buttons, ribbed wheel, textured grip, light strip)
  that breaks out of the frame on purpose; keyboard with legends and light between keys; shared light and shadows.
- **Editorial cutout**: cutouts without halo next to ears and hair strands (`preparar-recortes.mjs` gains `contorno`
  and `limpiar`) and a more compact group.
- **Dark glow**: background with a real candlestick chart (volume, averages, price axis) and a laptop with a
  detailed panel and an aluminum base with reflection.
- **Product in context**: the window no longer leaves empty gaps; the dimmed context reaches the edge.

## Installation

The repository is public: no credentials are needed. Two commands install **everything** (a bundle plugin pulls in
the other five):

```
/plugin marketplace add C4rI0s/claude-Image-generation
/plugin install marketing-visual-completo@claude-skills-marketing
```

(Adding a marketplace never installs plugins by itself in Claude Code; the `marketing-visual-completo` bundle is what
installs all five at once.) To install only some of them:

```
/plugin install direccion-de-arte@claude-skills-marketing
/plugin install correos-marketing@claude-skills-marketing
/plugin install carruseles-instagram@claude-skills-marketing
/plugin install piezas-graficas@claude-skills-marketing
/plugin install video-marketing@claude-skills-marketing
```

From a local copy: `claude plugin marketplace add ./claude-skills-marketing`.

For videos, also install the animation engine:

```
/plugin marketplace add FefeRP/motion-graphics-skills
/plugin install motion-graphics@motion-graphics-skills
```

To update: `/plugin marketplace update claude-skills-marketing`.

### Script requirements
- **Node 18 or later.**
- A recent **Chrome or Edge** (the product style uses `color-mix()` and CSS relative colors). The scripts use them
  directly, so no browser download is needed. If there is none, set `CHROME_PATH` or run
  `npx playwright install chromium`.
- The first time, in the `scripts/` folder of each skill: `npm install` (it only installs `playwright-core`). Claude
  does this on its own when following the skill. `comprobar-marca.mjs` and `aplicar-marca.mjs` need nothing.
- `recortar.mjs` (background removal, in `imagen-ia/scripts`) installs a local segmentation model (about 330 MB) the
  first time it is used; it is only needed for looks with cutouts if you do not already bring background-free PNGs.
- **AI (optional)**: to generate people, products or mascots when there are no photos, set `HIGGSFIELD_API_KEY`
  ("id:secret" from open.higgsfield.ai) in the environment. `IMAGEN_IA_TOPE_USD` sets how much Claude may spend
  without asking again (default $0.50); spending is logged in `~/.imagen-ia/gasto.jsonl`. Without a key, the skill
  uses your photos or the 3D library.
- **ffmpeg** to review videos frame by frame (`reel-de-marketing`).

## Plugins and skills

| Plugin | Skill | What it is for |
|---|---|---|
| `direccion-de-arte` | `direccion-de-arte` | The foundation: **brand brief → `marca.json`** with `comprobar-marca.mjs` (fields, look tokens and the contrast of each color pair), the **look selector** (`references/looks.md`), the brief for the piece, copy, typography, grids and safe zones, color and the **mandatory visual review**. The other skills use it |
| `piezas-graficas` | `producto-en-contexto` | **Look 1 · product images at Proton or Linear level**: the app in a window (sidebar, search, list, line icons) over a gradient, with a modal, highlighted row and floating notices. Email header, 16:9 hero, 1:1 and 4:5 posts, X banner, thumbnail and story as 2x PNG. Components in `producto.css` + `producto.js` and measured rules in `references/estilo.md` |
| `piezas-graficas` | `oscuro-glow` | **Look 2 · dark launches and offers** (fintech, trading, SaaS): navy background with a blurred chart and dashboard, two cards with a luminous border and a big figure, silver all-caps headline and pill CTA, with a measured glow |
| `piezas-graficas` | `editorial-recorte` | **Look 3 · gaming and lifestyle editorial**: collage of cutout people or products with size hierarchy, arc, frame and thin-line crosses, lots of air and the text always outside the image |
| `piezas-graficas` | `producto-3d-mascota` | **Look 4 · 3D product with mascot**: rounded blue-violet banner with particles and bokeh, product render and mascot overlapping with contact shadows and light in the brand color. Includes the **3D library** (three.js, no AI): keyboard, mouse, headset, tower and generic mascot, with the brand colors as parameters |
| `piezas-graficas` | `tech-grid` | **Look 5 · tech and gaming catalog**: fine grid, products breaking thin frames in two accents, circuit tracks with nodes and a wide all-caps grotesque headline |
| `piezas-graficas` | `piezas-graficas` | Flat base and **shared exporter** for all looks: email hero, OG, YouTube thumbnail, X banner, story and other formats with a headline, product mockups and an exact screenshot cropper. Ships the **polish loop** (`comparar.mjs` + the golden of each look) and the **subject tools** (`preparar-recorte.mjs`, `armonizar.mjs`, `ver-recorte.mjs`) |
| `piezas-graficas` | `imagen-ia` | Supporting images and **AI subjects** without the "AI look": **`generar.mjs`** (Higgsfield API with a free estimate, spending cap and 2 jobs at a time), prompts per look and **`recortar.mjs`** to remove the background of people, products and mascots (local model) |
| `correos-marketing` | `correo-marketing-html` | Sober marketing emails with a **product-in-context header**. `producto`, `anuncio` and `oferta` templates; `aplicar-marca.mjs` converts them to your brand and `comprobar-correo.mjs` runs static checks and renders **desktop, mobile, no images and dark mode** |
| `carruseles-instagram` | `carrusel-instagram` | 1080x1350 carousels with **product-in-context** slides (cover, light point, dark point) and text slides (list, figure, table, closing). `exportar.mjs --marca marca.json --carrusel --escala 2` generates the PNGs, the contact sheet and the 3:4 profile grid |
| `video-marketing` | `reel-de-marketing` | Reels and short videos: per-second script, 9:16 safe zones, subtitles and frame-by-frame review, on top of motion-graphics (Remotion) |

## Quick use

You can ask in plain language; Claude picks the skill:

- "Make me the images for the reminders feature launch: email header, hero and post, Proton style."
- "Referral campaign for my trading app in dark, with two big figures." (dark-glow)
- "Introduce the players of the new team, editorial style with cutouts." (editorial-recorte)
- "Store banner with our product and the 3D mascot." (producto-3d-mascota)
- "Peripherals sale in all formats, with grid and frames." (tech-grid)
- "Which look suits this brand?" (selector in `direccion-de-arte`)
- "This is the website of my client: extract their brand and make me a 6-slide carousel about their new service."
- "Launch email with the product template for the brand in `./marca.json`, and check it."
- "The same campaign as OG, thumbnail, X banner and story."

Or by hand:

```bash
# Brand
node plugins/direccion-de-arte/skills/direccion-de-arte/scripts/comprobar-marca.mjs marca.json
# Product in context or any look (at 2x): the template HTML of the look, with its CSS next to it
node plugins/piezas-graficas/skills/piezas-graficas/scripts/exportar.mjs producto-en-contexto.html --marca marca.json --escala 2
node plugins/piezas-graficas/skills/piezas-graficas/scripts/exportar.mjs tech-grid.html --marca marca.json --escala 2
# Remove the background of a photo or render (for looks with cutouts), clean it and give it the light of the look
node plugins/piezas-graficas/skills/imagen-ia/scripts/recortar.mjs foto.png recorte.png
node plugins/piezas-graficas/skills/piezas-graficas/scripts/preparar-recorte.mjs recorte.png recorte.webp --max 1800
node plugins/piezas-graficas/skills/piezas-graficas/scripts/armonizar.mjs recorte.webp recorte-luz.png --look tech-grid
node plugins/piezas-graficas/skills/piezas-graficas/scripts/ver-recorte.mjs revision.png recorte-luz.png
# Product from the 3D library in the brand colors
node plugins/piezas-graficas/skills/producto-3d-mascota/scripts/render-3d.mjs plugins/piezas-graficas/skills/producto-3d-mascota/scripts/escenas/teclado.html teclado.png --ancho 1800 --alto 1400 --param cuerpo=1c1f26 --param acento=ff6a13
# AI image (estimate only; --si launches it)
node plugins/piezas-graficas/skills/imagen-ia/scripts/generar.mjs "<prompt>" persona.png --modelo soul --formato 3:4
# Polish loop: the piece next to the golden of the look
node plugins/piezas-graficas/skills/piezas-graficas/scripts/comparar.mjs out/tech-grid/hero.png --look tech-grid --vuelta 1
# Carousel or pieces
node plugins/carruseles-instagram/skills/carrusel-instagram/scripts/exportar.mjs mi-carrusel.html --marca marca.json --carrusel --escala 2
node plugins/piezas-graficas/skills/piezas-graficas/scripts/exportar.mjs mis-piezas.html --marca marca.json
# Email
node plugins/correos-marketing/skills/correo-marketing-html/scripts/aplicar-marca.mjs plantillas/producto.html marca.json -o correo.html
node plugins/correos-marketing/skills/correo-marketing-html/scripts/comprobar-correo.mjs correo.html --marketing
```

The skills, scripts and templates keep their Spanish names and Spanish-language guides, and the brand file is
`marca.json`; the pieces themselves can be produced in any language.

## Structure

```
.claude-plugin/marketplace.json        marketplace catalog
plugins/<plugin>/.claude-plugin/plugin.json
plugins/<plugin>/skills/<skill>/SKILL.md
                                /plantillas/   starting HTML with a fictional example brand (and its
                                               marca-ejemplo.json in the looks); the CSS of the look
                                               (producto.css + producto.js, oscuro-glow.css...) and its cutouts
                                /scripts/      exporters, checkers and tools (Node + playwright-core)
                                /references/   guides the skill loads when needed
                                /referencia/   in each look: golden.jpg (the reference piece) and golden.md
                                               (what to imitate and the scorable checklist of the polish loop)
docs/ejemplos/                         renders of the templates
docs/demos/                            demos of the five looks
docs/pruebas-en-limpio/                clean-room test results
```

## Adding or changing a skill
1. Create `plugins/<plugin>/skills/<name>/SKILL.md` with the `name` and `description` frontmatter. The description
   says **when** to use it, because that is what makes Claude choose it.
2. If it is a new plugin, add its `plugin.json` and its entry in `.claude-plugin/marketplace.json`.
3. If it ships templates, make them read the brand from `marca.json` (CSS variables or `%%...%%` placeholders), render
   them with their script, look at them and leave the result in `docs/ejemplos/`. No real brands in the templates.
4. `producto.css`/`producto.js` and `exportar.mjs` are deliberately duplicated across several skills (each plugin is
   installed on its own): if you change one, copy the others.
5. Bump the plugin `version` and `metadata.version` so `/plugin marketplace update` picks it up.
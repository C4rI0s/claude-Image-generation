**English** · [Español](README.es.md)

# visual-marketing-skills

Skills for **Claude Code** that produce agency-grade visual marketing pieces **for any brand**: product-in-context
images, email headers and HTML emails, Instagram carousels, banners, thumbnails, stories and reels. Five visual
looks, a selector that picks the right one, and a polish loop that checks every piece before delivery.

## Install

```
/plugin marketplace add C4rI0s/visual-marketing-skills
/plugin install marketing-visual-completo@visual-marketing-skills
```

The bundle installs all the plugins below (and `motion-graphics` for videos). To install only some:
`/plugin install <plugin>@visual-marketing-skills`.

## Five looks

The `direccion-de-arte` skill reads your brand brief into a `marca.json` and picks the look from the brand and the
goal. Every look exports **16:9, 1:1, 4:5, X banner and story** at 2x.

| Look | Skill | Use it for |
|---|---|---|
| **1 · Product in context** | `producto-en-contexto` | SaaS and apps: the real interface over a soft gradient with floating layers |
| **2 · Dark glow** | `oscuro-glow` | fintech, trading and referral launches: navy, blurred data, glowing cards, big figures |
| **3 · Editorial cutout** | `editorial-recorte` | gaming, esports, lifestyle: cutout collage with thin construction lines |
| **4 · 3D product + mascot** | `producto-3d-mascota` | physical products and stores: 3D product and mascot on a gradient |
| **5 · Tech grid** | `tech-grid` | peripherals and hardware: fine grid, products breaking out of frames |

| Product in context | Dark glow |
|---|---|
| ![](docs/demos/09-producto-en-contexto-hero.jpg) | ![](docs/demos/07-oscuro-glow-hero.jpg) |
| **Editorial cutout** | **3D product + mascot** |
| ![](docs/demos/05-editorial-recorte-hero.jpg) | ![](docs/demos/01-producto-3d-mascota-hero.jpg) |
| **Tech grid** | **Same templates, another brand** |
| ![](docs/demos/03-tech-grid-hero.jpg) | ![](docs/ejemplos/looks-otra-marca.jpg) |

More in [`docs/demos`](docs/demos), [`docs/ejemplos`](docs/ejemplos) and the
[clean-room tests](docs/pruebas-en-limpio). All brands are fictional; the people are AI-generated and the product
and mascot are our own renders.

**Style references.** Each look starts from a studied style: Proton Pass (1), Impulse World (2), Logitech esports (3),
Instant Gaming (4) and Logitech Deal Days (5). They are only named; their images and brands are not included, and
`referencia/golden.jpg` in each skill is our own demo.

## What to expect

Tested clean-room (fresh Claude Code, only this marketplace, a normal brief, brands it had never seen): average
**8.5/10** (6.8 before the polish loop).

- **Product in context and dark glow** come out on their own at demo level (the interface is HTML).
- **Tech grid**: with photos of your products it cuts them out and matches the light; without photos it uses a
  generic 3D library (keyboard, mouse, headset).
- **Editorial cutout** needs photographic people: your photos or AI (Higgsfield, cents per piece).
- **3D product + mascot** is the most demanding: best with AI-generated product and mascot.
- **Time and cost**: 5-15 min per hero; $0 with your own photos, $0.02-0.10 per piece with AI (always capped).
- It does not invent your logo or the exact model of your product without photos or a model.

## Skills

| Plugin | What it does |
|---|---|
| `direccion-de-arte` | brand brief to `marca.json`, look selector, copy, typography, grids, mandatory visual review |
| `piezas-graficas` | the five looks, shared exporter, polish loop, subject tools (cutouts, light matching, 3D library) and AI images |
| `correos-marketing` | HTML emails with a product-in-context header, brand applier and a checker (Gmail, Outlook, mobile, dark mode) |
| `carruseles-instagram` | 1080x1350 carousels with a contact sheet and profile-grid preview |
| `video-marketing` | reels: per-second script, 9:16 safe zones, frame-by-frame review (on top of motion-graphics) |

Ask in plain language ("hero and post for my launch, Proton style", "referral campaign in dark with two big figures",
"which look suits this brand?") or run the scripts by hand (see each `SKILL.md`).

## Requirements
- Node 18+ and a recent Chrome or Edge (set `CHROME_PATH` otherwise). First time: `npm install` in a skill `scripts/`
  folder (Claude does it for you).
- Optional AI subjects: `HIGGSFIELD_API_KEY` (spending cap with `IMAGEN_IA_TOPE_USD`, default $0.50). Without it, the
  skill uses your photos or the 3D library.
- Cutting out backgrounds installs a local model (about 330 MB) on first use. Videos need `ffmpeg`.

## Contributing
Skills live in `plugins/<plugin>/skills/<name>/SKILL.md` (the description says **when** to use it). Templates read the
brand from `marca.json`; no real brands in templates. A few files are duplicated on purpose (`producto.css`,
`producto.js`, `exportar.mjs`): copy changes to all copies. Bump `version` in the plugin and in the marketplace.
See [CHANGELOG](CHANGELOG.md).
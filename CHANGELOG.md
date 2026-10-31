# Changelog

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


**2.5.x** · one-command install: the marketing-visual-completo bundle installs all plugins, motion-graphics included.

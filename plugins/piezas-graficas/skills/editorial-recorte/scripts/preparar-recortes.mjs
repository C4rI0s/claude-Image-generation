#!/usr/bin/env node
/**
 * preparar-recortes.mjs — deja los recortes de personas o producto listos para el look «editorial recorte»:
 * tapa logos y textos inventados, quita el halo gris del borde, recorta, hornea fundidos laterales y guarda WebP
 * con alfa (calidad 0,9; ≤ 500 KB). Usa el Chrome del sistema con playwright-core (el de piezas-graficas/scripts:
 * una vez, `npm install` en esa carpeta).
 *
 * Uso:
 *   node preparar-recortes.mjs <trabajos.json> --origen <carpeta de los PNG> --destino <carpeta de salida>
 *
 * trabajos.json es una lista; cada entrada:
 *   { "src": "jugador.png", "salida": "jugador.webp",
 *     "recorte": [x0, y0, x1, y1],                 // en px del original (deja fuera lo que no se usa)
 *     "parches": [                                  // logos o textos que tapar (px del original)
 *        [cx, cy, rx, ry],                          // elipse: se rellena desde su borde (interpolación) + grano
 *        [cx, cy, rx, ry, null, 0, "rect"],         // rectángulo
 *        [cx, cy, rx, ry, 160, 6, "elipse", -230, 0] // solo los píxeles oscuros (< 160) dilatados 6 px,
 *                                                    // clonando la tela de 230 px a la izquierda (conserva la textura)
 *     ],
 *     "borrar": [[x0, y0, x1, y1, 0.9]],            // zonas donde lo semitransparente es resto de fondo: fuera
 *     "estrecha": [0.3, 0.95],                      // alfa del borde: < 0,3 → 0; > 0,95 → 1 (y se oscurece)
 *     "fundidoIzq": 0.2, "fundidoDer": 0,           // fundido lateral horneado (fracción del ancho)
 *     "escala": 1, "calidad": 0.9 }
 *
 * Además de cada WebP deja, en --vistas (por defecto la carpeta actual), parche-<salida>-<n>.png (antes | después,
 * a 2x) y negro-<salida>.jpg (el recorte sobre negro). MÍRALOS con zoom: el script no sustituye a tu ojo.
 */
import { createRequire } from 'node:module'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const args = process.argv.slice(2)
const opt = (n, def) => { const i = args.indexOf(`--${n}`); return i >= 0 && args[i + 1] ? args[i + 1] : def }
if (!args[0] || args[0].startsWith('--')) { console.log('Uso: node preparar-recortes.mjs <trabajos.json> --origen <dir> --destino <dir> [--vistas <dir>]'); process.exit(2) }
let chromium
try { ({ chromium } = await import('playwright-core')) } catch {
  const aqui = path.dirname(fileURLToPath(import.meta.url))
  try { ({ chromium } = createRequire(path.join(aqui, '../../piezas-graficas/scripts/package.json'))('playwright-core')) }
  catch { console.error('Falta playwright-core: ejecuta npm install en skills/piezas-graficas/scripts'); process.exit(2) }
}
const dir = path.resolve(opt('origen', '.')) + path.sep
const dest = path.resolve(opt('destino', 'recortes')) + path.sep
const vistas = path.resolve(opt('vistas', '.')) + path.sep
await mkdir(dest, { recursive: true }); await mkdir(vistas, { recursive: true })
const trabajos = JSON.parse(await readFile(args[0], 'utf8'))
const nav = await chromium.launch({ channel: 'chrome' })
const p = await nav.newPage()
for (const t of trabajos) {
  const b64 = (await readFile(dir + t.src)).toString('base64')
  const r = await p.evaluate(async ({ src, t }) => {
    const im = new Image(); im.src = src; await im.decode()
    const w = im.naturalWidth, h = im.naturalHeight
    const c = document.createElement('canvas'); c.width = w; c.height = h
    const x = c.getContext('2d'); x.drawImage(im, 0, 0)
    const id = x.getImageData(0, 0, w, h), d = id.data
        // 1) Parches: elipse (cx, cy, rx, ry). Relleno Shepard desde un anillo exterior + grano suave
    let semilla = 7; const rnd = () => (semilla = (semilla * 16807) % 2147483647) / 2147483647
    for (const [cx, cy, rx, ry, umbral, dil, forma, cdx, cdy] of t.parches) {
      const orig = new Uint8ClampedArray(d)
      const x0 = Math.max(0, Math.floor(cx - rx * 1.3)), y0 = Math.max(0, Math.floor(cy - ry * 1.3))
      const x1 = Math.min(w - 1, Math.ceil(cx + rx * 1.3)), y1 = Math.min(h - 1, Math.ceil(cy + ry * 1.3))
      const bw = x1 - x0 + 1, bh = y1 - y0 + 1
      const elip = forma === 'rect' ? (i, j) => Math.abs(i - cx) <= rx && Math.abs(j - cy) <= ry : (i, j) => ((i - cx) / rx) ** 2 + ((j - cy) / ry) ** 2 <= 1
      let m = new Uint8Array(bw * bh)
      for (let j = y0; j <= y1; j++) for (let i = x0; i <= x1; i++) {
        if (!elip(i, j)) continue
        const o = (j * w + i) * 4
        if (umbral == null) m[(j - y0) * bw + (i - x0)] = 1
        else if (.3 * d[o] + .59 * d[o + 1] + .11 * d[o + 2] < umbral) m[(j - y0) * bw + (i - x0)] = 1
      }
      const dilatar = (src, r) => { const out = new Uint8Array(src.length)
        for (let j = 0; j < bh; j++) for (let i = 0; i < bw; i++) { if (!src[j * bw + i]) continue
          for (let dj = -r; dj <= r; dj++) for (let di = -r; di <= r; di++) { if (di * di + dj * dj > r * r) continue
            const ii = i + di, jj = j + dj; if (ii >= 0 && jj >= 0 && ii < bw && jj < bh) out[jj * bw + ii] = 1 } }
        return out }
      if (umbral != null && dil) m = dilatar(m, dil)
      const borde = dilatar(m, 3)
      const anillo = []
      for (let k = 0; k < m.length; k++) if (borde[k] && !m[k]) { const i = x0 + k % bw, j = y0 + Math.floor(k / bw), o = (j * w + i) * 4; if (d[o + 3] > 240) { if (cdx != null) { const q = ((j + cdy) * w + (i + cdx)) * 4; anillo.push([i, j, d[o] - orig[q], d[o + 1] - orig[q + 1], d[o + 2] - orig[q + 2]]) } else anillo.push([i, j, d[o], d[o + 1], d[o + 2]]) } }
      for (let k = 0; k < m.length; k++) { if (!m[k]) continue
        const i = x0 + k % bw, j = y0 + Math.floor(k / bw)
        let sw = 0, sr = 0, sg = 0, sb = 0
        for (const [ai, aj, ar, ag, ab] of anillo) { const dd = (ai - i) ** 2 + (aj - j) ** 2 + 1; const wt = 1 / (dd * dd); sw += wt; sr += ar * wt; sg += ag * wt; sb += ab * wt }
        const o = (j * w + i) * 4, n = (rnd() - .5) * (t.grano ?? 5)
        if (cdx != null) { const q = ((j + cdy) * w + (i + cdx)) * 4; d[o] = orig[q] + sr / sw; d[o + 1] = orig[q + 1] + sg / sw; d[o + 2] = orig[q + 2] + sb / sw } else { d[o] = sr / sw + n; d[o + 1] = sg / sw + n; d[o + 2] = sb / sw + n } d[o + 3] = 255
      }
    }
    // 2) Halo: estrecha el alfa del borde y oscurece lo semitransparente (el fondo final es casi negro)
    // Zonas donde lo semitransparente es resto de fondo (mechones con halo): fuera
    for (const [bx0, by0, bx1, by1, lim] of (t.borrar ?? [])) for (let j = by0; j < by1; j++) for (let i = bx0; i < bx1; i++) { const o = (j * w + i) * 4; if (d[o + 3] < lim * 255) d[o + 3] = 0 }
    const [a0, a1] = t.estrecha ?? [.3, .95]
    for (let o = 0; o < d.length; o += 4) {
      const a = d[o + 3] / 255
      if (a >= .995 || a === 0) continue
      let na = Math.min(1, Math.max(0, (a - a0) / (a1 - a0)))
      const k = .38 + .62 * na
      d[o] *= k; d[o + 1] *= k; d[o + 2] *= k; d[o + 3] = na * 255
    }
    x.putImageData(id, 0, 0)
    // 3) Recorte y escala
    const [cx0, cy0, cx1, cy1] = t.recorte
    const s = t.escala ?? 1
    const o = document.createElement('canvas'); o.width = Math.round((cx1 - cx0) * s); o.height = Math.round((cy1 - cy0) * s)
    const ox = o.getContext('2d'); ox.imageSmoothingQuality = 'high'
    ox.drawImage(c, cx0, cy0, cx1 - cx0, cy1 - cy0, 0, 0, o.width, o.height)
    // Fundido lateral horneado en el alfa (bordes de ropa cortados por el encuadre original)
    if (t.fundidoIzq || t.fundidoDer) {
      const od = ox.getImageData(0, 0, o.width, o.height), q = od.data
      const ss = v => v <= 0 ? 0 : v >= 1 ? 1 : v * v * (3 - 2 * v)
      for (let j = 0; j < o.height; j++) for (let i = 0; i < o.width; i++) {
        let k = 1
        if (t.fundidoIzq) k *= ss(i / (o.width * t.fundidoIzq))
        if (t.fundidoDer) k *= ss((o.width - 1 - i) / (o.width * t.fundidoDer))
        q[(j * o.width + i) * 4 + 3] *= k
      }
      ox.putImageData(od, 0, 0)
    }
    // Vistas de los parches (antes | después) a 2x
    const vistas = t.parches.map(([pcx, pcy, rx, ry]) => {
      const vw = rx * 3, vh = ry * 3
      const v = document.createElement('canvas'); v.width = vw * 4; v.height = vh * 2
      const vx = v.getContext('2d'); vx.fillStyle = '#000'; vx.fillRect(0, 0, v.width, v.height)
      vx.drawImage(im, pcx - vw / 2, pcy - vh / 2, vw, vh, 0, 0, vw * 2, vh * 2)
      vx.drawImage(c, pcx - vw / 2, pcy - vh / 2, vw, vh, vw * 2, 0, vw * 2, vh * 2)
      return v.toDataURL('image/png')
    })
    // Vista general sobre negro
    const g = document.createElement('canvas'); g.width = o.width; g.height = o.height
    const gx = g.getContext('2d'); gx.fillStyle = '#050608'; gx.fillRect(0, 0, g.width, g.height); gx.drawImage(o, 0, 0)
    return { webp: o.toDataURL('image/webp', t.calidad ?? .9), vistas, negro: g.toDataURL('image/jpeg', .85), w: o.width, h: o.height }
  }, { src: 'data:image/png;base64,' + b64, t })
  const buf = Buffer.from(r.webp.split(',')[1], 'base64')
  await writeFile(dest + t.salida, buf)
  await Promise.all(r.vistas.map((v, k) => writeFile(`${vistas}parche-${t.salida}-${k}.png`, Buffer.from(v.split(',')[1], 'base64'))))
  await writeFile(`${vistas}negro-${t.salida}.jpg`, Buffer.from(r.negro.split(',')[1], 'base64'))
  const kb = Math.round(buf.length / 1024)
  console.log(`${t.salida}  ${r.w}x${r.h}  ${kb} KB${kb > 500 ? '  ← pasa de 500 KB: baja "escala" o "calidad"' : ''}`)
}
await nav.close()

#!/usr/bin/env node
/**
 * exportar.mjs — pasa piezas HTML a PNG con un Chrome de verdad y revisa lo
 * que suele salir mal antes de que lo vea nadie.
 *
 * Uso:
 *   node exportar.mjs <fichero.html> [opciones]
 *
 * Opciones:
 *   --marca <json>     Marca que se aplica (colores, tipografía, nombre, web y logo). Si no se da y hay un
 *                      marca.json junto al HTML, se usa ese. Sin marca, se ven los valores de la plantilla.
 *   --selector <css>   Qué elementos son piezas (por defecto [data-pieza])
 *   --salida <dir>     Carpeta de salida (por defecto out/<nombre-del-html>/ junto al HTML)
 *   --escala <n>       Densidad de píxeles (1 = tamaño exacto; 2 = retina). Por defecto 1
 *   --solo <nombre>    Exporta solo la pieza con ese data-pieza
 *   --carrusel         Además de la hoja, genera perfil.png (cómo se ve en la rejilla 3:4 del perfil)
 *   --estricto         Sale con código 1 si hay avisos (no solo errores)
 *
 * La marca entra por variables CSS (--papel, --tinta, --acento, --fuente…, ver marca.json en la skill
 * direccion-de-arte) y por elementos marcados: data-marca="nombre" | "web_texto" | "lema" | … (cualquier
 * campo de texto del JSON) y data-marca="logo" (se rellena con logo.svg, que usa currentColor).
 *
 * Cada pieza es un elemento con data-pieza="nombre" y, opcionalmente,
 * data-ancho / data-alto (se comprueba que mide eso), data-margen (zona segura
 * en px), data-min-letra (px) y data-permite-sombra (desactiva el aviso de
 * sombras y brillos). Dentro de la pieza, data-maqueta marca una maqueta de
 * interfaz (tarjeta, ventana): su texto puede ser más pequeño y entrar en el
 * margen, pero nunca salirse ni quedar cortado.
 *
 * Errores que detecta: tamaño distinto, texto fuera o cortado, textos que se
 * pisan, texto que choca con un bloque ajeno (tarjeta, botón), imágenes rotas,
 * fuentes que no cargan. Avisos: margen, letra mínima, contraste, sombras,
 * imágenes ampliadas, viudas en titulares.
 *
 * Salida: un PNG por pieza, hoja.png (todas juntas a tamaño de móvil, para
 * juzgar el ritmo) e informe.json. Lo que imprime por consola es el resumen.
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const args = process.argv.slice(2)
if (!args.length || args.includes('-h') || args.includes('--help')) {
  console.log(await readFile(new URL(import.meta.url), 'utf8').then(t => t.split('*/')[0]))
  process.exit(0)
}
const opt = (n, def) => { const i = args.indexOf(`--${n}`); return i >= 0 && args[i + 1] ? args[i + 1] : def }
const flag = n => args.includes(`--${n}`)

const fichero = path.resolve(args[0])
if (!existsSync(fichero)) { console.error(`No existe: ${fichero}`); process.exit(2) }
const selector = opt('selector', '[data-pieza]')
const salida = path.resolve(opt('salida', path.join(path.dirname(fichero), 'out', path.basename(fichero, path.extname(fichero)))))
const escala = Number(opt('escala', '1')) || 1
const solo = opt('solo', null)
const ficheroMarca = opt('marca', null) ? path.resolve(opt('marca')) : (existsSync(path.join(path.dirname(fichero), 'marca.json')) ? path.join(path.dirname(fichero), 'marca.json') : null)
let marca = null
if (ficheroMarca) {
  try { marca = JSON.parse(await readFile(ficheroMarca, 'utf8')) } catch (e) { console.error(`No puedo leer la marca ${ficheroMarca}: ${e.message}`); process.exit(2) }
}

// ── Marca ───────────────────────────────────────────────────────────────────
// Se ejecuta en el navegador: pone los tokens de la marca por encima de los de la plantilla,
// carga su tipografía y rellena nombre, web y logo.
async function aplicarMarcaEnPagina(m) {
  const c = m.colores || {}, t = m.tipografia || {}
  const vars = Object.entries(c).map(([k, v]) => `--${k}:${v}`)
  if (t.fuente) vars.push(`--fuente:'${t.fuente}', system-ui, sans-serif`)
  if (t.mono) vars.push(`--mono:'${t.mono}', ui-monospace, monospace`)
  if (m.forma?.radio) vars.push(`--radio:${m.forma.radio}`)
  const st = document.createElement('style')
  st.id = 'marca-json'
  st.textContent = `:root{${vars.join(';')}}`
  document.head.appendChild(st)
  if (t.google_fonts) {
    const l = document.createElement('link')
    l.rel = 'stylesheet'
    l.href = `https://fonts.googleapis.com/css2?${t.google_fonts}&display=block`
    await new Promise(r => { l.onload = l.onerror = r; document.head.appendChild(l) })
  }
  const leer = k => k.split('.').reduce((a, x) => (a == null ? a : a[x]), m)
  for (const el of document.querySelectorAll('[data-marca]')) {
    const k = el.dataset.marca
    if (k === 'logo') { if (m.logo?.svg) el.innerHTML = m.logo.svg }
    else { const v = leer(k); if (typeof v === 'string') el.textContent = v }
  }
  if (t.fuente) await Promise.all([400, 500, 600, 700, 800].map(w => document.fonts.load(`${w} 40px "${t.fuente}"`).catch(() => null)))
  await document.fonts.ready
  return !t.fuente || [...document.fonts].some(f => f.family.replace(/["']/g, '') === t.fuente && f.status === 'loaded')
}

// ── Navegador ───────────────────────────────────────────────────────────────

async function abrirNavegador() {
  let pw
  for (const mod of ['playwright-core', 'playwright']) {
    try { pw = await import(mod); break } catch { /* siguiente */ }
  }
  if (!pw) {
    console.error('Falta playwright-core. Una sola vez, en la carpeta de este script:  npm install')
    process.exit(2)
  }
  const intentos = []
  if (process.env.CHROME_PATH) intentos.push({ executablePath: process.env.CHROME_PATH })
  intentos.push({ channel: 'chrome' }, { channel: 'msedge' }, {})
  let ultimo
  for (const o of intentos) {
    try { return await pw.chromium.launch({ headless: true, ...o }) } catch (e) { ultimo = e }
  }
  console.error('No encuentro Chrome ni Edge. Instala Chrome, define CHROME_PATH o ejecuta: npx playwright install chromium')
  console.error(String(ultimo?.message ?? ultimo).split('\n')[0])
  process.exit(2)
}

// ── Revisión dentro de la página ────────────────────────────────────────────
// Se ejecuta en el navegador: mide lo que de verdad se ha pintado.

function revisarEnPagina({ selector, solo, escala }) {
  const parse = s => {
    const m = /rgba?\(([^)]+)\)/.exec(s || '')
    if (!m) return null
    const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number)
    return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] }
  }
  const lin = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }
  const lum = c => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b)
  const contraste = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05) }
  const mezcla = (arriba, abajo) => ({
    r: arriba.r * arriba.a + abajo.r * (1 - arriba.a),
    g: arriba.g * arriba.a + abajo.g * (1 - arriba.a),
    b: arriba.b * arriba.a + abajo.b * (1 - arriba.a), a: 1,
  })
  const fondoDe = el => {
    const capas = []
    for (let n = el; n; n = n.parentElement) {
      const cs = getComputedStyle(n)
      if (cs.backgroundImage && cs.backgroundImage !== 'none' && !/gradient/.test(cs.backgroundImage)) return { imagen: true }
      const c = parse(cs.backgroundColor)
      if (c && c.a > 0) { capas.push(c); if (c.a >= 0.99) break }
    }
    let base = { r: 255, g: 255, b: 255, a: 1 }
    for (let i = capas.length - 1; i >= 0; i--) base = mezcla(capas[i], base)
    return { color: base }
  }
  const rectTexto = el => {
    let r = null
    for (const n of el.childNodes) {
      if (n.nodeType !== 3 || !n.textContent.trim()) continue
      const rg = document.createRange(); rg.selectNodeContents(n)
      for (const q of rg.getClientRects()) {
        if (!q.width || !q.height) continue
        r = r ? { left: Math.min(r.left, q.left), top: Math.min(r.top, q.top), right: Math.max(r.right, q.right), bottom: Math.max(r.bottom, q.bottom) }
          : { left: q.left, top: q.top, right: q.right, bottom: q.bottom }
      }
    }
    return r
  }
  const corta = t => t.replace(/\s+/g, ' ').trim().slice(0, 48)
  const cruza = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top

  const fuentesFallidas = [...document.fonts].filter(f => f.status === 'error').map(f => `${f.family} ${f.weight}`)

  const piezas = [...document.querySelectorAll(selector)]
    .filter(p => !solo || p.dataset.pieza === solo)
  return piezas.map((p, i) => {
    const nombre = p.dataset.pieza || p.id || `pieza-${String(i + 1).padStart(2, '0')}`
    const caja = p.getBoundingClientRect()
    const w = Math.round(caja.width), h = Math.round(caja.height)
    const errores = [], avisos = []
    const da = Number(p.dataset.ancho), dh = Number(p.dataset.alto)
    if (da && dh && (Math.abs(da - w) > 0.5 || Math.abs(dh - h) > 0.5)) errores.push(`Mide ${w}x${h} y debería medir ${da}x${dh}`)
    const margen = Number(p.dataset.margen) || Math.round(Math.min(w, h) * 0.045)
    const minLetra = Number(p.dataset.minLetra) || Math.max(14, Math.round(Math.min(w, h) * 0.02))
    const imagenes = [...p.querySelectorAll('img')]
    // Solo la parte visible de cada imagen: los recortes la desbordan pero el contenedor la oculta
    const visible = el => {
      let r = el.getBoundingClientRect(); r = { left: r.left, top: r.top, right: r.right, bottom: r.bottom }
      for (let n = el.parentElement; n && n !== p.parentElement; n = n.parentElement) {
        const c = getComputedStyle(n)
        if (!/(hidden|clip)/.test(c.overflow + c.overflowX + c.overflowY)) continue
        const q = n.getBoundingClientRect()
        r = { left: Math.max(r.left, q.left), top: Math.max(r.top, q.top), right: Math.min(r.right, q.right), bottom: Math.min(r.bottom, q.bottom) }
      }
      return r
    }
    const rectImgs = imagenes.map(visible).filter(r => r.right > r.left && r.bottom > r.top)

    for (const im of imagenes) {
      const r = im.getBoundingClientRect()
      if (!im.complete || im.naturalWidth === 0) errores.push(`Imagen rota: ${im.getAttribute('src')?.slice(0, 80)}`)
      else if (im.naturalWidth < r.width * escala * 0.95 && getComputedStyle(im).objectFit !== 'cover') {
        avisos.push(`Imagen con poca resolución (${im.naturalWidth}px para ${Math.round(r.width * escala)}px): ${im.getAttribute('src')?.slice(0, 60)}`)
      } else if (getComputedStyle(im).objectFit === 'cover') {
        const k = Math.max(r.width / im.naturalWidth, r.height / im.naturalHeight) * escala
        if (k > 1.05) avisos.push(`Imagen ampliada ${k.toFixed(2)}x (se verá blanda): ${im.getAttribute('src')?.slice(0, 60)}`)
      }
    }

    const vistos = new Set()
    const textos = []
    for (const el of [p, ...p.querySelectorAll('*')]) {
      const cs = getComputedStyle(el)
      if (!p.hasAttribute('data-permite-sombra')) {
        const brillo = (cs.textShadow !== 'none' && 'text-shadow') || (cs.boxShadow !== 'none' && 'box-shadow')
          || (/drop-shadow|blur/.test(cs.filter) && 'filter')
        if (brillo && !vistos.has(brillo + el.tagName)) {
          vistos.add(brillo + el.tagName)
          avisos.push(`Sombra o brillo (${brillo}) en <${el.tagName.toLowerCase()}>: el estilo es plano`)
        }
      }
      const rt = rectTexto(el)
      if (!rt || cs.visibility === 'hidden' || Number(cs.opacity) === 0) continue
      const texto = corta(el.textContent)
      // Para los choques vale la caja de línea, no la del glifo (con interlineado < 1 el glifo se sale y no pisa nada)
      let bloque = el
      while (bloque !== p && getComputedStyle(bloque).display === 'inline') bloque = bloque.parentElement
      const bb = bloque.getBoundingClientRect()
      textos.push({ el, rt: { left: rt.left, right: rt.right, top: Math.max(rt.top, bb.top), bottom: Math.min(rt.bottom, bb.bottom) }, texto })
      if (rt.left < caja.left - 1 || rt.top < caja.top - 1 || rt.right > caja.right + 1 || rt.bottom > caja.bottom + 1) {
        errores.push(`Texto fuera de la pieza: «${texto}»`)
      } else if (!el.closest('[data-sin-margen], [data-maqueta]') && (rt.left - caja.left < margen || rt.top - caja.top < margen || caja.right - rt.right < margen || caja.bottom - rt.bottom < margen)) {
        avisos.push(`Texto dentro del margen de seguridad (${margen}px): «${texto}»`)
      }
      for (let n = el; n && n !== p.parentElement; n = n.parentElement) {
        const c2 = getComputedStyle(n)
        if (/(hidden|clip)/.test(c2.overflow + c2.overflowX + c2.overflowY) && (n.scrollHeight > n.clientHeight + 1 || n.scrollWidth > n.clientWidth + 1) && n !== p) {
          errores.push(`Texto cortado por un contenedor: «${texto}»`); break
        }
      }
      const tam = parseFloat(cs.fontSize)
      if (tam < (el.closest('[data-maqueta]') ? Math.min(minLetra, Math.max(14, Math.round(Math.min(w, h) * 0.016))) : minLetra)) avisos.push(`Letra de ${tam}px (mínimo ${minLetra}px en este formato): «${texto}»`)
      const sobreFoto = rectImgs.some(ri => cruza(ri, rt))
      const fondo = fondoDe(el)
      const color = parse(cs.color)
      if (sobreFoto || fondo.imagen) {
        if (!el.closest('[data-legible]')) avisos.push(`Texto sobre imagen, comprueba la legibilidad a ojo: «${texto}»`)
      } else if (color && fondo.color) {
        const c = contraste(mezcla(color, fondo.color), fondo.color)
        const grande = tam >= Math.min(w, h) * 0.04 || (tam >= Math.min(w, h) * 0.03 && Number(cs.fontWeight) >= 700)
        const minimo = grande ? 3 : 4.5
        if (c < minimo) avisos.push(`Contraste ${c.toFixed(2)}:1 (mínimo ${minimo}:1): «${texto}»`)
      }
    }
    // Choques: dos textos que no se contienen uno a otro y se pisan
    const pisa = (a, b) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > 2 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 2
    for (let i = 0; i < textos.length; i++) for (let j = i + 1; j < textos.length; j++) {
      const a = textos[i], b = textos[j]
      if (a.el.contains(b.el) || b.el.contains(a.el)) continue
      if (pisa(a.rt, b.rt)) errores.push(`Textos que se pisan: «${a.texto.slice(0, 30)}» y «${b.texto.slice(0, 30)}»`)
    }
    // Texto que choca con un bloque (tarjeta, botón, maqueta) que no es el suyo
    const bloques = [...p.querySelectorAll('*')].filter(b => {
      if (b.tagName === 'IMG' || b.tagName === 'svg' || b.closest('svg')) return false
      const c = getComputedStyle(b), bg = parse(c.backgroundColor)
      return (bg && bg.a > 0.05) || parseFloat(c.borderTopWidth) > 0 && parseFloat(c.borderLeftWidth) > 0
    }).map(b => ({ b, r: visible(b) }))
    for (const t of textos) {
      for (const { b, r } of bloques) {
        if (b.contains(t.el) || t.el.contains(b)) continue
        if (pisa(t.rt, r)) { errores.push(`Texto que choca con un bloque <${b.tagName.toLowerCase()} class="${b.className}">: «${t.texto.slice(0, 40)}»`); break }
      }
    }
    // Bloques sin aire: dos tarjetas o botones que no se tocan pero quedan a menos de 24 px
    for (let i = 0; i < bloques.length; i++) for (let j = i + 1; j < bloques.length; j++) {
      const A = bloques[i], B = bloques[j]
      if (A.b.contains(B.b) || B.b.contains(A.b)) continue
      const sx = Math.max(A.r.left, B.r.left) - Math.min(A.r.right, B.r.right)
      const sy = Math.max(A.r.top, B.r.top) - Math.min(A.r.bottom, B.r.bottom)
      const hueco = Math.max(sx, sy)
      if (hueco >= 0 && hueco < 24 && (sx < 0 || sy < 0)) {
        avisos.push(`Bloques sin aire (${Math.round(hueco)} px): <${A.b.tagName.toLowerCase()} class="${A.b.className}"> y <${B.b.tagName.toLowerCase()} class="${B.b.className}">`)
      }
    }
    // Viudas: un titular de varias líneas que acaba con una palabra sola
    for (const el of p.querySelectorAll('h1, h2, h3, [data-titular]')) {
      const palabras = []
      const recorrer = n => {
        if (n.nodeType === 3) {
          const re = /\S+/g; let mt
          while ((mt = re.exec(n.textContent))) {
            const rg = document.createRange(); rg.setStart(n, mt.index); rg.setEnd(n, mt.index + mt[0].length)
            const q = rg.getClientRects()[0]; if (q) palabras.push(Math.round(q.top))
          }
        } else n.childNodes.forEach(recorrer)
      }
      recorrer(el)
      const lineas = [...new Set(palabras)].sort((x, y) => x - y)
      if (lineas.length > 1 && palabras.filter(t => t === lineas[lineas.length - 1]).length === 1) {
        avisos.push(`Viuda: el titular «${corta(el.textContent).slice(0, 40)}» acaba con una palabra sola en la última línea`)
      }
    }
    return { nombre, ancho: w, alto: h, errores: [...new Set(errores)], avisos: [...new Set(avisos)], fuentesFallidas }
  })
}

// ── Hoja de contacto ────────────────────────────────────────────────────────

async function hojaDeContacto(navegador, pngs, destino, { perfil }) {
  const datos = await Promise.all(pngs.map(async f => `data:image/png;base64,${(await readFile(f)).toString('base64')}`))
  const nombres = pngs.map(f => path.basename(f, '.png'))
  const alto = 420
  const tiras = datos.map((d, i) => `<figure><img src="${d}" style="height:${alto}px"><figcaption>${nombres[i]}</figcaption></figure>`).join('')
  const html = `<!doctype html><meta charset="utf-8"><style>
    body{margin:0;padding:32px;background:#e9e6e0;font:500 14px system-ui,sans-serif;color:#5b554c}
    .fila{display:flex;flex-wrap:wrap;gap:20px;align-items:flex-start}
    figure{margin:0} img{display:block;border-radius:6px;background:#fff}
    figcaption{margin-top:8px}
    h2{font-size:13px;letter-spacing:.12em;text-transform:uppercase;margin:0 0 16px;color:#8a8379}
    .perfil{display:grid;grid-template-columns:repeat(3,200px);gap:3px;margin-top:40px}
    .perfil div{aspect-ratio:3/4;overflow:hidden;background:#fff}
    .perfil img{width:100%;height:100%;object-fit:cover;border-radius:0}
  </style>
  <h2>Secuencia a tamaño de móvil (${alto}px de alto)</h2><div class="fila">${tiras}</div>
  ${perfil ? `<h2 style="margin-top:40px">Rejilla del perfil (recorte 3:4)</h2><div class="perfil">${datos.slice(0, 3).map(d => `<div><img src="${d}"></div>`).join('')}</div>` : ''}`
  const pagina = await navegador.newPage({ viewport: { width: 1400, height: 900 } })
  await pagina.setContent(html, { waitUntil: 'load' })
  await pagina.screenshot({ path: destino, fullPage: true })
  await pagina.close()
}

// ── Principal ───────────────────────────────────────────────────────────────

const navegador = await abrirNavegador()
const contexto = await navegador.newContext({ viewport: { width: 2200, height: 2200 }, deviceScaleFactor: escala })
const pagina = await contexto.newPage()
const fallosRed = []
pagina.on('requestfailed', r => fallosRed.push(`${r.url().slice(0, 90)} (${r.failure()?.errorText})`))
pagina.on('pageerror', e => fallosRed.push(`Error JS: ${e.message}`))

await pagina.goto(pathToFileURL(fichero).href, { waitUntil: 'networkidle', timeout: 60000 })
await pagina.evaluate(() => document.fonts.ready)
let fuenteMarcaOk = true
if (marca) {
  fuenteMarcaOk = await pagina.evaluate(aplicarMarcaEnPagina, marca)
  console.log(`Marca: ${marca.nombre ?? '?'} (${path.relative(process.cwd(), ficheroMarca) || ficheroMarca})`)
}
await pagina.waitForTimeout(250)

const informe = await pagina.evaluate(revisarEnPagina, { selector, solo, escala })
if (!informe.length) { console.error(`No hay piezas que casen con ${selector}${solo ? ` y nombre ${solo}` : ''}`); await navegador.close(); process.exit(2) }

await mkdir(salida, { recursive: true })
const pngs = []
const elementos = await pagina.$$(selector)
for (const el of elementos) {
  const nombre = await el.evaluate((p, i) => p.dataset.pieza || p.id || null, 0)
  const item = informe.find(x => x.nombre === nombre) ?? informe[pngs.length]
  if (!item || (solo && nombre !== solo)) continue
  const destino = path.join(salida, `${item.nombre}.png`)
  await el.screenshot({ path: destino, animations: 'disabled' })
  pngs.push(destino)
}
if (pngs.length > 1 || flag('carrusel')) await hojaDeContacto(navegador, pngs, path.join(salida, 'hoja.png'), { perfil: flag('carrusel') })
await navegador.close()

const fuentes = informe[0]?.fuentesFallidas ?? []
await writeFile(path.join(salida, 'informe.json'), JSON.stringify({ fichero, escala, fallosRed, fuentesFallidas: fuentes, piezas: informe }, null, 2))

let nErr = 0, nAv = 0
console.log(`\n${pngs.length} pieza(s) → ${salida}`)
for (const p of informe) {
  nErr += p.errores.length; nAv += p.avisos.length
  const estado = p.errores.length ? 'ERROR' : p.avisos.length ? 'aviso' : 'ok'
  console.log(`\n[${estado}] ${p.nombre}  ${p.ancho}x${p.alto}`)
  for (const e of p.errores) console.log(`   ✗ ${e}`)
  for (const a of p.avisos.slice(0, 12)) console.log(`   · ${a}`)
  if (p.avisos.length > 12) console.log(`   · …y ${p.avisos.length - 12} avisos más (informe.json)`)
}
if (fuentes.length) { nErr++; console.log(`\n✗ Fuentes que no cargaron: ${fuentes.join(', ')}`) }
if (!fuenteMarcaOk) { nErr++; console.log(`\n✗ La fuente de la marca («${marca.tipografia.fuente}») no cargó: revisa tipografia.google_fonts en ${ficheroMarca}`) }
if (fallosRed.length) { nErr++; console.log(`\n✗ Recursos que fallaron:\n   ${fallosRed.join('\n   ')}`) }
console.log(`\nResumen: ${nErr} error(es), ${nAv} aviso(s).`)
console.log('Ahora ABRE los PNG y la hoja.png y míralos: el informe no sustituye a tu ojo.\n')
process.exit(nErr || (flag('estricto') && nAv) ? 1 : 0)

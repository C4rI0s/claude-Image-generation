# Estilo «producto 3D con mascota» · reglas medidas

Sale de medir los banners de las tiendas de videojuegos (producto 3D y mascota sobre degradado azul-violeta) y de
componer la plantilla con Chrome a 2x. Los valores son para lienzos de 1080-1600 px; escala con el lienzo.

## Planos
- **Cuatro planos**, de atrás adelante: degradado → luz y partículas (`data-fondo`) → producto con su sombra →
  mascota con su sombra. El texto, aparte, en el aire.
- **Dos sujetos**: un producto y una mascota. Nunca tres, nunca la pareja separada.

## Radio y esquinas
- Pieza que va como tarjeta (hero de tienda o de app): **radio ≈ 3,4 % del ancho** (`--radio-3d`: 54 px en 1600,
  37 px en 1080). Las redes (1:1, 4:5, story, banner de X) van **sin radio**: la red pone su marco.
- Fuera del radio se ve **el color de la página** (`--pagina`, por defecto `--papel`), no transparencia: Instagram,
  X y WhatsApp recomprimen a JPEG y pintan de negro o blanco lo transparente. Si la pieza va sobre otro fondo,
  pon ese color en `marca.json` → `colores.pagina`; si la web redondea con CSS, exporta sin `.redondeado`.

## Fondo
- **Degradado lineal a 140°** de 3 paradas: `cielo-1` (0 %, azul, arriba a la izquierda) → `cielo-2` (52 %,
  violeta) → `cielo-3` (100 %, índigo, abajo a la derecha). Encima, dos manchas radiales grandes: `cielo-1` al
  90 % en 8 % 0 (58 % x 62 %) y `cielo-3` al 92 % en 100 % 100 % (55 % x 60 %). Liso, sin ruido ni texturas.
- Derivados del acento (oklch): `cielo-1` = L x 0,74, C x 1,12, tono −24°; `cielo-2` = L x 0,5, tono −6°;
  `cielo-3` = L x 0,3, C x 0,72. Con un acento muy claro o poco saturado, fija los tres en `marca.json`.
- `cielo-2` es el color representativo de la pieza (`background-color`): el texto claro sobre él da ≥ 7:1.

## Luz de color (la regla del look)
- **La luz de color va en los renders y en el fondo**, nunca en el HTML: ni `box-shadow` de color, ni
  `text-shadow`, ni halos en titulares o botones.
- **Recorte (rim) en los sujetos = color del fondo**: azul (`cielo-1`) desde atrás a la izquierda y violeta
  (`luz-3d`) desde atrás a la derecha. En three.js: dos direccionales de intensidad 9-11 contra una principal de
  1,6-1,75 y entorno de estudio a 0,4-0,55. El canto del sujeto tiene que dibujar una línea de color de 2-6 px a 1x.
- **Halo** detrás de la pareja (`.luz-3d.halo`): elipse de 1,1-1,3 veces la pareja, `luz-3d` al 34 % → 12 % → 0.
  **Suelo** (`.luz-3d.suelo`): elipse plana (alto ≈ 20 % del ancho) bajo la pareja, `cielo-1` al 16 %.

## Partículas y bokeh (`data-fondo`, `aria-hidden="true"`)
- **Cruces «+»** de 20-32 px (≈ 2 % del ancho), trazo 2,6/20 con puntas redondas, opacidad 0,22-0,34.
- **Cuadraditos** de 8-12 px (radio 2 px), 0,22-0,30; **puntos** de 3-4 px de radio, 0,30-0,40.
- **Cantidad**: 4-6 cruces, 4-6 cuadraditos y 3-4 puntos por pieza (≈ 1 cada 100.000 px²). Repartidos, sin
  simetrías, ninguno encima de un sujeto y a ≥ 40 px del texto.
- **Bokeh**: 3-5 círculos de 24-100 px, opacidad 0,14-0,30, `blur` de 2-6 px (los grandes, más tenues). Si se ven
  a la primera ojeada, sobran.
- Todo en SVG (`#p3m-cruz`, `<rect>`, `<circle>`) con `currentColor` = `particula`.

## Sombras de contacto
- **Dos elipses con `radial-gradient`, sin `filter`**, dentro de cada `.sujeto` (van detrás del recorte):
  penumbra al 72 % → 30 % → 0 y núcleo (68 % x 36 % de la penumbra) al 94 % → 45 % → 0, en `sombra-3d`
  (oklch L 0,13, poco saturada: nunca de color vivo).
- **Tamaño**: mascota, 66 % de su ancho x 8,5 % de su alto, centrada en la línea de los pies; producto, 112 % de
  su ancho x 17 % de su alto (la huella en perspectiva de ¾), centrada en el 91,5 % del alto.
- Mide la huella de cada recorte nuevo (la fila opaca más baja por columnas) y ajusta `--cx`, `--cy`, `--cw` y
  `--ch`. Si un sujeto sangra por abajo, su sombra sobra.

## Escala y solape
- **Producto 1,2-1,3 veces más alto que la mascota** (hero: 702 y 563 px). Si el producto es pequeño (mando,
  ratón), al revés: la mascota lo sostiene o se apoya en él, y el producto ≥ 45 % de su alto.
- **La mascota delante**, tapando el **20-35 % del ancho** del producto (hero: 146 px de 470 = 31 %), con la base
  **20-40 px más baja** (más cerca de la cámara) y **mirando al producto** (giro de 20-25°).
- Lo que tapa la mascota no puede ser lo que vende el producto (el frontal con la luz sí; el logotipo del
  fabricante o la pantalla, no).
- La pareja ocupa **~80 % del alto** en el hero, **~60 %** en 1:1 y 4:5 y **~50 %** en story.

## Logo y tipografía
- **Logo centrado arriba**, a margen + 6-10 px del borde (70 px en el hero, 82 en 1:1, 84 en 4:5, 300 en story),
  a 2,1-3,7 % del ancho (34 px en 1600, 30-32 en 1080, 40 en story); en blanco (`--claro`). En el banner de X,
  arriba a la izquierda con el titular.
- **Titular** en `--fuente-display` (si la marca no la trae, `--fuente`), peso 780, interletra −0,038 em,
  interlineado 0,98, **2 líneas** con `<br>` y sin viudas: 5,4 % del ancho en el hero (86 px), 6,9-7,6 % en
  redes (74-82 px), 10 % en story (108 px). En gaming va fuerte; nunca en mayúsculas enteras.
- **Chip** opcional (22-30 px, 650, píldora con borde de 1 px al 30 % de `--claro`) y **CTA** en píldora clara
  (`--claro` con texto `--tinta`, 24-34 px, 700) con flecha. Una sola CTA.
- Precios y porcentajes con espacio fino: «−30 %» (`−30&nbsp;%`), con el signo menos (−), no el guion.

## Composición por formato
- **hero 1600x900** (redondeado): logo arriba al centro; chip, titular y CTA en el aire de la izquierda
  (x = 124-730); la pareja a la derecha del centro (x = 760-1516), producto a la izquierda de la pareja.
- **redes-1x1 1080x1080**: logo, titular (2 líneas) y CTA centrados arriba (hasta y ≈ 390); la pareja grande
  abajo, centrada, con la base a 30-60 px del borde.
- **redes-4x5 1080x1350**: logo, chip, titular y CTA arriba (hasta y ≈ 500); la pareja abajo (y ≈ 520-1300).
- **banner-x 1500x500**: la foto de perfil tapa abajo a la izquierda (~400x200) y el móvil recorta ~60 px arriba y
  abajo. Logo y titular arriba a la izquierda (x ≥ 108, y = 96-300); la pareja a la derecha (x ≈ 926-1400), la
  mascota puede sangrar ~30 px por abajo, como en un escaparate.
- **story 1080x1920**: 250 px arriba y 340 abajo sin texto. Logo en y = 300, chip, titular y CTA hasta y ≈ 820;
  la pareja de y ≈ 900 hasta la franja de abajo (los sujetos sí pueden entrar en ella).

## Cómo conseguir el material 3D
- **Render propio** (lo mejor): el modelo real del producto (CAD del fabricante, GLB, STEP pasado a GLB) y la
  mascota de la marca. three.js o Blender, con:
  - entorno de estudio (`RoomEnvironment` en three.js, un HDRI de estudio en Blender) a 0,4-0,55;
  - principal cálida-neutra arriba a la derecha con sombra suave, relleno frío débil a la izquierda y los dos
    recortes del color de la marca desde atrás (ver «Luz de color»); ACES; fondo transparente;
  - materiales PBR: lacado con `clearcoat` 0,5-0,6 y rugosidad 0,3; metales con `metalness` 1 y rugosidad
    0,25-0,45; cristal con `transmission` y un reflejo diagonal suave; vinilo de juguete (mascota) con rugosidad
    0,5, `sheen` 1 y `clearcoat` 0,2; ojos con `clearcoat` 1 y dos puntos de brillo;
  - cámara de ¾ con FOV 22-26° y elevación ligera; geometría suave (esferas de ≥ 150 segmentos, biseles reales);
  - salida PNG con alfa a ≥ 2x del tamaño en pieza (1800-2000 px de alto) → recorte de bordes y WebP con alfa
    (calidad 0,9, ≤ 500 KB) en `recortes/`.
- **IA** (sin modelos): producto y mascota por separado, «isolated on a plain flat light grey seamless studio
  background», misma luz descrita en los dos prompts («soft studio key light, blue rim light from back left,
  violet rim light from back right»); después quita el fondo (skill `imagen-ia`, «Recortes para los looks») y
  revisa el borde a 200 %: sin halo claro, sin pelos cortados, sin restos del fondo.
- **Los renders no cambian con la marca**: llevan la luz de la marca con la que se hicieron. Con otra marca, el
  fondo, la fuente y el logo cambian solos; los sujetos, solo si se vuelven a renderizar con su luz.
- Mascota: de la marca o original. Nada de personajes con derechos ni productos con logotipos de terceros.

## Qué evitar (lo que delata una plantilla barata)
- Sujetos sin sombra de contacto (flotan) o con una sombra de `drop-shadow` alrededor.
- Recortes con halo blanco o con el borde mordido; renders de «plastilina» (todo con la misma rugosidad).
- Luz incoherente: rim cálido sobre fondo frío, o un sujeto con recorte y el otro sin él.
- Glow, neón, `text-shadow`, sombras de color en el HTML; partículas que se ven más que el titular.
- Texto encima de un sujeto, o tan pegado que se lee como parte de él (≥ 40 px de aire).
- La pareja separada en dos islas, o la mascota tapando lo que vende el producto.

## Lista de revisión de este estilo (además de la general)
- [ ] Los dos recortes están limpios a 200 % y parecen del mismo estudio (misma luz, mismo recorte de color).
- [ ] La mascota tapa el 20-35 % del producto, con la base más baja y mirándolo.
- [ ] Cada sujeto que apoya tiene su sombra de contacto y no flota.
- [ ] El degradado va de azul (arriba a la izquierda) a índigo (abajo a la derecha) sin bandas.
- [ ] Partículas y bokeh solo se ven al segundo vistazo.
- [ ] Logo centrado arriba; ningún texto pisa un sujeto; zonas seguras del formato libres.
- [ ] Con otra marca, cambian fondo, fuente, nombre y logo, y nada se rompe.

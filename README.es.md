[English](README.md) · **Español**

# visual-marketing-skills

Skills de **Claude Code** para hacer piezas de marketing visual con nivel de agencia **para cualquier marca**:
imágenes de producto en contexto, cabeceras y correos HTML, carruseles de Instagram, banners, miniaturas, stories y
reels. Cinco looks visuales, un selector que elige el adecuado y un bucle de pulido que revisa cada pieza antes de
entregarla.

## Instalación

```
/plugin marketplace add C4rI0s/visual-marketing-skills
/plugin install marketing-visual-completo@visual-marketing-skills
```

El paquete instala todos los plugins de abajo (y `motion-graphics` para los vídeos). Para instalar solo algunos:
`/plugin install <plugin>@visual-marketing-skills`.

## Cinco looks

La skill `direccion-de-arte` lee el brief de tu marca en un `marca.json` y elige el look según la marca y el
objetivo. Cada look exporta **16:9, 1:1, 4:5, banner de X y story** a 2x.

| Look | Skill | Úsalo para |
|---|---|---|
| **1 · Producto en contexto** | `producto-en-contexto` | SaaS y apps: la interfaz real sobre un degradado suave con capas flotantes |
| **2 · Oscuro glow** | `oscuro-glow` | fintech, trading y referidos: azul marino, datos desenfocados, tarjetas con halo, cifras grandes |
| **3 · Editorial recorte** | `editorial-recorte` | gaming, esports, lifestyle: collage de recortes con líneas finas de construcción |
| **4 · Producto 3D + mascota** | `producto-3d-mascota` | producto físico y tiendas: producto 3D y mascota sobre un degradado |
| **5 · Tech grid** | `tech-grid` | periféricos y hardware: cuadrícula fina, productos que rompen los marcos |

| Producto en contexto | Oscuro glow |
|---|---|
| ![](docs/demos/09-producto-en-contexto-hero.jpg) | ![](docs/demos/07-oscuro-glow-hero.jpg) |
| **Editorial recorte** | **Producto 3D + mascota** |
| ![](docs/demos/05-editorial-recorte-hero.jpg) | ![](docs/demos/01-producto-3d-mascota-hero.jpg) |
| **Tech grid** | **Mismas plantillas, otra marca** |
| ![](docs/demos/03-tech-grid-hero.jpg) | ![](docs/ejemplos/looks-otra-marca.jpg) |

Más en [`docs/demos`](docs/demos), [`docs/ejemplos`](docs/ejemplos) y las
[pruebas en limpio](docs/pruebas-en-limpio). Todas las marcas son ficticias; las personas están generadas con IA y el
producto y la mascota son renders propios.

**Referencias de estilo.** Cada look parte de un estilo estudiado: Proton Pass (1), Impulse World (2), Logitech
esports (3), Instant Gaming (4) y Logitech Deal Days (5). Solo se nombran; no se incluyen sus imágenes ni sus marcas,
y `referencia/golden.jpg` de cada skill es nuestra propia demo.
## Ejemplos

Pide en lenguaje normal; Claude elige la skill, te pide lo que falte (marca, logo, capturas o fotos) y revisa cada PNG
antes de entregar.

| Pides | Recibes |
|---|---|
| «Hero y post del lanzamiento de mi app de facturas, estilo Proton. Marca: Pliego, naranja #FF5B2E» | hero 16:9, 1:1 y 4:5 con la app sobre un degradado ([ejemplo](docs/ejemplos/producto-hero.png)) |
| «Correo anunciando los recordatorios de pago, con la app en la cabecera» | correo HTML revisado en Gmail, Outlook, móvil y modo oscuro ([ejemplo](docs/ejemplos/correo-producto.png)) |
| «Carrusel de Instagram de 7 diapositivas: cobra en 7 días, no en 45» | diapositivas 1080x1350 y la vista de la rejilla del perfil ([ejemplo](docs/ejemplos/carrusel-hoja.png)) |
| «Banner de Black Friday para mi tienda de periféricos, sin fotos del producto» | piezas tech grid con la librería 3D en tus colores |

Prueba en limpio con marcas que las skills no habían visto nunca (Claude Code recién instalado, solo este marketplace,
un brief por pieza):

![](docs/ejemplos/prueba-en-limpio.jpg)

## Qué esperar

Probado en limpio (Claude Code recién instalado, solo este marketplace, un brief normal, marcas que no había visto):
media **8,5/10** (6,8 antes del bucle de pulido).

- **Producto en contexto y oscuro glow** salen solos al nivel de las demos (la interfaz es HTML).
- **Tech grid**: con fotos de tus productos los recorta e iguala la luz; sin fotos usa una librería 3D genérica
  (teclado, ratón, cascos).
- **Editorial recorte** necesita personas fotográficas: tus fotos o IA (Higgsfield, céntimos por pieza).
- **Producto 3D + mascota** es el más exigente: mejor con producto y mascota generados con IA.
- **Tiempo y coste**: 5-15 min por hero; 0 $ con tus fotos, 0,02-0,10 $ por pieza con IA (siempre con tope).
- No se inventa tu logo ni el modelo exacto de tu producto sin fotos o sin un modelo.

## Skills

| Plugin | Qué hace |
|---|---|
| `direccion-de-arte` | brief de marca a `marca.json`, selector de look, copy, tipografía, rejillas, revisión visual obligatoria |
| `piezas-graficas` | los cinco looks, exportador común, bucle de pulido, herramientas de sujetos (recortes, luz, librería 3D) e imágenes con IA |
| `correos-marketing` | correos HTML con cabecera de producto en contexto, aplicador de marca y comprobador (Gmail, Outlook, móvil, modo oscuro) |
| `carruseles-instagram` | carruseles 1080x1350 con hoja de contacto y vista de la rejilla del perfil |
| `video-marketing` | reels: guion por segundos, zonas seguras 9:16, revisión por fotogramas (sobre motion-graphics) |

Pídelo en lenguaje normal («hero y post para mi lanzamiento, estilo Proton», «campaña de referidos en oscuro con dos
cifras grandes», «¿qué look le va a esta marca?») o ejecuta los scripts a mano (mira el `SKILL.md` de cada skill).
## Requisitos
- Node 18+ y Chrome o Edge recientes (si no, define `CHROME_PATH`). La primera vez: `npm install` en la carpeta
  `scripts/` de la skill (Claude lo hace solo).
- Sujetos con IA (opcional): `HIGGSFIELD_API_KEY` (tope de gasto con `IMAGEN_IA_TOPE_USD`, por defecto 0,50 $). Sin
  ella, la skill usa tus fotos o la librería 3D.
- Recortar fondos instala un modelo local (unos 330 MB) la primera vez. Los vídeos necesitan `ffmpeg`.

## Contribuir
Las skills viven en `plugins/<plugin>/skills/<nombre>/SKILL.md` (la descripción dice **cuándo** usarla). Las
plantillas leen la marca de `marca.json`; nada de marcas reales en ellas. Algunos ficheros están repetidos a
propósito (`producto.css`, `producto.js`, `exportar.mjs`): copia los cambios en todas las copias. Sube la `version` del
plugin y la del marketplace. Mira el [CHANGELOG](CHANGELOG.es.md).

## Licencia
[MIT](LICENSE) © C4rI0s.
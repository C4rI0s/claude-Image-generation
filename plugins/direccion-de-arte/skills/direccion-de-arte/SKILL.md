---
name: direccion-de-arte
description: Dirección de arte para piezas de marketing con nivel de agencia (Proton, Linear, Stripe) y estética sobria y plana. Úsala SIEMPRE antes de diseñar o revisar cualquier pieza visual (correo HTML, carrusel de Instagram, portada, banner, miniatura, OG, story, anuncio o vídeo) y cuando pidan «que quede más profesional», «menos IA», «más limpio», una guía de estilo, tipografía, rejillas, paleta, jerarquía o textos (copy) de una pieza. Incluye la marca GamzyHost, el brief y la revisión visual obligatoria.
---

# Dirección de arte · la base de todas las piezas

Esta skill decide **cómo tiene que verse y leerse** una pieza. Las skills de formato (`correo-marketing-html`,
`carrusel-instagram`, `piezas-graficas`, `imagen-ia`, `reel-de-marketing`) deciden **cómo se fabrica**. Léela
primero; luego abre la del formato.

## El listón
Nivel Proton / agencia: **sobrio, plano, con aire y con contenido real**. Una pieza buena se reconoce porque:
- tiene **una sola idea** y se entiende en 2 segundos;
- la jerarquía es obvia: **titular → apoyo → acción**, y nada compite con el titular;
- usa **una familia tipográfica** (dos como mucho: una de texto y una mono para datos);
- el color es **neutro + un acento** que ocupa menos del 10 % de la superficie;
- todo cae en una **rejilla**: mismos márgenes, mismas distancias, alineado a la izquierda;
- enseña **el producto de verdad** (capturas reales, cifras reales), no decoración.

**Prohibido** (es lo que delata a una IA o a una plantilla barata): brillos y resplandores (glow, neón, `text-shadow`),
sombras difusas grandes, degradados de colores, bordes de color, emojis, mayúsculas en todo el titular, exclamaciones,
iconos 3D brillantes, fondos con texturas, más de un acento, texto centrado en bloques largos, efectos «cristal»,
palabras de relleno («increíble», «revolucionario», «descubre», «potencia»), stock genérico de gente señalando.

## Flujo (no te saltes pasos)
1. **Brief** (`references/brief.md`): objetivo, público, una idea, una acción, formato y canal, y los **datos
   verificados**. Las cifras se comprueban en la fuente viva (web, panel, base de datos), nunca en un material viejo:
   las heros antiguas de GamzyDrive decían «10 GB sin cuenta» y la web ya decía 20 GB.
2. **Copy primero** (`references/copy.md`): titular, apoyo y botón escritos y recortados ANTES de maquetar. Si el
   texto no funciona en un .txt, el diseño no lo salva.
3. **Sistema** (`references/tipografia.md`, `references/rejilla-y-espacio.md`, `references/color.md`): escala
   tipográfica, márgenes, rejilla y paleta como tokens (variables CSS). Nada de valores sueltos.
4. **Marca**: si es GamzyHost, `references/marca-gamzyhost.md`. Para otra marca, saca sus tokens de su web (CSS:
   `font-family`, colores de botones, radios) y escríbelos igual.
5. **Maqueta** con la skill del formato, partiendo de su plantilla.
6. **Revisión visual obligatoria** (`references/revision-visual.md`): renderiza con Chrome de verdad, **abre el PNG y
   míralo**, pasa la lista, corrige y vuelve a renderizar. No se entrega nada que no hayas visto renderizado.

## Reglas rápidas que más mejoran una pieza
- **Escala con contraste**: el titular al menos 2,5 veces el cuerpo. Titulares de 6-8 palabras.
- **Interletra negativa en titulares** (−0,02 a −0,04 em) y positiva en etiquetas en mayúsculas (+0,08 a +0,14 em).
- **Interlineado**: titulares 0,95-1,1; texto 1,35-1,65.
- **Ancho de línea**: 45-75 caracteres en texto corrido (correo), 20-35 en redes.
- **Márgenes generosos**: 8 % del lado corto como mínimo en redes (88 px en 1080), 40 px en correo.
- **Números**: cifras reales, con su unidad separada por espacio fino o duro (`20&nbsp;GB`), alineadas en tablas.
- **Una acción**: un botón. Si hay dos, el segundo es un enlace de texto.
- **Acento con contraste**: un amarillo/ámbar no se usa como texto sobre blanco (contraste < 3:1); se usa de
  relleno (botón) o como texto sobre oscuro. Para texto sobre claro, oscurece el acento hasta 4,5:1.
- **Capturas**: recortadas a lo que importa, con radio coherente con la pieza y una línea fina neutra; el fondo
  de la captura tiene que casar con el lienzo (captura con fondo crema → lienzo claro).
- **Coherencia entre formatos**: una campaña = mismos tokens, mismo titular, misma captura en todos los tamaños.

## Referencias
- `references/brief.md` · plantilla de brief y preguntas que hay que contestar antes de diseñar
- `references/copy.md` · titulares, botones, tono, palabras prohibidas, el estilo GamzyHost
- `references/tipografia.md` · escalas, emparejamientos, ajustes finos, fuentes seguras en correo
- `references/rejilla-y-espacio.md` · márgenes, rejillas por formato, ritmo vertical, zonas seguras
- `references/color.md` · paletas sobrias, contraste, acento, modo oscuro
- `references/marca-gamzyhost.md` · tokens, tipografía, acentos por producto, recursos y decisiones de Carlos
- `references/revision-visual.md` · la lista de la revisión obligatoria (común a todas las skills)

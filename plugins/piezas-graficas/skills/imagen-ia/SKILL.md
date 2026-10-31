---
name: imagen-ia
description: Genera con IA las imágenes de apoyo de una pieza de marketing (fondos, escenas, fotos de ambiente, texturas, objetos de producto) con estética sobria y profesional, sin el «look IA», controlando el gasto y revisando el resultado antes de usarlo. Pensada para Higgsfield (herramientas higgsfield_imagen/higgsfield_estado) pero vale con cualquier generador. Úsala cuando una portada, banner, miniatura, story o carrusel necesite una imagen que no existe y no basta con una captura real.
---

# Imágenes con IA para piezas de marketing

La IA pone **la imagen**; el texto, la marca y la composición se hacen en HTML con `piezas-graficas` o
`carrusel-instagram`. Una imagen de IA nunca lleva el titular dentro.

## Antes de generar: ¿hace falta?
1. ¿Hay una **captura real** del producto que cuente lo mismo? Úsala: es más creíble.
2. ¿Basta con **tipografía sobre fondo plano**? En el estilo sobrio, muchas veces sí.
3. Si hace falta ambiente (una escena, un objeto, una textura sutil), genera.

## Flujo
1. **Decide el papel de la imagen** en la pieza: fondo a sangre, media página, objeto recortado. Y **dónde irá el
   texto**: esa zona tiene que quedar limpia (cielo, pared, desenfoque, espacio negativo).
2. **Formato igual al de la pieza** (o mayor): 4:5 para carrusel, 9:16 para story, 16:9 para miniatura/OG.
3. **Prompt en inglés** con la plantilla de `references/prompts.md`: sujeto + composición (con el hueco para el
   texto) + luz + paleta de la marca (los colores de `marca.json` en palabras: «warm off-white, charcoal, a single
   coral accent») + estilo + lo que NO quieres.
4. **Empieza barato**: 2-4 variantes con el modelo económico (en Higgsfield, `soul` o `z-image`; `ideogram` solo si
   de verdad necesitas letras dentro, y casi nunca las necesitas). Lanza con `higgsfield_imagen` y recoge con
   `higgsfield_estado`. El gasto está controlado por la herramienta: no la esquives con la API a mano. Los vídeos
   llevan siempre el vale del dueño.
5. **Revisa cada imagen** abriéndola (herramienta Read) y con zoom en las zonas críticas:
   - manos, caras, texto fantasma, logos inventados, objetos deformes, bordes repetidos;
   - que el hueco para el texto exista y sea tranquilo;
   - que la paleta case con la marca (sin neón, sin saturación de «póster de IA»);
   - resolución suficiente para el tamaño final (si no, regenera más grande; no amplíes).
   Si falla, **cambia el prompt** (no repitas el mismo) y vuelve a lanzar una vez. Si sigue mal, cambia de enfoque.
6. **Componla** en la plantilla de la pieza como `<img>` de fondo (`object-fit: cover`) y pon el texto en HTML. Si
   el texto queda sobre la foto, asegura legibilidad con un **bloque plano** detrás o escogiendo una zona oscura/clara
   uniforme; nada de sombras ni brillos. El exportador marcará «texto sobre imagen»: compruébalo a ojo.
7. **Exporta y revisa** con el exportador de la skill de la pieza (revisión visual obligatoria).

## Look sobrio (lo que pedir y lo que evitar)
- Pide: luz natural suave, materiales mate, profundidad de campo, paletas cálidas neutras con un acento,
  composición con espacio negativo, fotografía editorial, «product photography on seamless backdrop».
- Evita: neón, glow, partículas, lens flare, HDR, cyberpunk, 3D brillante de plástico, personas mirando a cámara
  con sonrisa de stock, texto en la imagen, logos de terceros, personajes con copyright, famosos.

## Coherencia en una serie
- Fija estilo y paleta en un **bloque de estilo** que repites palabra por palabra en todos los prompts.
- Usa la misma semilla (`parametros.seed`) para variantes del mismo estilo.
- Para un personaje recurrente: imagen ancla y referencia (ver la skill `higgsfield` si está instalada).

## Ficheros
- Copia las imágenes que uses a la carpeta de la pieza y referencia la copia: los enlaces de los generadores caducan
  (los de Higgsfield, a los 7 días).
- `references/prompts.md` · plantilla de prompt, bloques de estilo y ejemplos por tipo de pieza.

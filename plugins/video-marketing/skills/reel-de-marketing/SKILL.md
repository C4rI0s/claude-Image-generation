---
name: reel-de-marketing
description: Planifica, produce y revisa vídeos cortos de marketing (Reels, TikTok, Shorts, anuncios de 6-30 s, vídeos de lanzamiento) con estética sobria y profesional, apoyándose en el plugin motion-graphics (Remotion) para animar y en Higgsfield para planos generados, con guion, zonas seguras 9:16, subtítulos y una revisión visual por fotogramas antes de entregar. Úsala cuando pidan un reel, un vídeo corto, un anuncio en vídeo, animar un carrusel o una pieza, o un vídeo de lanzamiento.
---

# Reels y vídeos cortos de marketing

Esta skill es la **dirección** del vídeo. La animación la hace el plugin **motion-graphics** (motor Remotion, estilos
oscuro / claro / agencia) — instálalo también:
```
/plugin marketplace add FefeRP/motion-graphics-skills
/plugin install motion-graphics@motion-graphics-skills
```
Para voz en off y música, la skill `voz-y-musica-de-video` si está instalada. Para planos generados, `imagen-ia`
(imagen → vídeo en Higgsfield; los vídeos cuestan dinero y llevan el vale del dueño).

## Flujo
1. **Brief** (skill `direccion-de-arte`): una idea, un público, una acción. Duración: 6 s (bumper), 15 s (reel/anuncio),
   30 s como máximo para promo; lanzamientos largos 45-60 s.
2. **Guion por segundos** (`references/guion.md`): gancho en el primer segundo, una idea por plano, cifra o prueba
   real a mitad, acción al final. Escribe el texto en pantalla de cada plano (≤ 6 palabras) y la voz si la hay.
3. **Reutiliza lo que ya existe**: los tokens y textos del carrusel o de las piezas de la campaña; las capturas reales
   (vía «recrear la interfaz» o «captura entera» de motion-graphics).
4. **Anima** con motion-graphics: estilo **claro** u **oscuro** sobrio para GamzyHost (el de agencia, solo si se pide
   algo más enérgico). Nada de glitch, brillos ni partículas por defecto; movimiento con propósito (cámara que acompaña,
   piezas que entran con trayectoria, cifras que cuentan).
5. **Formato**: 1080x1920 a 30 o 60 fps para Reels/TikTok/Shorts; 1080x1350 para feed; 1920x1080 para YouTube/web.
   Zonas seguras en 9:16: 250 px arriba, 340 abajo y 120 a la derecha libres de texto.
6. **Subtítulos** siempre (la mayoría lo ve sin sonido): grandes (≥ 48 px en 1080), 1-2 líneas, en la zona segura,
   sincronizados con la voz.
7. **Revisión visual obligatoria** (abajo). Corrige y vuelve a renderizar.
8. **Entrega**: MP4 H.264, AAC, −14 LUFS, < 100 MB; portada (frame elegido o pieza de `piezas-graficas` 1080x1920).

## Revisión visual obligatoria (por fotogramas)
No basta con decir «renderizado». Saca fotogramas y míralos:
```bash
# Hoja de contacto: 1 fotograma por segundo, en rejilla
ffmpeg -i video.mp4 -vf "fps=1,scale=270:-1,tile=6x3" -frames:v 1 -y hoja-video.png
# Fotogramas exactos de momentos clave (gancho, cifra, acción)
ffmpeg -ss 0.5 -i video.mp4 -frames:v 1 -y f-gancho.png
ffmpeg -sseof -1 -i video.mp4 -frames:v 1 -y f-final.png
```
Abre las imágenes y comprueba:
- [ ] El primer segundo ya dice qué es (no un logo girando).
- [ ] Ningún texto en las zonas seguras de la interfaz; subtítulos legibles a tamaño de móvil.
- [ ] Cada texto en pantalla dura lo suficiente para leerlo (≈ 0,3 s por palabra + 0,5 s).
- [ ] Cifras y datos correctos (los mismos que la web hoy).
- [ ] Estilo plano y coherente con el resto de la campaña; nada de brillos ni efectos gratuitos.
- [ ] El último plano tiene la acción y se queda al menos 1,5 s.
- [ ] Audio: voz entendible, música por debajo (ducking), sin picos (comprobar con `ffmpeg -i video.mp4 -af ebur128 -f null -`).

Ver también `references/guion.md` para estructuras y la plantilla de guion.

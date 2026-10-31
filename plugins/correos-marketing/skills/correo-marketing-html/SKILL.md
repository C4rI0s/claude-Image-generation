---
name: correo-marketing-html
description: Diseña, maqueta y comprueba correos HTML de marketing profesionales (lanzamientos, novedades, ofertas con cupón, newsletters) que se ven bien en Gmail, Outlook, Apple Mail y el móvil — fondo blanco, sobrios y planos, sin glows ni bordes de color, nivel Proton. Úsala cuando pidan un correo, una campaña de email, una newsletter, «el HTML del correo», rediseñar un correo o revisar por qué un correo se ve mal. Incluye plantillas probadas y un comprobador que renderiza en escritorio, móvil, sin imágenes y modo oscuro.
---

# Correos HTML de marketing

Antes de nada, si está instalada, lee la skill **`direccion-de-arte`** (brief, copy, marca). Esta skill es la imprenta.

## Qué hay aquí
- `plantillas/producto.html` · lanzamiento de un producto: imagen de cabecera, titular, 2 párrafos, botón,
  ventajas con icono, tira de cifras, pie con baja. (Ejemplo real: GamzyDrive.)
- `plantillas/anuncio.html` · novedad contada con texto (tipo newsletter): marca en texto, fecha, titular, imagen
  opcional con pie, lista corta, botón oscuro secundario.
- `plantillas/oferta.html` · cupón: código en caja crema plana, fecha de fin, botón, condiciones.
- `scripts/comprobar-correo.mjs` · comprobaciones estáticas + render real en 4 vistas.
- `references/reglas-clientes.md` · qué soporta cada cliente de correo y por qué las plantillas están hechas así.
- `references/entregabilidad.md` · peso, texto/imagen, baja, cabeceras, prueba de envío.
- `references/gamzyhost.md` · cómo se envían los correos de GamzyHost y lo ya decidido.

## Flujo
1. **Brief y textos** (skill `direccion-de-arte`): asunto (≤ 50 caracteres, sin mayúsculas ni exclamaciones),
   preencabezado (≤ 110), titular, 40-90 palabras de cuerpo, botón, ventajas y cifras **comprobadas en la fuente**.
2. **Elige plantilla** y cópiala a la carpeta del trabajo (nunca edites la de la skill):
   `cp <skill>/plantillas/producto.html ./correo-drive.html`.
3. **Edita solo lo marcado con `EDITAR`**: textos, enlaces, imágenes (con su `width`/`height` reales y un `alt` que
   diga lo esencial). Para quitar un bloque, borra sus filas `<tr>` enteras. Para añadir otra ventaja, duplica
   una fila. No cambies la estructura de tablas ni los estilos salvo que sepas por qué (ver `reglas-clientes.md`).
4. **Imágenes**: PNG/JPG con URL https absoluta, exportadas al doble (1200 px para 600). Si hace falta un hero
   nuevo, hazlo con la skill `piezas-graficas` (pieza `hero-correo`) y súbelo a un sitio público (CDN/web).
5. **Comprueba** (obligatorio):
   ```bash
   cd <skill>/scripts && npm install            # solo la primera vez
   node <skill>/scripts/comprobar-correo.mjs ./correo-drive.html --marketing
   ```
   Arregla todos los ✗. Los avisos de `{{etiquetas}}` y List-Unsubscribe son recordatorios para el envío.
6. **Mira las 4 vistas** que deja en `revision-<nombre>/` (abre cada PNG):
   - `escritorio.png`: jerarquía, alineación al eje de 40 px, aire, el botón como único color.
   - `movil.png`: nada desborda, el botón ocupa el ancho, las cifras se apilan, el pie no parte enlaces.
   - `sin-imagenes.png`: ¿se entiende el correo y se ve el botón con las imágenes bloqueadas?
   - `oscuro.png`: ¿algo desaparece o queda feo al invertir (logos transparentes, iconos)?
   Pasa la lista de `direccion-de-arte/references/revision-visual.md`. Corrige y repite.
7. **Prueba real** antes de enviar a nadie: una prueba a una bandeja de verdad (Gmail como mínimo; Outlook si se
   puede) y confirmar que el servidor la aceptó. En GamzyHost: ver `references/gamzyhost.md`.
8. **Entrega**: el HTML final, las 4 vistas y qué se probó y qué no.

## Reglas de estilo de estas plantillas (no las rompas)
- Fondo **blanco** fuera y dentro. Bloques de apoyo en crema plano (#f7f5f1) sin borde.
- **Sin** sombras, brillos, degradados, bordes de color, bordes discontinuos, emojis ni exclamaciones.
- El **botón es el único elemento de color** (ámbar #f7a01e con texto tinta; el secundario, tinta con texto blanco).
- Etiqueta (kicker) en gris, mayúsculas espaciadas; titular 29-30 px, 800, interletra −0,02 em.
- Separadores: línea de 1 px #ece8e1. Iconos: PNG de 80 px pintados a 40.
- Ancho 600, márgenes 40 (24 en móvil). Tablas + estilos en línea + `font-family` en cada celda.
- Pie con quién escribe, enlaces útiles, por qué lo recibe y **Darme de baja** (obligatorio en comerciales).

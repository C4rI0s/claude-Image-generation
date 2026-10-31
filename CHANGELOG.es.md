# Novedades

**2.4.0 · la skill sola, al nivel de las demos.** Probada en limpio (Claude Code sin memoria ni ayudas, solo con el
marketplace instalado y un brief normal) con 6 marcas inventadas y otros productos; lo que fallaba se ha metido en la
skill:
- **Bucle de pulido obligatorio** (`piezas-graficas/references/pulido.md`): cada look trae su **golden**
  (`<look>/referencia/golden.jpg` + `golden.md` con qué imitar y una lista puntuable). `comparar.mjs` pone la pieza al
  lado de la golden con un detalle al 100 %; se puntúa de 1 a 10, 2 vueltas como mínimo y se entrega con todo ≥ 8.
- **Sujetos de verdad** (`piezas-graficas/references/sujetos.md`): fotos del usuario → `recortar.mjs` +
  `preparar-recorte.mjs` (halo, WebP, huella) + `armonizar.mjs` (misma luz y blancos del look) + `ver-recorte.mjs`;
  sin fotos → **librería 3D** con los colores de la marca (teclado, ratón, cascos, torre y mascota genérica) o **IA**
  con `generar.mjs` (API de Higgsfield: estimación gratis, tope de gasto, 2 trabajos a la vez, permiso del usuario).
- **Qué pedir antes de empezar** (en `direccion-de-arte`): marca y logo, la pieza, el sujeto (capturas, fotos de
  producto, personas, mascota) y si hay presupuesto de IA.
- **El exportador ve más**: error si un look con recortes no los trae o si un recorte es un relleno plano (siluetas
  dibujadas); avisos de halo en el borde de un recorte, sujetos pequeños, marcos o tarjetas de menos, textos o
  recortes de la plantilla de ejemplo en la pieza de otra marca y entregas a menos de 2x.

**2.3.0 · pasada de pulido de los cinco looks.** Cada muestra se ha puesto al lado de su referencia y se ha
rehecho lo que se notaba amateur; lo aprendido está en el `references/estilo.md` de cada look como reglas medidas.
- **Producto 3D + mascota**: la torre, por dentro como una de verdad (ventiladores con aspas barridas y aro de luz,
  radiador con aletas, bomba, gráfica con su carcasa, memorias, cableado trenzado, cristal con reflejos) y la
  mascota con más acabado (vinilo con aspecto de subsurface, luz de recorte, ojos con iris y brillos, mano que
  saluda).
- **Tech grid**: ratón gaming creíble (carcasa ergonómica, botones laterales, rueda estriada, agarre texturizado,
  tira de luz) que se sale del marco con intención; teclado con leyendas y luz entre teclas; luz y sombras comunes.
- **Editorial recorte**: recortes sin halo junto a orejas y mechones (`preparar-recortes.mjs` gana `contorno` y
  `limpiar`) y un grupo más compacto.
- **Oscuro glow**: fondo con gráfico de velas de verdad (volumen, medias, eje de precios) y un portátil con panel
  detallado y base de aluminio con reflejo.
- **Producto en contexto**: la ventana ya no deja huecos vacíos; el contexto atenuado llega hasta el borde.


**2.5.x** · instalación con un solo comando: el paquete `marketing-visual-completo` instala todos los plugins, `motion-graphics` incluido.

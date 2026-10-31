# Marca GamzyHost

Hosting de servidores de juegos (Minecraft, FiveM, Rust, Palworld…) con productos propios: **GamzyDrive** (nube),
**GamzyMail** (correo con dominio propio) y **GamzyCDN**. Público hispanohablante, gamers y comunidades.
Estética: sobria, cálida, plana, con interfaz real del producto. Nada de neón «gamer».

## Tokens
```css
--tinta:   #1d1a15;  /* titulares, botón oscuro, fondos oscuros de cabecera */
--texto:   #33302b;  /* párrafos */
--suave:   #6b655c;  /* apoyo, etiquetas */
--apagado: #8a8379;  /* pie, notas */
--linea:   #eae6df;  /* separadores (correo #ece8e1; redes #e2ddd4) */
--crema:   #faf8f4;  /* fondos de bloque (correo #f7f5f1) */
--noche:   #17150f;  /* fondo oscuro de redes */
--ambar:   #f7a01e;  /* acento de marca: botones, cifras sobre oscuro. NUNCA texto sobre blanco */
```
Acentos por producto (en sus piezas sustituyen al ámbar salvo en el botón de correo, que siempre es ámbar):
- **GamzyDrive**: verde agua `#79c7b7` (sobre oscuro) / `#1f6f62` (texto sobre claro).
- **GamzyMail**: ámbar `#f7a01e` (su logo es un sobre ámbar).
- **GamzyCDN**: comprobar en su hero (`gamzycdn-hero-v4.jpg`) antes de usar.

## Tipografía
- Web y piezas: **Plus Jakarta Sans** (500-800) para todo; **Archivo Black** existe en la web para display muy
  puntual. Mono para datos y etiquetas: JetBrains Mono.
- Titulares en 800 con interletra −0,035/−0,04 em y el acento en la segunda mitad: «Tu nube, **tu control.**»,
  «Tu correo. **Tu dominio.**».
- Correo: pila de sistema (ver `tipografia.md`).

## Recursos (todos públicos, PNG/JPG, aptos para correo)
- Logo para fondo oscuro: `https://gamzyhost.com/imagenes/correo/logo.png` (nube color arena + «GAMZY HOST» blanco).
  **No hay versión para fondo claro**: en fondo blanco escribe la marca en texto (800, −0,01 em) o pide/genera un
  `logo-claro.png`.
- Heros de producto (1200 px): `https://gamzyhost.com/imagenes/correo/productos/{gamzydrive,gamzymail,gamzycdn}-hero-v{1,3,4}.jpg`.
  v1 = oscuro con titular; v4 = claro (crema) con ventana del producto. **Ojo: `gamzydrive-hero-v1` dice «10 GB sin
  cuenta»; la cifra actual es 20 GB.** No reutilices v1 de Drive sin rehacerlo (plantilla `piezas-graficas`, pieza
  `hero-correo`).
- Iconos de ventajas (80 px, se pintan a 40): `https://gamzyhost.com/imagenes/correo/iconos/{arroba,candado,enlace,enviar,escudo,europa,mando,migrar,nube,ojo}.png`.
- Juegos: `https://gamzyhost.com/imagenes/correo/juegos/<slug>.jpg` (cuadradas) y `https://gamzyhost.com/imagenes/og/<slug>.jpg` (apaisadas).

## Decisiones de Carlos (no las cambies sin preguntar)
- Correos: **fondo exterior blanco**, sobrios, planos, **sin glows ni bordes de color**; cabecera con imagen de
  producto; tarjeta/cuerpo blanco (30-10-2026).
- Textos de correo: «Hola {{nombre}},», sin despedida ni firma en el cuerpo, sin emojis ni exclamaciones, sin jerga
  técnica, cortos; lo visual va en bloques. «El texto es muy NPC» = demasiado genérico: más concreto y más corto.
- Antes de dar por bueno un correo, prueba real en su bandeja (sbarcecarlos@gmail.com) y comprobar que el servidor
  de correo lo aceptó, no solo que el script dijo «enviado».
- Gasto en IA (Higgsfield): imágenes baratas sin pedir permiso; vídeos siempre con su vale.

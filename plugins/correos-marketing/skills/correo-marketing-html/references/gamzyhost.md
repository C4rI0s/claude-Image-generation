# Correos de GamzyHost: cómo se hacen y se envían

## El motor
Las campañas salen del panel de la web de GamzyHost (Next.js). Tres ficheros:
- `lib/email-plantillas.ts` · las plantillas como datos (asunto, cuerpo, botón, bloques: ventajas, cifras,
  captura de cabecera, juegos, Trustpilot, Discord).
- `lib/email-maquetado.ts` · la imprenta: `envolverHtml()` con dos diseños. **`diseno: 'producto'`** es el bueno
  (fondo blanco, hero, párrafos, botón ámbar, ventajas con icono, pie con baja) y es en el que se basa
  `plantillas/producto.html` de esta skill.
- `lib/email-marketing.ts` · segmentos, consentimiento (`marketing_optin = 1` en la consulta), baja con token,
  envío por tandas reanudable y `enviarPrueba()`.

El admin escribe **texto**, no HTML (se escapa entero): para que un correo de campaña cambie de aspecto hay que
cambiar el maquetado o los bloques de la plantilla en el servidor (copia `.bak`, `npm run build`, reinicio de
pm2), o enviar HTML a medida con un script de prueba.

## Pruebas (regla de Carlos: un correo de prueba en menos de un minuto)
- Si el borrador ya existe en el panel: herramienta `gamzyhost_enviar_prueba_correo` con su id (va a
  sbarcecarlos@gmail.com). Una vez por correo; sin duplicados.
- HTML a medida: skill `enviar-prueba-de-correo-de-marketing-con-html-propio` (si está instalada). Puntos clave:
  cargar `.env.local` **dentro** del script (no con `. ./.env.local` en bash: rompe `EMAIL_FROM` y Gmail rechaza
  con 550) y lanzar el envío en segundo plano.
- Después, comprobar con `gamzymail_estado_envio` que «enviados 24 h» sube y no hay fallos nuevos.

## Lo decidido
- Fondo blanco, cabecera con imagen de producto, cuerpo blanco, sobrio, sin glows ni bordes de color.
- «Hola {{nombre}},», sin despedida ni firma en el cuerpo, sin jerga (curl, DKIM, DNS, IMAP, SPF, DMARC, proxy,
  NUI, Cloudflare), sin emojis ni exclamaciones.
- Cifras actuales de Drive (31-10-2026, drive.gamzyhost.com): 20 GB gratis; envío sin cuenta de hasta 20 GB con
  enlace de 48 h; planes Starter 50 GB 2 €, Pro 200 GB 5 €, Business 1 TB 12 € al mes, sin permanencia.
  Compruébalas otra vez antes de usarlas.
- Mail (textos de 30-10-2026): 20 GB gratis sin tarjeta; Copper 2,99 €, Gold 9,99 €, Diamond 19,99 € al mes.

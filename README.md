# Almacén El Sauce — Delivery Web

Plataforma de delivery para Almacén El Sauce, Chépica, Colchagua.

## Antes de subir a Vercel

Abrí `src/App.jsx` y cambiá esta línea (cerca del tope del archivo):

```js
const WHATSAPP_NUMBER = "56912345678"; // ← Cambia esto por tu número real
```

Por tu número real, por ejemplo:
```js
const WHATSAPP_NUMBER = "56991234567";
```

## Cómo actualizar el catálogo

Editá la planilla de Google Sheets. Los cambios se reflejan automáticamente en la web.
Si no hay conexión a Google Sheets, la web muestra el catálogo de respaldo.

## Stack

- React + Vite
- Tailwind CSS
- Catálogo desde Google Sheets (CSV público)
- Pedidos por WhatsApp

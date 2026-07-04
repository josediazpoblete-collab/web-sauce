# Configuracion de Google Sheets para productos

La web lee un CSV publico publicado desde Google Sheets. No necesita base de datos ni panel administrador para actualizar el catalogo.

## Hoja recomendada

Usar una sola pestana llamada `Productos` con esta primera fila:

```csv
ID,Categoria,Nombre,Precio,Unidad,Disponible,Stock,Imagen,Notas
```

Columnas:

- `ID`: numero unico por producto. No repetir.
- `Categoria`: ejemplo `Abarrotes`, `Bebidas`, `Pan`, `Verduleria`, `Lacteos`, `Aseo`.
- `Nombre`: nombre visible en la web. Debe estar bien escrito.
- `Precio`: precio en pesos chilenos. Puede ser `1500` o `$1.500`.
- `Unidad`: ejemplo `un`, `kg`, `pack`, `bolsa`.
- `Disponible`: usar `si` para mostrar y `no` para ocultar.
- `Stock`: cantidad disponible. Si queda `0`, la web oculta el producto.
- `Imagen`: URL publica directa de la imagen, idealmente de ImgBB.
- `Notas`: texto corto opcional, por ejemplo `Oferta`, `Sin azucar`, `Nuevo`.

La app tambien acepta estos nombres alternativos:

- Para disponibilidad: `Estado`, `Activo`, `Publicado`.
- Para stock: `Cantidad`, `Inventario`, `Existencias`.
- Para imagen: `Foto`, `Image`, `ImageUrl`, `UrlImagen`, `LinkImagen`, `ImgBB`.

## Publicar el CSV

1. Abrir Google Sheets.
2. Ir a `Archivo > Compartir > Publicar en la web`.
3. Seleccionar la pestana `Productos`.
4. Elegir formato `Valores separados por comas (.csv)`.
5. Publicar y copiar el enlace.
6. Si es la misma hoja que ya usa la web, no hay que tocar codigo. Si se crea una hoja nueva, entregar ese enlace para actualizar `SHEET_CSV_URL` en `src/App.jsx`.

## Imagenes

La columna `Imagen` debe contener una URL publica que abra directamente la imagen. En ImgBB normalmente se usa una URL parecida a:

```text
https://i.ibb.co/xxxxxxx/nombre-producto.png
```

Evitar enlaces de pagina tipo:

```text
https://ibb.co/xxxxxxx
```

Si una fila no tiene imagen, la web intenta usar una imagen local asociada por nombre. Si no existe, muestra el icono de categoria.

## Ejemplo de filas

```csv
ID,Categoria,Nombre,Precio,Unidad,Disponible,Stock,Imagen,Notas
1,Abarrotes,Azucar Iansa 1kg,1500,un,si,12,https://i.ibb.co/xxxxxxx/azucar-iansa.png,
2,Almacen,Huevos,250,un,si,30,https://i.ibb.co/yyyyyyy/huevos.png,Por unidad
3,Pan,Rapidita,1800,pack,si,8,https://i.ibb.co/zzzzzzz/rapidita.png,
4,Bebidas,Jugo Del Valle Naranja 200ml,500,un,no,0,https://i.ibb.co/aaaaaaa/jugo.png,Agotado
```

## Prompt para Claude

```text
Ayudame a configurar una hoja de Google Sheets para alimentar el catalogo de una web de pedidos por WhatsApp llamada Almacen El Sauce.

Necesito que la hoja tenga una pestana llamada "Productos" y que la primera fila tenga exactamente estas columnas:

ID,Categoria,Nombre,Precio,Unidad,Disponible,Stock,Imagen,Notas

Reglas:
- ID debe ser un numero unico y estable por producto.
- Categoria debe ser una de estas cuando corresponda: Abarrotes, Almacen, Bebidas, Verduleria, Pan, Fiambres, Libreria, Helados, Ensaladas, Aseo, Limpieza, Carnes, Lacteos, Snacks, Condimentos, Mascotas, Ferreteria.
- Nombre es el nombre visible en la web.
- Precio debe quedar en pesos chilenos, idealmente solo numeros, por ejemplo 1500.
- Unidad debe ser "un", "kg", "pack", "bolsa" u otra unidad corta.
- Disponible debe ser "si" para mostrar el producto y "no" para ocultarlo.
- Stock debe ser una cantidad numerica. Si es 0, la web ocultara el producto.
- Imagen debe ser una URL directa y publica de ImgBB, idealmente con dominio i.ibb.co, por ejemplo https://i.ibb.co/xxxx/producto.png.
- Notas es opcional y debe ser breve.

Tambien necesito que revises las URLs de ImgBB: no quiero enlaces de pagina como https://ibb.co/xxxx, sino enlaces directos de imagen como https://i.ibb.co/xxxx/archivo.png.

Cuando este lista la hoja, guiame para publicarla como CSV usando:
Archivo > Compartir > Publicar en la web > seleccionar pestana Productos > formato CSV.

Importante: si estamos editando la misma hoja que ya esta conectada a la web, no hay que tocar codigo. Si estamos creando una hoja nueva, necesito que me entregues el enlace CSV publico final para pasarselo a Mauro/Codex y actualizar la constante SHEET_CSV_URL.

Al final entregame:
1. La tabla corregida.
2. Una lista de productos sin imagen.
3. Una lista de posibles nombres duplicados o IDs repetidos.
4. El enlace CSV publico publicado desde Google Sheets.
```

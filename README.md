# Ágilex · Clientes, rutas y costos

Dashboard estático para GitHub Pages, sin instalación ni servidor. Abre `index.html` para ver la demostración de 20 clientes ficticios. Paleta: morado #3D3977, morado profundo #28264E, amarillo #FFBD00 y fondo #F2F3F9. Se conserva el logo recibido.

## Publicar por primera vez

1. Descomprime el ZIP en tu computador.
2. Entra a https://github.com e inicia sesión. Pulsa **+ → New repository**.
3. Nombre sugerido: `agilex-clientes`. Selecciona **Public** para la demo y **Create repository**.
4. Pulsa **uploading an existing file** (o **Add file → Upload files**). Arrastra el contenido descomprimido, incluidas las carpetas. `index.html` debe quedar en la raíz, sin una carpeta adicional por encima. Pulsa **Commit changes**.
5. Abre **Settings → Pages**. En **Build and deployment → Source**, elige **Deploy from a branch**. Selecciona **main**, carpeta **/(root)** y pulsa **Save**.
6. Espera a que termine la publicación. En esa misma pantalla aparecerá **Visit site**. Tu enlace tendrá la forma `https://USUARIO.github.io/agilex-clientes/`.
7. Para reemplazar una versión publicada, sube el contenido de esta entrega al mismo repositorio y confirma los cambios. Retira los archivos antiguos que ya no utilices.

La publicación inicial contiene exclusivamente datos de prueba. Un repositorio público y sus Excel son públicos: conserva los datos reales en Microsoft 365 y no los subas a GitHub.

## Conectar los dos Excel de SharePoint

La conexión aún requiere configuración de tu organización. El enlace de una carpeta por sí solo no autoriza su lectura automática.

1. Sube a tu carpeta de Microsoft 365 `Base_Clientes_y_Aliados_Agilcargo_DEMO.xlsx` y `Rutas_Costos_20_Clientes_DEMO.xlsx`.
2. Pide a TI una aplicación **SPA de Microsoft Entra**, su **Client ID** y **Tenant ID**, con la URL exacta de GitHub Pages como redirección. Sigue `CONEXION_MICROSOFT_365.md`.
3. En el dashboard pulsa **Configurar Microsoft 365 → Importar configuración local**. Selecciona el archivo `Conexion_SharePoint_LOCAL.json` que se entrega aparte del ZIP. Conserva ese archivo en tu computador.
4. Completa los dos identificadores, guarda e inicia sesión en Microsoft. No necesitas contraseña en el código ni Client Secret.
5. Navega por tu OneDrive empresarial hasta la carpeta correspondiente al enlace, pulsa **Usar esta carpeta**, selecciona los dos Excel y **Guardar y sincronizar**.
6. El indicador superior confirmará la lectura. Mientras la página esté abierta, visible y autorizada, comprobará cambios cada dos minutos. **Sincronizar ahora** permite una lectura inmediata.

La sincronización es de lectura; no edita los Excel. Al recargar la página debes iniciar sesión otra vez. La configuración queda en ese navegador; los tokens solo en memoria. No hay ejecución con la página cerrada. Si falla una lectura se conserva la última versión válida. **Desconectar y volver a demo** limpia los datos cargados de la vista.

También puedes usar **Cargar Excel** para leer uno o ambos archivos localmente sin conexión Microsoft. Los archivos se procesan en el navegador.

## Uso diario

Filtra por mes, modelo A/B, responsable, estado o modalidad. Busca cliente o DO, cambia COP/USD y abre el nombre del cliente para consultar documentos, productos, contactos, vinculaciones, aliados, costos y adicionales. El CSV exporta la vista filtrada de rutas y costos.

En el Excel de costos, selecciona el DO en `Ruta y Aliados!C5`; las hojas **Operaciones**, **Costos** y **Adicionales** son el origen editable. Consulta `DATOS_Y_REGLAS.md` antes de modificar columnas.

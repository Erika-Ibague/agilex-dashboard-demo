# Ágilex · Clientes, rutas y costos

Dashboard de demostración: https://erika-ibague.github.io/agilex-dashboard-demo/

## Archivos actuales

- `index.html`: aplicación completa, incluidos estilos, logo, scripts y datos ficticios de 20 clientes.
- `favicon.svg`: icono del sitio.
- `Base_Clientes_y_Aliados_Agilcargo_DEMO.xlsx`: base de clientes de prueba.
- `Rutas_Costos_20_Clientes_DEMO.xlsx`: 20 operaciones con rutas, aliados, costos y adicionales.
- `DATOS_Y_REGLAS.md`: criterios de cálculo y edición de los Excel.
- `CONEXION_MICROSOFT_365.md`: guía de registro de Microsoft y limitaciones del conector.
- `.nojekyll` y `.gitignore`: configuración técnica.

El código antiguo separado en archivos JavaScript y CSS ya no se utiliza. Para modificar la aplicación, actualiza el código integrado en `index.html`.

## Publicación

En **Settings → Pages**, selecciona **Deploy from a branch → main → /(root)**. Después de confirmar cambios en la rama, GitHub actualiza la página. Si tu navegador conserva una versión anterior, pulsa **Ctrl + Shift + R**.

## Conectar Microsoft 365

1. Abre la página publicada y pulsa **Conectar Microsoft 365**.
2. Los identificadores de la aplicación de Ágilex están preconfigurados; confirma con TI que la URL publicada esté registrada como redirección SPA y que se permita el acceso delegado **Files.Read**.
3. Pega el enlace de la carpeta en el campo correspondiente, o importa tu archivo `Conexion_SharePoint_LOCAL.json` desde el computador. Ese JSON privado no debe subirse al repositorio.
4. Guarda la configuración e inicia sesión con tu cuenta corporativa.
5. Navega por tu OneDrive empresarial hasta la carpeta, pulsa **Usar esta carpeta**, elige los dos Excel y **Guardar y sincronizar**.
6. El indicador superior confirmará la lectura. Se comprueban cambios cada dos minutos mientras la pestaña esté abierta, visible y autorizada.

La lectura automática necesita sesión y permisos; tener los Excel guardados en Microsoft 365 no activa por sí solo la conexión. Al recargar debes iniciar sesión otra vez. Un fallo conserva la última lectura válida. **Desconectar y volver a DEMO** restaura la demostración. También puedes usar **Cargar Excel** para leer los archivos desde tu computador.

El selector actual navega por el OneDrive empresarial de la cuenta conectada. El acceso de invitados a la carpeta de otra persona requiere adaptar y validar esa conexión.

## Uso

Filtra por mes, modelo, responsable, estado o modalidad; busca por cliente o DO y alterna COP/USD. Abre el nombre del cliente para consultar su ficha, documentos, contactos, vinculaciones y costos. El CSV exporta las rutas y costos filtrados.

En el formato de costos, selecciona el DO en **Ruta y Aliados!C5**. Edita los datos de origen en **Operaciones**, **Costos** y **Adicionales**.

## Información real

Este repositorio y su sitio son públicos y contienen solo datos ficticios. No subas Excel reales, expedientes ni enlaces privados. La versión de producción necesita control de acceso al sitio y autorización de usuarios, además de los permisos sobre los archivos en Microsoft 365. El inicio de sesión para leer los Excel no convierte esta página pública en privada.

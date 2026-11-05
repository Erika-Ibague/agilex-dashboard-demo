# Configuración de Microsoft 365 · guía para TI

Estado de entrega: conector implementado, probado con respuestas simuladas. No se ha autenticado ni comprobado el acceso al tenant de Ágilex. Faltan Client ID, Tenant ID y URL definitiva de GitHub Pages.

## Registro de la aplicación

1. En https://entra.microsoft.com abre **Identity → Applications → App registrations → New registration**.
2. Nombre sugerido: `Agilex Dashboard Clientes`. Usa cuentas **solo de este directorio organizacional** (single tenant).
3. Configura una plataforma **Single-page application (SPA)** con la URI exacta de GitHub Pages, incluyendo la carpeta del repositorio y la barra final. Ejemplo: `https://USUARIO.github.io/agilex-clientes/`. Usa esa misma URL para abrir el dashboard. No habilites implicit grant.
4. Conserva **Application (client) ID** y **Directory (tenant) ID**. Son identificadores, no secretos.
5. En **API permissions → Microsoft Graph → Delegated permissions** configura **Files.Read**. La solicitud OAuth incluye `offline_access` para renovar la sesión en memoria. Autoriza consentimiento según la política del tenant.
6. No crees un Client Secret. No incluyas claves, contraseñas ni tokens en GitHub. El navegador usa authorization code + PKCE S256.
7. Si el tenant exige asignación de usuarios, acceso condicional o consentimiento administrativo, TI debe habilitar el acceso de las personas autorizadas.

## Carpeta y alcance

Esta versión navega por **el OneDrive empresarial de la cuenta conectada**. Es apropiado para la carpeta personal empresarial del enlace suministrado. El enlace se conserva en una configuración LOCAL entregada aparte; no aparece en el código público. Importar ese enlace habilita el acceso directo a la carpeta, pero la lectura requiere iniciar sesión y elegir la carpeta en el selector.

No se usa el endpoint `/shares`: evita solicitar permisos de escritura para resolver enlaces compartidos. El usuario debe seleccionar la misma carpeta navegando por su OneDrive; después el dashboard guarda sus identificadores y permite seleccionar los dos archivos de origen.

**Files.Read no limita el permiso OAuth exclusivamente a la carpeta seleccionada**: permite leer los archivos del usuario conectado. La aplicación consulta la carpeta y los dos archivos que este elige. Si la organización exige un ámbito restringido a una carpeta, o requiere una biblioteca de un sitio de SharePoint ajena a OneDrive, se necesita otra arquitectura y revisión de TI.

## Validación de puesta en marcha

- Publicar y registrar la URI final exacta.
- Completar Client ID y Tenant ID en el dashboard, importar el JSON local e iniciar sesión con la cuenta correcta.
- Seleccionar carpeta y archivos; verificar 20 clientes y 20 operaciones en la demo.
- Cambiar un importe de prueba en **Costos**, guardar el Excel en Microsoft 365 y comprobar que el dashboard lo refleja después del siguiente sondeo o de **Sincronizar ahora**.
- Probar que un usuario sin permisos no puede leer el archivo. Un error mantiene la última lectura válida; desconectar restaura la demo.

Las peticiones de Graph son GET. Las descargas usan el enlace temporal que entrega Graph, sin enviarle el bearer token. Acceso y refresh tokens permanecen en memoria. Solo el verificador PKCE temporal se guarda en sessionStorage hasta completar el retorno. Configuración, URL e identificadores de archivo permanecen en localStorage de ese navegador. No se envían datos reales al repositorio ni a un backend del dashboard.

Limitaciones: necesita una página HTTPS, navegador moderno con DecompressionStream, política del tenant que permita SPA y consentimiento; sesión, acceso condicional y conectividad pueden interrumpir el sondeo. No hay sincronización con la pestaña cerrada ni actualización automática de los JSON públicos. Máximo 25 MB por Excel y hasta 10.000 filas por tabla. Renombrar un archivo dentro de la carpeta conserva su selección por ID; moverlo, borrarlo o sustituirlo con otro ID exige seleccionarlo de nuevo.

Referencias oficiales:
- https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow
- https://learn.microsoft.com/en-us/graph/api/driveitem-list-children?view=graph-rest-1.0
- https://learn.microsoft.com/en-us/graph/api/driveitem-get-content?view=graph-rest-1.0

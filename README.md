# Ágilex · Dashboard de clientes y aliados (DEMO)

Dashboard estático para GitHub Pages, creado a partir de **Base Clientes y Aliados Ágilcargo.xlsx**. Incluye 20 clientes ficticios y sus registros relacionados. No necesita instalaciones, servidor, claves API ni base de datos externa.

## 1. Verlo en tu computador

1. Descarga el ZIP y elige **Extraer todo** o **Descomprimir**.
2. Abre `index.html` con Chrome, Edge o Firefox. No abras el HTML desde dentro del ZIP.
3. Prueba los filtros, la búsqueda, las páginas y **Ver ficha**. Los gráficos y los indicadores cambian con los filtros.

## 2. Crear tu repositorio

1. Entra a [github.com](https://github.com) e inicia sesión. Si no tienes cuenta, créala primero.
2. En la parte superior, pulsa **+ → New repository**.
3. Escribe `agilex-dashboard-demo` en **Repository name**.
4. Elige **Public**. GitHub Free permite Pages en repositorios públicos. Este paquete contiene únicamente datos de demostración.
5. Activa **Add README** para inicializar el repositorio.
6. Pulsa **Create repository**.

## 3. Subir los archivos

1. Dentro del repositorio, pulsa **Add file → Upload files**.
2. Arrastra **el contenido de la carpeta descomprimida**, incluidas las carpetas `datos` y `herramientas`. No subas el ZIP ni una carpeta adicional que envuelva todo.
3. `index.html`, `styles.css`, `app.js`, `README.md`, `favicon.svg` y el Excel deben quedar en la raíz del repositorio. Dentro de `datos` deben quedar `data.js`, el JSON y los CSV.
4. Puedes omitir `.nojekyll` si tu sistema no muestra archivos ocultos; el sitio usa HTML estático sencillo.
5. En el mensaje de confirmación escribe `Agregar dashboard de demostración`.
6. Pulsa **Commit changes**. El README incluido en el paquete sustituye el README inicial.

## 4. Activar GitHub Pages

1. Abre **Settings** en el repositorio.
2. En el menú lateral, abre **Pages**.
3. En **Build and deployment → Source**, selecciona **Deploy from a branch**.
4. En **Branch**, elige **main** y la carpeta **/(root)**.
5. Pulsa **Save**.
6. Espera a que termine la publicación. Vuelve a **Settings → Pages** y pulsa **Visit site** cuando aparezca.
7. Tu dirección tendrá la forma `https://TU_USUARIO.github.io/agilex-dashboard-demo/`. Sustituye `TU_USUARIO` por tu usuario de GitHub; esta dirección de ejemplo todavía no es un sitio publicado.

**Si aparece un error 404:** comprueba que `index.html` esté en la raíz de `main`, que seleccionaste `/(root)` y que la publicación haya terminado en la pestaña **Actions**. Una actualización puede tardar unos minutos en verse.

## Archivos y diseño

- `index.html`, `styles.css`, `app.js`: dashboard, sin instalaciones ni dependencias externas.
- `Base_Clientes_y_Aliados_Agilcargo_DEMO.xlsx`: las 14 hojas originales diligenciadas con 20 clientes ficticios.
- `datos/`: datos JSON, JavaScript y CSV, esquema original y descripción de los escenarios.
- `herramientas/`: conversión opcional del Excel a los datos de la página.

El dashboard incluye búsqueda, filtros, semáforo, gráficos, paginación, fichas por cliente y exportación CSV. El corte es fijo: **04/11/2026**. Conserva los umbrales y el ciclo de 334 días de tu archivo.

Paleta propuesta, no verificada como manual oficial: azul oscuro **#18334D**, turquesa **#00A6A6**, naranja **#F2912A** y fondo **#F4F7FB**. Se añaden los cuatro colores del semáforo.

**Editar o subir únicamente el Excel no actualiza la página:** lee `datos/data.js`. Consulta [datos, reglas y actualización opcional](DATOS_Y_REGLAS.md).

**GitHub Pages es público. Mantén esta versión como demostración; los datos reales requieren acceso controlado.** Los contactos, identificaciones, permisos y soportes de este paquete son ficticios.

Referencias: [crear GitHub Pages](https://docs.github.com/es/pages/getting-started-with-github-pages/creating-a-github-pages-site) y [configurar rama y carpeta](https://docs.github.com/es/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

La entrega deja los archivos listos para subir. No crea ni publica un repositorio en tu cuenta.

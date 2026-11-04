## Datos y reglas de la demostración



| Archivo o carpeta | Contenido |
|---|---|
| `index.html`, `styles.css`, `app.js` | Dashboard adaptable a computador y móvil, sin dependencias externas. |
| `Base_Clientes_y_Aliados_Agilcargo_DEMO.xlsx` | Copia diligenciada del archivo recibido, con sus 14 hojas y los nombres de columnas originales. |
| `datos/data.js` | Datos que carga el dashboard, incluso al abrir el HTML localmente. |
| `datos/base_demo.json` | La misma información estructurada por hoja, con parámetros y escenarios. |
| `datos/*.csv` | Una tabla por hoja de datos. Separador `;`, codificación UTF-8. |
| `datos/esquema.json` | Nombres exactos de columnas del archivo original. |
| `datos/escenarios.csv` | Los 20 casos, su acción de seguimiento y su resultado esperado. |
| `herramientas/actualizar_datos.py` | Conversión opcional desde el Excel guardado con resultados recalculados. |

Los registros incluyen 20 clientes, 40 contactos, 20 productos, 20 permisos, 40 documentos, 40 vinculaciones, 20 fichas de facturación, 20 cambios de bitácora y 7 aliados ficticios. El catálogo de puertos conserva ubicaciones geográficas.

## Cómo se interpreta el semáforo

El sitio utiliza los campos calculados **Apto para operar** y **Prioridad de gestión** de la base:

| Color | Regla en el dashboard |
|---|---|
| Rojo | Aptitud `NO`: vencimientos, aliado suspendido o cliente no activo. |
| Naranja | Aptitud `CONDICIONADO`: urgencias o validaciones pendientes. |
| Amarillo | Aptitud `SÍ` y prioridad `3-Media`: controles próximos. |
| Verde | Aptitud `SÍ` y prioridad `4-Al día`. |

Se conservan los parámetros del adjunto: **urgente hasta 60 días**, **próximo de 61 a 90 días**, **margen de trámite de 10 días** y **ciclo de revisión de 334 días**. Este último valor es el que trae tu archivo, no un año calendario; valídalo antes de uso operativo. La fecha de corte está fija en **04/11/2026** para que los ejemplos no cambien con el paso del tiempo.

La fecha límite de renovación considera vencimiento, tiempo de trámite y margen. La ficha permite revisar el caso que explica cada color. Un contacto vencido o una verificación bancaria pendiente pueden condicionar al cliente aunque su fecha crítica documental siga en el futuro.

Las fechas de las tablas JSON/CSV se guardan como números de serie de Excel para conservar el tipo de dato del archivo; el sitio las muestra como fechas legibles. La fecha de corte de los metadatos usa formato ISO `2026-11-04`.

## Actualizar la demostración (opcional)

**Editar el Excel y subirlo por sí solo no cambia el dashboard.** La página lee `datos/data.js`.

Si más adelante quieres actualizar los datos desde Excel:

1. Edita **solo datos ficticios** en el Excel. Conserva hojas, encabezados e ID.
2. Ábrelo con Excel de escritorio, recalcula las fórmulas y guarda el archivo. La herramienta no calcula fórmulas: lee los resultados guardados por Excel.
3. Si tienes Python 3, ejecuta desde la carpeta del paquete:

   ```bash
   python herramientas/actualizar_datos.py Base_Clientes_y_Aliados_Agilcargo_DEMO.xlsx
   ```

4. La herramienta actualiza JSON, `data.js` y CSV. Las descripciones de escenarios son documentación manual: ajústalas si cambias el caso.
5. Vuelve a subir el Excel y la carpeta `datos` al repositorio y confirma los cambios. GitHub Pages vuelve a publicar.

## Diseño y alcance

Paleta propuesta, **no verificada como manual oficial de marca**: azul oscuro `#18334D`, turquesa `#00A6A6`, naranja `#F2912A`, fondo `#F4F7FB`. El semáforo utiliza además verde, amarillo, naranja y rojo. La marca tipográfica es una representación de demostración, no el logotipo oficial.

Es una vista de consulta. No guarda cambios, no consulta listas restrictivas, no verifica permisos, no inicia sesión y no se sincroniza con operaciones. La bitácora contiene ejemplos manuales.

**GitHub Pages publica el contenido del sitio en Internet. Mantén esta versión como demostración; para datos reales de clientes se necesita una solución con acceso controlado.** Los correos y soportes `example.invalid`, los NIT `DEMO-NIT` y los teléfonos `DEMO-TEL` no identifican personas ni documentos reales. Los plazos, permisos, clasificaciones y autorizaciones son ejemplos, no requisitos legales.

## Referencias para la publicación

- [Crear un sitio de GitHub Pages](https://docs.github.com/es/pages/getting-started-with-github-pages/creating-a-github-pages-site).
- [Configurar la rama y carpeta de publicación](https://docs.github.com/es/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

La entrega deja los archivos listos para subir. No crea un repositorio ni publica en tu cuenta de GitHub.

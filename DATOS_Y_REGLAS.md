# Datos y reglas de la demostración

## Relación entre archivos

La base mantiene sus 14 hojas y sus 20 clientes ficticios, vinculados por `ID_Cliente`. El nuevo formato conserva las cinco hojas del documento recibido y agrega **Operaciones**, **Costos** y **Adicionales**. Incluye 20 DO, 145 conceptos base y 17 adicionales. Cada operación pertenece a un cliente; cada concepto y adicional debe coincidir por cliente y DO.

`Ruta y Aliados!C5` selecciona el DO y completa automáticamente el formato y la vista de demoras. No sobrescribas sus fórmulas. Los datos de origen se editan en las tres tablas añadidas, desde la fila 5, sin cambiar los encabezados de la fila 4. Para estos 20 casos las fórmulas del consolidado alcanzan hasta la fila 504; si se amplía el volumen, amplía también fórmulas, validaciones y tablas. La posición de formato relaciona los conceptos con las filas originales (12–38); utiliza posiciones distintas por DO. Las fechas deben ser fechas Excel, no texto.

## Costos y modelos

- Modelo A: fee/costo de coordinación de ÁgilCargo y pagos directos del cliente a sus aliados.
- Modelo B: costos de proveedores asumidos por ÁgilCargo. Los adicionales conservan la asignación explícita que tengan en su registro.
- Se distinguen costo base, adicionales de ÁgilCargo, adicionales del cliente y **Por definir**. Estos últimos se muestran separados, sin atribuirlos a ninguna parte.
- **Rechazado** se excluye del total final, pero permanece visible para trazabilidad. Pendientes de aprobación se incluyen como estimaciones, de acuerdo con el formato original. Un total registrado no implica que todos sus conceptos estén aprobados, facturados o pagados.
- Solo COP y USD. Cada operación tiene su propia TRM simulada; USD→COP multiplica por ella. Para visualizar USD se convierte cada operación individualmente y luego se suma. No se suma un grupo de tasas ni se aplica una TRM global.
- Total de prueba: **COP 142.998.950**, incluidos adicionales por definir. Es costo, no venta, utilidad, cartera ni autorización de pago. Todos los valores, soportes y TRM son ficticios.

## Semáforo documental

La demo conserva los criterios del archivo previo, con corte 04/11/2026: **2 al día, 1 para programar, 10 para gestionar y 7 no habilitados**. Se recalculan a partir de los datos de documentos, permisos, vinculaciones, contactos y facturación, no del costo de la operación.

- Rojo: cliente no habilitado o control indispensable incumplido según la base.
- Naranja: condicionado o pendiente de gestión.
- Amarillo: fecha crítica dentro del horizonte de programación.
- Verde: sin pendientes registrados al corte.

Los parámetros originales son 60 días de urgencia, 90 de programación, 10 de margen y **334 días de ciclo documental**. Este último es el valor heredado del archivo y es más corto que un año calendario: **valídalo con el equipo** antes de usar datos reales. La fecha de corte proviene de PARAMETROS!C5; no se sustituye silenciosamente por hoy. Recalcula y guarda la base para actualizar su corte. Un semáforo documental no sustituye la evaluación de viabilidad por mercancía, ruta, aliado y operación.

## Actualización y privacidad

Los datos incrustados en `datos/data.js` y `datos/costos.js` permiten abrir la demo sin servidor. Los JSON correspondientes sirven como fuentes de prueba. La lectura de Excel local o de Microsoft 365 reemplaza esos datos solo durante esa sesión del navegador; no modifica el repositorio. Los contactos reales del formato recibido fueron reemplazados por contactos ficticios con correos `example.invalid`.

Nunca publiques Excel reales, expedientes, teléfonos, datos bancarios o enlaces privados en GitHub. El JSON de conexión LOCAL se entrega aparte y se importa desde el computador. `config.example.json` no contiene el enlace de tu carpeta.

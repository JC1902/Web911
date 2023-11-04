# Desarrollo del servidor

El servidor está desarrollado en NodeJS, por lo que es necesario instalar todas las dependencias para su funcionamiento.

Requerimientos:
-NodeJS (versión 18.17.1 LTS para manejar un estándar)
-npm

Para instalar las dependencias se debe de ejecutar el comando: ``npm install``

**Nota:** la dependencia ``bycript`` se debe de volver a instalar cada vez que se descargue el repositorio, esto porque la compilación de esta dependencia **es diferente** en cada Sistema Operativo. 

Para iniciar el servidor se ejecuta el comando: ``npm run dev``

Variables de entorno
--------------------------
La aplicación usa variables de entorno para la conexión a la base de datos y establecer el puerto en el cual nuestro servidor se comunicará con la aplicación. Se debe de poner la contraseña del usuario *root* de su base de datos en **MariaDB**.

Base de datos
--------------------------
Se usará **MariaDB** como sistema gestor de base de datos. Es importante contar con MariaDB instalado y ejecutar el script de para la creación de tablas antes
de ejecutar el servidor. 

En la consola de MariaDB es necesario ejecutar el siguiente comando: ``source <ruta_al_DB_Script.sql>``

Se deve de realizar la consulta de prueba a la conexión de la base de datos, el estatus de la consulta se imprimirá en la consola, si el estatus de la consulta es: 
*Conexión a la base de datos establecida correctamente.*
*La consulta de prueba fue exitosa.*

Puede iniciar el desarrollo.



# Desarrollo del servidor

El servidor está desarrollado en NodeJS, por lo que es necesario instalar todas las dependencias para su funcionamiento.

Requerimientos:
-NodeJS (de preferencia la versión 18.17.1 LTS para manejar un estándar)
-npm

Para instalar las dependencias se debe de ejecutar el comando: ``npm install``

**Nota:** la dependencia ```bycript``` se debe de volver a instalar cada vez que se descargue el repositorio, esto porque la compilación de esta dependencia **es diferente** en cada Sistema Operativo. 

Para iniciar el servidor se ejecuta el comando: ``npm run dev``

Variables de entorno
--------------------------
La aplicación usa variables de entorno para la conexión a la base de datos y establecer el puerto en el cual nuestro servidor se comunicará con la aplicación. Se debe de poner la contraseña del usuario *root* de su base de datos en MySQL.

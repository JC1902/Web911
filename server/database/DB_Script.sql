-- Base de Datos Web911
-- BASE DE DATOS DE DESARROLLO, NO PRODUCTIVA

-- Inicialización de la BD
DROP DATABASE IF EXISTS web911;
CREATE DABATABSE web911;
USE web911;

--Definición de Tablas y Creación de Tablas
CREATE TABLE `Users`(
    id INT NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(15)
);

--Restricciones de tablas

-- Datos de prueba de las tablas

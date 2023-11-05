-- Base de Datos Web911
-- BASE DE DATOS DE DESARROLLO, NO PRODUCTIVA
-- Dialecto de MariaDB

-- Inicialización de la BD
drop database if exists web911;
create database web911;
use web911;

--Definición de Tablas y Creación de Tablas
create table Cuentas(
    cta_id int(10) auto_increment,
    cta_folio int(10) not null unique,
    cta_password varchar(100) not null,
    cta_tipoCuenta varchar(20) not null,
    cta_fechaCreacion datetime not null,
    primary key(cta_id, cta_folio)
);

create table Clientes(
    cte_id int(10) auto_increment,
    cte_apPaterno varchar(100) not null,
    cte_apMaterno varchar(100) not null,
    cte_nombres varchar(100) not null,
    cte_sexo varchar(1) not null,
    cte_correo varchar(100),
    cte_codigoPostal varchar(10) not null,
    cte_calle varchar(255) not null,
    cte_colonia varchar(255) not null,
    cte_municipio varchar(255) not null,
    cte_estado varchar(255) not null,
    cte_telefono varchar(255) not null,
    cta_id int(10) not null unique,
    cta_folio int(10) not null unique,
    primary key(cte_id),
    constraint `fk_cuenta_id_clientes`
        foreign key (cta_id) references Cuentas (cta_id),
    constraint `fk_cuenta_folio_clientes`
        foreign key (cta_folio) references Cuentas (cta_folio)
);

create table Vehiculos(
    veh_id int(10) auto_increment,
    veh_folioInterno int(100) not null unique,
    veh_numPaseAdmision int(10) not null unique,
    veh_numeroSiniestro int(10) not null,
    veh_tipoVehiculo varchar(100) not null,
    veh_fechaIngreso datetime not null,
    veh_fechaEgreso datetime,
    veh_estatusReparacion varchar(100) not null,
    cta_id int(10) not null,
    cte_id int(10) not null,
    cta_folio int(10) not null,
    primary key (veh_id),
    constraint `fk_cuenta_id_vehiculos`
        foreign key (cta_id) references Cuentas (cta_id),
    constraint `fk_cliente_id_vehiculos`
        foreign key (cte_id) references Clientes (cte_id),
    constraint `fk_cuenta_folio_vehiculos` 
        foreign key (cta_folio) references Cuentas (cta_folio)
);

-- Inserción de Datos de prueba de las tablas
-- Contaseña de ambos usuarios: password

-- TABLA CUENTAS
insert into Cuentas (cta_folio, cta_password, cta_tipoCuenta, cta_fechaCreacion) 
values 
    (0000, "$2b$10$eeCVLc2KMcHk9V2.ZvZ3GuPgu1JKEBVIL9vCBoC.lo7HjWb1Ye6OG", "administrador", NOW()),
    (0001, "$2b$10$eeCVLc2KMcHk9V2.ZvZ3GuPgu1JKEBVIL9vCBoC.lo7HjWb1Ye6OG", "cliente", NOW());

-- TABLA CLIENTES
insert into Clientes (cte_apPaterno, cte_apMaterno, cte_nombres, cte_sexo, cte_correo, cte_codigoPostal, cte_calle, cte_colonia, cte_municipio, cte_estado, cte_telefono, cta_id, cta_folio) 
values 
    ("Prueba", "Prueba", "Testing Testing", "M", "testing@testing.com", "272727", "Falsa", "De mentira", "Inexistente", "Tlaxcala", "888-888-8888", 2, 0001);

-- TABLA VEHICULOS
insert into Vehiculos (veh_folioInterno, veh_numPaseAdmision, veh_numeroSiniestro, veh_tipoVehiculo, veh_fechaIngreso, veh_estatusReparacion, cta_id, cte_id, cta_folio) 
values
    (1111, 2222, 5968, "BMW Sedan Negro", NOW(), "Pintura", 2, 1, 0001);


create database maintenance;

use maintenance;

create table Equipo(
	id int primary key auto_increment,
    modelo varchar(10),
    nombre varchar(100),
    descripcion varchar(1000)
);

create table Mantenimiento_prioridad(
	id int primary key auto_increment,
    nombre varchar(10)
);

create table Mantenimiento(
	id int primary key auto_increment,
    nombre varchar(100) not null,
    fecha datetime not null,
    actividades varchar(1500) not null,
    id_equipo int,
    id_prioridad int,
    estado int,
    foreign key (id_equipo) references Equipo(id),
    foreign key (id_prioridad) references Mantenimiento_prioridad(id)
);

drop procedure sp_getEquipos;

DELIMITER //

create procedure sp_getEquipos ()
begin
select nombre from Equipo order by id desc;
End;

DELIMITER //
create procedure sp_updateStateMantenimiento (NewEstado int, spid int)
begin
update Mantenimiento set estado = NewEstado where id = spid;
END;

DELIMITER //
create procedure sp_getMantenimientoWithState(state int)
begin
select * from Mantenimiento where estado = state order by fecha desc;
End;

DELIMITER //
create procedure sp_saveMantenimiento(nombreEquipo varchar(100), 
nombreMantenimiento varchar(100),
actividadesM varchar(1500),
fechaM datetime
)
begin
select @idEquipo := id from Equipo where nombre = nombreEquipo;
Insert into Mantenimiento values(NULL, nombreMantenimiento, fechaM, actividadesM, @idEquipo, prioridadM, 0);
End;

DELIMITER //
create procedure sp_getCantidadMantenimiento()
begin
select count(*) from Mantenimiento;
End;

DELIMITER //
create procedure sp_getCantidadEquipo()
begin
select count(*) from Equipo;
End;

DELIMITER //
create procedure sp_getMantenimientoLike(nombreSp varchar(100))
begin
select * from Mantenimiento where estado = 0 and nombre like nombreSp order by fecha desc;
END;

DELIMITER //
create procedure sp_getEquipoLike(nombreSp varchar(100))
begin
select * from Equipo where nombre like nombreSp order by id desc;
END;

DELIMITER //
create procedure sp_getMantenimientoOnDate(fechaSp datetime)
begin
select * from Mantenimiento where estado = 1 and fecha = fechaSp order by fecha desc;
END;

DELIMITER ;

CALL `sp_getEquipos`();
select * from Equipo;

Insert into Equipo values (null, 'pepe', 'pepe', 'pepe');


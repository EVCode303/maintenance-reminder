import mysql from 'promise-mysql';
import { Notification } from 'electron';

const getConnection = (): any => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'maintenance'
    });
}

export const insertMachine = async (machine: object) => {
    const conn = await getConnection();
    try {
        const result = await conn.query(`CALL sp_saveEquipo('${machine.modelo}', '${machine.maquinaria}', '${machine.descripcion}')`);
        console.log(result);

        new Notification({
            title: 'Exito',
            body: 'Máquina agregada'
        }).show();

        return result;
    } catch (error) {
    }
}

export const loadMachines = async () => {
    const conn = await getConnection();
    try {
        const result = await conn.query(`CALL sp_getEquiposAll()`);
        return result;
    } catch (error) {
    }
}

export const findMachinesByName = async (machineName: string) => {
    const conn = await getConnection();
    try {
        const result = await conn.query(`CALL sp_getEquipoLike('${machineName}')`);
        return result;
    } catch (error) {
    }
}

export const getMachinesCount = async () => {
    const conn = await getConnection();
    try {
        const result = await conn.query(`CALL sp_getCantidadEquipo()`);
        return result;
    } catch (error) {
    }
}

export const insertMaintenance = async (maintenance: object) => {
    const conn = await getConnection();
    try {
        const result = await conn.query(`CALL sp_saveMantenimiento('${maintenance.equipo}', '${maintenance.mantenimiento}', '${maintenance.actividades}', '${maintenance.fecha}')`);
        console.log(result);

        new Notification({
            title: 'Exito',
            body: 'Mantenimiento programado'
        }).show();

        return result;
    } catch (error) {
    }
}

export const loadMachinesIntoCbx = async () => {
    const conn = await getConnection();
    try {
        const result = await conn.query(`CALL sp_getEquipos()`);
        return result;
    } catch (error) {
    }
}

export const loadMaintenance = async () => {
    const conn = await getConnection();
    try {
        const result = await conn.query(`CALL sp_getMantenimientoWithState('0')`);
        return result;
    } catch (error) {
    }
}

export const getMaintenanceCount = async () => {
    const conn = await getConnection();
    try {
        const result = await conn.query(`CALL sp_getCantidadMantenimiento()`);
        return result;
    } catch (error) {
    }
}

export const findMaintenanceByName = async (maintenance: string) => {
    const conn = await getConnection();
    try {
        const result = await conn.query(`CALL sp_getMantenimientoLike('${maintenance}')`);
        return result;
    } catch (error) {
    }
}

export const loadHistorial = async () => {
    const conn = await getConnection();
    try {
        const result = await conn.query(`CALL sp_getMantenimientoWithState('1')`);
        return result;
    } catch (error) {
    }
}

export const getHistorialCount = async () => {
    const conn = await getConnection();
    try {
        const result = await conn.query(`CALL sp_getCantidadHistorial()`);
        return result;
    } catch (error) {
    }
}

export const updateStatus = async (estado: number, id: number) => {
    const conn = await getConnection();
    try {
        const result = await conn.query(`CALL sp_updateStateMantenimiento('${estado}', '${id}')`);
        console.log(result);
        return result;
    } catch (error) {
    }
}
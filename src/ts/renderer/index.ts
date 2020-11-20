import { ipcRenderer } from 'electron';
import { loadMachinesIntoCbx, loadMaintenance, getMaintenanceCount, findMaintenanceByName } from '../main/Database';
let dates = [];
let ids = [];

var dismiss: any = document.querySelector('#dismiss'),
    submit: any = document.querySelector('#submit'),
    overlay: any = document.querySelector('#overlay'),
    overlayBtn: any = document.querySelector('#btnFloat');

dismiss.addEventListener('click', (e): any => {
    e.preventDefault();
    dismiss.style.display = 'none';
    overlay.style.display = 'none';
});

overlayBtn.addEventListener('click', (e): any => {
    dismiss.style.display = 'block';
    overlay.style.display = 'block';
});

submit.addEventListener('click', (): any => {
    dismiss.style.display = 'none';
    overlay.style.display = 'none';
});

/* form actions  */

const equipo = document.querySelector('#equipo'),
    mantenimiento = document.querySelector('#mantenimiento'),
    fecha = document.querySelector('#fecha'),
    actividades = document.querySelector('#actividades'),
    tableBody = document.querySelector('#tableBody'),
    maintenanceCount = document.querySelector('#mtnNumber'),
    search = document.querySelector('#search');

const fillCbx = (machine: string, index: number) => {
    equipo.innerHTML += `
        <option value=${machine.nombre}>${machine.nombre}</option>
    `;
}

const fillCbxEquipo = async () => {
    const result = await loadMachinesIntoCbx();
    const machines = result[0];
    machines.forEach((machine) => {
        fillCbx(machine);
    });
}

submit.addEventListener('click', (e) => {
    const mant = mantenimiento.value;
    const fech = fecha.value;
    const activ = actividades.value;
    const equip = equipo.value;

    const maintenance = {
        mantenimiento: mant,
        fecha: fech,
        actividades: activ,
        equipo: equip
    }

    console.log(maintenance);

    ipcRenderer.send('create-maintenance', maintenance);
});

const renderMaintenance = (maintenance: object) => {
    dates.push(maintenance.fecha);
    ids.push(maintenance.id);
    tableBody.innerHTML += `
    <tr class="maintenance__row">
        <td class="maintenance__column">${maintenance.mantenimiento}</td>
        <td class="maintenance__column">${maintenance.equipo}</td>
        <td class="maintenance__column">${maintenance.actividades}</td>
        <td class="maintenance__column">${maintenance.fecha}</td>
    </tr>
    `;
}

const showMaintenance = async () => {
    tableBody.innerHTML = '';
    const result = await loadMaintenance();
    const maintenances = result[0];
    maintenances.forEach(maintenance => {
        renderMaintenance(maintenance);
    });
}

const printMaintenanceNumber = async () => {
    const result = await getMaintenanceCount();
    const aux = result[0];
    const maintenanceNumber = aux[0];
    maintenanceCount.innerHTML = ` (${maintenanceNumber.registros})`;
}

ipcRenderer.on('reload', e => {
    showMaintenance();
    printMaintenanceNumber();
});

const showMaintenancesFound = (result): void => {
    tableBody.innerHTML = '';
    result.forEach(maintenance => {
        renderMaintenance(maintenance);
    });
};

search.addEventListener('keyup', async (e) => {
    const maintenance = search.value;
    const result = await findMaintenanceByName(maintenance);
    const maintenances = result[0];
    showMaintenancesFound(maintenances);
});

export const getOnlyDates = () => {
    return dates;
}

const getDates = () => {
    return dates;
}

const getIds = () => {
    return ids;
}

const sendData = () => {
    setTimeout(() => {
        ipcRenderer.send('dates', getDates(), getIds());
    }, 3000);
}

showMaintenance();
printMaintenanceNumber();
fillCbxEquipo();
sendData();
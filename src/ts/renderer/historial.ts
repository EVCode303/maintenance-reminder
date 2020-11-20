import { ipcRenderer } from 'electron';
import { loadHistorial, getHistorialCount } from '../main/Database';

/* form actions  */

const equipo = document.querySelector('#equipo'),
    tableBody = document.querySelector('#tableBody'),
    historialCount = document.querySelector('#hNumber'),
    search = document.querySelector('#search');

const renderHistorial = async (historial: object) => {
    tableBody.innerHTML += `
    <tr class="maintenance__row">
        <td class="maintenance__column">${historial.mantenimiento}</td>
        <td class="maintenance__column">${historial.equipo}</td>
        <td class="maintenance__column">${historial.actividades}</td>
        <td class="maintenance__column">${historial.fecha}</td>
    </tr>
    `;
}

const showHistorial = async () => {
    tableBody.innerHTML = '';
    const result = await loadHistorial();
    const historial = result[0];
    historial.forEach(historia => {
        renderHistorial(historia);
    });
}

const printHistorialNumber = async () => {
    const result = await getHistorialCount();
    const aux = result[0];
    const maintenanceNumber = aux[0];
    historialCount.innerHTML = ` (${maintenanceNumber.registros})`;
}

showHistorial();
printHistorialNumber();
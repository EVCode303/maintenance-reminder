import { ipcRenderer } from 'electron';
import { loadMachines, findMachinesByName, getMachinesCount } from '../main/Database';

var dismiss: any = document.querySelector('#dismiss'),
    submit: any = document.querySelector('#submit'),
    overlay: any = document.querySelector('#overlay'),
    overlayBtn: any = document.querySelector('#btnFloat'),
    tableBody: any = document.querySelector("#tableBody"),
    search: any = document.querySelector("#search"),
    machinesNumber: any = document.querySelector("#mchNumber");

dismiss.addEventListener('click', (e): any => {
    e.preventDefault();
    dismiss.style.display = 'none';
    overlay.style.display = 'none';
});

overlayBtn.addEventListener('click', (e): any => {
    e.preventDefault();
    dismiss.style.display = 'block';
    overlay.style.display = 'block';
    maquinaria.focus();
});

/*  Form Events  */

const modelo = document.querySelector("#modelo"),
    maquinaria = document.querySelector("#maquina"),
    descripcion = document.querySelector("#descripcion"),
    formSubmit = document.querySelector("#submit-form");

const sendInfo = (): any => {
    let mModelo: string = modelo.value;
    let mMaquinaria: string = maquinaria.value;
    let mDescripcion: string = descripcion.value;

    const machine = {
        modelo: mModelo,
        maquinaria: mMaquinaria,
        descripcion: mDescripcion
    }
    ipcRenderer.send('create-machine', machine);
};

submit.addEventListener('click', (e) => {
    e.preventDefault();
    sendInfo();
    dismiss.style.display = 'none';
    overlay.style.display = 'none';
    maquinaria.value = '';
    modelo.value = '';
    descripcion.value = '';
});

ipcRenderer.on('reload', e => {
    showMachines();
    printMachineNumber();
});

const renderMachine = async (machine: object) => {
    tableBody.innerHTML += `
    <tr class="maintenance__row">
        <td class="maintenance__column">${machine.nombre}</td>
        <td class="maintenance__column">${machine.modelo}</td>
        <td class="maintenance__column">${machine.descripcion}</td>
        <td class="maintenance__column">${machine.fecha}</td>
    </tr>
    `;
}

const showMachines = async () => {
    tableBody.innerHTML = '';
    const result = await loadMachines();
    const machines = result[0];
    machines.forEach(machine => {
        renderMachine(machine);
    });
}

const showMachinesFound = (result):void => {
    tableBody.innerHTML = '';
    result.forEach(machine => {
        renderMachine(machine);
    });
};

const printMachineNumber = async () => {
    const result = await getMachinesCount();
    const aux = result[0];
    const machineNumber = aux[0];
    machinesNumber.innerHTML = ` (${machineNumber.cantidadEquipos})`;
}

search.addEventListener('keyup', async (e) => {
    const machineName = search.value;
    const result = await findMachinesByName(machineName);
    const machines = result[0];
    console.log(machines);
    showMachinesFound(machines);
});

showMachines();
printMachineNumber();
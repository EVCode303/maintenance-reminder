"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var Database_1 = require("../main/Database");
var dismiss = document.querySelector('#dismiss'), submit = document.querySelector('#submit'), overlay = document.querySelector('#overlay'), overlayBtn = document.querySelector('#btnFloat');
dismiss.addEventListener('click', function (e) {
    e.preventDefault();
    dismiss.style.display = 'none';
    overlay.style.display = 'none';
});
overlayBtn.addEventListener('click', function (e) {
    dismiss.style.display = 'block';
    overlay.style.display = 'block';
});
submit.addEventListener('click', function () {
    dismiss.style.display = 'none';
    overlay.style.display = 'none';
});
/* form actions  */
var equipo = document.querySelector('#equipo'), mantenimiento = document.querySelector('#mantenimiento'), fecha = document.querySelector('#fecha'), actividades = document.querySelector('#actividades'), tableBody = document.querySelector('#tableBody'), maintenanceCount = document.querySelector('#mtnNumber'), search = document.querySelector('#search');
var fillCbx = function (machine, index) {
    equipo.innerHTML += "\n        <option value=" + machine.nombre + ">" + machine.nombre + "</option>\n    ";
};
var fillCbxEquipo = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, machines;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Database_1.loadMachinesIntoCbx()];
            case 1:
                result = _a.sent();
                machines = result[0];
                machines.forEach(function (machine) {
                    fillCbx(machine);
                });
                return [2 /*return*/];
        }
    });
}); };
submit.addEventListener('click', function (e) {
    var mant = mantenimiento.value;
    var fech = fecha.value;
    var activ = actividades.value;
    var equip = equipo.value;
    var maintenance = {
        mantenimiento: mant,
        fecha: fech,
        actividades: activ,
        equipo: equip
    };
    console.log(maintenance);
    electron_1.ipcRenderer.send('create-maintenance', maintenance);
});
var renderMaintenance = function (maintenance) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        tableBody.innerHTML += "\n    <tr class=\"maintenance__row\">\n        <td class=\"maintenance__column\">" + maintenance.mantenimiento + "</td>\n        <td class=\"maintenance__column\">" + maintenance.equipo + "</td>\n        <td class=\"maintenance__column\">" + maintenance.actividades + "</td>\n        <td class=\"maintenance__column\">" + maintenance.fecha + "</td>\n    </tr>\n    ";
        return [2 /*return*/];
    });
}); };
var showMaintenance = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, maintenances;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tableBody.innerHTML = '';
                return [4 /*yield*/, Database_1.loadMaintenance()];
            case 1:
                result = _a.sent();
                maintenances = result[0];
                maintenances.forEach(function (maintenance) {
                    renderMaintenance(maintenance);
                });
                return [2 /*return*/];
        }
    });
}); };
var printMaintenanceNumber = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, aux, maintenanceNumber;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Database_1.getMaintenanceCount()];
            case 1:
                result = _a.sent();
                aux = result[0];
                maintenanceNumber = aux[0];
                maintenanceCount.innerHTML = " (" + maintenanceNumber.registros + ")";
                return [2 /*return*/];
        }
    });
}); };
electron_1.ipcRenderer.on('reload', function (e) {
    showMaintenance();
    printMaintenanceNumber();
});
var showMaintenancesFound = function (result) {
    tableBody.innerHTML = '';
    result.forEach(function (maintenance) {
        renderMaintenance(maintenance);
    });
};
search.addEventListener('keyup', function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var maintenance, result, maintenances;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                maintenance = search.value;
                return [4 /*yield*/, Database_1.findMaintenanceByName(maintenance)];
            case 1:
                result = _a.sent();
                maintenances = result[0];
                console.log(maintenances);
                showMaintenancesFound(maintenances);
                return [2 /*return*/];
        }
    });
}); });
showMaintenance();
printMaintenanceNumber();
fillCbxEquipo();

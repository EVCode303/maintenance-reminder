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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.getHistorialCount = exports.loadHistorial = exports.findMaintenanceByName = exports.getMaintenanceCount = exports.loadMaintenance = exports.loadMachinesIntoCbx = exports.insertMaintenance = exports.getMachinesCount = exports.findMachinesByName = exports.loadMachines = exports.insertMachine = void 0;
var promise_mysql_1 = __importDefault(require("promise-mysql"));
var electron_1 = require("electron");
var getConnection = function () {
    return promise_mysql_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'maintenance'
    });
};
exports.insertMachine = function (machine) { return __awaiter(void 0, void 0, void 0, function () {
    var conn, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getConnection()];
            case 1:
                conn = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, conn.query("CALL sp_saveEquipo('" + machine.modelo + "', '" + machine.maquinaria + "', '" + machine.descripcion + "')")];
            case 3:
                result = _a.sent();
                console.log(result);
                new electron_1.Notification({
                    title: 'Exito',
                    body: 'Máquina agregada'
                }).show();
                return [2 /*return*/, result];
            case 4:
                error_1 = _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loadMachines = function () { return __awaiter(void 0, void 0, void 0, function () {
    var conn, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getConnection()];
            case 1:
                conn = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, conn.query("CALL sp_getEquiposAll()")];
            case 3:
                result = _a.sent();
                return [2 /*return*/, result];
            case 4:
                error_2 = _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.findMachinesByName = function (machineName) { return __awaiter(void 0, void 0, void 0, function () {
    var conn, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getConnection()];
            case 1:
                conn = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, conn.query("CALL sp_getEquipoLike('" + machineName + "')")];
            case 3:
                result = _a.sent();
                return [2 /*return*/, result];
            case 4:
                error_3 = _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getMachinesCount = function () { return __awaiter(void 0, void 0, void 0, function () {
    var conn, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getConnection()];
            case 1:
                conn = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, conn.query("CALL sp_getCantidadEquipo()")];
            case 3:
                result = _a.sent();
                return [2 /*return*/, result];
            case 4:
                error_4 = _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.insertMaintenance = function (maintenance) { return __awaiter(void 0, void 0, void 0, function () {
    var conn, result, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getConnection()];
            case 1:
                conn = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, conn.query("CALL sp_saveMantenimiento('" + maintenance.equipo + "', '" + maintenance.mantenimiento + "', '" + maintenance.actividades + "', '" + maintenance.fecha + "')")];
            case 3:
                result = _a.sent();
                console.log(result);
                new electron_1.Notification({
                    title: 'Exito',
                    body: 'Mantenimiento programado'
                }).show();
                return [2 /*return*/, result];
            case 4:
                error_5 = _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loadMachinesIntoCbx = function () { return __awaiter(void 0, void 0, void 0, function () {
    var conn, result, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getConnection()];
            case 1:
                conn = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, conn.query("CALL sp_getEquipos()")];
            case 3:
                result = _a.sent();
                return [2 /*return*/, result];
            case 4:
                error_6 = _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loadMaintenance = function () { return __awaiter(void 0, void 0, void 0, function () {
    var conn, result, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getConnection()];
            case 1:
                conn = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, conn.query("CALL sp_getMantenimientoWithState('0')")];
            case 3:
                result = _a.sent();
                return [2 /*return*/, result];
            case 4:
                error_7 = _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getMaintenanceCount = function () { return __awaiter(void 0, void 0, void 0, function () {
    var conn, result, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getConnection()];
            case 1:
                conn = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, conn.query("CALL sp_getCantidadMantenimiento()")];
            case 3:
                result = _a.sent();
                return [2 /*return*/, result];
            case 4:
                error_8 = _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.findMaintenanceByName = function (maintenance) { return __awaiter(void 0, void 0, void 0, function () {
    var conn, result, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getConnection()];
            case 1:
                conn = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, conn.query("CALL sp_getMantenimientoLike('" + maintenance + "')")];
            case 3:
                result = _a.sent();
                return [2 /*return*/, result];
            case 4:
                error_9 = _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loadHistorial = function () { return __awaiter(void 0, void 0, void 0, function () {
    var conn, result, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getConnection()];
            case 1:
                conn = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, conn.query("CALL sp_getMantenimientoWithState('1')")];
            case 3:
                result = _a.sent();
                return [2 /*return*/, result];
            case 4:
                error_10 = _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getHistorialCount = function () { return __awaiter(void 0, void 0, void 0, function () {
    var conn, result, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getConnection()];
            case 1:
                conn = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, conn.query("CALL sp_getCantidadHistorial()")];
            case 3:
                result = _a.sent();
                return [2 /*return*/, result];
            case 4:
                error_11 = _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateStatus = function (estado, id) { return __awaiter(void 0, void 0, void 0, function () {
    var conn, result, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getConnection()];
            case 1:
                conn = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, conn.query("CALL sp_updateStateMantenimiento('" + estado + "', '" + id + "')")];
            case 3:
                result = _a.sent();
                console.log(result);
                return [2 /*return*/, result];
            case 4:
                error_12 = _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };

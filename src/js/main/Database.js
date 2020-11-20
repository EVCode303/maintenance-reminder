"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
var promise_mysql_1 = __importDefault(require("promise-mysql"));
var Database = /** @class */ (function () {
    function Database(host, user, password, database) {
        if (host === void 0) { host = 'localhost'; }
        if (user === void 0) { user = 'root'; }
        if (password === void 0) { password = ''; }
        if (database === void 0) { database = 'mantenimiento'; }
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
    }
    Database.prototype.getConnection = function () {
        return promise_mysql_1.default.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        });
    };
    return Database;
}());
exports.Database = Database;

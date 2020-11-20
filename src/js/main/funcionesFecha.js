"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPending = void 0;
var electron_1 = require("electron");
var Database_1 = require("./Database");
var dateDiff = function (date1, date2) {
    var dt1 = new Date(date1);
    var dt2 = new Date(date2);
    var diff = dt2.getTime() - dt1.getTime();
    var days = diff / (1000 * 60 * 60 * 24);
    return days;
};
var convertToEnglishDate = function (date) {
    return date.substring(3, 5) + '/' + date.substring(0, 2) + '/' + date.substring(6, 10);
};
var getTodays = function () {
    var date = new Date();
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
};
exports.verifyPending = function (dates, ids) {
    var i = 0;
    dates.forEach(function (date, index) {
        var date1 = convertToEnglishDate(getTodays());
        var date2 = convertToEnglishDate(date);
        var dateDif = dateDiff(date1, date2);
        if (dateDif === 0) {
            i++;
        }
        if (dateDif < 0) {
            Database_1.updateStatus(1, ids[index]);
        }
        if (i == 1) {
            new electron_1.Notification({
                title: 'Mantenimientos de hoy',
                body: 'Hay ' + i + ' mantenimiento'
            }).show();
        }
        if (i > 1) {
            new electron_1.Notification({
                title: 'Mantenimientos de hoy',
                body: 'Hay ' + i + ' mantenimientos'
            }).show();
        }
    });
};

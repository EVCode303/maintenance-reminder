"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPending = void 0;
var date_diff_indays = function (date1, date2) {
    var dt1 = new Date(date1);
    var dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
};
var convertToEnglishDate = function (date) {
    return date.substring(3, 5) + '/' + date.substring(0, 2) + '/' + date.substring(6, 10);
};
var getTodays = function () {
    var date = new Date();
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
};
exports.verifyPending = function (dates) {
    dates.forEach(function (date, index) {
        var date1 = convertToEnglishDate(getTodays());
        var date2 = convertToEnglishDate(date);
        var dateDiff = date_diff_indays(date1, date2);
        console.log(dateDiff);
    });
};

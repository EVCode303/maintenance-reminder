import { Notification } from 'electron';
import { updateStatus } from './Database';

const dateDiff = (date1, date2) => {
    var dt1 = new Date(date1);
    var dt2 = new Date(date2);
    var diff = dt2.getTime() - dt1.getTime();
    var days = diff / (1000 * 60 * 60 * 24);
    return days;
}

const convertToEnglishDate = (date) => {
    return date.substring(3, 5) + '/' + date.substring(0, 2) + '/' + date.substring(6, 10);
}

const getTodays = () => {
    const date = new Date();
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
}

export const verifyPending = (dates, ids) => {
    let i = 0;
    dates.forEach((date, index) => {
        let date1 = convertToEnglishDate(getTodays());
        let date2 = convertToEnglishDate(date);
        let dateDif = dateDiff(date1, date2);
        if (dateDif === 0){
            i++;
        } 
        if (dateDif < 0){
            updateStatus(1, ids[index]);
        }

        if (i == 1) {
            new Notification({
                title: 'Mantenimientos de hoy',
                body: 'Hay '+i+' mantenimiento'
            }).show();
        }

        if (i > 1) {
            new Notification({
                title: 'Mantenimientos de hoy',
                body: 'Hay '+i+' mantenimientos'
            }).show();
        }
    });
}


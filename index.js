// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(record, dateTime) {
    const [date, time] = dateTime.split(' ');
    const timeObj = {date: date, hour: parseInt(time), type: 'TimeIn'};
    record.timeInEvents.push(timeObj);
    return record;
}

function createTimeOutEvent(record, dateTime) {
    const [date, time] = dateTime.split(' ');
    const timeObj = {date: date, hour: parseInt(time), type: 'TimeOut'};
    record.timeOutEvents.push(timeObj);
    return record;
}

function hoursWorkedOnDate(record, date) {
    const timeIn = record.timeInEvents.find(obj => obj.date === date).hour;
    const timeOut = record.timeOutEvents.find(obj => obj.date === date).hour;
    return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(record, date) {
    return record.payPerHour * hoursWorkedOnDate(record, date);
}

function allWagesFor(record) {
    const dates = record.timeInEvents.map(e => e.date);
    const wages = dates.map(date => wagesEarnedOnDate(record, date));
    return wages.reduce((wage, total) => wage + total, 0);
}

function calculatePayroll(arrayOfRecords) {
    const wages = arrayOfRecords.map(record => allWagesFor(record));
    return wages.reduce((wage, total) => total + wage, 0);
}

function findEmployeeByFirstName(arrayOfRecords, name) {
    return arrayOfRecords.find(record => record.firstName === name);
}
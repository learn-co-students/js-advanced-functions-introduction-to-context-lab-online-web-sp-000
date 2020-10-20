// Your code here
function createEmployeeRecord(array) {
    return Object.assign({}, {firstName: array[0]}, {familyName: array[1]}, { title: array[2] }, { payPerHour: array[3] }, { timeInEvents: [] }, { timeOutEvents: [] })
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(record, dateTime) {
    let clockIn = Object.assign({}, {date: dateTime.split(" ")[0]}, { type: 'TimeIn' }, { hour: parseInt(dateTime.split(" ")[1]) })
    record.timeInEvents.push(clockIn);
    return record;
}

function createTimeOutEvent(record, dateTime) {
    let clockOut = Object.assign({}, {date: dateTime.split(" ")[0]}, { type: 'TimeOut' }, { hour: parseInt(dateTime.split(" ")[1]) })
    record.timeOutEvents.push(clockOut);
    return record;
}

function hoursWorkedOnDate(record, date) {
    let eventStart = record.timeInEvents.find(event => event.date === date);
    let eventEnd = record.timeOutEvents.find(event => event.date === date);
    return (eventEnd.hour - eventStart.hour)/100;
}

function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour;
}

function allWagesFor(record) {
    // let hours = []
    // for (let i = 0; i < record.timeInEvents.length; i++ ) {
    //     hours.push((record.timeOutEvents[i].hour - record.timeInEvents[i].hour)/100)
    // }

    // let reducer = (acc, currentVal) => acc + currentVal;
    // return hours.reduce(reducer, 0) * record.payPerHour;

    let dates = record.timeInEvents.map(event => event.date)
    let payable = dates.reduce( (acc, date) => acc + wagesEarnedOnDate(record, date), 0 )
    return payable;
}

function calculatePayroll(array) {
    // let total = array.map(employee => allWagesFor(employee));
    return array.reduce( (acc, employee) => acc + allWagesFor(employee), 0)
}

function findEmployeeByFirstName(array, name) {
    return array.find(employee => employee.firstName === name)
}
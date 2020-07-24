// Your code here
function createEmployeeRecord(employeeArray) {
    let newEmployee = new Object();
    newEmployee.firstName = employeeArray[0];
    newEmployee.familyName = employeeArray[1];
    newEmployee.title = employeeArray[2];
    newEmployee.payPerHour = employeeArray[3];
    newEmployee.timeInEvents = [];
    newEmployee.timeOutEvents = []; 

    return newEmployee
}

function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let dateAndTime = dateStamp.split(' ');
    let employeeIn = new Object();
    employeeIn.type = "TimeIn";
    employeeIn.date = dateAndTime[0];
    employeeIn.hour = parseInt(dateAndTime[1]);
    employeeRecord.timeInEvents.push(employeeIn);

    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let dateAndTime = dateStamp.split(' ');
    let employeeOut = new Object();
    employeeOut.type = "TimeOut";
    employeeOut.date = dateAndTime[0];
    employeeOut.hour = parseInt(dateAndTime[1]);
    employeeRecord.timeOutEvents.push(employeeOut);

    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateWorked) {
    let inEvent = employeeRecord.timeInEvents.find(event => event.date === dateWorked)
    let outEvent = employeeRecord.timeOutEvents.find(event => event.date === dateWorked)
    return (outEvent.hour - inEvent.hour)/100
}

function wagesEarnedOnDate(employeeRecord, dateWages) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, dateWages)
    return hoursWorked * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    return employeeRecord.timeOutEvents.map(event => wagesEarnedOnDate(employeeRecord, event.date)).reduce((total, hoursWorked) => total + hoursWorked)
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.map(allWagesFor).reduce((total, hoursWorked) => total + hoursWorked)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(name => name.firstName.toLowerCase() === firstName.toLowerCase())
}
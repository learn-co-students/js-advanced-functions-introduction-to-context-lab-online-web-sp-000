// Your code here
function createEmployeeRecord(array) {
    let employee = {};
    employee.firstName = array[0];
    employee.familyName = array[1];
    employee.title = array[2];
    employee.payPerHour = array[3];
    employee.timeInEvents = [];
    employee.timeOutEvents = [];
    return employee;
}

function createEmployeeRecords(a_o_a) {
    let array = a_o_a.map( array => {
        let employee = {};
        employee.firstName = array[0];
        return employee
    });
    return array;
}

function createTimeInEvent(record, str) {
    let splitStr = str.split(" ");
    let timeInObj = {
        type: "TimeIn",
        date: splitStr[0],
        hour: parseInt(splitStr[1])
    }
    record.timeInEvents.push(timeInObj);
    return record;
}

function createTimeOutEvent(record, str) {
    let splitStr = str.split(" ");
    let timeOutObj = {
        type: "TimeOut",
        date: splitStr[0],
        hour: parseInt(splitStr[1])
    }
    record.timeOutEvents.push(timeOutObj);
    return record;
}

function hoursWorkedOnDate(record) {
    let time = (record.timeOutEvents[0].hour - record.timeInEvents[0].hour)
    return (time / 100);
}

function wagesEarnedOnDate(record) {
    return (record.payPerHour * hoursWorkedOnDate(record))
}

function allWagesFor(record) {
    let hoursWorked = 0;
    let i = 0;
    while (i < record.timeInEvents.length) {
        hoursWorked += ((record.timeOutEvents[i].hour - record.timeInEvents[i].hour) / 100);
        i++;
    }
    return (hoursWorked * record.payPerHour);
}

function calculatePayroll(array) {
    return array.reduce(function(accu, employee) {
        return accu + allWagesFor(employee);
    }, 0);
}

function findEmployeeByFirstName(emps, name) {
    console.log(emps);
    console.log(name);
    let employee = emps.find( e => e.firstName === name);
    console.log(employee.firstName);
    return employee.firstName;
}
// Your code here


function createEmployeeRecord(array) {
    let employee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
    }
    return employee
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord);
}

function createTimeInEvent(employee, timeEvent) {
    let event = {
        type: "TimeIn",
        hour: parseInt(timeEvent.split(" ")[1]),
        date: timeEvent.split(" ")[0],
    }
    employee.timeInEvents.push(event)
    return employee
}

function createTimeOutEvent(employee, timeEvent) {
    let event = {
        type: "TimeOut",
        hour: parseInt(timeEvent.split(" ")[1]),
        date: timeEvent.split(" ")[0],
    }
    employee.timeOutEvents.push(event)
    return employee
}

function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find( event => event.date === date ).hour;
    let timeOut = employee.timeOutEvents.find( event => event.date === date ).hour;
    return (timeOut - timeIn)/100 ;
}

function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
}

function allWagesFor(employee) {
    let dates = employee.timeInEvents.map( event => event.date );
    let wages = [];
    for (const date of dates) {
        wages.push(wagesEarnedOnDate(employee, date));
    }
    return wages.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue
      }, 0);
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(element => element.firstName === firstName)
}

function calculatePayroll(array) {
    const wages = array.map(function(employee) {
        return allWagesFor(employee);
    });
    return wages.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue
      }, 0);
}
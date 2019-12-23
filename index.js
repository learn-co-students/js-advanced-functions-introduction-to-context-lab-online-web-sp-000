// Your code here
function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employee, dateString) {
    let [date, hour] = dateString.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    });
    return employee
}

function createTimeOutEvent(employee, dateString) {
    let [date, hour] = dateString.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    });
    return employee
}

function hoursWorkedOnDate(employee, dateString) {
    let [date, hour] = dateString.split(' ');
    let clockedIn = employee.timeInEvents.find(time => time.date === dateString);
    let clockedOut = employee.timeOutEvents.find(time => time.date === dateString);

    return (clockedOut.hour - clockedIn.hour) / 100;
}

function wagesEarnedOnDate(employee, dateString) {
    let hoursWorked = hoursWorkedOnDate(employee, dateString)
    return hoursWorked * employee.payPerHour;
}

function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(record => record.date);
    let pay = dates.reduce((memo, d) => memo + wagesEarnedOnDate(employee, d), 0)
    return pay;
}

function calculatePayroll(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce((memo, employee) => memo + allWagesFor(employee), 0)
}

function findEmployeeByFirstName(allEmployees, firstName) {
    return allEmployees.find(employee => employee.firstName === firstName);
}
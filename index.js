// Your code here
function createEmployeeRecord(data) {
    let employee = []
    employee.firstName = data[0];
    employee.familyName = data[1];
    employee.title = data[2];
    employee.payPerHour = data[3];
    employee.timeInEvents = [];
    employee.timeOutEvents = [];
    return employee; 
}

function createEmployeeRecords(data) {
    return data.map(e => createEmployeeRecord(e)) 
}

function createTimeInEvent(employee, time) {
    let timeIn = []
    timeIn.type = "TimeIn"
    timeIn.date = time.split(" ")[0]
    timeIn.hour = parseInt(time.split(" ")[1])
    employee.timeInEvents.push(timeIn)
    return employee
}

function createTimeOutEvent(employee, time) {
    let timeOut = []
    timeOut.type = "TimeOut"
    timeOut.date = time.split(" ")[0]
    timeOut.hour = parseInt(time.split(" ")[1])
    employee.timeOutEvents.push(timeOut)
    return employee
}

function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(e => e.date === date).hour;
    let timeOut = employee.timeOutEvents.find(e => e.date === date).hour;
    return (timeOut - timeIn)/100  
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
    let datesWorked = employee.timeOutEvents.map(e => e.date)
    let wages = datesWorked.reduce((a, b) => a + wagesEarnedOnDate(employee, b), 0)
    return wages
}

function calculatePayroll(employees) {
    return employees.reduce((a, b) => a + allWagesFor(b), 0)
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(e => e.firstName === name)
}
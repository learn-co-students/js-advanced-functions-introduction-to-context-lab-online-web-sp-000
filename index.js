// Your code here
function createEmployeeRecord(employee) {
    return Object.assign({
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    })
}

function createEmployeeRecords(employees) {
    return employees.map(createEmployeeRecord)
}

function createTimeInEvent(employee, timeString) {
    let indate = timeString.split(" ")[0]
    let intime = timeString.split(" ")[1]
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(intime),
        date: indate
    })
    return employee
}

function createTimeOutEvent(employee, timeString) {
    let outdate = timeString.split(" ")[0]
    let outtime = timeString.split(" ")[1]
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(outtime),
        date: outdate
    })
    return employee
}

function hoursWorkedOnDate(employee, date) {
    let hourIn = employee.timeInEvents.find( e => e.date === date ).hour / 100
    let hourOut = employee.timeOutEvents.find( e => e.date === date).hour / 100
    return hourOut - hourIn
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
    let wages = employee.timeInEvents.map(event => {
        return wagesEarnedOnDate(employee, event.date)
    })

    return wages.reduce((total, wage) => total + wage, 0)
}

function calculatePayroll(employees) {
    let employeeWage = employees.map(allWagesFor)
    return employeeWage.reduce((total, wage) => total + wage, 0)
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(emp => emp.firstName === name)
}
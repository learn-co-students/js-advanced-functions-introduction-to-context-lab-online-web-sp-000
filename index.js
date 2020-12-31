// Your code here

function createEmployeeRecord(employee) {
    return Object.assign({}, employee, {
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

function createTimeInEvent(employee, string) {
    let eventArray = string.split(' ')
    
    let event = Object.assign({}, eventArray, {
        type: 'TimeIn',
        date: eventArray[0],
        hour: parseInt(eventArray[1])
    })

    employee.timeInEvents.push(event)
    return employee
}

function createTimeOutEvent(employee, string) {
    let eventArray = string.split(' ')
    
    let event = Object.assign({}, eventArray, {
        type: 'TimeOut',
        date: eventArray[0],
        hour: parseInt(eventArray[1])
    })

    employee.timeOutEvents.push(event)
    return employee
}

function hoursWorkedOnDate(employee, date) {
    let hourIn = employee.timeInEvents.find( event => event.date === date ).hour
    let hourOut = employee.timeOutEvents.find( event => event.date === date ).hour
    return (hourOut - hourIn) / 100
}

function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date)
    return hours * employee.payPerHour
}

function allWagesFor(employee) {
    return employee.timeInEvents.reduce((sum, event) => sum + wagesEarnedOnDate(employee, event.date), 0)
}

function calculatePayroll(employees) {
    return employees.reduce((sum, employee) => sum + allWagesFor(employee), 0)
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find( employee => employee.firstName === firstName)
}
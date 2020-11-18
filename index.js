function createEmployeeRecord(array) {
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(array) {
    return array.map(employeeData => createEmployeeRecord(employeeData))
}

function createTimeInEvent(record, string) {
    let date = string.split(" ")[0]
    let time = parseInt(string.split(" ")[1])
    let inEvent = {type: "TimeIn", date: date, hour: time}
    record.timeInEvents.push(inEvent)
    return record
}

function createTimeOutEvent(record, string) {
    let date = string.split(" ")[0]
    let time = parseInt(string.split(" ")[1])
    let outEvent = {type: "TimeOut", date: date, hour: time}
    record.timeOutEvents.push(outEvent)
    return record
}

function hoursWorkedOnDate(record, date) {
    let timeIn = record.timeInEvents.find(event => event.date === date)
    let timeOut = record.timeOutEvents.find(event => event.date === date)
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(record, date) {
    return record.payPerHour * hoursWorkedOnDate(record, date);    
}

function allWagesFor(record) {
    let dates = record.timeInEvents.map(event => event.date)
    let wagesArray = dates.map(date => wagesEarnedOnDate(record, date))
    return wagesArray.reduce((total, wage) => total + wage, 0)
}

function calculatePayroll(employeesArray) {
    let wagesArray = employeesArray.map(employee => allWagesFor(employee))
    return wagesArray.reduce((total, wage) => total + wage, 0)
}

function findEmployeeByFirstName(employeesArray, name) {
    return employeesArray.find(employee => employee.firstName === name)
}
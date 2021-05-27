// Your code here
function createEmployeeRecord(arr) {
    let record = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return record
}

function createEmployeeRecords(arr) {

    return arr.map(e => createEmployeeRecord(e))
}

function createTimeInEvent(employee, dateTime) {
    const timeIn = {
        type: "TimeIn",
        date: dateTime.substr(0, 10),
        hour: parseInt(dateTime.substr(11))
    }
    employee.timeInEvents.push(timeIn)
    return employee
}

function createTimeOutEvent(employee, dateTime) {
    const timeOut = {
        type: "TimeOut",
        date: dateTime.substr(0, 10),
        hour: parseInt(dateTime.substr(11))
    }
    employee.timeOutEvents.push(timeOut)
    return employee
}

function hoursWorkedOnDate(employee, date) {
    const hourIn = employee.timeInEvents.find(e => e.date === date).hour
    const hourOut = employee.timeOutEvents.find(e => e.date === date).hour
    const hoursWorked = hourOut - hourIn
    return hoursWorked / 100
}

function wagesEarnedOnDate(employee, date) {
    const pay = employee.payPerHour
    const hours = hoursWorkedOnDate(employee, date)
    const total = hours * pay
    return total
}

function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(e => e.date)
    const dailyPay = dates.map(day => {
        return wagesEarnedOnDate(employee, day)
    })
    const payOwed = dailyPay.reduce((total, day) => total + day)
    return payOwed
}

function calculatePayroll(employees) {
    const pay = employees.map(e => allWagesFor(e))
    const total = pay.reduce((total, wage) => total + wage)
    return total
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(e => e.firstName === name)
}
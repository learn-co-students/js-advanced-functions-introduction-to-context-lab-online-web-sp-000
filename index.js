// Your code here
function createEmployeeRecord(data) {
    return {
        firstName: data[0],
        familyName: data[1],
        title: data[2],
        payPerHour: data[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(data) {
    return data.map(function(point) {
        return createEmployeeRecord(point)
    })
}

function createTimeInEvent(employee, time) {
    let [date, hour] = time.split(' ');
    employee.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

function createTimeOutEvent(employee, time){
    let [date, hour] = time.split(' ');
    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

function hoursWorkedOnDate(employee, day) {
    let timeIn = employee.timeInEvents.find(function(e){
        return e.date === day
    })

    let timeOut = employee.timeOutEvents.find(function(e){
        return e.date === day
    })

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, day) {
    let wage = hoursWorkedOnDate(employee, day) * employee.payPerHour;
    return parseFloat(wage.toString())
}

function allWagesFor(employee) {
    let daysWorked = employee.timeInEvents.map(function(e) {
        return e.date
    })

    let amountOwed = daysWorked.reduce(function(memo, e){
        return memo + wagesEarnedOnDate(employee, e)
    }, 0 )

    return amountOwed
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(function(e) {
        return e.firstName === name 
    })
}

function calculatePayroll(employees) {
    return employees.reduce(function(memo, e){
        return memo + allWagesFor(e)
    }, 0)
}
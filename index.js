// Your code here
function createEmployeeRecord(arr) {
    let employee = {};
    [employee.firstName, employee.familyName, employee.title, employee.payPerHour] = arr;
    employee.timeInEvents = [];
    employee.timeOutEvents = [];
    return employee
}

function createEmployeeRecords(arr) {
    return arr.map(el => createEmployeeRecord(el))
}

function createTimeInEvent(employee, timePunch) {
    let obj = {};
    obj.type = "TimeIn"
    obj.date = timePunch.split(' ')[0]
    obj.hour = parseInt(timePunch.split(' ')[1], 10)
    employee.timeInEvents.push(obj)
    return employee
}

function createTimeOutEvent(employee, timePunch) {
    let obj = {};
    obj.type = "TimeOut"
    obj.date = timePunch.split(' ')[0]
    obj.hour = parseInt(timePunch.split(' ')[1], 10)
    employee.timeOutEvents.push(obj)
    return employee
}

function hoursWorkedOnDate(employee, date) {
   let num = (employee.timeOutEvents.find(x => x.date === date).hour -
          employee.timeInEvents.find(x => x.date === date).hour)

    return num /100
}

function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date)

    return hours *  employee.payPerHour
}

function allWagesFor(employee) {
    return employee.timeInEvents.reduce(function(acc, v) {
        return acc + wagesEarnedOnDate(employee, v.date)
    }, 0)
}

function calculatePayroll(employees) {
    return employees.reduce(function(acc, employee) {
        return acc + allWagesFor(employee)
    }, 0)
}

function findEmployeeByFirstName(arr, name) {
    return arr.filter(x => x.firstName === name)[0]
}
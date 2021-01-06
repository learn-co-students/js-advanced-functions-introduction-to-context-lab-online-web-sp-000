// Your code here
function createEmployeeRecord(array) {
    let person = {firstName: array[0], familyName: array[1], title: array[2], payPerHour: array[3], timeInEvents: [], timeOutEvents: []}
    return person
}

let createEmployeeRecords = function (array) {
    let employees = []
     array.forEach(person => employees.push(createEmployeeRecord(person)))
     return employees 
}

function createTimeInEvent(employee, time) {
    let event = {type: "TimeIn", date: time.split(" ")[0], hour: parseInt(time.split(" ")[1])}
    employee.timeInEvents.push(event)
    return employee
}

function createTimeOutEvent(employee, time) {
    let event = {type: "TimeOut", date: time.split(" ")[0], hour: parseInt(time.split(" ")[1])}
    employee.timeOutEvents.push(event)
    return employee
}

function hoursWorkedOnDate(employee, record) {
    let timeIn = employee.timeInEvents.find(e => e.date === record)
    console.log('timeIn: ', timeIn)
    
    let timeOut = employee.timeOutEvents.find(e => e.date === record)
    console.log('timeOut: ', timeOut)
    let hours = (timeOut.hour - timeIn.hour) / 100
    return hours
}

function wagesEarnedOnDate(employee, record) {
    let wage = employee.payPerHour
    let hoursWorked = hoursWorkedOnDate(employee, record)
    return wage * hoursWorked
}

function allWagesFor(employee) {
    let wage = employee.payPerHour
    let total = 0
     employee.timeInEvents.forEach(event => {
         let date = event.date
        let hoursWorked = hoursWorkedOnDate(employee, date)
        total += (wage * hoursWorked)
     })
     console.log(total)
    return total
    
}
function calculatePayroll(employees) {
    let total = 0
    employees.forEach(employee => {
         total += allWagesFor(employee)
    })
    return total
}

function findEmployeeByFirstName(employees, name) {
   let employee = employees.find(emp => emp.firstName == name)
    return employee
}
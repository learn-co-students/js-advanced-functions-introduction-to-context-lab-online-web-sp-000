// Your code here
function createEmployeeRecord(arr){
  const employee = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employee
}

function createEmployeeRecords(arr) {
  const employees = arr.map(function(e){return createEmployeeRecord(e)})
  return employees
}

function createTimeInEvent(employee, time) {
  const timearr = time.split(" ")
  const timeIn = {type: "TimeIn",
                  hour: parseInt(timearr[1]),
                  date: timearr[0]}
  employee.timeInEvents.push(timeIn)
  return employee
}

function createTimeOutEvent(employee, time){
  const timearr = time.split(" ")
  const timeOut = {type: "TimeOut",
                   hour: parseInt(timearr[1]),
                   date: timearr[0]}
  employee.timeOutEvents.push(timeOut)
  return employee
}

function hoursWorkedOnDate(employee, date){
  const timeIn = employee.timeInEvents.find(e => e.date === date).hour
  const timeOut = employee.timeOutEvents.find(e => e.date === date).hour
  return (timeOut - timeIn)/100
}


function wagesEarnedOnDate(employee, date){
  const hours = hoursWorkedOnDate(employee,date)
  return hours * employee.payPerHour
}

function allWagesFor(employee){
  const datearr = employee.timeInEvents.map(function(e){return e.date})
  const wagearr = datearr.map(function(e){return wagesEarnedOnDate(employee, e)})
  return wagearr.reduce((total, element) => element + total)
}

function calculatePayroll(employees){
  return employees.reduce((t, e) => t + allWagesFor(e), 0)
}

function findEmployeeByFirstName(employees, name){
  return employees.find(s => s.firstName === name)
}

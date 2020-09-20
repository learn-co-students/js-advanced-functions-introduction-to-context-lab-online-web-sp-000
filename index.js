// Your code here

function createEmployeeRecord(array){
    const employee = {
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
    const employees = array.map(function(e){return createEmployeeRecord(e)})
    return employees
  }

  function createTimeInEvent(employee, time) {
    const timearray = time.split(" ")
    const timeIn = {type: "TimeIn",
                    hour: parseInt(timearray[1]),
                    date: timearray[0]}
    employee.timeInEvents.push(timeIn)
    return employee
  }

  function createTimeOutEvent(employee, time){
    const timearray = time.split(" ")
    const timeOut = {type: "TimeOut",
                     hour: parseInt(timearray[1]),
                     date: timearray[0]}
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
    const datearray = employee.timeInEvents.map(function(e){return e.date})
    const wagearray = datearray.map(function(e){return wagesEarnedOnDate(employee, e)})
    return wagearray.reduce((total, element) => element + total)
  }
  
  function calculatePayroll(employees){
    return employees.reduce((t, e) => t + allWagesFor(e), 0)
  }
  
  function findEmployeeByFirstName(employees, name){
    return employees.find(s => s.firstName === name)
  }
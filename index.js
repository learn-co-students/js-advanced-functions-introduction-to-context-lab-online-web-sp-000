// Your code here
function createEmployeeRecord(employeeArray) {
  let employeeObj = {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employeeObj
}

function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(array => {
    return createEmployeeRecord(array)
  })
}

function createTimeInEvent(employeeObj, dateStamp) {
  let hourDateArray = dateStamp.split(' ')
  let timeInObj = {
    type: "TimeIn",
    hour: parseInt(hourDateArray[1], 10),
    date: hourDateArray[0]
  }
  employeeObj.timeInEvents.push(timeInObj)
  return employeeObj
}

function createTimeOutEvent(employeeObj, dateStamp) {
  let hourDateArray = dateStamp.split(' ')
  let timeOutObj = {
    type: "TimeOut",
    hour: parseInt(hourDateArray[1], 10),
    date: hourDateArray[0]
  }
  employeeObj.timeOutEvents.push(timeOutObj)
  return employeeObj
}

function hoursWorkedOnDate(employeeObj, dateStamp) {
  let timeIn = employeeObj.timeInEvents.find(timeObj => timeObj.date === dateStamp)
  let timeOut = employeeObj.timeOutEvents.find(timeObj => timeObj.date === dateStamp)
  
  let hoursWorked = (timeOut.hour - timeIn.hour) / 100
  return hoursWorked
}

function wagesEarnedOnDate(employeeObj, dateStamp) {
  return employeeObj.payPerHour * hoursWorkedOnDate(employeeObj, dateStamp)
}

function allWagesFor(employeeObj) {
  let dates = employeeObj.timeInEvents.map(e => {return e.date})

  let moneyOwed = dates.reduce(function(memo, date) {
    return memo + wagesEarnedOnDate(employeeObj, date)
  }, 0)

  return moneyOwed
}

function findEmployeeByFirstName(employeeArray, fName) {
  return employeeArray.find(emp => {
    return emp.firstName === fName
  })
}

function calculatePayroll(employeeArray) {
  return employeeArray.reduce((memo, employee) => {
    return memo + allWagesFor(employee)
  }, 0)
}
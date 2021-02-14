function createEmployeeRecord(array) {
  let employee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };

  return employee
}

function createEmployeeRecords(infoArray) {
  let record = infoArray.map(e => createEmployeeRecord(e))
  return record
}

function createTimeInEvent(employee, date) {
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(date.split(' ')[1], 10),
    date: date.split(' ')[0]
  });

  return employee
}

function createTimeOutEvent(employee, date) {
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(date.split(' ')[1], 10),
    date: date.split(' ')[0]
  });

  return employee
}

function hoursWorkedOnDate (employee, date) {
  let clockIn = employee.timeInEvents.find(e => e.date === date)
  let clockOut = employee.timeOutEvents.find(e => e.date === date)
  let totalHours = (clockOut.hour - clockIn.hour ) / 100
  return totalHours
}

function wagesEarnedOnDate (employee, date) {
  let check = hoursWorkedOnDate(employee, date) * (employee.payPerHour)
  return parseFloat(check.toString())
}

let allWagesFor = function(employee) {
  let datesWorked = employee.timeInEvents.map(e => e.date)
  let amountDue = datesWorked.reduce(function(sum, d){
    return sum + wagesEarnedOnDate(employee, d)
  }, 0)
  return amountDue
}

function findEmployeeByFirstName(infoArray, firstName) {
  return infoArray.find(record => record.firstName === firstName)
}

function calculatePayroll(records){
  return records.reduce(function (sum, employee){
    return sum + allWagesFor(employee)
  }, 0)
}

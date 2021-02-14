// Your code here
function createEmployeeRecord(array)
{
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []

  }
}
function createEmployeeRecords(array)
{
  return array.map(record => createEmployeeRecord(record))
}

function createTimeInEvent(employeeRecord, date)
{
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(date.substring(11,16)),
    date: date.substring(0, 10)
  })
  return employeeRecord
}
function createTimeOutEvent(employeeRecord, date)
{
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(date.substring(11,16)),
    date: date.substring(0, 10)
  })
  return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date)
{
  let timeIn = employeeRecord.timeInEvents.find(x => x.date === date).hour
  let timeOut = employeeRecord.timeOutEvents.find(x => x.date === date).hour

  return (timeOut - timeIn)/100
}
function wagesEarnedOnDate(employeeRecord, date)
{
  return hoursWorkedOnDate(employeeRecord, date)*employeeRecord.payPerHour
}
function allWagesFor(employeeRecord)
{
  return employeeRecord.timeInEvents.map(n => n.date).reduce((total, date) => wagesEarnedOnDate(employeeRecord, date) + total, 0)
}
function calculatePayroll(employeeRecords)
{
  return employeeRecords.reduce((total, employee) =>allWagesFor(employee) + total, 0)
}
function findEmployeeByFirstName(employeeRecords, firstName)
{
  return employeeRecords.find(employee => employee.firstName === firstName)
}

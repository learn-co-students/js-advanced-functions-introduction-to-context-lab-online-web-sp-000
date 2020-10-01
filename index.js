// Your code here
function createEmployeeRecord(empInfo){
  return {
    firstName: empInfo[0],
    familyName: empInfo[1],
    title: empInfo[2],
    payPerHour: empInfo[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(empsInfo){
  return empsInfo.map( empInfo => createEmployeeRecord(empInfo))
}

function createTimeInEvent(empRecord, date){
  empRecord.timeInEvents.push(
  {
    type: "TimeIn",
    hour: parseInt(date.split(' ')[1]),
    date: date.split(' ')[0]
  })
  return empRecord
}

function createTimeOutEvent(empRecord, date){
  empRecord.timeOutEvents.push(
  {
    type: "TimeOut",
    hour: parseInt(date.split(' ')[1]),
    date: date.split(' ')[0]
  })
  return empRecord
}

function hoursWorkedOnDate(empRecord, date){
  return (parseInt(empRecord.timeOutEvents.find(timeIn => timeIn.date == date).hour) - parseInt(empRecord.timeInEvents.find(timeIn => timeIn.date == date).hour))/100
}

function wagesEarnedOnDate(empRecord, date){
  return hoursWorkedOnDate(empRecord, date) * empRecord.payPerHour
}

function allWagesFor(empRecord){
   return empRecord.timeInEvents.map(day => day.date).reduce(function(memo, d) { return memo + wagesEarnedOnDate(empRecord, d)}, 0)
}

function findEmployeeByFirstName(employees, firstName){
  return employees.find(employee => employee.firstName == firstName)
}

function calculatePayroll(employees){
  return employees.reduce( function(memo, employee){ return memo + allWagesFor(employee)}, 0)
}


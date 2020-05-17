function createEmployeeRecord(info) {
  return {
    firstName: info[0],
    familyName: info[1],
    title: info[2],
    payPerHour: info[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(info) {
  return info.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, datetime) {
  let time = datetime.toString().split(" ")
  let timeInInfo = {
    type: "TimeIn",
    hour: parseInt(time[1]),
    date: time[0]
  }
  employee.timeInEvents.push(timeInInfo)
  return employee
}

function createTimeOutEvent(employee, datetime) {
  let time = datetime.toString().split(" ")
  let timeOutInfo = {
    type: "TimeOut",
    hour: parseInt(time[1]),
    date: time[0]
  }
  employee.timeOutEvents.push(timeOutInfo)
  return employee
}

function hoursWorkedOnDate(employee, date) {
  let timeIn = employee.timeInEvents.find(e => e.date === date)
  let timeOut = employee.timeOutEvents.find(e => e.date === date)
  return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
  let dates = employee.timeInEvents.map(function(e) {
    return e.date
  })
  return dates.reduce(function(total, date) {
    return wagesEarnedOnDate(employee, date) + total
  }, 0)
}

function findEmployeeByFirstName(records, firstName) {
  return records.find(r => r.firstName === firstName)
}

function calculatePayroll(records) {
  return records.reduce(function(total, employee) {
    return allWagesFor(employee) + total
  }, 0)
}
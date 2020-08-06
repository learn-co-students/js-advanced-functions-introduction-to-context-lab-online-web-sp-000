function createEmployeeRecord(record) {
  const employee = {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  return employee
}

function createEmployeeRecords(records) {
  let empRecords = []
  records.map(record => {
      const employee = {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: [],
        };
        empRecords.push(employee)
      })
      return empRecords
}

function createTimeInEvent(employee, dateTime) {
  const timeIn = {
    type: 'TimeIn',
    date: dateTime.split(' ')[0],
    hour: parseInt(dateTime.split(' ')[1])
  };
  employee.timeInEvents.push(timeIn)
  return employee
}

function createTimeOutEvent(employee, dateTime) {
  const timeOut = {
    type: 'TimeOut',
    date: dateTime.split(' ')[0],
    hour: parseInt(dateTime.split(' ')[1])
  };
  employee.timeOutEvents.push(timeOut)
  return employee
}

function hoursWorkedOnDate(employee, date) {
  let dateIn = employee.timeInEvents.find(e => e.date == date)
  let dateOut = employee.timeOutEvents.find(e => e.date == date)
  let totalHours = dateOut.hour - dateIn.hour
  return totalHours/100
}

function wagesEarnedOnDate(employee, date) {
    let dateIn = employee.timeInEvents.find(e => e.date == date)
  let dateOut = employee.timeOutEvents.find(e => e.date == date)
  let totalHours = dateOut.hour - dateIn.hour
  return totalHours/100 * employee.payPerHour
}

function allWagesFor(employee) {
  let hours = []
  for (let i = 0; i < employee.timeInEvents.length; i++) {
    let hour = employee.timeOutEvents[i].hour - employee.timeInEvents[i].hour
    hours.push(hour/100)
  }
  return hours.reduce((t, e) => t + e) * employee.payPerHour
}

function calculatePayroll(employees) {
  let wages = employees.map(function(employee) {
      let hours = []
      for (let i = 0; i < employee.timeOutEvents.length; i++) {
        let hour = employee.timeOutEvents[i].hour - employee.timeInEvents[i].hour
        hours.push(hour/100)
      }
      return hours.reduce((t, e) => t + e) * employee.payPerHour
  })
  return wages.reduce((t, e) => t + e)
  
}

function findEmployeeByFirstName(employees, name) {
  return employees.find(employee => employee.firstName == name)
}
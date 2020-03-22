function createEmployeeRecord(employee) {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
    }
  }

function createEmployeeRecords(employees) {
  return employees.map(e => createEmployeeRecord(e))
}

function createTimeInEvent(employee, time) {
  let [date, hour] = time.split(' ')

  employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
  })

  return employee
}

function createTimeOutEvent(employee, time) {
  let [date, hour] = time.split(' ')

  employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
  })

  return employee
}

function hoursWorkedOnDate(employee, date) {
  let timeIn = employee.timeInEvents.find(e => e.date === date).hour
  let timeOut = employee.timeOutEvents.find(e => e.date === date).hour
  return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employee, date) {
  let hoursWorked = hoursWorkedOnDate(employee, date)
  return hoursWorked * employee.payPerHour
}

function allWagesFor(employee) {
  let datesWorked = employee.timeInEvents.map(e => {return e.date})
  let wages = datesWorked.map(d => wagesEarnedOnDate(employee, d))
  return wages.reduce( (total, w) => w + total, 0)
}

function calculatePayroll(employees){
  let allWages = employees.map(e => allWagesFor(e))
  return allWages.reduce( (total, w) => w + total, 0)
}

function findEmployeeByFirstName(employees, name){
  return employees.find(e => e.firstName === name)
}

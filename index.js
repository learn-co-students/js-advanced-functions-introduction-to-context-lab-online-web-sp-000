// Your code here
const createEmployeeRecord = arr => {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = arr => {
  return arr.map(a => createEmployeeRecord(a))
}

const createTimeInEvent = (employeeRecord, dateTime) => {
  employeeRecord.timeInEvents.push({
    type: 'TimeIn',
    date: dateTime.split(' ')[0],
    hour: parseInt(dateTime.split(' ')[1])
  })
  return employeeRecord
}

const createTimeOutEvent = (employeeRecord, dateTime) => {
  employeeRecord.timeOutEvents.push({
    type: 'TimeOut',
    date: dateTime.split(' ')[0],
    hour: parseInt(dateTime.split(' ')[1])
  })
  return employeeRecord
}

const hoursWorkedOnDate = (employeeRecord, date) => {
  const timeIn =
    employeeRecord.timeInEvents.find(e => e.date === date).hour / 100
  const timeOut =
    employeeRecord.timeOutEvents.find(e => e.date === date).hour / 100
  return timeOut - timeIn
}

const wagesEarnedOnDate = (employeeRecord, date) => {
  return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

const allWagesFor = employeeRecord => {
  return employeeRecord.timeInEvents
    .map(o => wagesEarnedOnDate(employeeRecord, o.date))
    .reduce((x, y) => x + y)
}

const calculatePayroll = employees => {
  return employees.reduce((m, e) => m + allWagesFor(e), 0)
}

const findEmployeeByFirstName = (employees, name) => {
  return employees.find(e => e.firstName === name)
}

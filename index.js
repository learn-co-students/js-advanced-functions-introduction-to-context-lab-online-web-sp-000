function createEmployeeRecord(data) {
  return {
    firstName: data[0],
    familyName: data[1],
    title: data[2],
    payPerHour: data[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(records) {
  return records.map(createEmployeeRecord)
}

function createTimeInEvent(record, stamp) {
  const dateTime = stamp.split(' ')
  record.timeInEvents.push({
    type: 'TimeIn',
    date: dateTime[0],
    hour: parseInt(dateTime[1])
  })
  return record
}

function createTimeOutEvent(record, stamp) {
  const dateTime = stamp.split(' ')
  record.timeOutEvents.push({
    type: 'TimeOut',
    date: dateTime[0],
    hour: parseInt(dateTime[1])
  })
  return record
}

function hoursWorkedOnDate(record, date) {
  const a = record.timeInEvents.find((item) => { return item.date === date })
  const b = record.timeOutEvents.find((item) => { return item.date === date })
  return parseInt(b.hour - a.hour) / 100
}

function wagesEarnedOnDate(record, date) {
  return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record) {
  const workDays = record.timeInEvents.map((inItem) => {
    return wagesEarnedOnDate(record, inItem.date)
  })
  return workDays.reduce((total, num) => { return total += num })
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((item) => { return item.firstName === firstName })
}

function calculatePayroll(records) {
  const empPay = records.map((record) => { return allWagesFor(record) })
  return empPay.reduce((total, num) => { return total += num })
}

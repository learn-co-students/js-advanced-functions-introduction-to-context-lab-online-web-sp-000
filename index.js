function createEmployeeRecord(array){
  const employee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
  return employee
}

function createEmployeeRecords(records){
  return records.map(record => createEmployeeRecord(record));
}

function createTimeInEvent(record, dateStamp){
  const dateTime = dateStamp.split(' ')
  let inEvent = {
    type: "TimeIn",
    hour: parseInt(dateTime[1]),
    date: dateTime[0],
  }
  record.timeInEvents.push(inEvent);
  return record
}

function createTimeOutEvent(record, dateStamp){
  const dateTime = dateStamp.split(' ');
  let outEvent = {
    type: "TimeOut",
    hour: parseInt(dateTime[1]),
    date: dateTime[0],
  }
  record.timeOutEvents.push(outEvent);
  return record
}

function hoursWorkedOnDate(record, date){
  let timeIn = record.timeInEvents.find(element => element.date === date).hour;
  let timeOut = record.timeOutEvents.find(element => element.date === date).hour;
  let hours = (timeOut - timeIn)/100;
  return hours
}

function wagesEarnedOnDate(record, date){
  return hoursWorkedOnDate(record, date) * record.payPerHour;
}

function allWagesFor(record){
  let payPerDay = record.timeInEvents.map(element => wagesEarnedOnDate(record, element.date))
  let totalWages = payPerDay.reduce((total, wage) => total + wage)
  return totalWages
}

function findEmployeeByFirstName(records, firstName) {
  return records.find(record => record.firstName === firstName)
}

function calculatePayroll(records){
  return records.reduce((sum, record) => sum + allWagesFor(record), 0)
}

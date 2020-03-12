function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeRecords) {
    return employeeRecords.map(eeRecord => createEmployeeRecord(eeRecord))
}

function createTimeInEvent(eeRecord, dateStamp) {
    const dateTimeArr = dateStamp.split(" ");
    const date = dateTimeArr[0];
    const hour = parseInt(dateTimeArr[1], 10);
    const timeInEvent = {
      type: "TimeIn",
      hour,
      date
    }
    eeRecord.timeInEvents.push(timeInEvent)
    return eeRecord
}
  
function createTimeOutEvent(eeRecord, dateStamp) {
    const dateTimeArr = dateStamp.split(" ");
    const date = dateTimeArr[0];
    const hour = parseInt(dateTimeArr[1], 10);
    const timeOutEvent = {
      type: "TimeOut",
      hour,
      date
    }
    eeRecord.timeOutEvents.push(timeOutEvent)
    return eeRecord
}
  
function hoursWorkedOnDate(eeRecord, dateStamp) {
    const timeInHour = eeRecord.timeInEvents.find(e => e.date === dateStamp).hour
    const timeOutHour = eeRecord.timeOutEvents.find(e => e.date === dateStamp).hour
    return (timeOutHour - timeInHour) / 100
}
  
function wagesEarnedOnDate(eeRecord, dateStamp) {
    return hoursWorkedOnDate(eeRecord, dateStamp) * eeRecord.payPerHour
}
  
function allWagesFor(eeRecord) {
    const dates = eeRecord.timeInEvents.map(obj => obj.date)
    const payArr = dates.map(date => wagesEarnedOnDate(eeRecord, date))
    return payArr.reduce((acc, curr) => acc + curr)
}
  
function findEmployeeByFirstName(eeRecordsArr, firstName) {
    return eeRecordsArr.find((ee) => ee.firstName === firstName)
}
  
function calculatePayroll(eeRecordsArr) {
    let eePayrollArr = eeRecordsArr.map(ee => allWagesFor(ee))
    return eePayrollArr.reduce((acc, curr) => acc + curr)
}
// Your code here
function createEmployeeRecord(arr){
  let obj = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return obj
}

function createEmployeeRecords(arr) {
  return arr.map(createEmployeeRecord)
}

function createDateStamp(getType, dateStamp) {
    return {type: getType, date: dateStamp.slice(0,10), hour: parseInt(dateStamp.slice(-4))}
}

function createTimeInEvent(record, dateStamp){
  record.timeInEvents.push(createDateStamp("TimeIn", dateStamp))
  return record
}

function createTimeOutEvent(record, dateStamp) {
  record.timeOutEvents.push(createDateStamp("TimeOut", dateStamp))
  return record
}

function hoursWorkedOnDate(record, date) {
  let timeIn = record.timeInEvents.find((x) => x.date === date).hour
  let timeOut = record.timeOutEvents.find((x) => x.date === date).hour
  return (timeOut - timeIn)/100

}

function wagesEarnedOnDate(record, date) {
  let dailyHours = hoursWorkedOnDate(record, date);
  let pay = record.payPerHour
  return dailyHours * pay
}

function allWagesFor(record) {
  let allPay = record.timeInEvents.map((day) => {return wagesEarnedOnDate(record, day.date)})
  return allPay.reduce((x, y) => x + y)
}

function calculatePayroll(records) {
  let allPay = (records.map((worker) => {return allWagesFor(worker)}))
  return allPay.reduce((x, y) => x + y)
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(x => x.firstName === firstName)
}

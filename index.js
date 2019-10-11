// Your code here
function createEmployeeRecord(employeeArray) {
  return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(recordsArray) {
  return recordsArray.map(employeeArray => createEmployeeRecord(employeeArray))
}

function createTimeInEvent(empRecord, dateStamp) {
  let date = dateStamp.split(' ');
  empRecord.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(date[1]),
    date: date[0]
  });
  return empRecord;
}

function createTimeOutEvent(empRecord, dateStamp) {
  let date = dateStamp.split(' ');
  empRecord.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(date[1]),
    date: date[0]
  });
  return empRecord;
}

function hoursWorkedOnDate(empRecord, date) {
  let timeIn = empRecord.timeInEvents.find(timeEvent => timeEvent.date === date);
  let timeOut = empRecord.timeOutEvents.find(timeEvent => timeEvent.date === date);
  return (timeOut.hour - timeIn.hour)/100;
}

function wagesEarnedOnDate(empRecord, date) {
  const hoursWorked = hoursWorkedOnDate(empRecord, date);
  return hoursWorked * empRecord.payPerHour;
}

function allWagesFor(empRecord) {
  let dates = empRecord.timeInEvents.map(time => time.date);
  return dates.reduce((total, date) => total + wagesEarnedOnDate(empRecord, date), 0);
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(empRecord => empRecord.firstName === firstName);
}

function calculatePayroll (srcArray) {
  return srcArray.reduce((total, empRecord) => total + allWagesFor(empRecord), 0);
}

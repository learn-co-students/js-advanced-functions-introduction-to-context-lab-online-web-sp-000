// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
  "firstName": firstName,
  "familyName": familyName,
  "title": title,
  "payPerHour": payPerHour,
  "timeInEvents": [],
  "timeOutEvents": []
  }
}

function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord)
}
// date format "YYYY-MM-DD HHMM"
function createTimeInEvent(record, date) {
  let timeInEvent = {
      type: "TimeIn",
      hour: parseInt(date.split(" ")[1]),
      date: date.split(" ")[0]
  }
  record.timeInEvents.push(timeInEvent)
  return record
}

function createTimeOutEvent(record, date) {
  let timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(date.split(" ")[1]),
      date: date.split(" ")[0]
  }
  record.timeOutEvents.push(timeOutEvent)
  return record
}

function hoursWorkedOnDate(employeeRecord, date) {
  // calculates that the employee worked 2 hours
  // find employee, date, subtracts
  const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
  const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
  const hoursWorked = (timeOut.hour - timeIn.hour)/ 100;
  return hoursWorked;
}

function wagesEarnedOnDate(record, date) {
  // calculates that the employee earned 54 dollars
  let hoursWorked = hoursWorkedOnDate(record, date);
  let pay = record.payPerHour * hoursWorked;
  return pay;
}

function findEmployeeByFirstName(employeeRecords, firstName) {
  // finds "Loki"
  return employeeRecords.find(x => x.firstName === firstName);

}

function calculatePayroll(employeeRecords) {
  // calculates that the employees earned 770 dollars
  // correctly sums the payroll burden to $11,880 when passed an array of employee records
  const totalPay = employeeRecords.reduce(((total, record) => total + allWagesFor(record)),0);
  return totalPay;
}

function allWagesFor(employeeRecord) {
  // aggregates all the dates' wages and adds them together
  // calculates that the employee earned 378 dollars
  const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
  const wagesOnDatesWorked = datesWorked.map(date => wagesEarnedOnDate(employeeRecord, date));
  const totalWages = wagesOnDatesWorked.reduce(((total, earning) => total + earning),0);
  return totalWages;
}

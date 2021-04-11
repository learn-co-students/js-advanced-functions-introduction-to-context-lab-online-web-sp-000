// Your code here
function createEmployeeRecord(array) {
  let employee = {};

  employee.firstName = array[0];
  employee.familyName = array[1];
  employee.title = array[2];
  employee.payPerHour = array[3];
  employee.timeInEvents = [];
  employee.timeOutEvents = [];

  return employee;
}

function createEmployeeRecords(array) {
  return array.map(arr => createEmployeeRecord(arr));
}

function createTimeInEvent(employee, datetime) {
  let [date, hour] = datetime.split(" ");
  let record = {};

  record.type = "TimeIn";
  record.hour = parseInt(hour, 10);
  record.date = date;
  employee.timeInEvents.push(record);

  return employee;
}

function createTimeOutEvent(employee, datetime) {
  let [date, hour] = datetime.split(" ");
  let record = {};

  record.type = "TimeOut";
  record.hour = parseInt(hour, 10);
  record.date = date;
  employee.timeOutEvents.push(record);

  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let timeIn = employee.timeInEvents.find(record => record.date === date);
  let timeOut = employee.timeOutEvents.find(record => record.date === date);

  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  let pay = employee.payPerHour;
  let hours = hoursWorkedOnDate(employee, date);

  return pay * hours;
}

function allWagesFor(employee) {
  let allDates = employee.timeInEvents.map(shift => shift.date);
  let totalPay = allDates.reduce(function(total, date){
    return total + wagesEarnedOnDate(employee, date)}, 0);

  return totalPay;
}

function findEmployeeByFirstName(array, name) {
  return array.find(employee => employee.firstName === name);
}

function calculatePayroll(array) {
  return array.reduce(function(totalPay, employee) {
    return totalPay + allWagesFor(employee)}, 0)
}
function createEmployeeRecord([firstName, familyName, title, payRate]) {
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payRate,
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(array) {
  return array.map(element => createEmployeeRecord(element));
}

function createTimeInEvent(employee, dateStamp) {
  const [date, time] = dateStamp.split(' ');
  employee.timeInEvents.push({date: date, hour: parseInt(time), type: "TimeIn"});
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  const [date, time] = dateStamp.split(' ');
  employee.timeOutEvents.push({date: date, hour: parseInt(time), type: "TimeOut"});
  return employee;
}

function hoursWorkedOnDate(employee, dateStamp) {
  let timeIn = employee.timeInEvents.find(event => event.date === dateStamp);
  let timeOut = employee.timeOutEvents.find(event => event.date === dateStamp);
  return ((timeOut.hour - timeIn.hour)/100);
}

function wagesEarnedOnDate(employee, dateStamp) {
  return (hoursWorkedOnDate(employee, dateStamp) * employee.payPerHour);
}

function allWagesFor(employee) {
  return employee.timeInEvents.reduce((totalPay, day) => {totalPay + wagesEarnedOnDate(employee, day.date)}, 0);
}

function calculatePayroll(employees) {
  
}

function findEmployeeByFirstName(employees, firstName) {
  return employees.find(employee => employee.firstName === firstName);
}

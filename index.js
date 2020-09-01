// Your code here
function createEmployeeRecord(employeeArray) {
  const employee = {};
  employee.firstName = employeeArray[0];
  employee.familyName = employeeArray[1];
  employee.title = employeeArray[2];
  employee.payPerHour = employeeArray[3];
  employee.timeInEvents = [];
  employee.timeOutEvents = [];
  return employee;
}

function createEmployeeRecords(employeeArrays) {
  const employees = employeeArrays.map((employeeArray) =>
    createEmployeeRecord(employeeArray)
  );
  return employees;
}

function createTimeInEvent(employee, dateStamp) {
  const dateTime = dateStamp.split(" ");
  const timeInEvent = {
    type: "TimeIn",
    hour: parseInt(dateTime[1]),
    date: dateTime[0],
  };
  employee.timeInEvents.push(timeInEvent);
  return employee;
}
function createTimeOutEvent(employee, dateStamp) {
  const dateTime = dateStamp.split(" ");
  const timeOutEvent = {
    type: "TimeOut",
    hour: parseInt(dateTime[1]),
    date: dateTime[0],
  };
  employee.timeOutEvents.push(timeOutEvent);
  return employee;
}
function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find((time) => time.date === date).hour;
  const timeOut = employee.timeOutEvents.find((time) => time.date === date)
    .hour;
  const hours = (timeOut - timeIn) / 100;
  return hours;
}
function wagesEarnedOnDate(employee, date) {
  const hours = hoursWorkedOnDate(employee, date);
  const wages = hours * employee.payPerHour;
  return wages;
}
function allWagesFor(employee) {
  const dates = employee.timeInEvents.map((event) => event.date); // go through timeInEvents, get all dates
  const wages = dates.map((date) => wagesEarnedOnDate(employee, date));
  const totalWages = wages.reduce((acc, cur) => acc + cur, 0);
  return totalWages;
}

function findEmployeeByFirstName(srcArray, firstName) {
  const employee = srcArray.find(
    (employee) => employee.firstName === firstName
  );
  return employee;
}

function calculatePayroll(employees) {
  //go through each employee and do allWagesFor on each
  const employeeWages = employees.map((employee) => allWagesFor(employee));
  const payroll = employeeWages.reduce((acc, cur) => acc + cur, 0);
  return payroll;
}

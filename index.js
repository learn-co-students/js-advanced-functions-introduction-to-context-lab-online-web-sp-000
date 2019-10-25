function createEmployeeRecord(employee) {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  };
};

function createEmployeeRecords(employees) {
  return employees.map(employee => createEmployeeRecord(employee));
};

function createTimeInEvent(employee, timeIn) {
  const dateTime = timeIn.split(' ');
  employee.timeInEvents.push({
    type: "TimeIn",
    date: dateTime[0],
    hour: parseInt(dateTime[1], 10)
  });
  return employee;
};

function createTimeOutEvent(employee, timeOut) {
  const dateTime = timeOut.split(' ');
  employee.timeOutEvents.push({
    type: "TimeOut",
    date: dateTime[0],
    hour: parseInt(dateTime[1], 10)
  });
  return employee;
};

function hoursWorkedOnDate(employee, date) {
  return (employee.timeOutEvents.find(event => event.date === date).hour - employee.timeInEvents.find(event => event.date === date).hour)/100;
};

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
};

function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, event) => total += wagesEarnedOnDate(employee, event.date), 0);
};

function calculatePayroll(employees) {
  return employees.reduce((total, employee) => total += allWagesFor(employee), 0);
};

function findEmployeeByFirstName(employees, firstName) {
  return employees.find(employee => employee.firstName === firstName);
};
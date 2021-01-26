// Your code here
function createEmployeeRecord(row) {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(employeeRowData) {
  return employeeRowData.map(row => {
    return createEmployeeRecord(row);
  });
}

function createTimeInEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ');

  employee.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date
  });

  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ');

  employee.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour, 10),
    date
  });

  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let inEvent = employee.timeInEvents.find(e => {
    return e.date === date;
  });

  let outEvent = employee.timeOutEvents.find(e => {
    return e.date === date;
  });

  return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  let rawWage = hoursWorkedOnDate(employee, date) * employee.payPerHour;
  return parseFloat(rawWage.toString());
}

function allWagesFor(employee) {
  let eligibleDates = employee.timeInEvents.map(e => {
    return e.date;
  });

  let payable = eligibleDates.reduce((memo, d) => {
    return memo + wagesEarnedOnDate(employee, d);
  }, 0);

  return payable;
}

function findEmployeeByFirstName(employees, firstName) {
  return employees.find(employee => {
    return employee.firstName === firstName;
  });
}

function calculatePayroll(employees) {
  return employees.reduce((memo, employee) => {
    return memo + allWagesFor(employee);
  }, 0);
}
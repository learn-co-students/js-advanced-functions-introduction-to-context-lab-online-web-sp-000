// Your code here
function createEmployeeRecord(employee) {
  const record = {
    "firstName": employee[0],
    "familyName": employee[1],
    "title": employee[2],
    "payPerHour": employee[3],
    "timeInEvents": [],
    "timeOutEvents": []
  };
  return record
};

function createEmployeeRecords(employees) {
  return employees.map(x => createEmployeeRecord(x));
};

function createTimeInEvent(employee, time){
  let timeIn = employee.timeInEvents.unshift({
    "type": "TimeIn",
    "date": time.split(' ')[0],
    "hour": parseInt(time.split(' ')[1])
  });
  return employee
};

function createTimeOutEvent(employee, time){
  let timeOut = employee.timeOutEvents.unshift({
    "type": "TimeOut",
    "date": time.split(' ')[0],
    "hour": parseInt(time.split(' ')[1])
  });
  return employee
};

function hoursWorkedOnDate(employee, day) {
  let timeIn = employee.timeInEvents.find(x => x.date === day);
  let timeOut = employee.timeOutEvents.find(x => x.date === day);
  return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(employee, day) {
  return hoursWorkedOnDate(employee, day) * employee.payPerHour;
};

function allWagesFor(employee) {
  let dates = employee.timeInEvents.map(x => x.date);
  let wages = dates.map(x => wagesEarnedOnDate(employee, x));
  return wages.reduce((total, value) => total + value);
}

function calculatePayroll(employees) {
  return employees.reduce((total, employee) => total + allWagesFor(employee), 0)
}

function findEmployeeByFirstName(employees, name) {
  return employees.find(x => x.firstName === name)
}

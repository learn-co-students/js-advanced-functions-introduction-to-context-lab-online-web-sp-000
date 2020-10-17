// Your code here
function createEmployeeRecord(array) {
  return Object.assign({}, array, {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  });
}

function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(array => createEmployeeRecord(array));
}

function createTimeInEvent(employee, dateStamp) {
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(dateStamp.split(' ')[1]),
    date: dateStamp.split(' ')[0],
  });
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateStamp.split(' ')[1]),
    date: dateStamp.split(' ')[0],
  });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let timeIn = employee.timeInEvents.find(timeIn => timeIn.date === date);
  let timeOut = employee.timeOutEvents.find(timeOut => timeOut.date === date);
  return (parseInt(timeOut.hour - timeIn.hour)) / 100;
}

function wagesEarnedOnDate(employee, date) {
  return employee.payPerHour * hoursWorkedOnDate(employee, date);
}

function allWagesFor(employee) {
  let daysWorked = employee.timeInEvents.map((timeIn) => {
    return wagesEarnedOnDate(employee, timeIn.date);
  });
  return daysWorked.reduce((total, day) => total += day);
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll(employees) {
  return employees.reduce((total, employee) => {
    return total + allWagesFor(employee);
  }, 0);
}
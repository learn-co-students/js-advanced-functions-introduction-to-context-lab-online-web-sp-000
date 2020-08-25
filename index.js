// Your code here
const e1 = { firstName: "Chris", familyName: "Kay", title: "Engineer", payPerHour: 100, timeInEvents: [], timeOutEvents: [] };
createTimeInEvent(e1, "2020-08-15 1200")
createTimeInEvent(e1, "2020-08-16 1200")
createTimeInEvent(e1, "2020-08-17 1200")
createTimeInEvent(e1, "2020-08-18 1200")
createTimeOutEvent(e1, "2020-08-15 1500")
createTimeOutEvent(e1, "2020-08-16 1500")
createTimeOutEvent(e1, "2020-08-17 1500")
createTimeOutEvent(e1, "2020-08-18 1500")

function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(array) {
  let newArray = array.map(function(el) {
    return createEmployeeRecord(el)
  })
  return newArray;
}

function createTimeInEvent(employee, dateStamp) {
  let d = dateStamp.split(' ');
  let hour = d[1];
  let date = d[0];
  employee.timeInEvents.push({type: "TimeIn", hour: parseInt(hour), date: date})
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  let d = dateStamp.split(' ');
  let hour = d[1];
  let date = d[0];
  employee.timeOutEvents.push({type: "TimeOut", hour: parseInt(hour), date: date})
  return employee;
}

function hoursWorkedOnDate(employee, dateStamp) {
  let timeIn = employee.timeInEvents.find(x => x.date === dateStamp );
  let timeOut = employee.timeOutEvents.find(x => x.date === dateStamp);
  let hoursWorked = timeOut.hour - timeIn.hour;
  return hoursWorked/100;
}

function wagesEarnedOnDate(employee, dateStamp) {
  let hours = hoursWorkedOnDate(employee, dateStamp);
  let owed = hours * employee.payPerHour
  return owed
}

function allWagesFor(employee) {
  return employee.timeInEvents.reduce(function(acc, curr) {
    return acc + wagesEarnedOnDate(employee, curr.date)
  }, 0)
}

function calculatePayroll(employees) {
  return employees.reduce(function(acc, curr) {
    return acc + allWagesFor(curr)
  }, 0)
}

function findEmployeeByFirstName(employees, firstName) {
  return employees.find(x => x.firstName === firstName)
}



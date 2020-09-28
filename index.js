// populates a record from an Array
// 1) populates a firstName field from the 0th element
// 2) populates a familyName field from the 1th element
// 3) populates a title field from the 2th element
// 4) populates a payPerHour field from the 3th element
// 5) initializes a field, timeInEvents, to hold an empty Array
// 6) initializes a field, timeOutEvents, to hold an empty Array

function createEmployeeRecord(employeeArray) {
  let employee = {}

  employee.firstName = employeeArray[0];
  employee.familyName = employeeArray[1];
  employee.title = employeeArray[2];
  employee.payPerHour = employeeArray[3];
  employee.timeInEvents = [];
  employee.timeOutEvents = [];

  return employee;
}

// 1) creates two records
// 2) correctly assigns the first names
// 3) creates more than 2 records
function createEmployeeRecords(employeeRecordsArray){
  return employeeRecordsArray.map(person => {
    return createEmployeeRecord(person);
  })
}

function createTimeInEvent(obj, date) {
  obj.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(date.split(' ')[1]),
    date: date.split(' ')[0]
  })
  return obj;
}

function createTimeOutEvent(obj, date) {
  obj.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(date.split(' ')[1]),
    date: date.split(' ')[0]
  })
  return obj;
}

// calculates hours worked given an employee object and a date
function hoursWorkedOnDate(obj, date) {
  let inWork = obj.timeInEvents.find(e => e.date === date);
  let outWork = obj.timeOutEvents.find(e => e.date === date);

  return (outWork.hour - inWork.hour) / 100;
}

// multiplies the hours worked by the employee's rate per hour
function wagesEarnedOnDate(obj, date) {
  return hoursWorkedOnDate(obj, date) * parseInt(obj.payPerHour);
}

// aggregates all the dates' wages and adds them together
function allWagesFor(obj) {
  let datesWorked = obj.timeInEvents.map(e => e.date);

  return datesWorked.reduce((accumulator, date) => accumulator + wagesEarnedOnDate(obj, date), 0);
}

function calculatePayroll(array) {
  return array.reduce(function(accumulator, employee) {
    return accumulator + allWagesFor(employee);
  }, 0);
}

function findEmployeeByFirstName(array, empName) {
 return array.find(e => e.firstName === empName);
}

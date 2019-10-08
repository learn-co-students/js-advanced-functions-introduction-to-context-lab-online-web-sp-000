import { EPERM } from "constants";

// Your code here
function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(employeeArray) {
  return employeeArray.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employee, timestamp) {
  let time = timestamp.split(" ")
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(time[1]),
    date: time[0]
  });
  return employee;
}

function createTimeOutEvent(employee, timestamp) {
  let time = timestamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(time[1]),
    date: time[0]
  });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let timeIn = employee.timeInEvents.find(obj => obj.date === date);
  let timeOut = employee.timeOutEvents.find(obj => obj.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  const hours = hoursWorkedOnDate(employee, date);
  return hours * employee.payPerHour;
}

function allWagesFor(employee) {
  let dates = employee.timeInEvents.map(time => {
    return time.date;
  });

  return dates.reduce((total, day) => total + wagesEarnedOnDate(employee, day), 0);
}

function findEmployeeByFirstName(employeeArray, firstName) {
  return employeeArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll (employeeArray) {
  return employeeArray.reduce((total, employee) => total + allWagesFor(employee), 0);
}
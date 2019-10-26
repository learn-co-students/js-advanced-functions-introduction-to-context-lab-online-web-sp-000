// Your code here

function createEmployeeRecord(emp) {
  let employeeRecord = {
    firstName: emp[0],
    familyName: emp[1], 
    title: emp[2], 
    payPerHour: emp[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  
  return employeeRecord;
}

function createEmployeeRecords(empArray) {
  let employeeRecords = []
  for (let i = 0; i < empArray.length; i++) {
    let emp = empArray[i];
    employeeRecords.push(createEmployeeRecord(emp));
  }
  return employeeRecords;
}

function createTimeEvent(emp, dateTime, type) {
  let date = dateTime.split(' ')[0];
  let hour = parseInt(dateTime.split(' ')[1]);
  let punch = {
    type: type, 
    hour: hour, 
    date: date
  };
  if (type === 'TimeIn') {
    emp.timeInEvents.push(punch);
  } else {
    emp.timeOutEvents.push(punch);
  }
  return emp;
}

function createTimeInEvent(emp, dateTime) {
  return createTimeEvent(emp, dateTime, 'TimeIn');
}

function createTimeOutEvent(emp, dateTime) {
  return createTimeEvent(emp, dateTime, 'TimeOut');
}

function hoursWorkedOnDate(emp, date) {
  let startTime = parseInt(emp.timeInEvents.find(punch => punch.date === date).hour)/100;
  let endTime = parseInt(emp.timeOutEvents.find(punch => punch.date === date).hour)/100;
  return endTime - startTime;
}

function wagesEarnedOnDate(emp, date) {
  let hours = hoursWorkedOnDate(emp, date);
  return emp.payPerHour * hours;
}

function allWagesFor(emp) {
  let dates = emp.timeInEvents.map(t => t.date);
  return dates.reduce((r, date) => {return r + wagesEarnedOnDate(emp, date)}, 0);
}

function findEmployeeByFirstName(empRecords, name) {
  return empRecords.find(emp => emp.firstName === name);
}

function calculatePayroll(empRecords) {
  return empRecords.reduce((total, emp) => {return total + allWagesFor(emp)}, 0);
}
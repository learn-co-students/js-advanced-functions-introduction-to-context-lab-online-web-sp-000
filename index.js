// Your code here

function createEmployeeRecord(record) {
  let employee = {};
   employee.firstName = record[0];
   employee.familyName = record[1];
   employee.title = record[2];
   employee.payPerHour = record[3];
   employee.timeInEvents = [];
   employee.timeOutEvents = [];
  return employee
};

function createEmployeeRecords(records) {
  return records.map(createEmployeeRecord);
};

function createTimeInEvent(employee, timeIn) {
  let newEvent = {type: "TimeIn", hour: parseInt(timeIn.substring(11, 15)), date: timeIn.substring(0,10)}
    employee.timeInEvents.push(newEvent)
    return employee
};

function createTimeOutEvent(employee, timeOut) {
  let newEvent = {type: "TimeOut", hour: parseInt(timeOut.substring(11, 15)), date: timeOut.substring(0,10)}
    employee.timeOutEvents.push(newEvent)
    return employee
}

function hoursWorkedOnDate(employee, date) {
  let punchIn = employee.timeInEvents.filter(n => {
     return n.date === date})
  let punchOut = employee.timeOutEvents.filter(n => {
     return n.date === date})
    let hoursWorked = punchOut[0].hour - punchIn[0].hour
     return hoursWorked/100
  };

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour
}


function allWagesFor(employee){
  let allWages = 0
  for (const evt of employee.timeOutEvents){
     allWages = wagesEarnedOnDate(employee, evt.date) + allWages
  }
  return allWages
};

function calculatePayroll(employees) {
  let payroll = 0
  for (const employee of employees) {
    payroll = allWagesFor(employee) + payroll;
  }
  return payroll;
};

function findEmployeeByFirstName(employeesList, name) {
   return employeesList.find(function(employee) {
     return employee.firstName === name
  })
}

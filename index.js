// Your code here

function createEmployeeRecord(eData){
  let record = {};
  record.firstName = eData[0];
  record.familyName = eData[1];
  record.title = eData[2];
  record.payPerHour = eData[3];
  record.timeInEvents = [];
  record.timeOutEvents = [];
  return record;
}

function createEmployeeRecords(newRecords){
  return newRecords.map(function(item){
    return createEmployeeRecord(item);
  });
}

function createTimeInEvent(employee, dateTime){
  let newEvent = {};
  let date = dateTime.split(" ");
  newEvent.type = "TimeIn";
  newEvent.hour = parseInt(date[1]);
  newEvent.date = date[0];
  employee.timeInEvents.push(newEvent);
  return employee;
}

function createTimeOutEvent(employee, dateTime){
  let newEvent = {};
  let date = dateTime.split(" ");
  newEvent.type = "TimeOut";
  newEvent.hour = parseInt(date[1]);
  newEvent.date = date[0];
  employee.timeOutEvents.push(newEvent);
  return employee;
}

function hoursWorkedOnDate(employee, date){
  let timeIn = employee.timeInEvents.find(e => e.date === date).hour;
  let timeOut = employee.timeOutEvents.find(e => e.date === date).hour;
  return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(employee, date){
  return employee.payPerHour * hoursWorkedOnDate(employee, date);
}

function allWagesFor(employee){
  let times = employee.timeInEvents;
  let total = 0;
  let allWages = times.reduce(function(current){
    console.log("date is" + current.date);
    return wagesEarnedOnDate(employee, current.date);
  })
  console.log("allWages is " + allWages);
}

function calculatePayroll(employees){
  let payroll = 0;
  employees.forEach(function(e){
    payroll += allWagesFor(e);
  })
  return payroll;
}
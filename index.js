// Your code here

function createEmployeeRecord(array){
  let keys = ["firstName", "familyName", "title", "payPerHour"]
  let employee = {};

  array.map(function(e,i){employee[keys[i]] = e});

  employee["timeInEvents"] = [];
  employee["timeOutEvents"] = [];
  return employee;
}


function createEmployeeRecords(array){
  return array.map(x => createEmployeeRecord(x));
}

function createTimeInEvent(record, date){
 return createTimeEvent(record, date, "TimeIn", record.timeInEvents);
}

function createTimeOutEvent(record, date){
 return createTimeEvent(record, date, "TimeOut", record.timeOutEvents);
}

function createTimeEvent(record, date, type, fcn){
  let timeArray = date.split(" ");
  let day = timeArray[0];
  let hour = timeArray[1];
  
  //fcn is time event in/out
  fcn.push({"type": type,"date": day, "hour": parseInt(hour)});
  
  return record;
}

function hoursWorkedOnDate(record, date){
  let hours = (record.timeOutEvents.find(x => x.date === date).hour - record.timeInEvents.find(x => x.date === date).hour)/100;
  return hours;
}

function wagesEarnedOnDate(record, date){
  return hoursWorkedOnDate(record, date) * record.payPerHour;
}

function allWagesFor(record){
    let wages = 0;
  let dates = [];
  
  //extracts all dates.
  record.timeInEvents.map(x => dates.push(x.date));
  
  //for each date, calc wage.
  dates.forEach(date => {wages = wages + wagesEarnedOnDate(record, date)})
  
  return wages;
  
}


function calculatePayroll(employees){
  let payroll = 0;
  employees.forEach(x => {payroll = payroll + allWagesFor(x)});
  return payroll;
}

function findEmployeeByFirstName(allRecords, name){
  //let loki = findEmployeeByFirstName(emps, "Loki")

  let record = allRecords.find(x => x.firstName = name);
  return record;
}





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
  
  fcn.push({"type": type,"date": day, "hour": parseInt(hour)});
  
  return record;
}


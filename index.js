function createEmployeeRecord(arr){
  let record = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [], 
    timeOutEvents: []
  }
  return record;
}

function createEmployeeRecords(arr){
  return arr.map(createEmployeeRecord);
}

function dateStamper(time, dateStamp){
  return {type: time, date: dateStamp.substring(0, 10), hour: parseInt(dateStamp.slice(-4))}
}

function createTimeInEvent(record, dateStamp){
  record.timeInEvents.push(dateStamper('TimeIn', dateStamp));
  return record;
}

function createTimeOutEvent(record, dateStamp){
  record.timeOutEvents.push(dateStamper('TimeOut', dateStamp));
  return record;
}

function hoursWorkedOnDate(record, workDate){
  let timeIn = record.timeInEvents.find(event => event.date === workDate).hour;
  let timeOut = record.timeOutEvents.find(event => event.date === workDate).hour;
  return (timeOut - timeIn)/100;
}

function wagesEarnedOnDate(record, workDate){
  const money = record.payPerHour;
  return money * hoursWorkedOnDate(record, workDate);
}

function allWagesFor(record){
  let allDates = record.timeInEvents.map(day => wagesEarnedOnDate(record, day.date));
  return allDates.reduce((total, money) => money + total);
}

function calculatePayroll(records){
  let allWages = records.map(record => allWagesFor(record));
  return allWages.reduce((total, wage) => wage + total);
}

function findEmployeeByFirstName(records, name){
  return records.find(employee => employee.firstName === name);
}

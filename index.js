// Your code here
function createEmployeeRecord(record) {
  const employeeRecord = {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  return employeeRecord;
}

function createEmployeeRecords(employeeRecordsArray) {
  return employeeRecordsArray.map(array => {
    return createEmployeeRecord(array);
  });
}

function createTimeInEvent(employeeRecord, dateStamp) {
  let stamp = dateStamp.split(' ');
  let date = stamp[0], hour = stamp[1]; 
  // let [date, hour] = dateStamp.split(' ');
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
  });
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  let [date, hour] = dateStamp.split(' ');

  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  });
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find(event => {
    return event.date === date;
  });

  const timeOutEvent = employeeRecord.timeOutEvents.find(event => {
    return event.date === date;
  });

  return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
  const totalHours = hoursWorkedOnDate(employeeRecord, date);
  return employeeRecord.payPerHour * totalHours;
}

function allWagesFor(employeeRecord) {
  let datesWorked = employeeRecord.timeOutEvents.map(event => {
    return event.date;
  });
  let wagesPayable = datesWorked.reduce(function(accumulator, date) {
    return accumulator + wagesEarnedOnDate(employeeRecord, date);
  }, 0);

  return wagesPayable;
}
function findEmployeeByFirstName(employeeRecords, firstName) {
  return employeeRecords.find(record => {
    return record.firstName === firstName;
  });
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce(function(accumulator, record) {
    return accumulator + allWagesFor(record);
  }, 0);
}



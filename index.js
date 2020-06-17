// Your code here
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(employees) {
  let records = [];
  for (let i = 0; i < employees.length; i++) {
    records = [...records, createEmployeeRecord(employees[i])];
  }
  return records;
}

function createTimeInEvent(employeeRecord, dateTime) {
  let timeInObj = {
    type: "TimeIn",
    date: dateTime.split(" ")[0],
    hour: parseInt(dateTime.split(' ')[1], 10)
  };
  employeeRecord.timeInEvents = [...employeeRecord.timeInEvents, timeInObj];
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTime) {
  let timeOutObj = {
    type: "TimeOut",
    date: dateTime.split(" ")[0],
    hour: parseInt(dateTime.split(' ')[1], 10)
  };
  employeeRecord.timeOutEvents = [...employeeRecord.timeOutEvents, timeOutObj];
  return employeeRecord;
}

function hoursWorkedOnDate(record, dateTime) {
  let hoursWorked;

  for (let i = 0; i < record.timeInEvents.length; i++) {
    if (record.timeInEvents[i].date === dateTime.split(' ')[0]) {
      hoursWorked = (record.timeOutEvents[i].hour - record.timeInEvents[i].hour) / 100;
    }
  }
  return hoursWorked;
}

function wagesEarnedOnDate(record, dateTime) {
  const hours = hoursWorkedOnDate(record, dateTime);
  return hours * record.payPerHour;
}

function allWagesFor(record) {
  let wages = 0;
  for (let i = 0; i < record.timeOutEvents.length; i++) {
    wages += wagesEarnedOnDate(record, `${record.timeOutEvents[i].date} ${record.timeOutEvents[i].hour}`);
  }
  return wages;
}

function calculatePayroll(records) {
  let total = 0;
  for (let i = 0; i < records.length; i++) {
    total += allWagesFor(records[i]);
  }
  return total;
}

function findEmployeeByFirstName(records, name) {
  let employee;
  for (let i = 0; i < records.length; i++) {
    if (records[i].firstName === name) {
      employee = records[i];
    }
  }
  return employee;
}

// @ts-check

function createEmployeeRecord(employeeArray) {
  let employee = {};
  employee.firstName = employeeArray[0];
  employee.familyName = employeeArray[1];
  employee.title = employeeArray[2];
  employee.payPerHour = employeeArray[3];
  employee.timeInEvents = [];
  employee.timeOutEvents = [];
  return employee
}

function createEmployeeRecords(multEmpArray) {
  const employeesArray = multEmpArray.map(function(employee) {
    return createEmployeeRecord(employee);
  })
  return employeesArray
}

function createTimeInEvent(employeeRecord, timeInEvent) {
  const eventDetails = timeInEvent.split(' ');
  const newEvent = {};
  newEvent.type = "TimeIn";
  newEvent.date = eventDetails[0];
  newEvent.hour = parseInt(eventDetails[1], 10);
  employeeRecord.timeInEvents.push(newEvent);
  return employeeRecord
}

function createTimeOutEvent(employeeRecord, timeOutEvent) {
  const eventDetails = timeOutEvent.split(' ');
  const newEvent = {};
  newEvent.type = "TimeOut";
  newEvent.date = eventDetails[0];
  newEvent.hour = parseInt(eventDetails[1], 10);
  employeeRecord.timeOutEvents.push(newEvent);
  return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeIn= employeeRecord.timeInEvents.find(event => {
    return event.date === date
  }).hour;

  const timeOut = employeeRecord.timeOutEvents.find(event => {
    return event.date === date
  }).hour;

  const stringTime = String(timeOut - timeIn).slice(0, -2);

  return parseInt(stringTime, 10)
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hours = hoursWorkedOnDate(employeeRecord, date);
  return employeeRecord.payPerHour * hours
}

function allWagesFor(employeeRecord) {
  // const datesWorked = [];
  // employeeRecord.TimeInEvents.forEach(event => {
  //   datesWorked.push(event.date);
  // })

  const datesWorked = employeeRecord.timeInEvents.map(event => {
    return event.date;
  })
  const totalWagesArray = datesWorked.map(date => {
    return wagesEarnedOnDate(employeeRecord, date)
  })

  return totalWagesArray.reduce( (runningTotal, currentWage) => {
    return runningTotal + currentWage
  }, 0)

  // datesWorked.reduce( (total, currDate) => {
  //   return total +
  // }, 0)

  // let aggregate = 0;
  // datesWorked.forEach(date => {
  //   aggregate += wagesEarnedOnDate(employeeRecord, date)
  // })

  // return aggregate
}

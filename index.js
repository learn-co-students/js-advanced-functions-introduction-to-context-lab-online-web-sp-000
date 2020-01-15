// Your code here
function createEmployeeRecord(inputFields) {
  const record = {}
    record.firstName = inputFields["0"]
    record.familyName = inputFields["1"]
    record.title = inputFields["2"]
    record.payPerHour = inputFields["3"]
    record.timeInEvents = []
    record.timeOutEvents = []
  return record
}


function createEmployeeRecords(inputArray) {
 return inputArray.map(function(inputSet){
    return createEmployeeRecord(inputSet);
  });
}


// A date stamp ("YYYY-MM-DD HHMM")
function createTimeInEvent(employeeRecord, dateStamp) {
  const timeInObject = {}
  timeInObject.type = "TimeIn"
  timeInObject.date = dateStamp.split(' ')[0]
  timeInObject.hour = parseInt(dateStamp.split(' ')[1])

  employeeRecord.timeInEvents.push(timeInObject)
  // employeeRecord.timeInEvents = dateStamp
  return employeeRecord
}

// A date stamp ("YYYY-MM-DD HHMM")
function createTimeOutEvent(employeeRecord, dateStamp) {
  const timeOutObject = {}
  timeOutObject.type = "TimeOut"
  timeOutObject.date = dateStamp.split(' ')[0]
  timeOutObject.hour = parseInt(dateStamp.split(' ')[1])

  employeeRecord.timeOutEvents.push(timeOutObject)
  // employeeRecord.timeInEvents = dateStamp
  return employeeRecord
}


function hoursWorkedOnDate(employeeRecord, inputDate) {
  const selectedHourStart = employeeRecord.timeInEvents.find( function(event) {
    if (event.date === inputDate){
      return true;
    }
  });

  const selectedHourEnd = employeeRecord.timeOutEvents.find( function(event) {
    if (event.date === inputDate){
      return true;
    }
  });

  const hoursWorked = (selectedHourEnd.hour - selectedHourStart.hour)/100
  return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, inputDate) {
  return hoursWorkedOnDate(employeeRecord, inputDate)*employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
  let totalHours = employeeRecord.timeInEvents.map(function(timeEvent) {
    return timeEvent.date
  })

  let totalPayable = totalHours.reduce(function(initialHours, specifiedDate) {
    return initialHours + wagesEarnedOnDate(employeeRecord, specifiedDate);
  }, 0);

  return totalPayable;
}

function findEmployeeByFirstName(srceArray, firstName) {
  return srceArray.find(function(record){
    if(record.firstName === firstName){
      return record;
    }
  })
}

function calculatePayroll(employees) {
  return employees.reduce(function(initialPayroll, employee) {
    return initialPayroll + allWagesFor(employee);
  }, 0);
}
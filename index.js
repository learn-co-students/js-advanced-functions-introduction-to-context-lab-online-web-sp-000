// Populates a record from an array
const createEmployeeRecord = (employeeRecord) => {
  let newEmployeeRecord = {};
  newEmployeeRecord.firstName = employeeRecord[0];
  newEmployeeRecord.familyName = employeeRecord[1];
  newEmployeeRecord.title = employeeRecord[2];
  newEmployeeRecord.payPerHour = employeeRecord[3];
  newEmployeeRecord.timeInEvents = [];
  newEmployeeRecord.timeOutEvents =[];
  return newEmployeeRecord;
}

// Process an Array of Arrays into an Array of employee records
const createEmployeeRecords = (record) => {
  let employeeRecords = record.map(employeeArray => {
    return {firstName: employeeArray[0]}
  })
  return employeeRecords;
}

// Adds a timeIn event obj to an employee's record of timeInEvents
// when provided an employee record and Date/Time String and returns 
// the updated record 
const createTimeInEvent = (employeeRecord, dateTime) => {
    employeeRecord.timeInEvents = new Array(1).fill({
      type: "TimeIn", date: dateTime.split(" ")[0], hour: Number(dateTime.split(" ")[1])})
    return employeeRecord
}

// Adds a timeOut event obj to an employee's record of timeOutEvents
// when provided an employee record and Date/Time String and returns 
// the updated record 
const createTimeOutEvent = (employeeRecord, dateTime) => {
    employeeRecord.timeOutEvents = new Array(1).fill({
      type: "TimeOut", date: dateTime.split(" ")[0], hour: Number(dateTime.split(" ")[1])})
    return employeeRecord
}

// Given an employee record with a date-matched timeInEvent and timeOutEvent
//       1) hoursWorkedOnDate calculates the hours worked when given an employee record and a date
//       hoursWorkedOnDate
//         2) calculates that the employee worked 2 hours
const hoursWorkedOnDate = (employeeRecord, date) => {
  let timeInHour = employeeRecord.timeInEvents[0].hour 
  let timeOutHour = employeeRecord.timeOutEvents[0].hour
  let hoursWorked = (timeOutHour - timeInHour) / 100
  return hoursWorked
}

// Given an employee record with a date-matched timeInEvent and timeOutEvent
//       1) wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
//       wagesEarnedOnDate
//         2) calculates that the employee earned 54 dollars
const wagesEarnedOnDate = (employeeRecord, date) => {
  let timeInHour = employeeRecord.timeInEvents[0].hour 
  let timeOutHour = employeeRecord.timeOutEvents[0].hour
  let hoursWorked = (timeOutHour - timeInHour) / 100
  let wagesEarned = employeeRecord.payPerHour * hoursWorked
  return wagesEarned
}

// Given an employee record with MULTIPLE date-matched timeInEvent and timeOutEvent
//       1) allWagesFor aggregates all the dates' wages and adds them together
//       allWagesFor
const allWagesFor = (employeeRecord) => {
  
}






















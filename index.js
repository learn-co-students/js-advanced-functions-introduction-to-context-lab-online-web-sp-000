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

const createTimeInEvent = (employeeRecord, dateTime) => {
    employeeRecord.timeInEvents.push({
      type: "TimeIn", date: dateTime.split(" ")[0], hour: Number(dateTime.split(" ")[1])})
    return employeeRecord
}

// Adds a timeOut event obj to an employee's record of timeOutEvents
// when provided an employee record and Date/Time String and returns 
// the updated record 
const createTimeOutEvent = (employeeRecord, dateTime) => {
    employeeRecord.timeOutEvents.push({
      type: "TimeOut", date: dateTime.split(" ")[0], hour: Number(dateTime.split(" ")[1])})
    return employeeRecord
}

// Given an employee record with a date-matched timeInEvent and timeOutEvent
//       1) hoursWorkedOnDate calculates the hours worked when given an employee record and a date
//       hoursWorkedOnDate
//         2) calculates that the employee worked 2 hours
const hoursWorkedOnDate = (employeeRecord, date) => {
  
  let timeInHour = employeeRecord.timeInEvents.find(event => event.date === date).hour
  let timeOutHour = employeeRecord.timeOutEvents.find(event => event.date === date).hour
  let hoursWorked = (timeOutHour - timeInHour) / 100
  return hoursWorked
}

// Given an employee record with a date-matched timeInEvent and timeOutEvent
//       1) wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
//       wagesEarnedOnDate
//       2) calculates that the employee earned 54 dollars
const wagesEarnedOnDate = (employeeRecord, date) => {
  let hoursWorked = hoursWorkedOnDate(employeeRecord, date)
  let wagesEarned = employeeRecord.payPerHour * hoursWorked
  return wagesEarned
}

// Given an employee record with MULTIPLE date-matched timeInEvent and timeOutEvent
//       1) allWagesFor aggregates all the dates' wages and adds them together
//       allWagesFor
  // Argument(s)
  // An employee record Object
  // Returns
  // Pay owed for all dates
  // Behavior
  // Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee 
  // in the record used as context. Amount should be returned as a number. HINT: 
  // You will need to find the available dates somehow...
  
const allWagesFor = (employeeRecord) => {
  
  let timeInWagesEarned = 0
  employeeRecord.timeInEvents.forEach(e => {
      timeInWagesEarned += wagesEarnedOnDate(employeeRecord, e.date)
      console.log(employeeRecord.timeInEvents.length)
      console.log(timeInWagesEarned)
  })
  let payOwed = timeInWagesEarned
  
  return payOwed
}






















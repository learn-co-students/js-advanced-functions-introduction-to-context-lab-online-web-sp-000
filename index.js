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


































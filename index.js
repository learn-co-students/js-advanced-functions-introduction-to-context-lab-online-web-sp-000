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

const createEmployeeRecords = (record) => {
  let employeeRecords = record.map(employeeArray => {
    return {
      firstName: employeeArray[0], 
      familyName: employeeArray[1], 
      title: employeeArray[2], 
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  })
  return employeeRecords;
}

const createTimeInEvent = (employeeRecord, dateTime) => {
    employeeRecord.timeInEvents.push({
      type: "TimeIn", date: dateTime.split(" ")[0], hour: Number(dateTime.split(" ")[1])})
    return employeeRecord
}

const createTimeOutEvent = (employeeRecord, dateTime) => {
    employeeRecord.timeOutEvents.push({
      type: "TimeOut", date: dateTime.split(" ")[0], hour: Number(dateTime.split(" ")[1])})
    return employeeRecord
}

const hoursWorkedOnDate = (employeeRecord, date) => {
  try {
    let timeInHour = employeeRecord.timeInEvents.find(event => event.date === date).hour
    let timeOutHour = employeeRecord.timeOutEvents.find(event => event.date === date).hour
    let hoursWorked = (timeOutHour - timeInHour) / 100
    return hoursWorked
  } catch (err) {
    // Raise an exception if a timeIn is found without a matching timeOut
    err.message = "Dates do not match!"
    if (timeInHour.split(" ")[0] !== timeOutHour.split(" ")[0]) {
      console.error(err.message)
    }
  }
}

const wagesEarnedOnDate = (employeeRecord, date) => {
  let hoursWorked = hoursWorkedOnDate(employeeRecord, date)
  let wagesEarned = employeeRecord.payPerHour * hoursWorked
  return wagesEarned
}
  
const allWagesFor = (employeeRecord) => {
  
  let timeInWagesEarned = 0
  employeeRecord.timeInEvents.forEach(e => {
      timeInWagesEarned += wagesEarnedOnDate(employeeRecord, e.date)
  })
  let payOwed = timeInWagesEarned
  
  return payOwed
}

const calculatePayroll = (employees) => {
  let amount = employees.reduce((m, e) => m + allWagesFor(e), 0)
  return amount
}

const findEmployeeByFirstName = (employees, firstName) => {
  let employee = employees.find(emp => emp.firstName === firstName)
  return employee
}
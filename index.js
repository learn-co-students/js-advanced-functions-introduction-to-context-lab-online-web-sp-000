// Your code here

function createEmployeeRecord(employeeRecord) {
  const employeeInfo = {
    firstName: employeeRecord[0],
    familyName: employeeRecord[1],
    title: employeeRecord[2],
    payPerHour: employeeRecord[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employeeInfo
} 

function createEmployeeRecords(newRecord){
  return newRecord.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, employeetimeIn){

  const employeeTimeIn = {
    type: "TimeIn",
    hour: parseInt(employeetimeIn.split(' ')[1]),
    date: employeetimeIn.split(' ')[0]
  }

  employeeRecord.timeInEvents.push(employeeTimeIn)
  return employeeRecord

}

function createTimeOutEvent(employeeRecord, employeetimeOut) {

  const employeeTimeOut = {
    type: "TimeOut",
    hour: parseInt(employeetimeOut.split(' ')[1]),
    date: employeetimeOut.split(' ')[0]
  }

  employeeRecord.timeOutEvents.push(employeeTimeOut)
  return employeeRecord

}

function hoursWorkedOnDate(employeeRecord, workDate) {

  let punchInHour = employeeRecord.timeInEvents.filter(n => {
    return n.date === workDate
  })
  let punchOutHour = employeeRecord.timeOutEvents.filter(n => {
    return n.date === workDate
  })
  let workHours = punchOutHour[0].hour - punchInHour[0].hour
  return workHours / 100

}

function wagesEarnedOnDate(employeeRecord, workDate) {
  let wagesEarned = hoursWorkedOnDate(employeeRecord, workDate) * employeeRecord.payPerHour
  return wagesEarned
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
  let totalWages = 0
  for(const event of employee.timeOutEvents) {
    totalWages = wagesEarnedOnDate(employee, event.date) + totalWages
  }
  return totalWages
};

function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find(function(employee){
    return employee.firstName === firstName
  })
}

function calculatePayroll(employees){
  let payroll = 0
  for(const employee of employees) {
    payroll = allWagesFor(employee) + payroll;
  }
  return payroll;
}

function createEmployeeRecord(record) {
  let employeeRecord = {firstName: record[0], familyName: record[1], title: record[2],
                        payPerHour: record[3], timeInEvents: [], timeOutEvents: []}
  return employeeRecord
}

function createEmployeeRecords(arrayOfEmployees) {
  return arrayOfEmployees.map(obj => createEmployeeRecord(obj))
}

function createTimeInEvent(employee, dateTimeString) {
  let dateTime = dateTimeString.split(' ')
  let date = dateTime[0]
  let hour = parseInt(dateTime[1])
  let timeInEvent = {date: date, hour: hour, type: "TimeIn"}
  employee.timeInEvents.push(timeInEvent)
  return employee
}

function createTimeOutEvent(employee, dateTimeString) {
  let dateTime = dateTimeString.split(' ')
  let date = dateTime[0];
  let hour = parseInt(dateTime[1]);
  let timeOutObject = {date: date, hour: hour, type: "TimeOut"};
  employee.timeOutEvents.push(timeOutObject);
  return employee;
}

function hoursWorkedOnDate(employee, dateString) {
  let timeIn = employee.timeInEvents.find(event => event.date === dateString);
  let timeOut = employee.timeOutEvents.find(event => event.date === dateString);
  if (!!timeIn && !!timeOut) {
    let totalHours = (timeOut.hour - timeIn.hour)/100
    return totalHours
  }
}

function wagesEarnedOnDate(employee, dateString) {
  let hours = hoursWorkedOnDate(employee, dateString);
  let rate = employee.payPerHour;
  let totalWages = hours * rate;
  return totalWages
}

function allWagesFor(employee) {
  let wageList = employee.timeInEvents.map(el => wagesEarnedOnDate(employee, el.date))
  let totalWages = wageList.reduce((acc, num) => acc + num)
  return totalWages
}

function calculatePayroll(employeeArray) {
  let totalWages = employeeArray.map(employee => {
    return allWagesFor(employee)
  });
  let payrollTotal = totalWages.reduce((acc, num) => acc + num)
  return payrollTotal
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(employee => employee.firstName === firstName)
}

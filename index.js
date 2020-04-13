// Your code here
function createEmployeeRecord(recordArray) { //first name, family name, title, and pay rate per hour
  const [firstName, familyName, title, payPerHour] = recordArray
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arrayOfArrays){
  return arrayOfArrays.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(employee, dateStamp) { return timeStamp("TimeIn", 'timeInEvents')(employee, dateStamp) }
function createTimeOutEvent(employee, dateStamp) { return timeStamp("TimeOut", 'timeOutEvents')(employee, dateStamp)}

function timeStamp(type, eventArray) {
  return function(employee, dateStamp){
    const [date, hour] = dateStamp.split(' ')
    employee[eventArray].push({
      type: type,
      hour: parseInt(hour, 10),
      date: date
    })
    return employee
  }
}

function hoursWorkedOnDate(employee, date){
  const dateFinder = (n => n.date === date)
  const timeIn = employee.timeInEvents.find(dateFinder).hour
  const timeOut = employee.timeOutEvents.find(dateFinder).hour
  return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(employee, date){
  return employee.payPerHour * hoursWorkedOnDate(employee, date)
}

function allWagesFor(employee){
  const dirtyHours = employee.timeInEvents.map(n => wagesEarnedOnDate(employee, n.date))
  const cleanHours = dirtyHours.filter(n => !!n)
  return cleanHours.reduce((total, element) => total + element)
}

function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find(n => n.firstName === firstName)
}

function calculatePayroll(array){
  return array.map(n => allWagesFor(n)).reduce((total, element) => total + element)
}

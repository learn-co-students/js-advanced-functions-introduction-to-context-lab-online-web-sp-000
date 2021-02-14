// Your code here
function createEmployeeRecord(array) {
  let newObj = {};
  newObj.firstName = array[0];
  newObj.familyName = array[1];
  newObj.title = array[2];
  newObj.payPerHour = array[3];
  newObj.timeInEvents = [];
  newObj.timeOutEvents = [];
  return newObj
}

function createEmployeeRecords(arrOfArrays) {
  let newArr = arrOfArrays.map(e => createEmployeeRecord(e))
  return newArr
}

function createTimeInEvent(employeeObj, dateStamp) {
  const newObj = {};
  newObj.type = "TimeIn";
  newObj.hour = parseInt(dateStamp.slice(11), 10);
  newObj.date = dateStamp.slice(0, dateStamp.length - 5);

  employeeObj.timeInEvents.push(newObj);
  return employeeObj
}

function createTimeOutEvent(employeeObj, dateStamp) {
  const newObj = {};
  newObj.type = "TimeOut";
  newObj.hour = parseInt(dateStamp.slice(11), 10);
  newObj.date = dateStamp.slice(0, 11);

  employeeObj.timeOutEvents.push(newObj);
  return employeeObj
}

function hoursWorkedOnDate (object, date) {
  if (date.slice(0, 11) === object.timeInEvents[0].date){
    let clockIn = object.timeInEvents[0].hour
    let clockOut = object.timeOutEvents[0].hour
    let totalHours = (clockOut - clockIn) / 100
    return totalHours
  }
}

function wagesEarnedOnDate (object, date) {
  let check = hoursWorkedOnDate(object, date) * (object.payPerHour)
  return check
}

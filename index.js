// Your code here
function createEmployeeRecord(array){
let object = {};
  object.firstName = array[0]
  object.familyName = array[1]
  object.title = array[2]
  object.payPerHour = array[3]
  object.timeInEvents = []
  object.timeOutEvents = []
return object
}

function createEmployeeRecords(arrayOfArray){
  let newEmployee = [];
  newEmployee = arrayOfArray.map(createEmployeeRecord)
  return newEmployee;
}

function createTimeInEvent(record, dateStamp){
  let dateStampSplit = dateStamp.split(' ')
  let newDateStamp = {type: "TimeIn", date: dateStampSplit[0], hour: parseInt(dateStampSplit[1])}
  record.timeInEvents.push(newDateStamp)
  return record
}

function createTimeOutEvent(record, dateStamp){
  let dateStampSplit = dateStamp.split(' ')
  let newDateStamp = {type: "TimeOut", date: dateStampSplit[0], hour: parseInt(dateStampSplit[1])}
  record.timeOutEvents.push(newDateStamp)
  return record
}

function hoursWorkedOnDate(record, date){
  let clockIn, clockOut;
  const matchingIn = record.timeInEvents.find(element => element.date == date);
  //console.log(matchingIn)
    clockIn = matchingIn.hour
  const matchingOut = record.timeOutEvents.find(element => element.date == date);
  //console.log(matchingOut)
    clockOut = matchingOut.hour

  let total = (clockOut - clockIn)/100
  //console.log(clockIn, clockOut, total)
  return total
}

function wagesEarnedOnDate(record, date){
  let payRate = record.payPerHour
  return hoursWorkedOnDate(record, date) * payRate;
}


function allWagesFor(record){
  let dates = []
  let total = 0
  record.timeInEvents.forEach(element => dates.push(element.date))
  for (let i=0; i<dates.length; i++){
    total += wagesEarnedOnDate(record, dates[i])
  }
  return total
}

function findEmployeeByFirstName(srcArray, name){
  let match = srcArray.find(element => element.firstName == name);
  return match
}


function calculatePayroll(array){
  let total = 0;
  array.forEach(element => total += allWagesFor(element))
  return total
}

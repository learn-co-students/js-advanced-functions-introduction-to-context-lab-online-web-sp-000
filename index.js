// Your code here
function createEmployeeRecord(array) {
  let obj = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3]
   }
obj.timeInEvents = []
obj.timeOutEvents = []
return obj
  }


function createEmployeeRecords(arrays) {
const record = arrays.map(x => createEmployeeRecord(x))
return record
//Map over the array of arrays and call first function on each...?
}

function createDSObj(getType, dateStamp) {
    return {type: getType, date: dateStamp.slice(0,10), hour: parseInt(dateStamp.slice(-4))}
}

function createTimeInEvent(obj, dateStamp){
    obj.timeInEvents.push(createDSObj("TimeIn", dateStamp))
    return obj
}
function createTimeOutEvent(obj, dateStamp) {
  obj.timeOutEvents.push(createDSObj("TimeOut", dateStamp))
  return obj
}

function hoursWorkedOnDate(recordObj, dateStamp) {
  const timeOut = recordObj.timeInEvents.find((e) => e.date === dateStamp).hour
  const timeIn = recordObj.timeOutEvents.find((e) => e.date === dateStamp).hour
  let hours = (timeOut - timeIn)/100*-1;
  return hours
}
function wagesEarnedOnDate(recordObj, dateStamp) {
   const wages = hoursWorkedOnDate(recordObj, dateStamp) * recordObj.payPerHour
  return wages
}
function allWagesFor(recordObj) {
  const allWages = recordObj.timeInEvents.map((day) => {
    return wagesEarnedOnDate(recordObj, day.date)})
    return allWages.reduce((acc, cv) => acc+cv)
}
function calculatePayroll(employeeRecords) {
    const totalPay = employeeRecords.reduce(((total, record) => total + allWagesFor(record)), 0);
    return totalPay;
  }

function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find(record => record.firstName === firstName);
}

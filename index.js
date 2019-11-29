function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour:arr[3],
    timeInEvents:[],
    timeOutEvents:[]
  }
}

function createEmployeeRecords(arrays) {
  return arrays.map((arr)=>createEmployeeRecord(arr))
}

function createTimeInEvent(recordObject,dateStamp) {
  let timeIn={
    type:"TimeIn",
    date:dateStamp.split(" ")[0],
    hour:parseInt(dateStamp.split(" ")[1])
  }
  recordObject.timeInEvents.push(timeIn)
  return recordObject
}

function createTimeOutEvent(recordObject,dateStamp) {
  let timeout={
    type:"TimeOut",
    date:dateStamp.split(" ")[0],
    hour:parseInt(dateStamp.split(" ")[1])
  }
  recordObject.timeOutEvents.push(timeout)
  return recordObject
}

function hoursWorkedOnDate(recordObject,date) {
  let inn=recordObject.timeInEvents.find((i)=>i.date===date).hour
  let out=recordObject.timeOutEvents.find((i)=>i.date===date).hour

  return (out-inn)/100;
}
function wagesEarnedOnDate(recordObject,date) {
  let hours=hoursWorkedOnDate(recordObject,date)
  let hourlyPay=recordObject.payPerHour
  return hours*hourlyPay
}

function allWagesFor(recordObject) {
  let dates=recordObject.timeInEvents.map((item)=>wagesEarnedOnDate(recordObject,item.date))

  return dates.reduce((total,item)=>{return total+item})
}

function calculatePayroll(recordObjects) {
  let wagePerEmp=recordObjects.map((item)=>allWagesFor(item))
  return wagePerEmp.reduce((total,item)=>(total+item))
}

function findEmployeeByFirstName(recordObjects,firstName) {
  return recordObjects.find((item)=>item.firstName===firstName)
}

// Your code here
let createEmployeeRecord = function(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(array) {
  return array.map(ele => createEmployeeRecord(ele));
}

let createTimeInEvent = function(record, date) {
    let [day, hour] = date.split(" ")

    let timeInObj = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: day
    }
     record.timeInEvents.push(timeInObj);
     return record;

}

let createTimeOutEvent = function(record, date) {
  let [day, hour] = date.split(" ")

  let timeOutObj = {
      type: "TimeOut",
      hour: parseInt(hour),
      date: day
  }
   record.timeOutEvents.push(timeOutObj);
   return record;
}

let hoursWorkedOnDate = function(record, day) {
  let time_In = record.timeInEvents.find(ele => ele.date == day)
  let time_Out = record.timeOutEvents.find(ele => ele.date == day)
  let hours = (time_Out.hour - time_In.hour)/100
  return hours;
}

let wagesEarnedOnDate = function(record, day) {
  return (hoursWorkedOnDate(record, day) * record.payPerHour);
}

let allWagesFor = function(record) {
  let total = 0;
  let day_total = record.timeInEvents.map(ele => wagesEarnedOnDate(record, ele.date));

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return day_total.reduce(reducer);
}

let calculatePayroll = function(array) {
  const pay = (total, employee) => total + allWagesFor(employee)
  return array.reduce(pay, 0);
}

let findEmployeeByFirstName = function(srcArr, firstName) {
    return srcArr.find(record => record.firstName === firstName)
}

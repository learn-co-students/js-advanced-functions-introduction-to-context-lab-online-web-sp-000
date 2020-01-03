// Your code here
function createEmployeeRecord(array){
  let obj = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  return obj;
}

function createEmployeeRecords(twoRows){
  return twoRows.map(person => createEmployeeRecord(person))
}


function createTimeInEvent(record,date){
  let newTime = {
    type: 'TimeIn',
    hour: parseInt(date.slice(-4),10),
    date: date.slice(0,10)
  }
  record.timeInEvents.push(newTime)
  return record
}

function createTimeOutEvent(record,date){
  let newTime = {
    type: 'TimeOut',
    hour: parseInt(date.slice(-4),10),
    date: date.slice(0,10)
  }
  record.timeOutEvents.push(newTime)
  return record
}

function hoursWorkedOnDate(record, date) {
    let timeIn = record.timeInEvents.find(f => f.date === date)
    let timeOut = record.timeOutEvents.find(f => f.date === date)
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(record, date) {
    let hours = hoursWorkedOnDate(record,date)
    return hours * record.payPerHour
}

function allWagesFor(record) {
    let datesArr = record.timeInEvents.map(time => time.date)
    let total = 0;
    datesArr.forEach(date => {
        total =  total + wagesEarnedOnDate(record, date)
    })
    return total
}

function calculatePayroll(employees) {
    return employees.reduce((total, e) => total + allWagesFor(e), 0);

}

function findEmployeeByFirstName(srcArray, firstName) {
    let name = srcArray.filter(s => s.firstName === firstName)
    console.log("name", name)
    return name[0]
}

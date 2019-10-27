// Your code here
function createEmployeeRecord(arr){
  const testEmployee ={
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return testEmployee
}
function createEmployeeRecords(arr){

return arr.map(createEmployeeRecord)
}

function createTimeInEvent(employee, time){
    const dt = time.split(' ')
    employee.timeInEvents.push({
      date: dt[0],
      hour: parseInt(dt[1], 10),
      type: 'TimeIn'
    })
    return employee
}

function createTimeOutEvent(employee, time){
  const dt = time.split(' ')
  employee.timeOutEvents.push({
    date: dt[0],
    hour: parseInt(dt[1], 10),
    type: 'TimeOut'
  })
  return employee
}

function hoursWorkedOnDate(employee, time){

  const timeIn = employee.timeInEvents[0]
  const timeOut = employee.timeOutEvents[0]
  const hoursWorked = Math.abs(timeIn.hour - timeOut.hour)/100
  return hoursWorked
}



function wagesEarnedOnDate(employee, day){

  const payPerHour = employee.payPerHour
  const timeIn = employee.timeInEvents[0]
  const timeOut = employee.timeOutEvents[0]


  const hoursWorked = Math.abs(timeIn.hour - timeOut.hour)/100
  const wagesEarned =  payPerHour * hoursWorked
  return wagesEarned
}


function allWagesFor(employee){

  const payPerHour = employee.payPerHour

  const timeIn = employee.timeInEvents.reduce((total, time)=> { total += time.hour; return total}, 0)
  const timeOut = employee.timeOutEvents.reduce((total, time)=> { total += time.hour; return total}, 0)
  const hoursWorked = Math.abs(timeIn - timeOut)/100
  const wagesEarned =  payPerHour * hoursWorked

  return  wagesEarned

}

function calculatePayroll(employees){
  return employees.reduce((totalPay, employee)=> {
     totalPay += allWagesFor(employee)
     return totalPay
  }, 0)
}

function findEmployeeByFirstName(employees){
  const firstName = employees.find(employee => employee.firstName === 'Loki')
  return firstName

}

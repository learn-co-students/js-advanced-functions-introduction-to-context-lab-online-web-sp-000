// Your code here

function createEmployeeRecord(record){
  let employee = {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
  return employee
}

function createEmployeeRecords(records){
   return records.map(em=>createEmployeeRecord(em))
}

function createTimeInEvent(employee,time){
   let newTimeinEvent = {
     type: "TimeIn",
     date: time.slice(0,10),
     hour: parseInt(time.slice(11))
   }


   employee.timeInEvents.push(newTimeinEvent)
   return employee

}

function createTimeOutEvent(employee,time){
   let newTimeOutEvent = {
     type: "TimeOut",
     date: time.slice(0,10),
     hour: parseInt(time.slice(11))
   }


   employee.timeOutEvents.push(newTimeOutEvent)
   return employee

}

function hoursWorkedOnDate(employee,time){
  let date = time.slice(0,10)
  let timeInObj = employee.timeInEvents.find(x=>x.date==date)
  let timeOutObj = employee.timeOutEvents.find(x=>x.date==date)

  return (timeOutObj.hour - timeInObj.hour)/100
}

function wagesEarnedOnDate(employee,time){
  let hours = hoursWorkedOnDate(employee,time)
  return employee.payPerHour*hours
}

function allWagesFor(employee){
  let workDates = employee.timeInEvents.map(time=>time.date+" "+time.hour)
  let reducer = (accumulator,date)=>accumulator+wagesEarnedOnDate(employee,date)
  return workDates.reduce(reducer,0)
}

function calculatePayroll(employees){
  return employees.reduce((accumulator,em)=>accumulator+allWagesFor(em),0)
}

function findEmployeeByFirstName(records, firstName){
  return records.find(r=>r.firstName == firstName)
}

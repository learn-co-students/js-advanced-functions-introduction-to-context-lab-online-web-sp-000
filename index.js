// Your code here
function createEmployeeRecord(record) {
     return {
          firstName: record[0],
          familyName: record[1],
          title: record[2],
          payPerHour: record[3],
          timeInEvents: [],
          timeOutEvents: []
     }
}


function createEmployeeRecords(employeeRowData) {
     return employeeRowData.map(function(record){
          return createEmployeeRecord(record)
     })
}

function createTimeInEvent(employee, dateStamp) {
     let [date, hour] = dateStamp.split(' ')
     employee.timeInEvents.push({
          type:"TimeIn",
          hour: parseInt(hour, 10), date
     })
return employee
}

function createTimeOutEvent(employee, dateStamp) {
     let [date, hour]
 = dateStamp.split(' ')
employee.timeOutEvents.push({
     type: "TimeOut",
     hour: parseInt(hour, 10), date
})
return employee
}

function hoursWorkedOnDate(employee, soughtDate) {
     let inEvent = employee.timeInEvents.find(function(e){
          return e.date === soughtDate
     })
     let outEvent = employee.timeOutEvents.find(function(e){
return e.date ===soughtDate
     })
     return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employee, dateSought) {
     let rawWage = hoursWorkedOnDate(employee,dateSought) * employee.payPerHour
     return parseFloat(rawWage.toString())
}
     let allWagesFor = function(employee) {
     let eligibleDates = employee.timeInEvents.map(function(e){
          return e.date
     })
     let payable = eligibleDates.reduce(function(memo, d) {
          return memo + wagesEarnedOnDate(employee, d)
     }, 0)
     return payable
     }

     function findEmployeeByFirstName(srcArray, firstName) {
          return srcArray.find(function(rec){
               return rec.firstName === firstName
          })
     }

     function calculatePayroll(arrayOfEmployeeRecords) {
          return arrayOfEmployeeRecords.reduce(function(memo, rec) {
               return memo + allWagesFor(rec)

          }, 0)
     }
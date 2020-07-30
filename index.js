// Your code here
let createEmployeeRecord = function(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(array) {
    return array.map(function(employee){
        return createEmployeeRecord(employee)
    }) 
}

let createTimeInEvent = function(record, datestamp) {
    let [date, hour] = datestamp.split(' ')
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return record
}

let createTimeOutEvent = function(record, datestamp) {
    let [date, hour] = datestamp.split(' ')
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return record
}

let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateForm) {
    let hoursWorked = hoursWorkedOnDate(employee, dateForm)
    return hoursWorked * employee.payPerHour
}

let allWagesFor = function(employee) {
    let dates = employee.timeInEvents.map(function(e) {return e.date})
    return dates.reduce((memo, date) => {
        return memo + wagesEarnedOnDate(employee, date)
    }, 0) 

}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }
  
  let calculatePayroll = function(arrayOfEmployeeRecords){
      return arrayOfEmployeeRecords.reduce(function(memo, rec){
          return memo + allWagesFor(rec)
      }, 0)
  }
let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title : row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row) {
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(record, time) {
    let [date, hour] = time.split(" ")
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return record
}

let createTimeOutEvent = function(record, time) {
    let [date, hour] = time.split(" ")
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return record
}

let hoursWorkedOnDate = function(record, laterDate) {
   let inEvent = record.timeInEvents.find(function(e){
       return e.date === laterDate
   })
   let outEvent = record.timeOutEvents.find(function(e){
       return e.date === laterDate
   })
   return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(record, date) {
    let wage = hoursWorkedOnDate(record, date) * record.payPerHour 
    return parseFloat(wage.toString())
}

let allWagesFor = function(record) {
    let eligibleDates = record.timeInEvents.map(function(e){
        return e.date
    })
    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(record, d)
    }, 0)
    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(record){
        return record.firstName === firstName
    })
}

let calculatePayroll = function(array) {
    return array.reduce(function(memo, record) {
        return memo + allWagesFor(record)
    }, 0)
}
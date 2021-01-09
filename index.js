let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title:  row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []

    }
}

let createEmployeeRecords = function(rowData) {
    return rowData.map(function(row){
        return createEmployeeRecord(row)
    }) 
}

let createTimeInEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let createTimeOutEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, relatedDate) {
    let inEvent = employee.timeInEvents.find(function(e) {
        return e.date === relatedDate
    })

    let outEvent = employee.timeOutEvents.find(function(e) {
        return e.date === relatedDate
    })

    return (outEvent.hour - inEvent.hour)/ 100
}

let wagesEarnedOnDate = function(employee, relatedDate) {
    let owedWage = hoursWorkedOnDate(employee, relatedDate) 
    * employee.payPerHour
    return parseFloat(owedWage.toString())
}

let allWagesFor = function(employee) {
    let employeeDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = employeeDates.reduce(function(memo, d) {
        return memo +  wagesEarnedOnDate(employee, d)
    }, 0)
    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
        return rec.firstName === firstName
    })
}

let calculatePayroll = function(employeeRecordArray) {
    return employeeRecordArray.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}
let createEmployeeRecord = function(element) {
    return {
        firstName: element[0],
        familyName: element[1],
        title: element[2],
        payPerHour: element[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRecords) {
    return employeeRecords.map(function(row){
        return createEmployeeRecord(row)
    })
}


let createTimeInEvent = function(employee, dateStamp){
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

let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })
    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })
    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function (employee, soughtDate) {
    let wage = hoursWorkedOnDate(employee, soughtDate)
    * employee.payPerHour
    return parseFloat(wage.toString())
}

let allWagesFor = function(employee){
    let datesWorked = employee.timeInEvents.map(function(e){
        return e.date
    })
    let expectedPay = datesWorked.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return expectedPay
}

let findEmployeeByFirstName = function(array, firstName){
    return array.find(function(record){
        return record.firstName === firstName
    })
}

let calculatePayroll = function(arrayofEmplyeeRecords){
    return arrayofEmplyeeRecords.reduce(function(memo, record){
        return memo + allWagesFor(record)
    }, 0)
}

// Your code here
let createEmployeeRecord = function (array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function (array) {
    return array.map(function (array) {
        return createEmployeeRecord(array)
    })
}

let createTimeInEvent = (function (employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeRecord
})

let createTimeOutEvent = function (employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeRecord
}

let hoursWorkedOnDate = function (employeeRecord, dateRecord) {
    let inEvent = employeeRecord.timeInEvents.find(function (e) {
        return e.date === dateRecord
    })
    let outEvent = employeeRecord.timeOutEvents.find(function (e) {
        return e.date === dateRecord
    })
    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function (employeeRecord, dateRecord) {
    let wage = hoursWorkedOnDate(employeeRecord, dateRecord) * employeeRecord.payPerHour
    return wage
}

let allWagesFor = function (employeeRecord) {
    let datesWorked = employeeRecord.timeInEvents.map(function (e) {
        return e.date
    })

    let allPay = datesWorked.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate(employeeRecord, d)
    }, 0)

    return allPay
}

let calculatePayroll = function (allEmployeeRecords) {
    return allEmployeeRecords.reduce(function (mem, rec) {
        return mem + allWagesFor(rec)
    }, 0)
}

let findEmployeeByFirstName = function (employeeArray, firstName) {
    return employeeArray.find(function (employee) {
        return employee.firstName === firstName
    })
} 

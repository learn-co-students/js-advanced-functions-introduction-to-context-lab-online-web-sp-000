// Your code here
let createEmployeeRecord = function(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1], 
        title: employee[2], 
        payPerHour: employee[3], 
        timeOutEvents: [],
        timeInEvents: []       
    }
}

let createEmployeeRecords = function(employeeRecords) {
    return employeeRecords.map(function(line) {
        return createEmployeeRecord(line)
    })
}

let createTimeInEvent = function(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
        employeeRecord.timeInEvents.push({
            type: "TimeIn",
            hour: parseInt(hour,10), 
            date,
        })
    return employeeRecord
}

let createTimeOutEvent = function(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
        employeeRecord.timeOutEvents.push({
            type: "TimeOut", 
            hour: parseInt(hour, 10),
            date,
         })
    return employeeRecord
}

let hoursWorkedOnDate = function(employeeRecord, onDate) {
    let timeInOnDate = employeeRecord.timeInEvents.find(function (e) {
        return e.date === onDate
    })
    let timeOutOnDate = employeeRecord.timeOutEvents.find(function (e) {
        return e.date === onDate
    })
    return (timeOutOnDate.hour - timeInOnDate.hour) / 100
}

let wagesEarnedOnDate = function(employeeRecord, onDate) {
    let wagesEarned = hoursWorkedOnDate(employeeRecord, onDate) * employeeRecord.payPerHour
    return wagesEarned
    }
    

let allWagesFor = function(employeeRecord) {
    let datesWorked = employeeRecord.timeInEvents.map(function (e) {
            return e.date
    })
        let expectedWage = datesWorked.reduce(function (memo, e) {
            return memo + wagesEarnedOnDate(employeeRecord, e)
        }, 0)
        return expectedWage
}

let calculatePayroll = function(employeeRecords) {
    return employeeRecords.reduce(function(wages, employee) {
        return wages + allWagesFor(employee)
    }, 0)
    }
       
  

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(e) {
        return e.firstName === firstName
    })
}
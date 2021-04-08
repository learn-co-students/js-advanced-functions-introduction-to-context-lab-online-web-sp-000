function createEmployeeRecord(input) {
    return {
        firstName: input[0],
        familyName: input[1],
        title: input[2],
        payPerHour: input[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
    return array.map(function(input) {
        return  createEmployeeRecord(input)
    })
}


function createTimeInEvent(employee, timeStamp) {
    let [date, hour] = timeStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

function createTimeOutEvent(employee, timeStamp) {
    let [date, hour] = timeStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

function hoursWorkedOnDate(employee, searchDate) {
    let inEvent = employee.timeInEvents.find(function(e) {
        return e.date === searchDate
    })

    let outEvent = employee.timeOutEvents.find(function(e) {
        return e.date === searchDate
    })
    
    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employee, searchDate) {
    let wage = hoursWorkedOnDate(employee, searchDate) * employee.payPerHour
    return parseFloat(wage.toString())
}

function allWagesFor(employee) {
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

function findEmployeeByFirstName(array, firstName) {
    return array.find(function(rec) {
        return rec.firstName === firstName
    })
}

function calculatePayroll(recordsArray) {
    return recordsArray.reduce(function(memo, rec) {
        return memo + allWagesFor(rec)
    }, 0)
}
// Your code here
function createEmployeeRecord(array) {
    let employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord
}

function createEmployeeRecords(arrayOfRecords) {
    return arrayOfRecords.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, timeStamp) {
    let splitTime = timeStamp.split(' ')
    let newTimeStamp = {
        hour: parseInt(splitTime[1]),
        date: splitTime[0]
    }
    newTimeStamp.type = "TimeIn"
    employeeRecord.timeInEvents.push(newTimeStamp)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, timeStamp) {
    let splitTime = timeStamp.split(' ')
    let newTimeStamp = {
        hour: parseInt(splitTime[1]),
        date: splitTime[0]
    }
    newTimeStamp.type = "TimeOut"
    employeeRecord.timeOutEvents.push(newTimeStamp)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(function(e) {
        return e.date === date
    })
    let timeOut = employeeRecord.timeOutEvents.find(function(e) {
        return e.date === date
    })
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    return hoursWorked * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    let allDates = employeeRecord.timeInEvents.map(e => e.date)
    return allDates.reduce(function(total, e){return total + wagesEarnedOnDate(employeeRecord, e)}, 0)
}

function findEmployeeByFirstName(array, firstName) {
    return array.find(e => e.firstName === firstName)
}

function calculatePayroll(array) {
    return array.reduce(function(total, e){return total + allWagesFor(e)}, 0)
}
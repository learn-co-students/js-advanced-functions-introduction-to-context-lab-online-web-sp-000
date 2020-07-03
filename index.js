// Your code here
function createEmployeeRecord(array) {
    return {firstName: array[0], familyName: array[1], title: array[2], payPerHour: array[3], timeInEvents:[], timeOutEvents: []}
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(record, inputDate) {
    let event = {
        type: "TimeIn",
        date: inputDate.split(" ")[0],
        hour: parseInt(inputDate.split(" ")[1], 10)
    }
    record.timeInEvents.push(event)
    return record
}

function createTimeOutEvent(record, inputDate) {
    let event = {
        type: "TimeOut",
        date: inputDate.split(" ")[0],
        hour: parseInt(inputDate.split(" ")[1], 10)
    }
    record.timeOutEvents.push(event)
    return record
}

function hoursWorkedOnDate(record, inputDate) {
    let timeIn = record.timeInEvents.find(function(e){
        return e.date === inputDate
    })

    let timeOut = record.timeOutEvents.find(function(e){
        return e.date === inputDate
    })

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(record, inputDate) {
    return parseFloat(record.payPerHour * hoursWorkedOnDate(record,inputDate))
}

function allWagesFor(record) {
    let eligibleDates = record.timeInEvents.map(function(e){
        return e.date
    })

    let pay = eligibleDates.reduce(function(memo, day) {
        return memo + wagesEarnedOnDate(record, day)
    }, 0)
    return parseFloat(pay)
}

function calculatePayroll(array) {
    return array.reduce(function(memo,record) {
        return memo + allWagesFor(record)
    }, 0)
}

function findEmployeeByFirstName(array,name) {
    return array.find(function(person){
        return person.firstName === name
    })
}
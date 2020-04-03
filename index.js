// Your code here

function createEmployeeRecord(array) {
    let record = {}
    record.firstName = array[0]
    record.familyName = array[1]
    record.title = array[2]
    record.payPerHour = array[3]
    record.timeInEvents = []
    record.timeOutEvents = []
    return record
}

function createEmployeeRecords(twoRows) {
    let results = twoRows.map(array => createEmployeeRecord(array))
    return results
}

function createTimeInEvent(record, string) {
    let newevent = {}
    newevent.type = "TimeIn"
    newevent.date = string.split(" ")[0]
    newevent.hour = parseInt(string.split(" ")[1])
    record.timeInEvents.push(newevent)
    return record
}

function createTimeOutEvent(record, string) {
    let newevent = {}
    newevent.type = "TimeOut"
    newevent.date = string.split(" ")[0]
    newevent.hour = parseInt(string.split(" ")[1])
    record.timeOutEvents.push(newevent)
    return record
}

function hoursWorkedOnDate(record, date) {
    let incoming = record.timeInEvents.find(
        event => { return event.date === date });
    let outgoing = record.timeOutEvents.find(event => { return event.date === date });
    return (outgoing.hour - incoming.hour) / 100
}

function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record) {
    let dates = record.timeInEvents.map(event => { return event.date })
    let wages = dates.map(date => { return wagesEarnedOnDate(record, date) })

    let totalWages = wages.reduce(function(total, wage) {
        return total + wage
    })
    return totalWages
}

function calculatePayroll(records) {
    return records.reduce(function(total, record) {
        return total + allWagesFor(record)
    }, 0)
}

function findEmployeeByFirstName(records, name) {
    return records.find(record => {
        return record.firstName === name
    })
}
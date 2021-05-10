// Your code here
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arr) {
    return arr.map(e => createEmployeeRecord(e))
}

function createTimeInEvent(record, time) {
    const timeEvent = {
        type: 'TimeIn',
        hour: parseInt(time.split(" ")[1]),
        date: time.split(" ")[0]
    }

    record.timeInEvents.push(timeEvent)
    return record
}

function createTimeOutEvent(record, time) {
    const timeEvent = {
        type: 'TimeOut',
        hour: parseInt(time.split(" ")[1]),
        date: time.split(" ")[0]
    }
    record.timeOutEvents.push(timeEvent)
    return record
}

function hoursWorkedOnDate(record, date) {
    let outDay = record.timeOutEvents.find(e => e.date === date)
    let inDay = record.timeInEvents.find(e => e.date === date)

    return (outDay.hour - inDay.hour) / 100
}

function wagesEarnedOnDate(record, date) {
    return record.payPerHour * hoursWorkedOnDate(record, date)
}

function allWagesFor(record) {
    return record.timeInEvents
        .map(e => wagesEarnedOnDate(record, e.date))
        .reduce((total, e) => e + total )
}

function calculatePayroll(employees) {
    return employees
        .map(e => allWagesFor(e))
        .reduce((t, n) => t + n)
}

function findEmployeeByFirstName(arr, name) {
    return arr.find(e => e.firstName = name)
}

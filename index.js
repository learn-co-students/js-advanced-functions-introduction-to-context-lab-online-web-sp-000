// Your code here
function createEmployeeRecord(source) {
    return {
        firstName: source[0],
        familyName: source[1],
        title: source[2],
        payPerHour: source[3],
        timeInEvents: [],
        timeOutEvents: [],
    }

}
function createEmployeeRecords(arr) {
    return arr.map(info => createEmployeeRecord(info))
}
function createTimeEvent(type, date) {
    return {
        type: type,
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0]
    }
}
function createTimeInEvent(record, date) {
    record.timeInEvents.push(createTimeEvent("TimeIn", date))
    return record
}
function createTimeOutEvent(record, date) {
    record.timeOutEvents.push(createTimeEvent("TimeOut", date))
    return record
}
function hoursWorkedOnDate(record, date) {
    let timeIn = record.timeInEvents.find(r => r.date == date).hour
    let timeOut = record.timeOutEvents.find(r => r.date == date).hour
    return ((timeOut - timeIn) / 100)
}
function wagesEarnedOnDate(record, date) {
    return (record.payPerHour * hoursWorkedOnDate(record, date))
}
function allWagesFor(record) {
    let dates = record.timeInEvents.map(e => e.date);
    let wages = dates.map(date => wagesEarnedOnDate(record, date))
    return wages.reduce((acc, w) => {return acc + w})
}
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(r => r.firstName == firstName)
}
function calculatePayroll(records) {
    let wages = records.map(record => allWagesFor(record))
    return wages.reduce((ac, e) => {return ac + e})
}
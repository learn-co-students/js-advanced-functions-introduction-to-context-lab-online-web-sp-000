// createEmployeeRecord(["Gray", "Worm", "Security", 1])

// Your code here

let createEmployeeRecord = function (array) {
    // array is 3 strings and 1 number
    // BEHAVIOR loads array into object properties. initialize empty arrays on the timeIn and timeOut keys
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    // RETURN { firstName:, familyName:, title:, payPerHour:, timeInEvents:, timeOutEvents:}
}

let createEmployeeRecords = function (array) {
    // array is an array of arrays
    // BEHAVIOR converts each nested array into an employee record using createEmployeeRecord and accumulates it into a new Array
    return array.map(function (record) {
        return createEmployeeRecord(record)
    })
    // RETURN array of objects
}

let createTimeInEvent = function (record, dateStamp) {
    // record is an employee record object, dateStamp is "YYYY-MM-DD HHMM"
    // BEHAVIOR add object with keys to timeInEvents array, type: set to "TimeIn", hour and date from ARGS
    let [date, hour] = dateStamp.split(" ")

    record.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    })
    return record
    // RETURN employee record
}

let createTimeOutEvent = function (record, dateStamp) {
    // record is an employee record object, dateStamp is "YYYY-MM-DD HHMM"
    // BEHAVIOR add object with keys to timeOutEvents array, type: set to "TimeOut", hour and date from ARGS
    let [date, hour] = dateStamp.split(" ")

    record.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    })
    return record
    // RETURN employee record
}

let hoursWorkedOnDate = function (record, dateStamp) {
    // record is an employee record object, dateStamp is "YYYY-MM-DD HHMM"
    // BEHAVIOR given a date, find the number of hours elapsed between timeInEvent and timeOutEvent
    let checkIn = record.timeInEvents.find(element => element.date === dateStamp)
    let checkOut = record.timeOutEvents.find(element => element.date === dateStamp)
    return (checkOut.hour - checkIn.hour) / 100
    // RETURN hours worked as an integer
}

let wagesEarnedOnDate = function (record, dateStamp) {
    // record is an employee record object, dateStamp is "YYYY-MM-DD HHMM"
    // BEHAVIOR use hoursWorkedOnDate multiply the hours by the records payRate to determine amount owed
    let hours = hoursWorkedOnDate(record, dateStamp)
    return record.payPerHour * hours
    // RETURN pay owed as an integer
}

let allWagesFor = function (record) {
    // record is employee record object
    // BEHAVIOR use wagesEarnedOnDate, accumulate the value of all dates worked
    let dates = record.timeInEvents.map(element => element.date)
    return dates.reduce((memo, date) => {
        return memo + wagesEarnedOnDate(record, date)
    }, 0)
    // RETURN pay owed for all dates
}

let findEmployeeByFirstName = function (srcArray, firstName) {
    // srcArray is an array of employee records
    // BEHAVIOR test firstName field for a match with firstName arg
    return srcArray.find(employee => employee.firstName === firstName)
    // RETURN return matching record
}

let calculatePayroll = function (array) {
    // array is array of employee records
    // BEHAVIOR use wagesEarnedOnDate to accumulate value of all days worked. Amount returns is a number
    let wages = array.map(employee => allWagesFor(employee))
    return wages.reduce((memo, wage) => {
        return memo + wage
    }, 0)
    // RETURN sum of pay owed to all employees for all dates
}
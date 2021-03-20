function createEmployeeRecord (array) {
    let obj = {
        firstName: array[0],
        familyName: array[1], 
        title: array[2], 
        payPerHour: array[3], 
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj
}

function createEmployeeRecords(arr) {
    let obj = arr.map(employee => createEmployeeRecord(employee))
    return obj
}

function createTimeInEvent(employeeRecord, timeStamp) {
    const time = timeStamp.split(" ")
    const hour = parseInt(time[1])
    const date = time[0]

    let obj = {
        type: "TimeIn",
        hour: hour,
        date: date
    }
    employeeRecord.timeInEvents.push(obj)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, timeStamp) {
    const time = timeStamp.split(" ")
    const hour = parseInt(time[1])
    const date = time[0]

    let obj = {
        type: "TimeOut",
        hour: hour,
        date: date
    }
    employeeRecord.timeOutEvents.push(obj)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateWorked) {
    let timeIn = employeeRecord.timeInEvents.find(date => date.date === dateWorked)
    let timeOut = employeeRecord.timeOutEvents.find(date => date.date === dateWorked)
    let hoursWorked = ((timeOut.hour - timeIn.hour)/100)
    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, date) {
    return ((hoursWorkedOnDate(employeeRecord, date)) * employeeRecord.payPerHour)
}

function allWagesFor(employeeRecord) {
    let dates = employeeRecord.timeInEvents.filter(date => date.date != 0)
    let datesW = dates.map(date => date.date)
    let arrayOfHours = datesW.map(date => wagesEarnedOnDate(employeeRecord, date))
    let total = arrayOfHours.reduce(function(a,b) {return a+b}, 0)

    return total
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(name => name.firstName === firstName)
}

function calculatePayroll(arrayOfEmpRecords) {
    let arrayOfEmployeeHours = arrayOfEmpRecords.map(employee => allWagesFor(employee))
    let total = arrayOfEmployeeHours.reduce(function(a,b) {return a+b}, 0)
    return total
}
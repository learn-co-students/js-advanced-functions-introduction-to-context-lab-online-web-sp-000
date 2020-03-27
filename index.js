function createEmployeeRecord(array) {
   return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(function(array) {
        return createEmployeeRecord(array)
    })
}

function createTimeInEvent(object, dateStamp) {
    const date = dateStamp.split(' ')[0]
    const time = dateStamp.split(' ')[1]
    object.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: date
    })
    return object
}

function createTimeOutEvent(object, dateStamp) {
    const date = dateStamp.split(' ')[0]
    const time = dateStamp.split(' ')[1]
    object.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: date
    })
    return object
}

function hoursWorkedOnDate(employee, searchDate) {
    const timeInResult = employee.timeInEvents.find( ({date}) => date === searchDate)
    const timeOutResult = employee.timeOutEvents.find( ({date}) => date === searchDate)
    const hoursWorked = timeOutResult.hour - timeInResult.hour
    return hoursWorked / 100
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour

}

function allWagesFor(employee) {
    let daysWorked = employee.timeInEvents.map(a => a.date)
    let pay = daysWorked.reduce(function(accumulator, workDay) {
        return accumulator + wagesEarnedOnDate(employee, workDay) 
    }, 0)
    return pay
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(person => person.firstName === firstName)
}

function calculatePayroll(array) {
    return array.reduce(function(accumulator, currentValue) {
        return accumulator + allWagesFor(currentValue)
    }, 0)
}
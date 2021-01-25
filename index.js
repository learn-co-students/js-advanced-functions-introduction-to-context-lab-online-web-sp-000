// Your code here
function createEmployeeRecord(arr){
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }

}

function createEmployeeRecords(arr2){
    return arr2.map(function (arr) {
        return createEmployeeRecord(arr)
    })
}

function createTimeInEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(" ")
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(" ")
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

function hoursWorkedOnDate(employee, arrdate){
    let timeIn = employee.timeInEvents.find(function (e) {
        return e.date === arrdate
    })

    let timeOut = employee.timeOutEvents.find(function (e){
        return e.date === arrdate
    })

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, arrdate){
    let wage = hoursWorkedOnDate(employee, arrdate) * employee.payPerHour
    return wage
}

function allWagesFor(employee){
    let dates = employee.timeInEvents.map(function (e) {
        return e.date
    })
    let allWages = dates.reduce(function (memo, days){
        return memo + wagesEarnedOnDate(employee, days)
    }, 0)
    return allWages

}

function findEmployeeByFirstName (srcArray, firstName){
    return srcArray.find(function (e) {
        return e.firstName === firstName
    })
}

function calculatePayroll (Array) {
    return Array.reduce(function (memo, record) {
        return memo + allWagesFor(record)
    }, 0)
}




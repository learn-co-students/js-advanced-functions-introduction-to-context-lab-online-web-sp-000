// Your code here
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

function createEmployeeRecords(array) {
    return array.map((e) => createEmployeeRecord(e))
}

function createTimeInEvent(empObject, dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    empObject.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return empObject
}

function createTimeOutEvent(empObject, dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    empObject.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return empObject
}

function hoursWorkedOnDate(empObject, date) {
    let timeInDate = empObject.timeInEvents.find((e) => e.date === date)
    let timeOutDate = empObject.timeOutEvents.find((e) => e.date === date)
    return (timeOutDate.hour - timeInDate.hour) / 100
}

function wagesEarnedOnDate(empObject, date) {
    let hours = hoursWorkedOnDate(empObject, date)
    return hours * empObject.payPerHour
}

function allWagesFor(empObject) {
    let dates = empObject.timeInEvents.map((e) => e.date)
    return dates.reduce((memo, date) => memo + wagesEarnedOnDate(empObject, date), 0)
}

function findEmployeeByFirstName(array, firstName) {
   return array.find((employee) => employee.firstName === firstName)
}

function calculatePayroll(array) {
    let totalPayroll = array.map((employee) => allWagesFor(employee))
    return totalPayroll.reduce((memo, pay) => memo + pay, 0)
}
// Your code here
function createEmployeeRecord(arr) {
    let employeeRecord = {}
    employeeRecord.firstName = arr[0];
    employeeRecord.familyName = arr[1];
    employeeRecord.title = arr[2];
    employeeRecord.payPerHour = arr[3];
    employeeRecord.timeInEvents = [];
    employeeRecord.timeOutEvents = [];
    return employeeRecord
}

function createEmployeeRecords(arr) {
    let employeeRecord = arr.map(x => createEmployeeRecord(x))
    return employeeRecord
}

function createTimeInEvent(obj, dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    obj.timeInEvents.push({ type : "TimeIn",
                            date : date,
                            hour : parseInt(hour)})
    return obj
}

function createTimeOutEvent(obj, dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    obj.timeOutEvents.push({ type : "TimeOut",
                            date : date,
                            hour : parseInt(hour)})
    return obj
}

function hoursWorkedOnDate(obj, dateStamp) {
    const timeIn = obj.timeInEvents.find(e => e.date === dateStamp).hour
    const timeOut = obj.timeOutEvents.find(e => e.date === dateStamp).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(obj, dateStamp) {
    const wage = obj.payPerHour;
    const hoursWorked = hoursWorkedOnDate(obj, dateStamp)
    return wage * hoursWorked
}

function allWagesFor(obj) {
    const allWages = obj.timeInEvents.map(day => {return wagesEarnedOnDate(obj, day.date)})
    return allWages.reduce((acc, val) => acc + val)
}

function calculatePayroll(rec) {
    const allPay = (rec.map(employee => {return allWagesFor(employee)}))
    return allPay.reduce((acc, val) => acc + val)
}

function findEmployeeByFirstName(arr, name) {
    return arr.find(rec => rec.firstName === name)
}
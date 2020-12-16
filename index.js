function createEmployeeRecord(arr){
    let record
    return record = { 
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [], 
        timeOutEvents: []
    }
}

function createEmployeeRecords(arys){
    return arys.map(createEmployeeRecord)
}

function createDSObj(getType, dateStamp) {
    return {type: getType, date: dateStamp.slice(0,10), hour: parseInt(dateStamp.slice(-4))}
}

function createTimeInEvent(obj, dateStamp){
    obj.timeInEvents.push(createDSObj("TimeIn", dateStamp))
    return obj
}

function createTimeOutEvent(obj, dateStamp) {
    obj.timeOutEvents.push(createDSObj("TimeOut", dateStamp))
    return obj
}

function hoursWorkedOnDate(obj, dateYMD){
    const timeIn = obj.timeInEvents.find((e) => e.date === dateYMD).hour
    const timeOut = obj.timeOutEvents.find((e) => e.date === dateYMD).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(obj, dateYMD) {
    let hours = hoursWorkedOnDate(obj, dateYMD)
    return hours * obj.payPerHour
}

function allWagesFor(obj) {
    let allWages = obj.timeInEvents.map((day) => {return wagesEarnedOnDate(obj, day.date)})
    return allWages.reduce((acc, cv) => acc + cv)
}

function calculatePayroll(arr) {
    let employeeWages = arr.map(em => allWagesFor(em))
    return employeeWages.reduce((acc, cv) => acc + cv)
}

function findEmployeeByFirstName(arr, name) {
    let match = arr.find((e) => e.firstName === name)
    return match 
}
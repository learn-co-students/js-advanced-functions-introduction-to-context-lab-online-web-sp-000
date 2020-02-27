function createEmployeeRecord(array) {
    let newObj = {}
    newObj.firstName = array[0]
    newObj.familyName = array[1]
    newObj.title = array[2]
    newObj.payPerHour = array[3]
    newObj.timeInEvents = []
    newObj.timeOutEvents = []
    return newObj
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(arrayObj => {
        return createEmployeeRecord(arrayObj)
    })
}

function createTimeInEvent(obj, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    obj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })  
    return obj
}

function createTimeOutEvent(obj, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    obj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return obj
}

function hoursWorkedOnDate(employee, dateWorked){
    let timeIn = employee.timeInEvents.find(dayWorked => {return dayWorked.date === dateWorked});
    let timeOut = employee.timeOutEvents.find(dayWorked => {return dayWorked.date === dateWorked});
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(employee, dateWorked) {
    let hoursWorked = hoursWorkedOnDate(employee, dateWorked)
    return hoursWorked * employee.payPerHour
    
}

function allWagesFor(employee) {
    let daysWorked = employee.timeInEvents.map(day => {return day.date});
    return daysWorked.reduce((memo, date)=> {
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)
}

function findEmployeeByFirstName(scrArray, employeeName) {
    return scrArray.find(name => name.firstName === employeeName)
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((employee, records) => {return employee + allWagesFor(records)}, 0)
}
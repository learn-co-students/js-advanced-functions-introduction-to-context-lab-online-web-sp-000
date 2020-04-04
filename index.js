// Your code here
function createEmployeeRecord(employeeInfoArray){
    return Object.assign({}, {
        "firstName": employeeInfoArray[0],
        "familyName": employeeInfoArray[1],
        "title": employeeInfoArray[2],
        "payPerHour": employeeInfoArray[3],
        "timeInEvents": [],
        "timeOutEvents": []
        })
}

function createEmployeeRecords(arrayOfInfoArrays){
    return arrayOfInfoArrays.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, dateStamp){
    employeeRecord.timeInEvents.push(
        {
            "type": "TimeIn",
            "hour": Number(dateStamp.slice(11, 15)),
            "date": dateStamp.slice(0, 10)
        }
    )
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    employeeRecord.timeOutEvents.push(
        {
            "type": "TimeOut",
            "hour": Number(dateStamp.slice(11, 15)),
            "date": dateStamp.slice(0, 10)
        }
    )
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateStamp){
    const timeIn = employeeRecord.timeInEvents.find(e => e.date === dateStamp).hour
    const timeOut = employeeRecord.timeOutEvents.find(e => e.date === dateStamp).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(employeeRecord, dateStamp){
    return hoursWorkedOnDate(employeeRecord, dateStamp)*employeeRecord.payPerHour
}

function allWagesFor(employeeRecord){
    const dateStamps = employeeRecord.timeInEvents.map(event => event.date)
    const totalWages = dateStamps.reduce((totalWage, dateStamp) =>
        totalWage + wagesEarnedOnDate(employeeRecord, dateStamp), 0
    )
    return totalWages
}

function findEmployeeByFirstName(arrayOfEmployeeRecords, firstName){
    return arrayOfEmployeeRecords.find(record => record.firstName === firstName)
}

function calculatePayroll(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce((payroll, employeeRecord) => payroll + allWagesFor(employeeRecord), 0)
}
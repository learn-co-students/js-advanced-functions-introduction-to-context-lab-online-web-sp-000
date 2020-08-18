function createEmployeeRecord(employeeInfoArray) {
    let employeeRecord;
    return employeeRecord = {
        firstName: employeeInfoArray[0],
        familyName: employeeInfoArray[1],
        title: employeeInfoArray[2],
        payPerHour: employeeInfoArray[3], 
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord)
}

function createdObj(type, dateStamp) {
    return {type: type, date: dateStamp.slice(0,10), hour: parseInt(dateStamp.slice(-4))}
}

function createTimeInEvent(record, dateStamp) {
    record.timeInEvents.push(createdObj("TimeIn", dateStamp))
    return record;
}

function createTimeOutEvent(record, dateStamp) {
    record.timeOutEvents.push(createdObj("TimeOut", dateStamp))
    return record;
}

function hoursWorkedOnDate(record, dateStamp) {
    const timeIn = record.timeInEvents.find((e) => e.date === dateStamp).hour;
    const timeOut = record.timeOutEvents.find((e) => e.date === dateStamp).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(record, date) {
    const wage = record.payPerHour;
    const hoursWorked = hoursWorkedOnDate(record, date);
    return wage * hoursWorked;
}

function allWagesFor(record) {
    const allWages = record.timeInEvents.map((day) => {return wagesEarnedOnDate(record, day.date)})
    return allWages.reduce((total, current) => total + current)
}

function findEmployeeByFirstName(employees, firstName) {
    let found = employees.find((employee) => employee.firstName === firstName)
    return found;
}

function calculatePayroll(employeeRecords){
    const allWages = employeeRecords.map((employee) => {return allWagesFor(employee)})
    return allWages.reduce((total, current) => total + current)
}
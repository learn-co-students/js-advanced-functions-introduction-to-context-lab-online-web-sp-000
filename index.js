function createEmployeeRecord(empArray){
    let employee = {};
    employee.firstName = empArray[0];
    employee.familyName = empArray[1];
    employee.title = empArray[2];
    employee.payPerHour = empArray[3];
    employee.timeInEvents = [];
    employee.timeOutEvents = [];
    return employee
}

function createEmployeeRecords(empArrays){
    return empArrays.map(function(empArray){
        return createEmployeeRecord(empArray)
    })
}

function createTimeInEvent(employee, dateStamp){
    let [day, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: day 
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp){
    let [day, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: day 
    })
    return employee
}

function hoursWorkedOnDate(empRecord, date){
    let inshift = empRecord.timeInEvents.find(shift => shift.date === date)
    let outshift = empRecord.timeOutEvents.find(shift => shift.date === date)
    if (!!inshift && !!outshift) {
        let hoursWorked = (outshift.hour - inshift.hour) / 100
        return hoursWorked
    }
    return `No shift data available for ${date}.`
}

function wagesEarnedOnDate(empRecord, date){
    let rate = empRecord.payPerHour
    let hours = hoursWorkedOnDate(empRecord, date)
    return rate * hours
}

function allWagesFor(employee){
    let dates = employee.timeInEvents.map(x => x.date)
    let dailyPay = dates.map(date => wagesEarnedOnDate(employee, date))
    let totalWages = dailyPay.reduce(( total, currentValue ) => total + currentValue, 0)
    return totalWages
}

function calculatePayroll(employees){
    let totalPayroll = employees.reduce(
        (total, employee) => total + allWagesFor(employee), 0);
    return totalPayroll
}

function findEmployeeByFirstName(employees, firstName){
    let result = employees.filter(employee => employee.firstName === firstName)
    return result[0]
}

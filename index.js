// Your code here
function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employee, dateStamp) {
    let hourDate = dateStamp.split(' ');
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hourDate[1]),
        date: hourDate[0]
    });
    return employee;
}

function createTimeOutEvent(employee, dateStamp) {
    let hourDate = dateStamp.split(' ');
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hourDate[1]),
        date: hourDate[0]
    });
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    // Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
    // return hours worked, an integer
    let timeInHour = employee.timeInEvents.find(e => e.date === date).hour;
    let timeOutHour = employee.timeOutEvents.find(e => e.date === date).hour; 
    return ((timeOutHour - timeInHour)/100);
}

function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date);
    return (hours * employee.payPerHour);
}

function allWagesFor(employee){
    let dates = employee.timeInEvents.map(function(e){
        return e.date
    });
    let wages = dates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return wages;
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll(employeeArray) {
    return employeeArray.reduce(function(memo, employee){
        return memo + allWagesFor(employee)
    }, 0)
}
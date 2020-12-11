function createEmployeeRecord(array, employee) {
    employee = {};
    employee.firstName = array[0];
    employee.familyName = array[1];
    employee.title = array[2];
    employee.payPerHour = array[3];
    employee.timeInEvents = [];
    employee.timeOutEvents = [];
    return employee
}

function createEmployeeRecords(array) {
    return array.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employee, date) {
    let [day, hour] = date.split(" ")
    hour = parseInt(hour)
    employee.timeInEvents.push({
        type: "TimeIn",
        date: day,
        hour: hour
    });
    return employee;
}

function createTimeOutEvent(employee, date) {
    let [day, hour] = date.split(" ")
    hour = parseInt(hour)
    employee.timeOutEvents.push({
        type: "TimeOut",
        date: day,
        hour: hour
    });
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(obj => obj.date === date)
    let timeOut = employee.timeOutEvents.find(obj => obj.date === date)
    let timeWorked = (timeOut.hour - timeIn.hour) / 100
    return timeWorked
}

function wagesEarnedOnDate(employee, date) {
    let pay = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return pay 
}

function allWagesFor(employee) {
    let total = 0
    for (let i=0; i < employee.timeInEvents.length; i++) {
       total = (hoursWorkedOnDate(employee, employee.timeInEvents[i].date) * employee.payPerHour) + total 
    }
    return total
}

function findEmployeeByFirstName(srcArray, first) {
    return srcArray.find(employee => employee.firstName === first);
}

function calculatePayroll(srcArray) {
    let sum = srcArray.map(employee => allWagesFor(employee))
    let wages = sum.reduce(( total, element) => element + total) 
    return wages
    
}
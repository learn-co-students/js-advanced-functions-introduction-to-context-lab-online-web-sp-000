// Your code here
function createEmployeeRecord(infoArr) {
    const employee = {
        'firstName': infoArr[0],
        'familyName': infoArr[1],
        'title': infoArr[2],
        'payPerHour': infoArr[3],
        'timeInEvents': [],
        'timeOutEvents': []
    };
    return employee;
}

function createEmployeeRecords(nestedInfoArr) {
    const employees = nestedInfoArr.map(createEmployeeRecord);
    return employees;
}

function createTimeInEvent(empRec, dateTime) {
    const date = dateTime.split(' ')[0];
    const hour = parseInt(dateTime.split(' ')[1]);
    empRec.timeInEvents.push( {'date': date, 'hour': hour, 'type': 'TimeIn'} );
    return empRec;
}

function createTimeOutEvent(empRec, dateTime) {
    const date = dateTime.split(' ')[0];
    const hour = parseInt(dateTime.split(' ')[1]);
    empRec.timeOutEvents.push( {'date': date, 'hour': hour, 'type': 'TimeOut'} );
    return empRec;
}

function hoursWorkedOnDate(empRec, date) {
    const timeIn = empRec.timeInEvents.find( d => d.date === date ).hour;
    const timeOut = empRec.timeOutEvents.find (d => d.date === date ).hour;
    return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(empRec, date) {
    return empRec.payPerHour * hoursWorkedOnDate(empRec, date);
}

function allWagesFor(empRec) {
    const daysWorked = empRec.timeInEvents.map( e => e.date );
    const totalWages = daysWorked.reduce( (total, d) => total + wagesEarnedOnDate(empRec, d), 0 );
    return totalWages;
}

function calculatePayroll(employees) {
    const totalWages = employees.reduce( (total, e) => total + allWagesFor(e), 0 );
    return totalWages;
}

function findEmployeeByFirstName(employees, firstName) {
    const employee = employees.find( e => e.firstName === firstName );
    return employee;
}
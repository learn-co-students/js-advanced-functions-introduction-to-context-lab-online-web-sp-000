function createEmployeeRecord(employeeInfo) {
    let object = {};
    object.firstName = employeeInfo[0];
    object.familyName = employeeInfo[1];
    object.title = employeeInfo[2];
    object.payPerHour = employeeInfo[3];
    object.timeInEvents = [];
    object.timeOutEvents = [];
    return object
}

function createEmployeeRecords(array) {
    return array.map(e => createEmployeeRecord(e));
}

function createTimeInEvent(employeeRecord, dateTime) {
    let dateTimeObject = {
        type: "TimeIn",
        date: dateTime.split(' ')[0],
        hour: parseInt(dateTime.split(' ')[1])
    };
    employeeRecord.timeInEvents.push(dateTimeObject);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTime) {
    let dateTimeObject = {
        type: "TimeOut",
        date: dateTime.split(' ')[0],
        hour: parseInt(dateTime.split(' ')[1])
    };
    employeeRecord.timeOutEvents.push(dateTimeObject);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    let timeInEvent = employeeRecord.timeInEvents.find( e => {
        return e.date === date;
    })
    let timeOutEvent = employeeRecord.timeOutEvents.find( e => {
        return e.date === date;
    })
    return (timeOutEvent.hour - timeInEvent.hour)/100;
}

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    let datesWorked = employeeRecord.timeInEvents.map( e => e.date);
    return datesWorked.reduce( (total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
    // let wages = datesWorked.map( date => wagesEarnedOnDate(employeeRecord, date));
    // return wages.reduce((total, currentValue) => total + currentValue);
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find( src => {
        return src.firstName === firstName }
    );
}

function calculatePayroll (employeeRecords) {
    return employeeRecords.reduce( (total, e) => total + allWagesFor(e), 0);
}
// Your code here
function createEmployeeRecord (array) {
    let record = {};
    record.firstName = array[0];
    record.familyName = array[1];
    record.title = array[2];
    record.payPerHour = array[3];
    record.timeInEvents = [];
    record.timeOutEvents = [];

    return record;
    
}

function createEmployeeRecords (arrays) {

    return arrays.map(array => createEmployeeRecord(array));

}

function createTimeInEvent (record, time) {

    let splitTime = time.split(" ")
    record.timeInEvents.push({type: "TimeIn", date: splitTime[0], hour: parseInt(splitTime[1])});
    return record;
    
}

function createTimeOutEvent (record, time) {

    let splitTime = time.split(" ")
    record.timeOutEvents.push({type: "TimeOut", date: splitTime[0], hour: parseInt(splitTime[1])});
    return record;
    
}

function hoursWorkedOnDate (record, date) {

    let timeIn = record.timeInEvents.find(element => element.date === date).hour;
    let timeOut = record.timeOutEvents.find(element => element.date === date).hour;

    return (timeOut - timeIn)/100;
    
}

function wagesEarnedOnDate (record, date) {

    return (hoursWorkedOnDate(record, date) * record.payPerHour);
    
}

function allWagesFor (record) {

    return record.timeInEvents.reduce(function (wage, timeIn) { 

        return (wagesEarnedOnDate(record, timeIn.date) + wage);

    }, 0)
}

function calculatePayroll (employees) {
    return employees.reduce(function (payRoll, employee) { 

        return (allWagesFor(employee) + payRoll);

    }, 0)
}

function findEmployeeByFirstName (employees, firstName) {
    return employees.find(employee => employee.firstname = firstName)
}
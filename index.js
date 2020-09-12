// Your code here
function createEmployeeRecord (employeeArray) {
    let employeeObject = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };

    return employeeObject
}

function createEmployeeRecords (employeeArrays) {
    let employeeObjects = employeeArrays.map(createEmployeeRecord);
    return employeeObjects
}

function createTimeInEvent(employeeRecord,dateStamp) {
    let timeInEvent = {
        type: "TimeIn",
        hour: getHour(dateStamp),
        date: getDate(dateStamp)
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord
}

function createTimeOutEvent(employeeRecord,dateStamp) {
    let timeOutEvent = {
        type: "TimeOut",
        hour: getHour(dateStamp),
        date: getDate(dateStamp)
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord
}

function getHour(dateStamp) {
    let hour = dateStamp.substring(11);
    return Number(hour)
}

function getDate(dateStamp) {
    let date = dateStamp.substring(0,10);
    return date
}

function hoursWorkedOnDate (employeeRecord,dateStamp) {
    const correctDateTimeIns = employeeRecord.timeInEvents.filter(timeInEvent => timeInEvent.date === dateStamp);
    const correctDateTimeOuts = employeeRecord.timeOutEvents.filter(timeOutEvent => timeOutEvent.date === dateStamp);  
    let hoursWorked = 0;
    let latestTimeOut = 0;
    let earliestTimeIn = 2400;
    for (var i = 0; i < correctDateTimeIns.length; i++) {
        if (correctDateTimeOuts[i].hour > latestTimeOut) {
            latestTimeOut = correctDateTimeOuts[i].hour
        }
        if (correctDateTimeIns[i].hour < earliestTimeIn) {
            earliestTimeIn = correctDateTimeIns[i].hour
        }        
    };
    hoursWorked += (latestTimeOut - earliestTimeIn);

    return hoursWorked/100;
}

function wagesEarnedOnDate (employeeRecord,dateStamp) {
    let payOwed = 0;
    payOwed = hoursWorkedOnDate (employeeRecord,dateStamp) * employeeRecord.payPerHour;
    return payOwed
}

function allWagesFor (employeeRecord) {
    const workedDates = employeeRecord.timeInEvents.map(timeInEvent => timeInEvent.date);
    const uniqWorkedDates = [...new Set(workedDates)];
    let allWages = 0;
    for (var i = 0; i < uniqWorkedDates.length; i++) {
        allWages += wagesEarnedOnDate(employeeRecord,uniqWorkedDates[i])
    }
    return allWages
}

function findEmployeeByFirstName (employeeRecords,firstName) {
    const employeeObject = employeeRecords.find(employee => employee.firstName === firstName);
    return employeeObject
}

function calculatePayroll (employeeRecords) {
    let totalPayroll = 0;
    for (var i = 0; i < employeeRecords.length; i++) {
        totalPayroll += allWagesFor(employeeRecords[i]);
    }
    return totalPayroll
}
// Your code here

function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

function createEmployeeRecords(employeeArray) {
    return employeeArray.map(createEmployeeRecord);
};

function createTimeEvent(employee, time, kind) {
    let timeArray = time.split(' ');
    let timeRecord = {
        type: kind,
        date: timeArray[0],
        hour: parseInt(timeArray[1])
    };
    if (kind === "TimeIn") {
        employee.timeInEvents.push(timeRecord);
    } else if (kind === "TimeOut") {
        employee.timeOutEvents.push(timeRecord);
    };
    return employee;
};

function createTimeInEvent(employee, time) {
    return createTimeEvent(employee, time, "TimeIn");
};

function createTimeOutEvent(employee, time) {
    return createTimeEvent(employee, time, "TimeOut");
};

function hoursWorkedOnDate(employee, date) {
    function timeEvent(record) {return record.date === date};
    let timeIn = employee.timeInEvents.find(timeEvent).hour;
    let timeOut = employee.timeOutEvents.find(timeEvent).hour;
    return (timeOut - timeIn) / 100;
};

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
};

function allWagesFor(employee) {
    return employee.timeOutEvents.reduce(function(total, current) {
        return total + wagesEarnedOnDate(employee, current.date);
    }, 0);
};

function calculatePayroll(employeeArray) {
    return employeeArray.reduce(function(wages, employee) {
        return wages + allWagesFor(employee);
    }, 0);
};

function findEmployeeByFirstName(employees, name) {
    return employees.find(function(employee) {return employee.firstName === name});
};
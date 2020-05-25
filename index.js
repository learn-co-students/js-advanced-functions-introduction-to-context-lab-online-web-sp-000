// Your code here
let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row) {
        return createEmployeeRecord(row);
    });
};

let createTimeInEvent = function(employee, timeStamp) {
    let [date, hour] = timeStamp.split(" ");
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    return employee;
};

let createTimeOutEvent = function(employee, timeStamp) {
    let [date, hour] = timeStamp.split(" ");
    employee.timeOutEvents.push ({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    return employee;
};

let hoursWorkedOnDate = function(employee, desiredDate) {
    let inEvent = employee.timeInEvents.find(function(x){
        return x.date === desiredDate
    });

    let outEvent = employee.timeOutEvents.find(function(x){
        return x.date === desiredDate
    });

    return (outEvent.hour - inEvent.hour) / 100;
};

let wagesEarnedOnDate = function(employee, desiredDate) {
    let wage = hoursWorkedOnDate(employee, desiredDate) * employee.payPerHour;
    return parseFloat(wage.toString());
};

let allWagesFor = function(employee) {
    let eligibleDates = employee.timeInEvents.map(function(x){
        return x.date;
    });
    let payable = eligibleDates.reduce(function(memo, x){
        return memo + wagesEarnedOnDate(employee, x);
    }, 0);
    return payable;
};

let calculatePayroll = function(array) {
    return array.reduce(function(memo, x) {
        return memo + allWagesFor(x);
    }, 0);
};

let findEmployeeByFirstName = function(array, firstName) {
    return array.find(function(x) {
        return x.firstName === firstName
    });
};

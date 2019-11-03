// Your code here
function createEmployeeRecord(record) {
    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(createEmployeeObj) {
    return createEmployeeObj.map(record => {
        return createEmployeeRecord(record);
    });
}

function createTimeInEvent(employeeObj, clock) {

    // let [date, hour] = clock.split(' ')
    let date = clock.slice(0, 10);
    let hour = clock.slice(11, 15);

    employeeObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date,
    })

    return employeeObj;
}

function createTimeOutEvent(employeeObj, clock) {

    // let [date, hour] = clock.split(' ')
    let date = clock.slice(0, 10);
    let hour = clock.slice(11, 15);

    employeeObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date,
    })

    return employeeObj;
}

function hoursWorkedOnDate(employeeObj, date) {

    let clockedIn = employeeObj.timeInEvents.find(time => {
        return time.date === date;
    })

    let clockedOut = employeeObj.timeOutEvents.find(time => {
        return time.date === date;
    })

    return (clockedOut.hour - clockedIn.hour)/100;
}

function wagesEarnedOnDate(employeeObj, date) {
    let wages = hoursWorkedOnDate(employeeObj, date) * employeeObj.payPerHour;

    // return parseFloat(wages.toString());
    return wages;
}

function allWagesFor(employeeObj) {
    // let dates = employeeObj.timeInEvents.map(function(clockIn) {
    //     return clockIn.date;
    let dates = employeeObj.timeInEvents.map(clockIn => clockIn.date);

    let wagesEarned = dates.reduce(function(earned, date) {
        return earned + wagesEarnedOnDate(employeeObj, date)
    }, 0)

    return wagesEarned;
}

function findEmployeeByFirstName(employeeArray, name) {
    return employeeArray.find(employee => employee.firstName === name);
}

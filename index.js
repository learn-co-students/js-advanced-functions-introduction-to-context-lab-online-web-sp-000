function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

function createEmployeeRecords(array) {
    return array.map(subArray => createEmployeeRecord(subArray));
}

function createTimeInEvent(object, date) {
    object.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(date.split(' ')[1]),
        date: date.split(' ')[0]
    })
    return object;
}

function createTimeOutEvent(object, date) {
    object.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(date.split(' ')[1]),
        date: date.split(' ')[0]
    })
    return object;
}

function hoursWorkedOnDate(object, date) {
    let inEvent = object.timeInEvents.find(element => element.date === date);
    let outEvent = object.timeOutEvents.find(element => element.date === date);

    return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(object, date) {
    return hoursWorkedOnDate(object, date) * parseInt(object.payPerHour);
}

function allWagesFor(object) {
    let availableDates = object.timeInEvents.map(event => event.date);

    return availableDates.reduce((accumulator, date) => accumulator + wagesEarnedOnDate(object, date), 0);
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll(array) {
    return array.reduce(function(accumulator, employee) {
        return accumulator + allWagesFor(employee);
    }, 0);
}
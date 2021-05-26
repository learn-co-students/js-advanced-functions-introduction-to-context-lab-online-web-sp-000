// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(records) {
    return records.map(record => createEmployeeRecord(record));
}

function createTimeInEvent(person, time) {
    person.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time.split(" ")[1]),
        date: time.split(" ")[0]
    })
    return person;
}

function createTimeOutEvent(person, time) {
    person.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time.split(" ")[1]),
        date: time.split(" ")[0]
    })
    return person;
}

function hoursWorkedOnDate(person, date) {
    const timeInDay = person.timeInEvents.find(day => day.date === date);
    const timeOutDay = person.timeOutEvents.find(day => day.date === date);
    return ((timeOutDay.hour - timeInDay.hour) / 100);
}

function wagesEarnedOnDate(person, date) {
    return hoursWorkedOnDate(person, date) * person.payPerHour;
}

function allWagesFor(person) {
    let dates = person.timeInEvents.map(day => day.date);
    let allWages = dates.map(day => wagesEarnedOnDate(person, day));
    return allWages.reduce((total, day) => total += day);
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(employee => employee.firstName === name);
}

function calculatePayroll(employees) {
    let allWages = employees.map(employee => allWagesFor(employee));
    return allWages.reduce((total, wage) => total += wage);
}
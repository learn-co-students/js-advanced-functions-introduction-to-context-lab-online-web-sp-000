// const array = ['Sam', 'Johnson', 'janitor', 5];

function createEmployeeRecord(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

// createEmployeeRecord(array);

function createEmployeeRecords(employeeRowData) {
    return employeeRowData.map(function(row) {
        return createEmployeeRecord(row)
    })
}

function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

function hoursWorkedOnDate(employee, specificDate) {
    let inEvent = employee.timeInEvents.find(function (e) {
        return e.date === specificDate
    })
    let outEvent = employee.timeOutEvents.find(function (e) {
        return e.date === specificDate
    })
    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employee, specificDate) {
    let wage = hoursWorkedOnDate(employee, specificDate)
        * employee.payPerHour
    return parseFloat(wage.toString())
}

function allWagesFor(employee) {
    let daysWorked = employee.timeInEvents.map(function(e) {
        return e.date
    })
    let payable = daysWorked.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return payable;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(e) {
        return e.firstName === firstName;
    })
}

function calculatePayroll(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function (memo, rec) {
        return memo + allWagesFor(rec)
    }, 0)
}
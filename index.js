// Your code here
let createEmployeeRecord = function (arr) {
       return { 
           firstName: arr[0],
           familyName:  arr[1],
           title: arr[2],
           payPerHour: arr[3],
           timeInEvents: [],
           timeOutEvents: []
        }
}

let createEmployeeRecords = function (employeeData) {
    return employeeData.map(function(arr) {
        return createEmployeeRecord(arr);
    });
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

function hoursWorkedOnDate(employee, workDate) {
    let startTime = employee.timeInEvents.find(function (e) {
        return e.date === workDate;
    });
    let endTime = employee.timeOutEvents.find( function(e) {
        return e.date === workDate;
    })
    return (endTime.hour - startTime.hour)/100;
}

function wagesEarnedOnDate(employee, hoursWorked) {
    let wageNum = hoursWorkedOnDate(employee, hoursWorked) * employee.payPerHour
    return parseFloat(wageNum.toString())
}

function allWagesFor(employee) {
    let workedDates = employee.timeInEvents.map(function(e) {
        return e.date
    })
    let payDate = workedDates.reduce(function (total, d) {
        return total + wagesEarnedOnDate(employee, d)
    }, 0)
    return payDate
}

function calculatePayroll(arr) {
    return arr.reduce(function (total, pay) {
        return total + allWagesFor(pay)
    }, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(n => n.firstName === firstName)
}
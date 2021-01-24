// Your code here
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
function createEmployeeRecords(arrOfEmployees) {
    return arrOfEmployees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent( employee, dateStamp) {
    let timeArray = dateStamp.split(" ")

    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(timeArray[1],10),
        date: timeArray[0]
    }
    employee.timeInEvents.push(timeInEvent)
    return employee
}

function createTimeOutEvent(employee, dateStamp) {

    let splitDateStamp = dateStamp.split(" ")

    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(splitDateStamp[1],10),
        date: splitDateStamp[0]
    }
    employee.timeOutEvents.push(timeOutEvent)
    return employee
}

function hoursWorkedOnDate(employee, date) {
    let punchIn = employee.timeInEvents.find(element => element.date === date);
    let punchOut = employee.timeOutEvents.find(element => element.date === date);

    let hoursWorked = (punchOut.hour - punchIn.hour)/100
    return hoursWorked
}

function wagesEarnedOnDate(employee, date) {
    let wagesOwed = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return wagesOwed
}

function allWagesFor(employee) {
    let daysWorked = employee.timeOutEvents.map(day => day.date);
    let wagesWorked = daysWorked.map(date => wagesEarnedOnDate(employee, date));
    let totalWages = wagesWorked.reduce(((total, pay) => total + pay),0);
    return totalWages;
}


function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName)
}

function calculatePayroll(arrEmployees) {
    let wagesFor = function(total, pay) { 
        return total + allWagesFor(pay)};
    let allWages = arrEmployees.reduce(wagesFor, 0);
    return allWages
}
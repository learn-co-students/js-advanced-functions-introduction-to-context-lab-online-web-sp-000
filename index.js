// Your code here

//the argument array by index:
// 0: fName
// 1: lName
// 2: title
// 3: pay rate per hour
function createEmployeeRecord(employeeArray) {
    const employeeObject = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeObject;
}

function createEmployeeRecords(employeesArray) {
    return employeesArray.map((employeeArray) => {
        return createEmployeeRecord(employeeArray)
    })
}

// dateStamp format- "YYYY-MM-DD HHMM"
function createTimeInEvent(employeeObject, dateStamp) {
    const dateStampArray = dateStamp.split(' ');
    const date = dateStampArray.slice(0,1).join('');
    const time = parseInt(dateStampArray.slice(-1).join(''), 10);
    const timeInObject = {
        type: "TimeIn",
        hour: time,
        date: date
    };
    employeeObject.timeInEvents.push(timeInObject);
    return employeeObject;
}

function createTimeOutEvent(employeeObject, dateStamp) {
    const dateStampArray = dateStamp.split(' ');
    const date = dateStampArray.slice(0,1).join('');
    const time = parseInt(dateStampArray.slice(-1).join(''), 10);
    const timeInObject = {
        type: "TimeOut",
        hour: time,
        date: date
    };
    employeeObject.timeOutEvents.push(timeInObject);
    return employeeObject;
}

function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find((ele) => {
        return ele.date === date
    })
    const timeOutEvent = employee.timeOutEvents.find((ele) => {
        return ele.date === date
    })
    const timeInHour = timeInEvent.hour
    const timeOutHour = timeOutEvent.hour
    console.log
    return Math.round((timeOutHour - timeInHour) / 100)
}

function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}


function allWagesFor(employee) {
    const wagesEarnedArray = employee.timeInEvents.map ((event) => {
        return wagesEarnedOnDate(employee, event.date)
    })
    return wagesEarnedArray.reduce((total, wages) => total = total + wages, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName)
}

function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total = total + allWagesFor(employee), 0);
}
// Your code here

function createEmployeeRecord(array) { 
    let obj = {};
    [obj.firstName, obj.familyName, obj.title, obj.payPerHour] = array
    obj.timeInEvents = []
    obj.timeOutEvents = []
    return obj;
}

function createEmployeeRecords(arrays) {
    let returnArray = []
    arrays.forEach(element => {
        returnArray.push(createEmployeeRecord(element))
    });
    return returnArray
  }

function createTimeInEvent(obj, time) {
    let timeIn = {};
    let a = time.split(' ');
    timeIn.date = a[0];
    timeIn.hour = parseInt(a[1]);
    timeIn.type = 'TimeIn';
    obj.timeInEvents.push(timeIn);
    return obj
}

function createTimeOutEvent(obj, time) {
    let timeOut = {};
    let a = time.split(' ');
    timeOut.date = a[0];
    timeOut.hour = parseInt(a[1]);
    timeOut.type = 'TimeOut';
    obj.timeOutEvents.push(timeOut);
    return obj;
}

function hoursWorkedOnDate(obj, date) {
    let hourIn = obj.timeInEvents.find(e => e.date === date);
    let hourOut = obj.timeOutEvents.find(e => e.date === date);
    return (hourOut.hour - hourIn.hour) / 100;
}

function wagesEarnedOnDate(obj, date) {
    return hoursWorkedOnDate(obj, date) * obj.payPerHour;
}

function allWagesFor(obj) {
    let returnTotal = 0;
    obj.timeInEvents.forEach(event => {
       returnTotal += wagesEarnedOnDate(obj, event.date);
    })
    return returnTotal;
}

function calculatePayroll(array) {
    let returnTotal = 0;
    array.forEach(employee => {
        returnTotal += allWagesFor(employee)
    })
    return returnTotal;
}

function findEmployeeByFirstName(array, name) {
    return array.find(obj => name === obj.firstName)
}








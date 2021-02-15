// Your code here

function createEmployeeRecord(employeeData) {
    const employee = {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employee
}

function createEmployeeRecords(arrOfData) {
   return arrOfData.map(data => createEmployeeRecord(data))
}

function createTimeInEvent(employeeRecordObj, dateStamp) {
    let theDate = dateStamp.split(" ")[0];
    let theHour = parseInt(dateStamp.split(" ")[1]);
    employeeRecordObj.timeInEvents.push({
        type: "TimeIn",
        date: theDate, 
        hour: theHour
    });
     return employeeRecordObj
}

function createTimeOutEvent(employeeRecordObj, dateStamp) {
    let theDate = dateStamp.split(" ")[0];
    let theHour = parseInt(dateStamp.split(" ")[1]);
    employeeRecordObj.timeOutEvents.push({
        type: "TimeOut",
        date: theDate, 
        hour: theHour
    });
     return employeeRecordObj
}

function hoursWorkedOnDate(employeeRecordObj, dateStamp) {
    const timeInEvent = employeeRecordObj.timeInEvents.find(e => e.date === dateStamp);
    const timeOutEvent = employeeRecordObj.timeOutEvents.find(e => e.date === dateStamp);
    const r = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return r
}

function wagesEarnedOnDate(employeeRecordObj, dateStamp) {
    const hoursWorked = hoursWorkedOnDate(employeeRecordObj, dateStamp);
    return hoursWorked * (employeeRecordObj.payPerHour)
}

function allWagesFor(employeeRecordObj) {
    const dateWorked = employeeRecordObj.timeInEvents.map(e => e.date);
    const wages = dateWorked.map(d => wagesEarnedOnDate(employeeRecordObj, d));
    return wages.reduce((total, wage) => total + wage, 0);
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => {
       if (employee.firstName === firstName) {
           return employee;
       } else {
           return undefined;
       }
    });
}

function calculatePayroll(arrOfEmployee) {
   const employeeWages = arrOfEmployee.map(employee => allWagesFor(employee));
   return employeeWages.reduce((total, wage) => total + wage, 0);
}
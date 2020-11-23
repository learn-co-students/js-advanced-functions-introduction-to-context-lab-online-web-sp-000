function createEmployeeRecord(employeeArray){
    return {firstName: employeeArray[0], familyName: employeeArray[1], title: employeeArray[2], payPerHour: employeeArray[3], timeInEvents: [], timeOutEvents: []};
}

function createEmployeeRecords(recordArrays){
    return recordArrays.map(function(e){
        return createEmployeeRecord(e)
    })
}

function createTimeInEvent(employee, date){
    const timeArray = employee.timeInEvents
    const dateArray = date.split(' ');

    timeArray.push({
        type: "TimeIn",
        hour: parseInt(dateArray[1], 10),
        date: dateArray[0]
        
    }) 
    return employee;
}

function createTimeOutEvent(employee, date){
    const timeArray = employee.timeOutEvents
    const dateArray = date.split(' ');

    timeArray.push({
        type: "TimeOut",
        hour: parseInt(dateArray[1], 10),
        date: dateArray[0]
        
    }) 
    return employee;
}

function hoursWorkedOnDate(employee, date){
    console.log(employee)
    let timeIn = employee.timeInEvents.find(events => events.date == date);
    let timeOut = employee.timeOutEvents.find(events => events.date == date);
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, date){
    return (hoursWorkedOnDate(employee, date) * employee.payPerHour)
}

function allWagesFor(employee){
    let timeInArray = employee.timeInEvents;
    let timeOutArray = employee.timeOutEvents;

    let dates = employee.timeInEvents.map(event => event.date);
    return dates.reduce(function(acc, date){
        return acc + wagesEarnedOnDate(employee, date);
    }, 0)
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(name => name.firstName == firstName);
}

function calculatePayroll(employeeRecords){
    return employeeRecords.reduce(function(acc, record){
        return acc + allWagesFor(record)
    }, 0)
}

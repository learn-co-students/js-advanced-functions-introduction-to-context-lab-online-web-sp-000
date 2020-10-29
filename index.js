function createEmployeeRecord(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};


function createEmployeeRecords(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
};


function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
};


function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push ({
        type: "TimeOut",
        hour: parseInt(hour,10),
        date
    })
    return employee
};


function hoursWorkedOnDate(employee, wantedDate) {
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === wantedDate
    })
    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === wantedDate
    })
    return (outEvent.hour - inEvent.hour) / 100
};


function wagesEarnedOnDate(employee, wantedDate){
    let wage = hoursWorkedOnDate(employee, wantedDate) * employee.payPerHour
    return parseFloat( wage.toString() )
};


function allWagesFor(employee) {
    let workingDays = employee.timeInEvents.map(function(e) {
        return e.date
    }) 
    let payable = workingDays.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return payable
};


function findEmployeeByFirstName(src, firstName) {
    return src.find(function(rec){
        return rec.firstName === firstName
    })
};


function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
};
// Your code here
function createEmployeeRecord(array){
    return {firstName: array[0], familyName: array[1], title: array[2], payPerHour: array[3], timeInEvents: [], timeOutEvents: []};
}

function createEmployeeRecords(array){
    return array.map(function(addToArray){
        return createEmployeeRecord(addToArray)
    })

}

function createTimeInEvent(object, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    object.timeInEvents.push({type: "TimeIn", hour: parseInt(hour, 10), date, })
    return object
}

function createTimeOutEvent(object, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    object.timeOutEvents.push({type: "TimeOut", hour: parseInt(hour, 10), date, })
    return object
}

function hoursWorkedOnDate(employeeRecord, date){
    let matchDate = function(day) {return day.date === date}
    let timeIn = employeeRecord.timeInEvents.find(matchDate).hour;
    let timeOut = employeeRecord.timeOutEvents.find(matchDate).hour;

    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employeeRecord, date){
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(record){

}

function findEmployeeByFirstName(array, firstName){

}

function calculatePayroll(array){

}
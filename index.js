// Your code here
function createEmployeeRecord(array, timeIn, timeOut){
    let object = {}
    object.firstName =array[0]
    object.familyName = array[1]
    object.title = array[2]
    object.payPerHour = array[3]
    object.timeInEvents = []
    object.timeOutEvents = []
    return object
}

function createEmployeeRecords(array) {
    let records = array.map(element => createEmployeeRecord(element))
    return records
}

function createTimeInEvent (record, time){
    let [datetime, hourtime] = time.split(" ");
    record.timeInEvents.push({type:"TimeIn", hour:parseInt(hourtime), date:datetime})
    return record
}

function createTimeOutEvent (record, time){
    let [datetime, hourtime] = time.split(" ");
    record.timeOutEvents.push({type:"TimeOut", hour:parseInt(hourtime), date:datetime})
    return record
}

function hoursWorkedOnDate (record, time){
    let timeIn = record.timeInEvents.find(function(e){
        return e.date === time
    })
    let timeOut = record.timeOutEvents.find(function(e){
        return e.date === time
    })  
    return (timeOut.hour - timeIn.hour)/100
}
function wagesEarnedOnDate (record, time){
    let hours = hoursWorkedOnDate(record, time)
    return hours * record.payPerHour
}

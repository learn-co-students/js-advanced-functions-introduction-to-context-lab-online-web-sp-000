// Your code here
function createEmployeeRecord(array, timeIn, timeOut){
    let object = {}
    object.firstName =array[0]
    object.familyName = array[1]
    object.title = array[2]
    object.payPerHour = array[3]
    object.timeInEvents = timeIn || []
    object.timeOutEvents = timeOut || []
    return object
}

function createEmployeeRecords(array) {
    let records = array.map(element => createEmployeeRecord(element))
    return records
}

function createTimeInEvent (record, time){
    createEmployeeRecord(record, time)
}
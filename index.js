// Your code here
function createEmployeeRecord(arr){
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arr){
    return arr.map(function(x){
        return createEmployeeRecord(x)
    })
}

function createTimeInEvent(record, timeStr){
    let timeIn = {type: "TimeIn", date: timeStr.split(" ")[0], hour: parseInt(timeStr.split(" ")[1], 10)}
    record.timeInEvents.push(timeIn)
    return record
}

function createTimeOutEvent(record, timeStr){
    let timeOut = {type: "TimeOut", date: timeStr.split(" ")[0], hour: parseInt(timeStr.split(" ")[1], 10)}
    record.timeOutEvents.push(timeOut)
    return record
}

function hoursWorkedOnDate(record, dateStr){
    let dateObjIn = record.timeInEvents.find(x => x.date == dateStr)
    let dateObjOut = record.timeOutEvents.find(x => x.date == dateStr)
    return ((dateObjOut.hour - dateObjIn.hour) / 100)

}

function wagesEarnedOnDate(record, dateStr){
    let hours = hoursWorkedOnDate(record, dateStr)
    return hours * record.payPerHour
}

function allWagesFor(record){
    let total = 0
    let len = record.timeInEvents.length
    for (let i = 0; i < len; i++ ){
        if (hoursWorkedOnDate(record, record.timeInEvents[i].date) != undefined){
            total += wagesEarnedOnDate(record, record.timeInEvents[i].date)
        }
    }
    return total
}

function calculatePayroll(recordArr){
    let pays = recordArr.map(x => allWagesFor(x)) 
    return pays.reduce( (total, ele) => total += ele, 0)
}

function findEmployeeByFirstName(recordsArr, name){
   return recordsArr.find(x => x.firstName == name)
}
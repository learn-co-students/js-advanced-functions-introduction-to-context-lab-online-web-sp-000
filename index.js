// Your code here

function createEmployeeRecord(record){
    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(recordArr){
    return recordArr.map( record => {
        return createEmployeeRecord(record)
    })
}

function createTimeInEvent(recordObj, dateStr){
    recordObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStr.slice(-4)),
        date: dateStr.slice(0,10)
    })
    
    return recordObj
}
function createTimeOutEvent(recordObj, dateStr){
    recordObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStr.slice(-4)),
        date: dateStr.slice(0,10)
    })
    return recordObj
}

function hoursWorkedOnDate(recordObj, date){
    let timeIn = recordObj.timeInEvents.find( e => e.date === date).hour
    let timeOut = recordObj.timeOutEvents.find( e => e.date === date).hour
    
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(recordObj, date){
    return hoursWorkedOnDate(recordObj, date) * recordObj.payPerHour
}

function allWagesFor(recordObj){
    //get all dates for employee
    let allDates = recordObj.timeInEvents.map( e => {return e.date})
    console.log(allDates.length)
    return allDates.reduce((acc, d) => acc+wagesEarnedOnDate(recordObj,d),0)

}

function findEmployeeByFirstName(srcArray, firstname){
    return srcArray.find( emp => emp.firstName === firstname)
}

function calculatePayroll(srcArray){
    return srcArray.reduce((acc, emp)=> acc+allWagesFor(emp),0) 
}


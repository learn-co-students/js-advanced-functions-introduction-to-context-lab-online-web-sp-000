function createEmployeeRecord(array){
    const r = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }

    return r
}

function createEmployeeRecords(arrays){
   return arrays.map(array=> createEmployeeRecord(array))
}

function createTimeInEvent(empRecord, dateStamp){
    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0,10)
    }
    empRecord.timeInEvents.push(timeInEvent)
    return empRecord
}

function createTimeOutEvent(empRecord, dateStamp){
    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0,10)
    }
    empRecord.timeOutEvents.push(timeOutEvent)
    return empRecord
}

function hoursWorkedOnDate(empRecord, date){
    const timeIn = empRecord.timeInEvents.find(t=>t.date === date).hour
    const timeOut = empRecord.timeOutEvents.find(t=>t.date === date).hour
    return (timeOut- timeIn)/100
}

function wagesEarnedOnDate(empRecord,date){
    const hour = hoursWorkedOnDate(empRecord, date)
    return empRecord.payPerHour * hour
}

function allWagesFor(empRecord){
    const wages = []
    empRecord.timeInEvents.map(t=>{
        wages.push(wagesEarnedOnDate(empRecord, t.date))
    })
    
    return wages.reduce((accumulator, currentValue)=>accumulator + currentValue)
}

function findEmployeeByFirstName(scrArray, firstName){
    return scrArray.find(a=>a.firstName === firstName)
}

function calculatePayroll(emprecords){
    const allWages = []
    emprecords.map(empRecord=>allWages.push(allWagesFor(empRecord)))
    return allWages.reduce((accumulator, currentValue)=>accumulator + currentValue)
}
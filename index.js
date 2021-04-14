// Your code here
function createEmployeeRecord(array){
    return { 
        firstName: array[0], familyName: array[1], title: array[2], payPerHour: array[3], timeInEvents: [], timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfArrays){
    const empRecords = []
    arrayOfArrays.map(array =>empRecords.push(createEmployeeRecord(array)))
    return empRecords

}

function createTimeInEvent(empRecord, dateTimeStamp){
    const splitStamp = dateTimeStamp.split(' ')

    empRecord.timeInEvents.push({type: 'TimeIn', hour: parseInt(splitStamp[1]), date: splitStamp[0]})

    return empRecord
}

function createTimeOutEvent(empRecord, dateTimeStamp){
    const splitStamp = dateTimeStamp.split(' ')

    empRecord.timeOutEvents.push({type: 'TimeOut', hour: parseInt(splitStamp[1]), date: splitStamp[0]})
    
    return empRecord
}

function hoursWorkedOnDate(empRecord, dateStamp){
    const timeIn = empRecord.timeInEvents.find(stamp => stamp.date == dateStamp).hour
    const timeOut = empRecord.timeOutEvents.find(stamp => stamp.date == dateStamp).hour
    return (timeOut-timeIn)/100
}

function wagesEarnedOnDate(empRecord, dateStamp){
    return empRecord.payPerHour * hoursWorkedOnDate(empRecord, dateStamp)
}

function allWagesFor(empRecord){
   return empRecord.timeInEvents.map(time => wagesEarnedOnDate(empRecord, time.date)).reduce((accumulator,currentValue)=> accumulator + currentValue)
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(array => array.firstName === firstName)
}

function calculatePayroll(array){
    return array.map(item => allWagesFor(item)).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
}


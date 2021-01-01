// Your code here
function createEmployeeRecord(recordArr) {
    // firstName, familyName, title, payPerHour
   return {
       firstName: recordArr[0], 
       familyName: recordArr[1], 
       title: recordArr[2],
       payPerHour: recordArr[3],
       timeInEvents: [], 
       timeOutEvents: [] 
   }
}

function createEmployeeRecords(recordArrs) {
    return recordArrs.map(recordArr => createEmployeeRecord(recordArr));
}

function createTimeInEvent(recordObj, dateStamp) {
    const timeInEvent = {
        type: 'TimeIn',
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    }

    recordObj.timeInEvents.push(timeInEvent); 
    return recordObj;
}

function createTimeOutEvent(recordObj, dateStamp) {
    const timeOutEvent = {
        type: 'TimeOut', 
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    }

    recordObj.timeOutEvents.push(timeOutEvent); 
    return recordObj; 
}

function hoursWorkedOnDate(recordObj, date) {
    const timeIn = recordObj.timeInEvents.find(timeInEvent => timeInEvent.date === date).hour;
    const timeOut = recordObj.timeOutEvents.find(timeOutEvent => timeOutEvent.date === date).hour; 
    return (timeOut - timeIn) / 100; 
}

function wagesEarnedOnDate(recordObj, date) {
    const hours = hoursWorkedOnDate(recordObj, date); 
    return hours * recordObj.payPerHour; 
}

function allWagesFor(recordObj) {
    return recordObj.timeInEvents.reduce((total, timeInEvent) => total + wagesEarnedOnDate(recordObj, timeInEvent.date), 0 )
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(recordObj => recordObj.firstName === firstName); 
}

function calculatePayroll(recordObjs) {
    return recordObjs.reduce((total, recordObj) => total + allWagesFor(recordObj), 0); 
}
// Your code here

function createEmployeeRecord(array) {
    let obj = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj
}

function createEmployeeRecords(arrayOfArrays) {
    let arrayOfObjects = []
    arrayOfArrays.forEach(element => {
        arrayOfObjects.push(createEmployeeRecord(element))
    })
    return arrayOfObjects
}

function createTimeInEvent(obj, timeStamp) {
    let hour = parseInt(timeStamp.split(' ')[1])
    let date = timeStamp.split(' ')[0]
    obj.timeInEvents.push({type: "TimeIn", hour: hour, date: date})
    return obj
}

function createTimeOutEvent(obj, timeStamp) {
    let hour = parseInt(timeStamp.split(' ')[1])
    let date = timeStamp.split(' ')[0]
    obj.timeOutEvents.push({type: "TimeOut", hour: hour, date: date})
    return obj
}

function hoursWorkedOnDate(obj, timeStamp) {
    let timeIn = obj.timeInEvents.find(x => x.date === timeStamp)
    let timeOut = obj.timeOutEvents.find(x => x.date === timeStamp)
    let timePut = (timeOut.hour - timeIn.hour) / 100
    return timePut
}

function wagesEarnedOnDate(obj, timeStamp) {
    return hoursWorkedOnDate(obj, timeStamp) * obj.payPerHour
}

function allWagesFor(obj) {
    let allDates = obj.timeInEvents.map(function(event) {
        return event.date
    })
    let wagesOwed = allDates.reduce(function(memo, x) {
        return memo + wagesEarnedOnDate(obj, x)
    }, 0)
    return wagesOwed
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(x => {return x.firstName === firstName})
}

function calculatePayroll(array){
    let sum = array.map((e) => allWagesFor(e))
    return sum.reduce((num, sum) => num + sum)
}

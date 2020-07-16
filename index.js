function createEmployeeRecord(array){
    const obj = {
        firstName: `${array[0]}`,
        familyName: `${array[1]}`,
        title: `${array[2]}`,
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return obj
}


function createEmployeeRecords(arrayOfObjects){
    return arrayOfObjects.map(e => createEmployeeRecord(e))
}

function createTimeInEvent(obj, dateStamp){
    let event = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1], 10),
        date: dateStamp.split(" ")[0]
    }
    obj.timeInEvents.push(event)
    return obj
}

function createTimeOutEvent(obj, dateStamp) {
    let event = {
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1], 10),
        date: dateStamp.split(" ")[0],
    }
    obj.timeOutEvents.push(event)
    return obj
}


function hoursWorkedOnDate(obj, date) {
    let timeIn = obj.timeInEvents.find(e => e.date === date)
    let timeOut = obj.timeOutEvents.find(e => e.date === date)

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(obj, date) {
    const hoursWorked = hoursWorkedOnDate(obj, date)
    return hoursWorked * obj.payPerHour
}


function allWagesFor(obj){
    const dates = obj.timeInEvents.map(e => e.date)
    const wage = dates.reduce((total, element) => wagesEarnedOnDate(obj, element) + total, 0)
    return wage
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(e => e.firstName === firstName)
}


function calculatePayroll(array){
    return array.reduce((total, element) => allWagesFor(element) + total, 0)
}
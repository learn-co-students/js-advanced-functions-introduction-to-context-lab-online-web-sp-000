// Your code here

function createEmployeeRecord(array) {

    let hash = {}
    hash.firstName = array[0]
    hash.familyName = array[1]
    hash.title = array[2]
    hash.payPerHour = array[3]
    hash.timeInEvents = []
    hash.timeOutEvents = []

    return hash
}

function createEmployeeRecords(arrays) {

    let records = []
    for (let i = 0; i < arrays.length; i++) {
        //debugger
        let record = {}
        record.firstName = arrays[i][0]
        record.familyName = arrays[i][1]
        record.title = arrays[i][2]
        record.payPerHour = arrays[i][3]
        record.timeInEvents = []
        record.timeOutEvents = []
        records.push(record)
    }

    return records
}

function createTimeInEvent(record, timeIn) {

    let timeInEvent = {}
    timeInEvent.type = "TimeIn"
    timeInEvent.date = timeIn.split(' ')[0]
    timeInEvent.hour = parseInt(timeIn.split(' ')[1])
    record.timeInEvents.push(timeInEvent)

    return record
}

function createTimeOutEvent(record, timeOut) {

    let timeOutEvent = {}
    timeOutEvent.type = "TimeOut"
    timeOutEvent.date = timeOut.split(' ')[0]
    timeOutEvent.hour = parseInt(timeOut.split(' ')[1])
    record.timeOutEvents.push(timeOutEvent)

    return record
}

let hoursWorkedOnDate = function(employee, soughtDate){
    // let timeIn = 0
    // let timeOut = 0
    // for (const timeInEvent of record.timeInEvents) {
    //     if (timeInEvent.date === date) {
    //         timeIn = timeInEvent.hour

    //     }
    // }

    // for (const timeOutEvent of record.timeOutEvents) {
    //     //debugger
    //     if (timeOutEvent.date === date) {
    //         timeOut = timeOutEvent.hour

    //     }
    // }

    // // if (record.firstName === "Natalia") {
    // //     console.log("Time out " + timeOut)
    // //     console.log("Time in " + timeIn)
    // // }
    

    // return (timeOut - timeIn) / 100

    
        let inEvent = employee.timeInEvents.find(function(e){
            return e.date === soughtDate
        })
    
        let outEvent = employee.timeOutEvents.find(function(e){
            return e.date === soughtDate
        })
    
        return (outEvent.hour - inEvent.hour) / 100
}


function wagesEarnedOnDate(record, date) {
    let hoursWorked = hoursWorkedOnDate(record, date)

    return record.payPerHour * hoursWorked
}

function allWagesFor(record) {

    return record.timeOutEvents.reduce(function (totalWages, timeOutEvent) {
        //debugger
        let wage = wagesEarnedOnDate(record, timeOutEvent.date)
        console.log(record.firstName + " Daily wage: " + wage + " Hours worked: " + hoursWorkedOnDate(record, timeOutEvent.date) );
        return totalWages + wage
    }, 0)
}

function calculatePayroll(employees) {


    return employees.reduce(function (totalPayroll, employee) {

        let employeeWage = allWagesFor(employee)

        console.log("Payroll for " + employee.firstName + " " + employeeWage)
        return totalPayroll + employeeWage
    }, 0)
}

function findEmployeeByFirstName(employees, firstname) {
    return employees.find( employee => employee.firstName === firstname)
}
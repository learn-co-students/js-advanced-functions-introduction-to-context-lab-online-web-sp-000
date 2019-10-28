// Your code here

// let record = {
//     firstName: element[0],
//     familyName: element[1],
//     title: element[2],
//     payPerHour: element[3],
//     timeInEvents: [],
//     timeOutEvents: []
// }

//define a function createEmployeeRecord
function createEmployeeRecord(element) {
    //that returns an object of keys with a value of elements of an array properties
        return {
        firstName: element[0],
        familyName: element[1],
        title: element[2],
        payPerHour: element[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    
}
//define the function createEmployeeRecord
function createEmployeeRecords(empRecords) {
    //create a new array resulting from nested array of emp records
    return empRecords.map(function(twoRows){
        return createEmployeeRecord(twoRows)
    })

}
// let createTimeInEvent = function (employee, dateStamp) { /* */ }
let createTimeInEvent = function (employee, dateStamp) {
    //split the strings of dateStamp 
    let [date, hour] = dateStamp.split(' ')
    //push the keys and vaulues into the employees object
    //Add an Object with keys to the timeInEvents Array on the record Object
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    //The employee record
    return employee
}


// let createTimeOutEvent = function (employee, dateStamp) { /* */ }
//same as above, just push key value for "TimeOut"
let createTimeOutEvent = function (employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    //The employee record
    return employee
}

// let hoursWorkedOnDate = function (employee, soughtDate) { /* */ }
//let function equal two input employee and dateForm
let hoursWorkedOnDate = function (employee, dateForm) {
    //find the number of hours elapsed between that date's timeInEvent and timeOutEvent
    let inEvent = employee.timeInEvents.find(function (emp) {
        return emp.date === dateForm
    })
    //find the number of hours elapsed between that date's timeInEvent and timeOutEvent
    let outEvent = employee.timeOutEvents.find(function (emp) {
        return emp.date === dateForm
    })
    //reutn hours worked devided by 100
    return (outEvent.hour - inEvent.hour) / 100
}

//let wagesEarnedOnDate = function (employee, dateSought) {/* */}
let wagesEarnedOnDate = function (employee, dateSought) {
    //Using hoursWorkedOnDate, multiply the hours by the record's 
    //payRate to determine amount owed. 
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
        //Amount should be returned as a number
        //return the string into an integer 
    return parseFloat(rawWage.toString())
}

let allWagesFor = function (employee) {
    //create second array nonmutated 
    let eligibleDates = employee.timeInEvents.map(function (emp) {
        //return employee date 
        return emp.date
    })
    //reduce, amount owed 
    let payable = eligibleDates.reduce(function (a, b) {
        return a + wagesEarnedOnDate(employee, b)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find(function (rec) {
        return rec.firstName === firstName
    })
}

let calculatePayroll = function (arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function (memo, rec) {
        return memo + allWagesFor(rec)
    }, 0)
}
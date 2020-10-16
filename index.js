// Your code here

const createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function(empRowData) {
    return empRowData.map(function(row){
    return createEmployeeRecord(row)
    }) 
}

const createTimeInEvent = function(employee, dateString) {
    let [date, hour] = dateString.split(" ")

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

const createTimeOutEvent = function(employee, dateString) {
    let [date, hour] = dateString.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

const hoursWorkedOnDate = function(employee, dateString) {
    const inEvent = employee.timeInEvents.find(function(e) {
        return e.date === dateString
    })
    const outEvent = employee.timeOutEvents.find(function(e) {
        return e.date === dateString
    })

    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = function(employee, dateString) {
    let payment = hoursWorkedOnDate(employee, dateString) * employee.payPerHour
    return parseFloat(payment.toString())
}

const allWagesFor = function(employee) {
    let possibleDates = employee.timeInEvents.map(function(e) {
        return e.date
    })
    let payable = possibleDates.reduce(function(memo, date) {
        return memo + wagesEarnedOnDate(employee, date)}, 0)
    
        return payable
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(record) {
        return record.firstName === firstName
    })
}

const calculatePayroll = function(recs) {
    return recs.reduce(function(memo, rec) {
        return memo + allWagesFor(rec)}, 0)
}
// Your code here
function createEmployeeRecord(array){
    
    let object = {
        firstName: array[0], 
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }

    return object
}

function createEmployeeRecords(array){
    let records = []

    array.forEach(function(employee){
        records.push(createEmployeeRecord(employee))
    })

    return records
}

function createTimeInEvent(employeeRecord, timeString){
    let punchArray = timeString.split(' ')

    employeeRecord.timeInEvents.push(
        {
            type: "TimeIn",
            date: punchArray[0],
            hour: parseInt(punchArray[1])

        }) 

    return employeeRecord
}

function createTimeOutEvent(employeeRecord, timeString){
    let punchArray = timeString.split(' ')

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        date: punchArray[0],
        hour: parseInt(punchArray[1])
    })

    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    let hourIn = employeeRecord.timeInEvents.filter(function(event){
        return event.date === date
    })

    let hourOut = employeeRecord.timeOutEvents.filter(function(event){
        return event.date === date
    })

    return (hourOut[0].hour - hourIn[0].hour) / 100
}

function wagesEarnedOnDate(employeeRecord, date){
    let hours = hoursWorkedOnDate(employeeRecord, date)
    return employeeRecord.payPerHour * hours
}

function allWagesFor(employeeRecord){
    let wages = 0

    employeeRecord.timeInEvents.forEach(function(event){
        wages += wagesEarnedOnDate(employeeRecord, event.date)
    })

    return wages
}

function calculatePayroll(employees){
    let allWages = 0

    employees.forEach(function(employee){
        allWages += allWagesFor(employee)
    })

    return allWages
}

function findEmployeeByFirstName(records, firstName){
    let record = records.filter(function(element){
        return element.firstName === firstName
    })

    return record[0]
}


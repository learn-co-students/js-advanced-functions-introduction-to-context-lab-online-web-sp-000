// Your code here

function createEmployeeRecord(infoArray){
    let infoObject = {
        firstName: infoArray[0],
        familyName: infoArray[1], 
        title: infoArray[2], 
        payPerHour: infoArray[3],
        timeInEvents : [],
        timeOutEvents : []
    }
    return infoObject
}

function createEmployeeRecords(employees){
    let employeeRecords = employees.map(employee => createEmployeeRecord(employee))
    return employeeRecords
}

function createTimeInEvent(employeeRecord, timeStamp){
    let hour = parseInt(timeStamp.substring(11,15))
    let date = timeStamp.substring(0,10)

    employeeRecord.timeInEvents.push( {type: "TimeIn", hour: hour, date: date })

    return employeeRecord

}

function createTimeOutEvent(employeeRecord, timeStamp){
    let hour = parseInt(timeStamp.substring(11,15))
    let date = timeStamp.substring(0,10)

    employeeRecord.timeOutEvents.push( {type: "TimeOut", hour: hour, date: date })

    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    let hourIn
    let hourOut
    let timeIn = employeeRecord.timeInEvents.filter(timeInEvent => {
        if (timeInEvent.date === date){
            hourIn = timeInEvent.hour
        }
    })

    let timeOut = employeeRecord.timeOutEvents.filter(timeOutEvent => {
        if (timeOutEvent.date === date){
            hourOut = timeOutEvent.hour
        }
    })

    return (hourOut - hourIn)/100

}

function wagesEarnedOnDate(employeeRecord, date){
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    let wages = employeeRecord.payPerHour * hoursWorked

    return wages
}

function allWagesFor(employeeRecord){
    let allDates = employeeRecord.timeInEvents.map(timeInEvent => timeInEvent.date)
    let wages = allDates.map(date => wagesEarnedOnDate(employeeRecord, date))
    let totalWages = wages.reduce((total, wage)=> wage + total)

    return totalWages
}

function calculatePayroll(employees){
    let payArray = employees.map(employee=> allWagesFor(employee))
    let totalPay = payArray.reduce((total, wage) => wage+total)

    return totalPay
}

function findEmployeeByFirstName(srcArray, firstName){
    let employee

    srcArray.filter(n =>{
        if (n.firstName === firstName){
            employee = n
        }
    })

    return employee
}
// Your code here

function createEmployeeRecord(array) { 
    return { 
    firstName: array[0], 
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [], 
    timeOutEvents: []
    }
}

function createEmployeeRecords(array) { 


    return array.map(function(val) { 
        return createEmployeeRecord(val)
    }
    )}

function createTimeInEvent(employeeRecord, date) { 
 employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(date.split(" ")[1]),
    date: date.split(" ")[0]

//2018-01-01 0800

})
return employeeRecord
}

function createTimeOutEvent(employeeRecord, date) { 
    employeeRecord.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(date.split(" ")[1]), 
        date: date.split(" ")[0]
    })

    return employeeRecord
}

function hoursWorkedOnDate(dateToSearch) { 
    let timeIn = this.timeInEvents.find(timeInEvent => timeInEvent.date == dateToSearch)

    let timeOut = this.timeOutEvents.find(timeOutEvent => timeOutEvent.date == dateToSearch)

    parseInt(timeOut.hour - timeIn.hour.toString().substring(0, 2))
    //- parseInt(employeeRecord.timeInEvents[0].hour.toString().substring(0, 1)) 
}

function wagesEarnedOnDate(employeeRecord, date) { 
   return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) { 
}
// //JavaScript Object with keys:
// firstName
// familyName
// title
// payPerHour
// timeInEvents
// timeOutEvents





// bind: This method returns a copy of the function but with the execution context "set" to the argument that's passed to bind. It looks like this: sayHello.bind(greenFrog)("Hello") //=> "Mr. GreenFrog says *Hello* to you all."
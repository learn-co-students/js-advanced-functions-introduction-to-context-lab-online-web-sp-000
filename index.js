// Your code here
function createEmployeeRecord(arr){
    let employeeObj = {
        firstName : arr[0],
        familyName : arr[1],
        title : arr[2],
        payPerHour :arr[3],
        timeInEvents : [],
        timeOutEvents : []
    }
    return employeeObj
}

function createEmployeeRecords(arrArr){
    return arrArr.map(function(emp){
        return createEmployeeRecord(emp)
    });
}

function createTimeInEvent(empRec, dateStamp){
        let [d, h] = dateStamp.split(' ');
        empRec.timeInEvents.push({
            type: "TimeIn",
            hour: parseInt(h, 10),
            date: d
        })
        return empRec
}

function createTimeOutEvent(empRec, dateStamp){
    let [d, h] = dateStamp.split(' ');
    empRec.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(h, 10),
        date: d
    })
    return empRec
}

function hoursWorkedOnDate(empRec, givenDate){
    let inEvent = empRec.timeInEvents.find(function(emp){
        return emp.date === givenDate
    })
    let outEvent = empRec.timeOutEvents.find(function(emp){
        return emp.date === givenDate
    })
    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(empRec, givenDate){
    return empRec.payPerHour * hoursWorkedOnDate(empRec, givenDate)
}

function allWagesFor(empRec){
    let daysWorked = empRec.timeInEvents.map(function(emp){
        return emp.date
    })
    let finalSum = daysWorked.reduce(function(total, date){
        return total + wagesEarnedOnDate(empRec, date)
    }, 0)
    return finalSum
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(function(record){
        return record.firstName === firstName
    })
}

let calculatePayroll = function(empRecArr){
    return empRecArr.reduce(function(total, empRec){
        return total + allWagesFor(empRec)
    }, 0)
}

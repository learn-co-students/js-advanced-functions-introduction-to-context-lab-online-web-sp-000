// Your code here
function createEmployeeRecord(employeeArray){
    let employeeObj = {};
    employeeObj.firstName = employeeArray[0];
    employeeObj.familyName = employeeArray[1];
    employeeObj.title = employeeArray[2];
    employeeObj.payPerHour = employeeArray[3];
    employeeObj.timeInEvents = [];
    employeeObj.timeOutEvents = [];
    return employeeObj
}

function createEmployeeRecords(employeesArray){
    let employeeObjs = employeesArray.map(function(employee){
        return createEmployeeRecord(employee);
    }
)
    return employeeObjs
}

function createTimeInEvent(employeeRecord, date){
    let h = parseInt(date.slice(-4), 10);
    employeeRecord.timeInEvents.push({ type: 'TimeIn', hour: h, date: date.slice(0, date.length - 5) });
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, date){
    let h = parseInt(date.slice(-4), 10);
    employeeRecord.timeOutEvents.push({type: 'TimeOut', hour: h, date: date.slice(0, date.length - 5)});
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date){
    let ti = employeeRecord.timeInEvents.find(function(timeIn){
        return timeIn.date === date
    })
    let to = employeeRecord.timeOutEvents.find(function(timeOut){
        return timeOut.date === date
    })
    let shortTO = (to.hour / 100 | 0);
    let shortTI = (ti.hour / 100 | 0);
    let hours = shortTO- shortTI;
    return hours;
}

function wagesEarnedOnDate(employeeRecord, date){
    let rate = employeeRecord.payPerHour;
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    let pay = rate * hoursWorked;
    return pay;
}

function allWagesFor(employeeRecord){
    let datesWorked = employeeRecord.timeInEvents.map(function(timeIn){
        return timeIn.date
    });
    let wagesArray = datesWorked.map(function(d){
        return wagesEarnedOnDate(employeeRecord, d);
    })
    let total = wagesArray.reduce(function(wage, t){
            return wage + t;
    }, 0) 
    return total
}

function calculatePayroll(employeeRecords){
    let payRoll = employeeRecords.reduce(function(t, e){
        return allWagesFor(e) + t;
    }, 0)
    return payRoll;
}

function findEmployeeByFirstName(employeeRecords, name){
    let employee = employeeRecords.find(function(r){
        return r.firstName === name;
    })
    return employee;
}
function createEmployeeRecord(employeeArray){
    const infoArray = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };    

    return infoArray
}

function createEmployeeRecords(employees){
    const srcArray = employees.map(x => createEmployeeRecord(x))

    return srcArray
}

function createTimeInEvent(employeeRecord, dateStamp){
    
    const dateTime = dateStamp.split('-');
    const timeInHour = dateTime[2]
    const hourNow = timeInHour.slice(3)
    const dayNow = timeInHour.substr(0,2)

    
    const timeInEvents = {
        type: "TimeIn",
        hour: parseInt(hourNow, 10),
        date: `${dateTime[0]}-${dateTime[1]}-${dayNow}`
    }

    const array = employeeRecord["timeInEvents"]
    array.push(timeInEvents)

    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    
    const dateTime = dateStamp.split('-');
    const timeInHour = dateTime[2]
    const hourNow = timeInHour.slice(3)
    const dayNow = timeInHour.substr(0,2)

    
    const timeOutEvents = {
        type: "TimeOut",
        hour: parseInt(hourNow, 10),
        date: `${dateTime[0]}-${dateTime[1]}-${dayNow}`
    }

    const array = employeeRecord["timeOutEvents"]
    array.push(timeOutEvents)

    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateStamp){
    const events = employeeRecord["timeOutEvents"]
    const eventsIn = employeeRecord["timeInEvents"]

    function findDate(employee){
        return employee.date === dateStamp
    }

    let myHours = events.filter(event => findDate(event))
    let myHoursIn = eventsIn.filter(event => findDate(event))

    const hoursWorked = (myHours[0].hour - myHoursIn[0].hour)/100
    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, dateStamp){
    const employeePay = ((hoursWorkedOnDate(employeeRecord, dateStamp)) * (employeeRecord["payPerHour"]))
    return employeePay
}

function allWagesFor(employeeRecord){
    const findArray = employeeRecord["timeInEvents"];
    const newArray = [];
        
    for(let i=0; i < findArray.length; i++){
        newArray.push(findArray[i]["date"])
    }
        
    const payDays = newArray.map(x => wagesEarnedOnDate(employeeRecord, x))
    const returnPaidDays = payDays.reduce((total, element) => total + element, 0)
    
    return returnPaidDays
}

function findEmployeeByFirstName(srcArray, firstName){
    const search = srcArray.filter(function(employee){
        return employee.firstName === firstName;
    })

    const record = search[0]
    return record
}

function calculatePayroll(employeeRecords){
    const allWages = employeeRecords.map(x => allWagesFor(x))
    const payrollDue = allWages.reduce((total, element) => total + element, 0)

    return payrollDue
}
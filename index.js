// Your code here

function createEmployeeRecord(testEmployee){

    let createdEmployee = {}
    let employeeFields = ['firstName', 'familyName', 'title', 'payPerHour']

    employeeFields.map(function(employeeField, value){
        createdEmployee[employeeField] = testEmployee[value]
    });   

    createdEmployee['timeInEvents'] = []
    createdEmployee['timeOutEvents'] = []

    return createdEmployee

}


function createEmployeeRecords(employeeArrays){
    let employeeRecords = [];
    employeeArrays.map(function(employeeArray){
        employeeRecords.push(createEmployeeRecord(employeeArray))
    });

    return employeeRecords
}


function createTimeEvent(timeDateStamp, event){

    let timeEventObject = {}
    let timeEventFields = ['date', 'hour']
    let timeDateStampArray = timeDateStamp.split(" ")

    timeEventFields.map(function(timeEventField, value){
        if (timeEventField === 'hour'){
            timeEventObject[timeEventField] = parseInt(timeDateStampArray[value])
        } else {
            timeEventObject[timeEventField] = timeDateStampArray[value]
        }
    });       

    if (event === "Out"){
        timeEventObject['type'] ="TimeOut"
    }

    else if (event === "In"){
        timeEventObject['type'] ="TimeIn"
    }

    return timeEventObject
}


function createTimeInEvent(employee, timeInDateStamp){
    let timeInObject = createTimeEvent(timeInDateStamp, "In")

    employee.timeInEvents.push(timeInObject)
    
    return employee
}

function createTimeOutEvent(employee, timeOutDateStamp){
    let timeOutObject = createTimeEvent(timeOutDateStamp, "Out")

    employee.timeOutEvents.push(timeOutObject)
    
    return employee
}


function hoursWorkedOnDate(employeeRecord, timeEventDate){

    const timeInFound = employeeRecord.timeInEvents.find(element => element.date === timeEventDate)
    const timeOutFound = employeeRecord.timeOutEvents.find(element => element.date === timeEventDate)

    const hoursWorked = (timeOutFound.hour / 100) - (timeInFound.hour / 100)
    
    return hoursWorked

}    


function wagesEarnedOnDate(employeeRecord, timeEventDate){

    const hoursWorked = hoursWorkedOnDate(employeeRecord, timeEventDate)
    const wagesEarned = hoursWorked * employeeRecord.payPerHour

    return wagesEarned

}


function allWagesFor(employeeRecord){
 
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    const hoursWorkedArray = employeeRecord.timeInEvents.map(timeInEvent => hoursWorkedOnDate(employeeRecord, timeInEvent.date))

    const totalHoursWorked = hoursWorkedArray.reduce(reducer)

    const allWages = totalHoursWorked * employeeRecord.payPerHour

    return allWages

}




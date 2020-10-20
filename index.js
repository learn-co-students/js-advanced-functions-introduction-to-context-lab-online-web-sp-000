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


function createTimeInEvent(employee, timeInDateStamp){
    let timeInObject = {}
    timeInObject['type'] ="TimeIn"

    timeInObject['date'] = timeInDateStamp.split(" ")[0]
    timeInObject['hour'] = parseInt(timeInDateStamp.split(" ")[1])

    employee.timeInEvents.push(timeInObject)
    
    return employee
}

function createTimeOutEvent(employee, timeOutDateStamp){
    let timeOutObject = {}
    timeOutObject['type'] ="TimeOut"

    timeOutObject['date'] = timeOutDateStamp.split(" ")[0]
    timeOutObject['hour'] = parseInt(timeOutDateStamp.split(" ")[1])

    employee.timeOutEvents.push(timeOutObject)
    
    return employee
}
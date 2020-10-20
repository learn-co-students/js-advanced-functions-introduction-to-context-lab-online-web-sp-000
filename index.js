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

//
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
//



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








// function createTimeInEvent(employee, timeInDateStamp){
//     let timeInObject = {}
//     timeInObject['type'] ="TimeIn"

//     timeInObject['date'] = timeInDateStamp.split(" ")[0]
//     timeInObject['hour'] = parseInt(timeInDateStamp.split(" ")[1])

//     employee.timeInEvents.push(timeInObject)
    
//     return employee
// }

// function createTimeOutEvent(employee, timeOutDateStamp){
//     let timeOutObject = {}
//     timeOutObject['type'] ="TimeOut"

//     timeOutObject['date'] = timeOutDateStamp.split(" ")[0]
//     timeOutObject['hour'] = parseInt(timeOutDateStamp.split(" ")[1])

//     employee.timeOutEvents.push(timeOutObject)
    
//     return employee
// }
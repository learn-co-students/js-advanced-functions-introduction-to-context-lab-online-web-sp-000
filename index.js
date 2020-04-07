// Your code here

function createEmployeeRecord(employee){

    let employeePayRollInfo ={}

        employeePayRollInfo.firstName = employee[0]
        employeePayRollInfo.familyName = employee[1]
        employeePayRollInfo.title = employee[2]
        employeePayRollInfo.payPerHour = employee[3]
        employeePayRollInfo.timeInEvents = []
        employeePayRollInfo.timeOutEvents = []

         return employeePayRollInfo
}

function createEmployeeRecords(employee){
    return employee.map( e => createEmployeeRecord(e))
}

 function createTimeInEvent(record, date){
    let date = date.split(" ")[0]   
    
    return record 
 }

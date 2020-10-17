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
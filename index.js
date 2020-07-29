// Your code here
function createEmployeeRecord(arr){
    return {
        firstName: arr[0], 
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }

}

function createEmployeeRecords(allEmployeeArrays){
    return allEmployeeArrays.map( employeeArray => {
        return createEmployeeRecord(employeeArray) 
    });
}

function createTimeInEvent(employee, dateStamp){
    employee.timeInEvents.push(createEvent("TimeIn", dateStamp))
    return employee
}


function createTimeOutEvent(employee, dateStamp){    
    employee.timeOutEvents.push(createEvent("TimeOut", dateStamp))
    return employee
}

function createEvent(type, dateStamp){
    
    const [year, month, day, hour] = dateStamp.split(/[\s-]/g)

    const event = {
        type: type,
        hour: parseInt(hour),
        date: `${year}-${month}-${day}`
    }

    return event
}

function hoursWorkedOnDate(employee, date){

    const eventOnDate = function(event) { return event.date === date }
    
    const inTime = employee.timeInEvents.find(eventOnDate).hour;
    const outTime = employee.timeOutEvents.find(eventOnDate).hour;

    return (outTime - inTime) / 100
}

function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee){
    
    const reducer = (totalWages, timeOutEvent) => {
        return totalWages + wagesEarnedOnDate(employee, timeOutEvent.date)
    }
    
    return employee.timeOutEvents.reduce(reducer, 0);
}

function findEmployeeByFirstName(employees, firstName){
    return employees.find( (employee) => {
        return employee.firstName === firstName
    });
}

function calculatePayroll(allEmployees){

    const reducer = (totalWages, employee) => {
        return totalWages + allWagesFor(employee)
    }

    return allEmployees.reduce(reducer, 0)
}
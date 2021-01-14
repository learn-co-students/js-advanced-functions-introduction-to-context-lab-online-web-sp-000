// Your code here
const createEmployeeRecord = array => {
    return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}

const createEmployeeRecords = employeeData => { 
    return employeeData.map(arrayData => {
        return createEmployeeRecord(arrayData)
    })
}

const createTimeInEvent = (employee, dateAndTime) => { 
    let [date, time] = dateAndTime.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(time), 
        date: date
    })
    return employee
}

const createTimeOutEvent = (employee, dateAndTime) => { 
    let [date, time] = dateAndTime.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(time), 
        date: date
    })
    return employee
}

const hoursWorkedOnDate = (employee, date) => {
    let timeInHour = employee.timeInEvents.find(event => event.date === date).hour
    let timeOutHour = employee.timeOutEvents.find(event => event.date === date).hour
    let totalHoursWorked = (timeOutHour - timeInHour)/100
    return totalHoursWorked
}

const wagesEarnedOnDate = (employee, date) => {
    let hoursWorked = hoursWorkedOnDate(employee, date)
    let totalPay = employee.payPerHour * hoursWorked
    return totalPay
}

const allWagesFor = employee => {
    let dateRange = employee.timeInEvents.map(e => e.date)
    let totalEarned = dateRange.reduce((accumulator, date) => {
        return accumulator + wagesEarnedOnDate(employee, date)
    }, 0)
    return totalEarned
}

const findEmployeeByFirstName = (employeeRecords, firstName) => {
    return employeeRecords.find(employee => employee.firstName === firstName)
}

const calculatePayroll = employees => {
    return employees.reduce((accumulator, employee) => {
        return accumulator += allWagesFor(employee)
    }, 0)
}
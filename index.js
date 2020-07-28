// Your code here
const createEmployeeRecord = (employee_arr) => { 
    let obj = {}; 
    obj.firstName = employee_arr[0];
    obj.familyName = employee_arr[1];
    obj.title = employee_arr[2];
    obj.payPerHour = employee_arr[3];
    obj.timeInEvents = [];
    obj.timeOutEvents = [];
    return obj;
};

const createEmployeeRecords = (rows) => rows.map(row => createEmployeeRecord(row))

const createTimeInEvent = (employee, time) => {
    const arr = time.split(' ')
    employee.timeInEvents.push({ type: 'TimeIn', hour: parseInt(arr[1], 10), date: arr[0] }); 
    return employee;
};

const createTimeOutEvent = (employee, time) => {
    const arr = time.split(' ')
    employee.timeOutEvents.push({ type: 'TimeOut', hour: parseInt(arr[1], 10), date: arr[0] }); 
    return employee;
};

const hoursWorkedOnDate = (employee, time) => {
    const clockIn = employee.timeInEvents.find(element => element.date === time).hour/100;
    const clockout = employee.timeOutEvents.find(element => element.date === time).hour/100;
    return (clockout - clockIn)
}

const wagesEarnedOnDate = (employee, time) => {
    const hours = hoursWorkedOnDate(employee, time);
    let wage = (hours * employee.payPerHour).toString();
    wage = parseFloat(wage);
    return wage;
}

const allWagesFor = (employee) => {
    const times = employee.timeInEvents.map(element => element.date);
    return times.reduce((acc, date) => acc + wagesEarnedOnDate(employee, date), 0);
}

const findEmployeeByFirstName = (arr, firstName) => arr.find(element => element.firstName == firstName);

const calculatePayroll = (arr) => arr.reduce((acc, element) => acc + allWagesFor(element), 0);
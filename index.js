// Your code here
const createEmployeeRecord = (arr) => {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (arr) => {
    return arr.map(function(row) {
        return createEmployeeRecord(row)
    });
};

const createTimeInEvent = (employee, dateStamp) => {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
};

const createTimeOutEvent = (employee, dateStamp) => {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
};

const hoursWorkedOnDate = (employee, workDate) => {
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === workDate
    })
    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === workDate
    })

    return (outEvent.hour - inEvent.hour) / 100
};

const wagesEarnedOnDate = (employee, wageDate) => {
    let rawWage = hoursWorkedOnDate(employee, wageDate)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

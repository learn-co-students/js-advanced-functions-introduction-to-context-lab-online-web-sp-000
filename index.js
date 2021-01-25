function createEmployeeRecord(arr) {
return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
};
}

function createEmployeeRecords(arr) {
    return arr.map(record => {
        return createEmployeeRecord(record);
    })
}

function createTimeInEvent(record, dateStamp) {
record.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(dateStamp.split(' ')[1]),
    date: dateStamp.split(' ')[0]
});
return record
}

function createTimeOutEvent(record, dateStamp) {
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    });
    return record
    }

    function hoursWorkedOnDate(record, date) {
        let timeIn = record.timeInEvents.find(e => {return e.date == date}).hour
        let timeOut = record.timeOutEvents.find(e => { return e.date == date}).hour
        return (timeOut - timeIn) / 100;
    }

    function wagesEarnedOnDate(record, date) {
        return hoursWorkedOnDate(record, date) * record.payPerHour;
    }

    function allWagesFor(record) {
        let datesWorked = record.timeInEvents.map(e => {return e.date});
        return datesWorked.reduce((total, date) => {
            return total + wagesEarnedOnDate(record, date)
        }, 0)
    }

    function findEmployeeByFirstName(recordsArray, firstName) {
        return recordsArray.find(record => {return record.firstName == firstName});
    }


    function calculatePayroll(recordsArray) {
        return recordsArray.reduce((total, record) => {return total + allWagesFor(record)}, 0)
    }
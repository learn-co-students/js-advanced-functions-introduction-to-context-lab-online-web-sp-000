const createEmployeeRecord = (array) => {
    let obj = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return obj
};

const createEmployeeRecords = (array) => {
    let newArray = array.map(function(employee) {
        return createEmployeeRecord(employee)
    });
    return newArray
};

const createTimeInEvent = (object, dateStamp) => {
    var h = dateStamp.split(" ")[1]
    var d = dateStamp.split(" ")[0]
    let obj = {
        type: "TimeIn",
        hour: parseInt(h),
        date: d
    };
    object.timeInEvents.push(obj)
    return object
};

const createTimeOutEvent = (object, dateStamp) => {
    var h = dateStamp.split(" ")[1]
    var d = dateStamp.split(" ")[0]
    let obj = {
        type: "TimeOut",
        hour: parseInt(h),
        date: d
    };
    object.timeOutEvents.push(obj)
    return object
};

const hoursWorkedOnDate = (record, date) => {
    let inTime = record.find( a => a == date)
    let outTime = record.datetimeOutEvents
    let timeWorked = (outTime[1] - inTime[1])
    return timeWorked
};
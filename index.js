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
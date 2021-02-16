// Your code here
function createOneEmployeeRecord(array) {
    let employeeObject = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeObject;
};

function createEmployeeRecord(array) {
    let result = createOneEmployeeRecord(array)
    return result;
};

function createEmployeeRecords(array) {
    let result = array.map( function(element) { return createOneEmployeeRecord(element) })
    return result
}

function createTimeInEvent(employeeRecord, timeString) {
    let timeObject = {
        type: "TimeIn",
        date: timeString.split(" ")[0],
        hour: parseInt(timeString.split(" ")[1])
    };
    employeeRecord.timeInEvents.push(timeObject);
    return employeeRecord;
};

function createTimeOutEvent(employeeRecord, timeString) {
    let timeObject = {
        type: "TimeOut",
        date: timeString.split(" ")[0],
        hour: parseInt(timeString.split(" ")[1])
    };
    employeeRecord.timeOutEvents.push(timeObject);
    return employeeRecord;
};


function hoursWorkedOnDate(employeeRecord, dateString) {
    let timeInEvent = employeeRecord.timeInEvents.find( function(obj) { return obj.date === dateString});
    let timeOutEvent = employeeRecord.timeOutEvents.find( function(obj) { return obj.date === dateString});

    //if date found
    if (timeInEvent && timeOutEvent) {
        //ex: 1600 - 0900 = 700 = 7 hours
        const hours = (timeOutEvent.hour - timeInEvent.hour) / 100;
        return hours;
    } else {
        return;
    }

};



function wagesEarnedOnDate(employeeRecord, dateString) {
    let wages = employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, dateString);
    return wages;
};

function allWagesFor(employeeRecord) {
    //OLD CODE:
    // let dateStringsArray = []
    
    // dateStringsArray = employeeRecord.timeInEvents.map( function(obj) { return obj.date});
    // //we assume every time in has a corresponding timeout and vice versa

    // //important to set an initial value. we're not doing simple tallies. the first element needs to be put thru the reducer too
    // let totalWages;
    // totalWages = dateStringsArray.reduce( function(accum, currentDateString) { return accum + wagesEarnedOnDate(employeeRecord, currentDateString)}, 0)

    // return totalWages

    //IMPROVED CODE
    //cleaner. 

    let wagesArray = [];
    wagesArray = employeeRecord.timeInEvents.map( function(obj) { return wagesEarnedOnDate(employeeRecord, obj.date) });
    
    //sum up array
    let totalWages;
    totalWages = wagesArray.reduce( function(accum, currentVal) { return accum + currentVal} )
    return totalWages;
};


function calculatePayroll(employees) {
    //the structure is same as allWagesFor. find some info related to each element in array. then sum up the elements.

    let wagesArray = [];
    wagesArray = employees.map( function(employee) { return allWagesFor(employee) });

    let totalWages;
    totalWages = wagesArray.reduce( function(accum, currentVal) { return accum + currentVal} )
    return totalWages;

};



function findEmployeeByFirstName(allEmployees, firstName) {
    return allEmployees.find( function(employee) { return employee.firstName === firstName})
}
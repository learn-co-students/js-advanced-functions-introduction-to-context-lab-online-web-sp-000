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
    let timeOne = record.timeInEvents.find(timeIn => {
       if (timeIn.date === date) {
          return timeIn
       };
   }); 
   let timeTwo = record.timeOutEvents.find(timeOut => {
       if (timeOut.date === date) {
          return timeOut
       };
   }); 
   return (timeTwo.hour - timeOne.hour)/100
};

const wagesEarnedOnDate = (record, date) => {
    let rateHours = hoursWorkedOnDate(record, date);
    let payRate = record.payPerHour * rateHours;
    return payRate;
};

const allWagesFor = (record) => {
    let dates = record.timeInEvents.map(date => {
        return date.date
    });
    const payroll = dates.reduce((wages, date) => {
        let allWages = wagesEarnedOnDate(record, date);
        return allWages + wages
    }, 0);
    return payroll
};

const findEmployeeByFirstName = (records, employeeName) => {
    let names = records.find(record => {
        return record.firstName == employeeName
    });
    return names
};

const calculatePayroll = (records) => {
    let payroll = records.reduce((acc, record) => {
        return allWagesFor(record) + acc;
    }, 0);
    return payroll
};
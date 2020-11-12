function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

// ["Gray", "Worm", "Security", 1] // incoming array
// {firstName: "Gray", familyName: "Worm", title: "Security", payPerHour: 1, timeInEvents: [], timeOutEvents: []} // return a JS Object

function createEmployeeRecords(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.map(array => createEmployeeRecord(array));
}

// array of arrays [
 //       ["moe", "sizlak", "barkeep", 2],
//       ["bartholomew", "simpson", "scamp", 3]
 //     ]

 function createTimeInEvent(employeeRecord, dateStamp) {
    const dateStampArray = dateStamp.split(' ')
    employeeRecord["timeInEvents"].push({
        type: "TimeIn",
        hour: parseInt(dateStampArray[1]),
        date: dateStampArray[0],
    });
    return employeeRecord;
 }

 // incoming object (1 employee record): {firstName: "Gray", familyName: "Worm", title: "Security", payPerHour: 1, timeInEvents: [], timeOutEvents: []}, "2014-02-28 1400"
 // output: {firstName: "Gray", familyName: "Worm", title: "Security", payPerHour: 1, timeInEvents: [{type: "TimeIn", hour: 1400, date: 2014-02-28}], timeOutEvents: []}

 function createTimeOutEvent(employeeRecord, dateStamp) {
     const dateStampArray = dateStamp.split(' ')
     employeeRecord["timeOutEvents"].push({
         type: "TimeOut",
         hour: parseInt(dateStampArray[1]),
         date: dateStampArray[0],
     });
     return employeeRecord;
 }

 // find the timeInEvent object that matches the date from the argument
 // calculate the hours between timeIn and TimeOut
 // dateStamp = "0044-03-15"

 function hoursWorkedOnDate(employeeRecord, date) {
    // first, find the timeInEvent with a date that matches dateStamp
    // then, store the hour from that timeInEvent in a variable
    // then, find the timeOutEvent with a date that matches dateStamp
    // then, store the hour from that timeOutEvent
    // then, subtract inHour from outOur and divide by 100
     const employeeInHour = employeeRecord["timeInEvents"].find(element => element.date === date).hour
     const employeeOutHour = employeeRecord["timeOutEvents"].find(element => element.date === date).hour
     return (employeeOutHour - employeeInHour) / 100
  }

 // incoming arrays
// incoming object (1 employee record): {firstName: "Gray", familyName: "Worm", title: "Security", payPerHour: 1, timeInEvents: [{type: "TimeIn", hour: 1400, date: 2014-02-28}], timeOutEvents: []}
// incoming dateStamp: "2014-02-28 1400"

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord["payPerHour"]
}
// multiply the hours by the record's payRate to determine amount owed

function allWagesFor(employeeRecord) {
    const allDates = employeeRecord["timeInEvents"].map(object => object.date);
    const sum = allDates.reduce((accumulator, currentDate) => {
        return accumulator + wagesEarnedOnDate(employeeRecord, currentDate);
    }, 0);
    return sum
}
// incoming object (1 employee record): {firstName: "Gray", familyName: "Worm", title: "Security", payPerHour: 1, timeInEvents: [{type: "TimeIn", hour: 1400, date: 2014-02-28}], timeOutEvents: []}
// returns pay owed for all the dates for an employee

function findEmployeeByFirstName(arrayOfEmployeeRecords, firstName) {

}

function calculatePayroll(arrayOfEmployeeRecords) {

}
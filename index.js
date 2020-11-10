let createEmployeeRecord = function(array) {
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

let createEmployeeRecords = function(arrayOfArrays) {
    return arrayOfArrays.map(array => createEmployeeRecord(array));
}

// array of arrays [
 //       ["moe", "sizlak", "barkeep", 2],
//       ["bartholomew", "simpson", "scamp", 3]
 //     ]

 let createTimeInEvent = function(employeeRecord, dateStamp) {
    let dateStampArray = dateStamp.split(' ')
    employeeRecord["timeInEvents"].push({
        type: "TimeIn",
        hour: parseInt(dateStampArray[1]),
        date: dateStampArray[0],
    });
    return employeeRecord;
 }

 // incoming object (1 employee record): {firstName: "Gray", familyName: "Worm", title: "Security", payPerHour: 1, timeInEvents: [], timeOutEvents: []}, "2014-02-28 1400"
 // output: {firstName: "Gray", familyName: "Worm", title: "Security", payPerHour: 1, timeInEvents: [{type: "TimeIn", hour: 1400, date: 2014-02-28}], timeOutEvents: []}

 let createTimeOutEvent = function(employeeRecord, dateStamp) {
     let dateStampArray = dateStamp.split(' ')
     employeeRecord["timeOutEvents"].push({
         type: "TimeOut",
         hour: parseInt(dateStampArray[1]),
         date: dateStampArray[0],
     });
     return employeeRecord;
 }

 // find the timeInEvent object that matches the date from the argument
 // calculate the hours between timeIn and TimeOut

 function hoursWorkedOnDate(employeeRecord, dateStamp) {
    // debugger;
    let employeeRecordDate = employeeRecord["timeInEvents"]["date"]
    console.log("HELLO!", employeeRecord["timeInEvents"][0]["date"])
    let foundDate = employeeRecordDate.find(object => object === dateStamp)
 }

 // incoming arrays
// incoming object (1 employee record): {firstName: "Gray", familyName: "Worm", title: "Security", payPerHour: 1, timeInEvents: [{type: "TimeIn", hour: 1400, date: 2014-02-28}], timeOutEvents: []}
// incoming dateStamp: "2014-02-28 1400"

let wagesEarnedOnDate = function(employeeRecord, dateStamp) {

}

let allWagesFor = function(employeeRecord) {

}
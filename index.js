// Your code here

function createEmployeeRecord(arr) {
  let emplCard = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return emplCard;
}

function createEmployeeRecords(array) {
 let arr = [];
 for (let i = 0; i < array.length; i++) {
   let employeeObj = createEmployeeRecord(array[i]);
   arr.push(employeeObj)
 }
 return arr;
}

function createTimeInEvent(employeeObj, ds) {
  let timeIn = {
    type: "TimeIn",
    hour: parseInt(ds.split(" ")[1]),
    date: ds.split(" ")[0]
  }
  employeeObj.timeInEvents.push(timeIn)
  return employeeObj;
}

function createTimeOutEvent(employeeObj, ds) {
  let timeOut = {
    type: "TimeOut",
    hour: parseInt(ds.split(" ")[1]),
    date: ds.split(" ")[0]
  }
  employeeObj.timeOutEvents.push(timeOut)
  return employeeObj;
}

function hoursWorkedOnDate(employeeRecord, date) {
  let timeIn = employeeRecord.timeInEvents.find(function(e) {
    return e.date === date;
  })
  let timeOut = employeeRecord.timeOutEvents.find(function(e) {
    return e.date === date;
  })
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
  let wages = hoursWorkedOnDate(employeeRecord, date);
  let hours = employeeRecord.payPerHour;
  return wages * hours;
}

// function allWagesFor(employeeRecord) {
//   let employeeDate = employeeRecord.timeInEvents.map(function(e) {
//     return e.date;
//   })
//   let payment = employeeDate.reduce(function(acc, cv) {
//     return acc + wagesEarnedOnDate(employeeRecord, date);
//   }, 0)
//   return payment;
// }

function allWagesFor(employeeRecord){
  let datesWorked = employeeRecord.timeInEvents.map(function(timeIn){
      return timeIn.date
  });
  let wagesArray = datesWorked.map(function(d){
      return wagesEarnedOnDate(employeeRecord, d);
  })
  let total = wagesArray.reduce(function(wage, t){
          return wage + t;
  }, 0) 
  return total
}

function findEmployeeByFirstName(srcArray, name) {
  let employeeFirstName = srcArray.find(function(e) { 
    return e.firstName === name; 
  })
  return employeeFirstName;
}

function calculatePayroll(arr) {
  let employeePay = arr.reduce(function(total, cv) {
    return allWagesFor(cv) + total;
  }, 0)
  return employeePay;
}















// Write a function that takes 2 inputs -
// 1. Array of numbers (integers)
// 2. A number
//  and returns true of the number (second argument) is present in the array
// false otherwise

// function something(arr, num) {
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === num) {
//       return true;
//     }
//   }
//   return false
// }

// write a function that take an array of numbers as inputs
// and returns an array of all numbers that are even

// function isEven(arr) {
//   let array = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] % 2 === 0) {
//       array.push(arr[i])
//     }
//   }
//   return array;
// }

// create an array with only odd numbers 
// function isOdd(arr) {
//   let array = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] % 2 !== 0) {
//       array.push(arr[i]);
//     }
//   }
//   return array;
// }







































// function createEmployeeRecord(arr) {
//   const er = {
//     firstName: arr[0],
//     familyName: arr[1],
//     title: arr[2],
//     payPerHour: arr[3],
//     timeInEvents: [],
//     timeOutEvents: []
//   }
//   return er;
// }

// function createEmployeeRecords(employeeRecords) {
//   let arr = [];
//   for (let i = 0; i < employeeRecords.length; i++) {
//     let employeeObj = createEmployeeRecord(employeeRecords[i]);
//     arr.push(employeeObj);
//   }
//   return arr;
// }

// createTimeInEvent(ok, "2014-ll")
// function createTimeInEvent(employeeRecord, ts) {

//   let timeIn = {
//     type: "TimeIn",
//     hour: parseInt(ts.split(" ")[1]),
//     date: ts.split(" ")[0]
//   }
//   er.timeInEvents.push(timeIn);
//   return employeeRecord;
// }

// function createTimeOutEvent(employeeRecord, ts) {
//   let timeOut = {
//     type: "TimeOut",
//     hour: parseInt(ts.split(" ")[1]),
//     date: ts.split(" ")[0]
//   }
//   employeeRecord.timeOutEvents.push(timeOut);
//   return employeeRecord;
// }

// [{type: , hours:, date: }, {type: , hours:, date: }, {type: , hours:, date: }]
// {type: , hours:, date: },{type: , hours:, date: },{type: , hours:, date: },

// function hoursWorkedOnDate(employeeRecord, date) {
//   let checkinCard;
//   for (let i = 0; i < employeeRecord.timeInEvents.length; i++) {
//     if (employeeRecord.timeInEvents[i].date === date) {
//       checkinCard = employeeRecord.timeInEvents[i];
//       break;
//     }
//   }

// }

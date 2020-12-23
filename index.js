// Your code here
// let createEmployeeRecord = function () {

// }

let stuff = ["Gray", "Worm", "Security", "1"]

let otherstuff = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300],
    ["Byron", "Poodle", "Mascot", 3],
    ["Julius", "Caesar", "General", 27],
    ["Rafiki", "", "Aide", 10],
    ["Simba", "", "King", 100]
  ]

let createEmployeeRecord = function(ar) {
    let newObj = new Object();
    newObj.firstName = ar[0];
    newObj.familyName = ar[1];
    newObj.title = ar[2];
    newObj.payPerHour = ar[3];
    newObj.timeInEvents = [];
    newObj.timeOutEvents = [];
    return newObj;
}

let createEmployeeRecords = function(ar) {
    let newArray = ar.map( employee => createEmployeeRecord(employee))
    return newArray
}

// let tInRec = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])

let createTimeInEvent = function(employee, date) {
    let newTime = new Object();
    newTime.type = "TimeIn";
    newTime.hour = parseInt(date.split(" ")[1]);
    newTime.date = date.split(" ")[0];
    employee.timeInEvents.push(newTime);
    return employee
}

// let tOutRec = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])

let createTimeOutEvent = function(employee, date) {
    let newTime = new Object();
    newTime.type = "TimeOut";
    newTime.hour = parseInt(date.split(" ")[1]);
    newTime.date = date.split(" ")[0];
    employee.timeOutEvents.push(newTime);
    return employee
}

// calcRec = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
// calcRecIn = createTimeInEvent(calcRec, "0044-03-15 0900")
// calcRecOut = createTimeOutEvent(calcRec, "0044-03-15 1100")

let hoursWorkedOnDate = function(employee, date) {
    let timeIn = employee.timeInEvents.find(inDate => inDate.date === date);
    let timeOut = employee.timeOutEvents.find(outDate => outDate.date === date);
    let hrsWorked = (timeOut.hour - timeIn.hour) / 100;
    return hrsWorked;
}

let wagesEarnedOnDate = function(employee, date) {
    let wages = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return wages
}

let allWagesFor = function(employee) {
    let array = employee.timeInEvents.map( timeIn => wagesEarnedOnDate(employee, timeIn.date))
    let totalhrs = array.reduce ( (total, element) => element + total, 0)
    return totalhrs
}

let calculatePayroll = function(employees) {
    let array = employees.map( employee => allWagesFor(employee))
    let totalPay = array.reduce ( (total, element) => element + total, 0)
    return totalPay
}

let findEmployeeByFirstName = function(people, firstName) {
    let winner = people.find(person => person.firstName === firstName);
    return winner;
}

// let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
// let sRecord = createEmployeeRecord(["Simba", "", "King", 100])

// let sTimeData = [
//     ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
//     ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
// ]

// let rTimeData = [
//     ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
//     ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 40 ===> 70 total ||=> 770
// ]

// sTimeData.forEach(function (d) {
//     let [dIn, dOut] = d
//     sRecord = createTimeInEvent(sRecord, dIn)
//     sRecord = createTimeOutEvent(sRecord, dOut)
// })

// rTimeData.forEach(function (d, i) {
//     let [dIn, dOut] = d
//     rRecord = createTimeInEvent(rRecord, dIn)
//     rRecord = createTimeOutEvent(rRecord, dOut)
// })

// let employees = [sRecord, rRecord]

// let multi = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// // Earns 324
// let in1 = createTimeInEvent(multi, "0044-03-14 0900")
// let out1 = createTimeOutEvent(multi, "0044-03-14 2100")
// // Earns 54
// let in2 = createTimeInEvent(multi, "0044-03-15 0900")
// let out2 = createTimeOutEvent(multi, "0044-03-15 1100")
// // 324 + 54

// function ttlWages(employee) {
//     let array = employee.timeInEvents.map( timeIn => wagesEarnedOnDate(employee, timeIn.date))
//     let totalhrs = array.reduce ( (total, element) => element + total, 0)
//     return totalhrs
//   }

// let hrsWorked1 = hoursWorkedOnDate(calcRec, "0044-03-15")

// let tOutRec2 = createTimeOutEvent(tOutRec, "2015-02-28 1700")

// let tInRec2 = createTimeInEvent(tInRec, "2014-02-28 1400")

// let tTime = "2014-02-28 1400"



// let createEmployeeRecord = function(ar) {
//     function Employee(ar) {
//         this.firstName = ar[0];
//         this.familyName = ar[1];
//         this.title = ar[2];
//         this.payPerHour = ar[3];
//         this.timeInEvents = [];
//         this.timeOutEvents = [];
//     }
//     let newGuy = new Employee(ar);
//     return newGuy
// }
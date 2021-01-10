// Your code here
let testEmployee1 = createEmployeeRecord(["Gray", "Worm", "Security", 1])

let twoRows1 = [
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
  ]

function createEmployeeRecord([first_name, family_name, position, rate]) {
    const employee = {
        firstName: first_name, 
        familyName: family_name, 
        title: position, 
        payPerHour: rate, 
        timeInEvents: [], 
        timeOutEvents: []
    };
    return employee;
}

function createEmployeeRecords(data) {
    return data.map (x => createEmployeeRecord(x));
}


let bpRecord1 = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
let updatedBpRecord1 = createTimeInEvent(bpRecord1, "2014-02-28 1400")

function createTimeInEvent(record, timeStamp) {
    // let hr = parseInt(timeStamp.split(" ")[1].slice(0,2));
    record.timeInEvents.push({date: timeStamp.split(" ")[0], hour: parseInt(timeStamp.split(" ")[1]), type: "TimeIn"})
    return record;
}

let xEvent = updatedBpRecord1.timeInEvents[0]


function createTimeOutEvent(record, timeStamp) {
    // let hr = parseInt(timeStamp.split(" ")[1].slice(0,2));
    record.timeOutEvents.push({date: timeStamp.split(" ")[0], hour: parseInt(timeStamp.split(" ")[1]), type: "TimeOut"})
    return record;
}

function hoursWorkedOnDate(record, date) {
    let a = record.timeInEvents.find( d => d.date === date);
    let b = record.timeOutEvents.find( d => d.date === date);
    if (a && b) {
        let result = (b.hour - a.hour)/100;
        return result;
    }
}

function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour;
}


cRecord1 = createEmployeeRecord(["Julius", "Caesar", "General", 27])
        // Earns 324
        updatedBpRecord = createTimeInEvent(cRecord1, "0044-03-14 0900")
        updatedBpRecord = createTimeOutEvent(cRecord1, "0044-03-14 2100")
        // Earns 54
        updatedBpRecord = createTimeInEvent(cRecord1, "0044-03-15 0900")
        updatedBpRecord = createTimeOutEvent(cRecord1, "0044-03-15 1100")
        // 324 + 54
function allWagesFor(record) {
    let totalWage = 0;
    record.timeInEvents.map(punchIn => {
        totalWage += wagesEarnedOnDate(record, punchIn.date);
    });
    return totalWage;

    // return record.timeInEvents.forEach(date => console.log(date));
    // wagesEarnedOnDate(record, date)
}

// let src = [
//     ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
//     ["Natalia", "Romanov", "CEO", 150]
//   ]
//   let emps = createEmployeeRecords(src)
//   let loki = findEmployeeByFirstName(emps, "Loki")
function findEmployeeByFirstName(group, target) {
    return group.find(e => e.firstName === target);
}
function calculatePayroll(employeeList) {
    let payroll = 0;
    employeeList.map(employee => {
        payroll += allWagesFor(employee);
    });
    return payroll;
}
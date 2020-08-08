// Your code here
function createEmployeeRecord(arr) {
    let obj = {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    }
    return obj;
}

function createEmployeeRecords(arr) {
    return arr.map(r => createEmployeeRecord(r));
}

function createTimeInEvent(r, ds) {
    let obj = {
        type: "TimeIn",
        hour: parseInt(ds.slice(-4)),
        date: ds.slice(0,10)
    }
    r.timeInEvents.push(obj);
    return r;
}

function createTimeOutEvent(r, ds) {
    let obj = {
        type: "TimeOut",
        hour: parseInt(ds.slice(-4)),
        date: ds.slice(0,10)
    }
    r.timeOutEvents.push(obj);
    return r;
}

function hoursWorkedOnDate(r, d) {
    let timeIn = r.timeInEvents.find(e => e.date === d).hour;
    let timeOut = r.timeOutEvents.find(e => e.date === d).hour;
    return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(r, d) {
    return hoursWorkedOnDate(r, d) * r.payPerHour;
}

function allWagesFor(r) {
    return r.timeInEvents.map(e => wagesEarnedOnDate(r, e.date)).reduce((a,c) => a + c, 0)
}

function calculatePayroll(arr) {
    return arr.map(r => allWagesFor(r)).reduce((w,w2) => w + w2, 0)

}

function findEmployeeByFirstName(arr, fname) {
    return arr.find(e => e.firstName === fname)
}

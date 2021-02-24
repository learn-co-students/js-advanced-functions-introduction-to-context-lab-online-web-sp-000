function createEmployeeRecord([first, family, title, pay]) {
 return {
    firstName: first,
    familyName: family,
    title: title,
    payPerHour: pay,
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployeeRecords = function(arg) {
  return arg.map(function (e) {
    return createEmployeeRecord(e);
    })
  }

let createTimeInEvent = function(eventObject, timeIn) {
     let [date, time] = timeIn.split(" ");
     eventObject.timeInEvents.push(
       {
         type: 'TimeIn',
         hour: parseInt(time),
         date: date
       }
      )
   return eventObject;
}

function createTimeOutEvent(empRec, dT) {
  let [date, hour] = dT.split(" ");
  let empObj = empRec.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: date
  })
  return empRec;
}

function hoursWorkedOnDate(empRec, day) {
  let check = (el) => el.date === day;
  let ind = empRec.timeInEvents.findIndex(check);
  return (empRec.timeOutEvents[ind].hour - empRec.timeInEvents[ind].hour)/100;
  
}

function wagesEarnedOnDate(empRec, day) {
  let num = hoursWorkedOnDate(empRec, day) * empRec.payPerHour;
  return num;
}

function allWagesFor(empRec) {
  let num = 0;
  for (let i = 0; i < empRec.timeInEvents.length; i++) {
    num += wagesEarnedOnDate(empRec, empRec.timeInEvents[i].date);
  }
  return num;
}

function calculatePayroll(employees) {
  let pay = 0;
  for (let each of employees) {
    pay += allWagesFor(each);
  }
  return pay;
}

function findEmployeeByFirstName(emp, name) {
  for (let ea of emp) {
    if (ea.firstName === name) {
      return ea;
    }
  }
}
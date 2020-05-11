
function createEmployeeRecord(employeeArr){
  let employee = {};

  employee.firstName = employeeArr[0];
  employee.familyName = employeeArr[1];
  employee.title = employeeArr[2];
  employee.payPerHour = employeeArr[3];
  employee.timeInEvents = [];
  employee.timeOutEvents = [];

  return employee;
}

function createEmployeeRecords(arrOfArrays){
  return arrOfArrays.map(p => {
    return createEmployeeRecord(p);
  })
}

function createTimeInEvent(employeeRecordObj, dateStamp) {
  let hour = parseInt(dateStamp.split(' ')[1]);
  let date = dateStamp.split(' ')[0];
  let timeInEventObj = {};

  timeInEventObj.type = "TimeIn";
  timeInEventObj.hour = hour;
  timeInEventObj.date = date;

  employeeRecordObj.timeInEvents.push(timeInEventObj);

  return employeeRecordObj;
}

function createTimeOutEvent(employeeRecordObj, dateStamp) {
  let hour = parseInt(dateStamp.split(' ')[1]);
  let date = dateStamp.split(' ')[0];
  let timeOutEventObj = {};

  timeOutEventObj.type = "TimeOut";
  timeOutEventObj.hour = hour;
  timeOutEventObj.date = date;

  employeeRecordObj.timeOutEvents.push(timeOutEventObj);

  return employeeRecordObj;
}

function hoursWorkedOnDate(employeeRecordObj, dateString) {
  //"0044-03-15"
  let timeOutE = employeeRecordObj.timeOutEvents.find(obj => obj.date === dateString.split(' ')[0]); 
  let timeInE = employeeRecordObj.timeInEvents.find(obj => obj.date === dateString.split(' ')[0]); 
  
  let hourOut = parseInt(timeOutE.hour.toString().slice(0,-2));
  let hourIn = parseInt(timeInE.hour.toString().slice(0,-2));
  let hours = hourOut - hourIn;
  return hours;
}

function wagesEarnedOnDate(employeeRecordObj, dateString) {
  let hours = hoursWorkedOnDate(employeeRecordObj, dateString);
  return hours * (employeeRecordObj.payPerHour);
}


function allWagesFor(employeeRecordObj) {
  let datesArr = employeeRecordObj.timeInEvents.map(o => {return (o.date + ' ' + o.hour);}) // returns ['0044-03-15 900']
  let s = 0;

  let allWages = datesArr.reduce((function(s, el) {
    return wagesEarnedOnDate(employeeRecordObj, el) + s;
  }),s);
  return allWages;
};

function findEmployeeByFirstName(allEmployeeArrayOfObjects, firstNameString) {
  return allEmployeeArrayOfObjects.find(obj => obj.firstName === firstNameString);
}

function calculatePayroll(arrayOfEmployeeObjects) {
  let s = 0;
  return arrayOfEmployeeObjects.reduce((function(s,el) {
    return allWagesFor(el) + s;
  }),s);
}

// let cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
// createTimeInEvent(cRecord, "0044-03-16 0900")
// createTimeOutEvent(cRecord, "0044-03-16 1100")
// createTimeInEvent(cRecord, "0044-03-15 0900")
// createTimeOutEvent(cRecord, "0044-03-15 1100")
// allWagesFor(cRecord);


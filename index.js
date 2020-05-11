
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


//returns pay owed for all dates for this employee
function allWagesFor(employeeRecordObj) {
  // collect array of all date strings for employee
  let datesArr = employeeRecordObj.timeInEvents.map(o => {return o.date;}) // returns ['0044-03-15']
  let s = 0;

  let allWages = datesArr.reduce((s, el) => {
    console.log(el);
    return wagesEarnedOnDate(employeeRecordObj, el) + s;
  });
  console.log(allWages);
  return allWages;
};

let cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
createTimeInEvent(cRecord, "0044-03-15 0900")
createTimeOutEvent(cRecord, "0044-03-15 1100")
allWagesFor(cRecord);


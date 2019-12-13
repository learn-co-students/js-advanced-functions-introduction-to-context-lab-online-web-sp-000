function createEmployeeRecord(array){
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
};


function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(employeeArray => {
    return createEmployeeRecord(employeeArray)
  });
};

function createTimeInEvent(employeeObject, dateStamp){
  let timeIn = employeeObject.timeInEvents;
  timeIn.push({
    type: "TimeIn",
    hour: parseInt(dateStamp.split(" ")[1], 10),
    date: dateStamp.split(" ")[0]
  });
  return employeeObject;
};

function createTimeOutEvent(employeeObject, dateStamp){
  let timeIn = employeeObject.timeOutEvents;
  timeIn.push({
    type: "TimeOut",
    hour: parseInt(dateStamp.split(" ")[1], 10),
    date: dateStamp.split(" ")[0]
  });
  return employeeObject;
};

function hoursWorkedOnDate(employeeObject, dateForm){
  let hoursWorked;
  let timeIn = employeeObject.timeInEvents.find(object =>{
    return object.date === dateForm;
  });
  let timeOut = employeeObject.timeOutEvents.find(object =>{
    return object.date === dateForm;
  });
  return ((timeOut.hour - timeIn.hour)/100);
};

function wagesEarnedOnDate(employeeObject, dateForm){
  let hours = hoursWorkedOnDate(employeeObject, dateForm);
  let wages = hours * employeeObject.payPerHour
  return wages
};

function allWagesFor(employeeObject){
  let allTimeOuts = [];
  employeeObject.timeOutEvents.map(event => {
    allTimeOuts.push(event.date);
  })
  let allWages = allTimeOuts.map(dateForm => {
    return wagesEarnedOnDate(employeeObject, dateForm)
  });;
  return allWages.reduce((accumulator, wage) => {
    return accumulator + wage
  }, 0)
};
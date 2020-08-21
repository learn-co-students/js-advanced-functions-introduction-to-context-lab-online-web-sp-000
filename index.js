// Your code here
function createEmployeeRecord(employeeArray) {
  const employee = {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employee;
}

function createEmployeeRecords(listOfEmployees) {
  return listOfEmployees.map((employee) => createEmployeeRecord(employee));
}

function createTimeInEvent(employeeRecord, dateTimeStamp) {
  const timeInData = {
    type: "TimeIn",
    hour: parseInt(dateTimeStamp.split(" ")[1], 10),
    date: dateTimeStamp.split(" ")[0],
  };

  employeeRecord.timeInEvents.push(timeInData);
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeStamp) {
  const timeOutData = {
    type: "TimeOut",
    hour: parseInt(dateTimeStamp.split(" ")[1], 10),
    date: dateTimeStamp.split(" ")[0],
  };

  employeeRecord.timeOutEvents.push(timeOutData);
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeIn = employeeRecord.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOut = employeeRecord.timeOutEvents.find(
    (event) => event.date === date
  );
  if (!!timeOut) {
    try {
      throw new Error("Testing this error!");
    } catch (e) {
      console.error(e.name + ": " + e.message);
    }
  }
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
  const wages =
    hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
  return wages;
}

function allWagesFor(employeeRecord) {
  const daysWorked = employeeRecord.timeInEvents.map((e) => e.date);

  return daysWorked.reduce(function (total, currentDay) {
    return total + wagesEarnedOnDate(employeeRecord, currentDay);
  }, 0);
}

function calculatePayroll(arrayOfEmployees) {
  return arrayOfEmployees.reduce((total, employee) => {
    return total + allWagesFor(employee);
  }, 0);
}

function findEmployeeByFirstName(arrayOfEmployees, firstName) {
  return arrayOfEmployees.find((employee) => employee.firstName === firstName);
}

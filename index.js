// Your code here

//function createEmployeeRecord takes in a 4-element Array of String, String, String, and Number corresponding
//to a first name, family name, title and pay rate per hour. Returns JS Object with keys: firstName, familyName,
//title, payPerHour, timeInEvents, timeOutEvents.
//Behavior: Loads Array elements into corresponding Object properties. Additionally, initialize empty Arrays
//on the properties timeInEvents and timeOutEvents.

function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

//function createEmployeeRecords arguments: Array of Arrays. Returns Array of Objects. Behavior: Converts each
//nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array.

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(employeeArray => {
        return createEmployeeRecord(employeeArray)
    });
};

//function createTimeInEvent Argument(s) - An employee record Object, A date stamp ("YYYY-MM-DD HHMM").
//Returns The employee record. Behavior: Add an Object with keys to the EMPTY timeInEvents Array on the
//record Object: type: Set to "TimeIn", hour: Derived from the argument, date: Derived from the argument.

function createTimeInEvent(employeeObject, dateStamp) {
    let timeIn = employeeObject.timeInEvents;
    timeIn.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1], 10),
        date: dateStamp.split(" ")[0]
    });
    return employeeObject;
};

//function createTimeOutEvent Argument(s) - An employee record Object, A date stamp ("YYYY-MM-DD HHMM")
//Returns The employee record. Behavior: Add an Object with keys to the EMPTY timeOutEvents Array on the
//record Object: type: Set to "TimeOut", hour: Derived from the argument, date: Derived from the argument.

function createTimeOutEvent(employeeObject, dateStamp) {
    let timeOut = employeeObject.timeOutEvents;
    timeOut.push({
      type: "TimeOut",
      hour: parseInt(dateStamp.split(" ")[1], 10),
      date: dateStamp.split(" ")[0]
    });
    return employeeObject;
};

//function hoursWorkedOnDate Argument(s) - An employee record Object, A date of the form "YYYY-MM-DD"
//Returns Hours worked, an Integer. Behavior:  Given a date, find the number of hours elapsed between
//that date's timeInEvent and timeOutEvent

function hoursWorkedOnDate(employeeObject, dateForm) {
    let hoursWorked; //declared for no fucking reason??
    let timeIn = employeeObject.timeInEvents.find(Object => {
        return Object.date === dateForm;
    });
    let timeOut = employeeObject.timeOutEvents.find(Object => {
        return Object.date === dateForm;
    });
    return ((timeOut.hour - timeIn.hour)/100);
};

//function wagesEarnedOnDate Argument(s) -  An employee record Object, A date of the form "YYYY-MM-DD"
//Returns Pay owed. Behavior:  Using hoursWorkedOnDate, multiply the hours by the record's payRate to
//determine amount owed. Amount should be returned as a number.

function wagesEarnedOnDate(employeeObject, dateForm) {
    let hours = hoursWorkedOnDate(employeeObject, dateForm);
    let wages = hours * employeeObject.payPerHour
    return wages
};

//function allWagesFor Argument(s) -  An employee record Object. Returns Pay owed for all dates. Behavior:
//Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used
//as context. Amount should be returned as a number. HINT: You will need to find the available dates somehow...

function allWagesFor(employeeObject) {
    let allTimeOuts = employeeObject.timeOutEvents.map(event => {
        return event.date;
    })
    let allWages = allTimeOuts.map(dateForm => {
        return wagesEarnedOnDate(employeeObject, dateForm)
    });
    return allWages.reduce((accumlator, wage) => {
        return accumlator + wage;
    }, 0)
};

//function findEmployeeByFirstName Argument(s) - srcArray: Array of employee records, firstName: String
//representing a first name held in an employee record. Returns Matching record or undefined. Behavior:
//Test the firstName field for a match with the firstName argument

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => {
        return employee.firstName === firstName
    });
};

//function calculatePayroll Argument(s) - Array of employee records. Returns Sum of pay owed to all employees
//for all dates, as a number. Behavior: Using wagesEarnedOnDate, accumulate the value of all dates worked
//by the employee in the record used as context. Amount should be returned as a number.

function calculatePayroll(employeeArray) {
    return employeeArray.reduce((payrollTotal, employee) => {
        return allWagesFor(employee) + payrollTotal;
    }, 0);
};
// ### `createEmployeeRecord`

// * **Argument(s)**
//   * A 4-element Array of a `String`, `String`, `String`, and `Number`
//     corresponding to a first name, family name, title, and pay rate per hour
// * **Returns**
//   * JavaScript `Object` with keys:
//     * `firstName`
//     * `familyName`
//     * `title`
//     * `payPerHour`
//     * `timeInEvents`
//     * `timeOutEvents`
// * **Behavior**
//   * Loads `Array` elements into corresponding `Object` properties.
//     _Additionally_, initialize empty `Array`s on the properties `timeInEvents`
//     and `timeOutEvents`.

function createEmployeeRecord(array){
    let newEmployee = { };
    newEmployee.firstName = array[0];
    newEmployee.familyName = array[1];
    newEmployee.title = array[2];
    newEmployee.payPerHour = array[3];
    newEmployee.timeInEvents = [];
    newEmployee.timeOutEvents = [];
    return newEmployee;
}



// ### `createEmployeeRecords`

// * **Argument(s)**
//   * `Array` of `Arrays`
// * **Returns**
//   * `Array` of `Object`s
// * **Behavior**
//   * Converts each nested `Array` into an employee record using
//     `createEmployeeRecord` and accumulates it to a new `Array`

function createEmployeeRecords(array){
    return array.map(array => createEmployeeRecord(array));
}

// ### `createTimeInEvent`

// * **Argument(s)**
//   * An employee record `Object`
//   * A date stamp (`"YYYY-MM-DD HHMM"`)
// * **Returns**
//   * The employee record
// * **Behavior**
//   * Add an `Object` with keys to the `timeInEvents` `Array` on the record
//     `Object`:
//     * `type`: Set to `"TimeIn"`
//     * `hour`: Derived from the argument
//     * `date`: Derived from the argument

function createTimeInEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(" ");
    let record = { };
    record.type = "TimeIn";
    record.hour = parseInt(hour, 10);
    record.date = date;
    employee.timeInEvents.push(record);
    return employee;
}

// ### `createTimeOutEvent`

// * **Argument(s)**
//   * An employee record `Object`
//   * A date stamp (`"YYYY-MM-DD HHMM"`)
// * **Returns**
//   * The employee record
// * **Behavior**
//   * Add an `Object` with keys to the `timeOutEvents` `Array` on the record
//     `Object`:
//     * `type`: Set to `"TimeOut"`
//     * `hour`: Derived from the argument
//     * `date`: Derived from the argument

function createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(" ");
    let record = { };
    record.type = "TimeOut";
    record.hour = parseInt(hour, 10);
    record.date = date;
    employee.timeOutEvents.push(record);
    return employee;

}

// ### `hoursWorkedOnDate`

// * **Argument(s)**
//   * An employee record `Object`
//   * A date of the form `"YYYY-MM-DD"`
// * **Returns**
//   * Hours worked, an `Integer`
// * **Behavior**
//   * Given a date, find the number of hours elapsed between that date's
//     timeInEvent and timeOutEvent

function hoursWorkedOnDate(employee, date){
    let timeIn = employee.timeInEvents.find(record => record.date === date);
    let timeOut = employee.timeOutEvents.find(record => record.date === date);
    return (timeOut.hour - timeIn.hour)/100;
}
// ### `wagesEarnedOnDate`

// * **Argument(s)**
//   * An employee record `Object`
//   * A date of the form `"YYYY-MM-DD"`
// * **Returns**
//   * Pay owed
// * **Behavior**
//   * Using `hoursWorkedOnDate`, multiply the hours by the record's
//     payPerHour to determine amount owed. Amount should be returned as a number.

function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

// ### `allWagesFor`

// * **Argument(s)**
//   * An employee record `Object`
// * **Returns**
//   * Pay owed for all dates
// * **Behavior**
//   * Using `wagesEarnedOnDate`, accumulate the value of all dates worked by the
//     employee in the record used as context. Amount should be returned as a
//     number. **HINT**: You will need to find the available dates somehow...

function allWagesFor(employee){
    let allDates = employee.timeInEvents.map(element => element.date);
    let totalPay = allDates.reduce(function(total, date){
        return total + wagesEarnedOnDate(employee, date)}, 0);
    return totalPay;
}

// ### `findEmployeeByFirstName`

// * **Argument(s)**
//   * `srcArray`: Array of employee records
//   * `firstName`: String representing a first name held in an employee record
// * **Returns**
//   * Matching record or `undefined`
// * **Behavior**
//   * Test the `firstName` field for a match with the `firstName` argument

function findEmployeeByFirstName(srcArray, firstNameRecord){
    let employee = srcArray.find(({firstName}) => firstName === firstNameRecord);
    return employee;
}

// ### `calculatePayroll`

// * **Argument(s)**
//   * `Array` of employee records
// * **Returns**
//   * Sum of pay owed to all employees for all dates, as a number
// * **Behavior**
//   * Using `wagesEarnedOnDate`, accumulate the value of all dates worked by the
//     employee in the record used as context. Amount should be returned as a
//     number.

function calculatePayroll(employeeArray){
    return employeeArray.reduce(function(totalPay, employee){
        return totalPay + allWagesFor(employee)}, 0)
}
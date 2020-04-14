// The payroll system
//    populates a record from an Array
//      1) has a function called createEmployeeRecord
//      createEmployeeRecord
//        2) populates a firstName field from the 0th element
//        3) populates a familyName field from the 1th element
//        4) populates a title field from the 2th element
//        5) populates a payPerHour field from the 3th element
//        6) initializes a field, timeInEvents, to hold an empty Array
//        7) initializes a field, timeOutEvents, to hold an empty Array
//    process an Array of Arrays into an Array of employee records
//      8) has a function called createEmployeeRecords
//      createEmployeeRecords
//        9) creates two records
//        10) correctly assigns the first names
//    it adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String and returns the updated record
//      11) has a function called createTimeInEvent
//      createTimeInEvent
//        12) creates the correct type
//        13) extracts the correct date
//        14) extracts the correct hour
//    it adds a timeOut event Object to an employee's record of timeOutEvents when provided an employee record and Date/Time String and returns the updated record
//      15) has a function called createTimeOutEvent
//      createTimeOutEvent
//        16) creates the correct type
//        17) extracts the correct date
//        18) extracts the correct hour
//    Given an employee record with a date-matched timeInEvent and timeOutEvent
//      19) hoursWorkedOnDate calculates the hours worked when given an employee record and a date
//      hoursWorkedOnDate
//        20) calculates that the employee worked 2 hours
//    Given an employee record with a date-matched timeInEvent and timeOutEvent
//      21) wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
//      wagesEarnedOnDate
//        22) calculates that the employee earned 54 dollars
//    Given an employee record with MULTIPLE date-matched timeInEvent and timeOutEvent
//      23) allWagesFor aggregates all the dates' wages and adds them together
//      allWagesFor
//        24) calculates that the employee earned 378 dollars
//    Given an array of multiple employees
//      25) calculatePayroll aggregates all the dates' wages and adds them together
//      calculatePayroll
//        26) calculates that the employees earned 770 dollars
//    runs payroll using the mock data provided by Ultron data systems
//      Dependent functions: createEmployeeRecords
//        takes CSV data, returns an array of employee records
//          27) exists
//          28) returns an Array with 2 records for Loki and Natalia
//      Dependent functions: findEmployeeByFirstName
//        29) exists
//        30) finds "Loki"
//      Full Payroll Test
//        from several imported CSV structures
//          calculatePayroll
//            31) exists
//            32) correctly sums the payroll burden to $11,880 when passed an array of employee records

function createEmployeeRecord(array) {
  return {  firstName: array[0],
                  familyName: array[1],
                  title: array[2],
                  payPerHour: array[3],
                  timeInEvents: [],
                  timeOutEvents: []
                }
}

function createEmployeeRecords(array) {
  let employees = []
  array.forEach(function(employee) {
    employees.push(createEmployeeRecord(employee))
  })
  return employees
}

function createTimeInEvent(employeeObj, stringTime) {
  const dateTime = stringTime.split(' ')
  let timeIn = {type: "TimeIn", hour: parseInt(dateTime[1]), date: dateTime[0] }
  employeeObj.timeInEvents.push(timeIn)
  return employeeObj
}

function createTimeOutEvent(employeeObj, stringTime) {
  const dateTime = stringTime.split(' ')
  let timeOut = {type: "TimeOut", hour: parseInt(dateTime[1]), date: dateTime[0] }
  employeeObj.timeOutEvents.push(timeOut)
  return employeeObj
}

function hoursWorkedOnDate(employeeRec, date) {
  let timeIn = employeeRec.timeInEvents.filter(e => e.date == date)
  let timeOut = employeeRec.timeOutEvents.filter(e => e.date == date)

  return (timeOut[0].hour - timeIn[0].hour)/100
}

function wagesEarnedOnDate(employeeRec, date) {
  return hoursWorkedOnDate(employeeRec, date) * employeeRec.payPerHour
}

function allWagesFor(employeeObj) {
  const datesWorked = employeeObj.timeInEvents.map(e => e.date)
  let wagesEarned = []

  for (const date of datesWorked) {
    wagesEarned.push(wagesEarnedOnDate(employeeObj, date))
  }

  return wagesEarned.reduce((total, element) => element + total, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.filter( e => e.firstName === firstName)[0]
}

function calculatePayroll(array) {
  let totalWages = []

  for (const employee of array) {
    totalWages.push(allWagesFor(employee))
  }

  return totalWages.reduce((total, element) => element + total, 0)
}

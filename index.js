// // Your code here
// let dataEmployees = [
//     ["Thor", "Odinsson", "Electrical Engineer", 45],
//     ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
//     ["Natalia", "Romanov", "CEO", 150],
//     ["Darcey", "Lewis", "Intern", 15],
//     ["Jarvis", "Stark", "CIO", 125],
//     ["Anthony", "Stark", "Angel Investor", 300],
//     ["Byron", "Poodle", "Mascot", 3],
//     ["Julius", "Caesar", "General", 27],
//     ["Rafiki", "", "Aide", 10],
//     ["Simba", "", "King", 100]
// createTimeInEvent(bpRecord, "2014-02-28 1400")
// createTimeOutEvent(bpRecord, "2015-02-28 1700")
// don't forget timeOutEvents[0] / timeInEvents[0]
// DATA ''

let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
  }

function createEmployees(array) {
    let employeeArray = [];
    array.foreach(element => {
        employeeArray.push(createEmployeeRecord(element))
    });
    return employeeArray
}


// figured it's pretty much the same as above? Spoiler. it was.
function createEmployeeRecords(array) {
    let employeeArray = []
    array.forEach(element => {
        employeeArray.push(createEmployeeRecord(element))
    });
    return employeeArray
}

function createTimeInEvent(obj, time) {
    let hour = parseInt(time.split(' ')[1]) // "2015-02-28 1700" to "1700"
    let date = time.split(' ')[0] // "2015-02-28"
    //it adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String
    obj.timeInEvents.push({type: "TimeIn", hour: hour, date : date}) // Do i need indentation here *thinking emoji*
    return obj
}

// YOINK ... refactor from above.
function createTimeOutEvent(obj, time) {
    let hour = parseInt(time.split(' ')[1])
    let date = time.split(' ')[0] 
    obj.timeOutEvents.push({type: "TimeOut", hour: hour, date : date}) 
    return obj
}

function hoursWorkedOnDate(obj, time) {
    let timeIn = obj.timeInEvents.find(x => x.date === time) // YOINK
    let timeOut = obj.timeOutEvents.find(x => x.date === time)
    let result = (timeOut.hour - timeIn.hour) / 100 // Think about how to convert this out of 24hrs? still snazzy though
    return result
}

//  expect(testEmployee.payPerHour).to.eq(1)
function wagesEarnedOnDate(employee, time){
    return hoursWorkedOnDate(employee, time) * employee.payPerHour
}

	// (e => console.log(wagesEarnedOnDate(empRecord, e.date)))
function allWagesFor(employee) {
	return employee.timeInEvents.reduce(
		(total, t) => total + wagesEarnedOnDate(employee, t.date), 0 //set starting total to zero for some addition from wagesearned function
	)	
}

function calculatePayroll(pay) {
	return pay.reduce((t, e) => t + allWagesFor(e), 0) // t = total, e = employee
}


function findEmployeeByFirstName(employeeRecords, name) {
	return employeeRecords.find( record => record.firstName === name)
}



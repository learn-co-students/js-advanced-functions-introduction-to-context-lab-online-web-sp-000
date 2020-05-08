//Your code here

function createEmployeeRecord([firstName, familyName, title, payRate]){
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payRate,
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(empArray) {
	return empArray.map(emp => createEmployeeRecord(emp));
}

function createTimeInEvent(empObj, dateStamp) {
	let date = dateStamp.split(" ")[0]
	let hour = parseInt(dateStamp.split(" ")[1], 10)
	empObj.timeInEvents.push({
		type: "TimeIn",
		date: date,
		hour: hour
	})
	return empObj
}

function createTimeOutEvent(empObj, dateStamp) {
	let date = dateStamp.split(" ")[0]
	let hour = parseInt(dateStamp.split(" ")[1], 10)
	empObj.timeOutEvents.push({
		type: "TimeOut",
		date: date,
		hour: hour
	})
	return empObj
}

function hoursWorkedOnDate(empRecord, dateString) {
	let timeInRecord = empRecord.timeInEvents.find( timeInEvent => timeInEvent.date === dateString)
	let timeOutRecord = empRecord.timeOutEvents.find( timeOutEvent => timeOutEvent.date === dateString)
	return (timeOutRecord.hour - timeInRecord.hour) / 100
}

function wagesEarnedOnDate(empRecord, dateString) {
	return hoursWorkedOnDate(empRecord, dateString) * empRecord.payPerHour
}

function allWagesFor(empRecord) {
	// empRecord.timeInEvents.map(e => console.log(wagesEarnedOnDate(empRecord, e.date)))
	return empRecord.timeInEvents.reduce(
		(total, e) => total + wagesEarnedOnDate(empRecord, e.date), 0
	)	
}

function calculatePayroll(empRecords) {
	return empRecords.reduce((m, e) => m + allWagesFor(e), 0)
}

function findEmployeeByFirstName(empRecords, name) {
	return empRecords.find( record => record.firstName === name)
}




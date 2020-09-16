// Your code here
function createEmployeeRecord(employeeInformation) {
	return {
		firstName: employeeInformation[0],
		familyName: employeeInformation[1],
		title: employeeInformation[2],
		payPerHour: employeeInformation[3],
		timeInEvents: [],
		timeOutEvents: []
	}
}

function createEmployeeRecords(data) {
	return data.map(info => createEmployeeRecord(info))
}

function createEvent(dateStamp, type) {
	let [date, hour] = dateStamp.split(" ")
	let obj = {
		type: type,
		hour: parseInt(hour),
		date: date
	}
	return obj
}

function createTimeInEvent(record, dateStamp) {
	// let [date, hour] = dateStamp.split(" ")
	// let obj = {
	// 	type: "TimeIn",
	// 	hour: parseInt(hour),
	// 	date: date
	// }
	// record.timeInEvents.push(obj)
	// return record
	record.timeInEvents.push(createEvent(dateStamp, "TimeIn"))
	return record
}

function createTimeOutEvent(record, dateStamp) {
	record.timeOutEvents.push(createEvent(dateStamp, "TimeOut"))
	return record
}

function hoursWorkedOnDate(record, date) {
	let timeIn = record.timeInEvents.find(event => event.date === date)
	let timeOut = record.timeOutEvents.find(event => event.date === date)
	return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(record, date) {
	return record.payPerHour * hoursWorkedOnDate(record,date)
}

function allWagesFor(record) {
	let availableDates = record.timeInEvents.map(event => event.date);
	let wages = availableDates.map(date => wagesEarnedOnDate(record, date))
	return wages.reduce( (total, wage) => total + wage, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
	return srcArray.find(employee => employee.firstName.toLowerCase() === firstName.toLowerCase())
}

function calculatePayroll(records) {
	let employeeWages = records.map(record => allWagesFor(record))
	return employeeWages.reduce( (total, wage) => total + wage, 0)
}

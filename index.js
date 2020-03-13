const createEmployeeRecord = (row) => { // CREATES AN EMPLOYEE OBJECT
	return {
		firstName: row[0],
		familyName: row[1],
		title: row[2],
		payPerHour: row[3],
		timeInEvents: [],
		timeOutEvents: []
	}
}

const createEmployeeRecords = (employeeRow) => { // CREATES EMPLOYEE RECORDS
	return employeeRow.map(row => { return createEmployeeRecord(row) })
}

const createTimeInEvent = (employee, time) => {
	const [date, hour] = time.split(' ')
	employee.timeInEvents.push({
		type: 'TimeIn',
		hour: parseInt(hour, 10),
		date
	})
	return employee
}

const createTimeOutEvent = (employee, time) => {
	const [date, hour] = time.split(' ')
	employee.timeOutEvents.push({
		type: 'TimeOut',
		hour: parseInt(hour, 10),
		date
	})
	return employee
}

const hoursWorkedOnDate = (employee, date) => {
	const inEvent = employee.timeInEvents.find(e => {
		return e.date === date
	})
	const outEvent = employee.timeOutEvents.find(e => {
		return e.date === date
	})
	return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = (employee, date) => {
	const wage = hoursWorkedOnDate(employee, date) * employee.payPerHour
	return parseFloat(wage.toString())
}

const allWagesFor = (employee) => {
	const validDates = employee.timeInEvents.map(e => {
		return e.date
	})
	const payable = validDates.reduce((a, b) => {
		return a + wagesEarnedOnDate(employee, b)
	}, 0)
	return payable
}

const findEmployeeByFirstName = (arr, firstName) => {
	return arr.find(employee => {
		return employee.firstName === firstName
	})
}

const calculatePayroll = (arr) => {
	return arr.reduce((a, b) => {
		return a + allWagesFor(b)
	}, 0)
}
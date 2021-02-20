function createEmployeeRecord(array){
	const employeeObj = {
		firstName: array[0], 
		familyName: array[1], 
		title: array[2], 
		payPerHour: array[3], 
		timeInEvents: [], 
		timeOutEvents: []
	};
	return employeeObj;
}

function createEmployeeRecords(arrays){
	const employees = arrays.map(array => createEmployeeRecord(array));
	return employees;
}

function createTimeInEvent(employee, timeStamp){
	const s = timeStamp.indexOf(" ")
	const h = parseInt(timeStamp.slice(s+1));
	const d = timeStamp.slice(0, s)
	employee.timeInEvents.push({
		type: "TimeIn",
		hour: h,
		date: d
	})
	return employee
}

function createTimeOutEvent(employee, timeStamp){
	const s = timeStamp.indexOf(" ")
	const h = parseInt(timeStamp.slice(s+1));
	const d = timeStamp.slice(0, s)
	employee.timeOutEvents.push({
		type: "TimeOut",
		hour: h,
		date: d
	})
	return employee
}

function hoursWorkedOnDate(employee, date){
	const timeIn = employee.timeInEvents.filter(t => t.date === date)[0].hour
	const timeOut = employee.timeOutEvents.filter(t => t.date === date)[0].hour
	const hoursWorked = (timeOut - timeIn) / 100

	return hoursWorked
}

function wagesEarnedOnDate(employee, date){
	const hours = hoursWorkedOnDate(employee, date)
	const wagesEarned = hours * employee.payPerHour
	return wagesEarned
}

function allWagesFor(employee){
	const allWorkedDays = employee.timeInEvents.map(d => d.date)
	// const hoursInADay = (hours, initialHour) => hours + initialHour;
	let totalHours = 0;
	const sumHours = allWorkedDays.forEach(function(date){
		totalHours = totalHours + hoursWorkedOnDate(employee, date)
	})
	const totalWages = totalHours * employee.payPerHour
	return totalWages
}

function findEmployeeByFirstName(srcArray, firstName){
	const employee = srcArray.filter(e => e.firstName === firstName)[0]
	return employee
}

function calculatePayroll(employeesArray){
	let totalPayroll = 0;
	employeesArray.forEach(function(employee){
		totalPayroll += allWagesFor(employee)
	})
	return totalPayroll
}
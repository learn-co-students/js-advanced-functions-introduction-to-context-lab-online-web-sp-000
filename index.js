const createEmployeeRecord = function(arr) {
	return {
		firstName: arr[0],
		familyName: arr[1],
		title: arr[2],
		payPerHour: arr[3],
		timeInEvents: [],
		timeOutEvents: []
	} 
}

const createEmployeeRecords = function(arr) {
	return arr.map(createEmployeeRecord)
}

// createTimeInEvent(bpRecord, "2014-02-28 1400")

const createTimeInEvent = function(record, time) {
	const [date, hour] = time.split(' ')
	time = {type: 'TimeIn', date, hour: parseInt(hour)}
	record.timeInEvents.push(time)
	return record
}

const createTimeOutEvent = function(record, time) {
	const [date, hour] = time.split(' ')
	time = {type: 'TimeOut', date, hour: parseInt(hour)}
	record.timeOutEvents.push(time)
	return record
}

const hoursWorkedOnDate = function(record, date) {
	let inEvent = record.timeInEvents.find(function(e){
      return e.date === date
  })

  let outEvent = record.timeOutEvents.find(function(e){
      return e.date === date
  })

  return (outEvent.hour - inEvent.hour) / 100
}


let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}
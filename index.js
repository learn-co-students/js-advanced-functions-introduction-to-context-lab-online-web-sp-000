function createEmployeeRecord(employeeArray){
    return {firstName: employeeArray[0], familyName: employeeArray[1], title: employeeArray[2], payPerHour: employeeArray[3], timeInEvents: [], timeOutEvents: []};
}

function createEmployeeRecords(recordArrays){
    return recordArrays.map(function(e){
        return createEmployeeRecord(e)
    })
}

function createTimeInEvent(employee, date){
    const timeArray = employee.timeInEvents
    const dateArray = date.split(' ');

    timeArray.push({
        type: "TimeIn",
        hour: parseInt(dateArray[1], 10),
        date: dateArray[0]
        
    }) 
    return employee;
}

function createTimeOutEvent(employee, date){
    const timeArray = employee.timeOutEvents
    const dateArray = date.split(' ');

    timeArray.push({
        type: "TimeOut",
        hour: parseInt(dateArray[1], 10),
        date: dateArray[0]
        
    }) 
    return employee;
}

function hoursWorkedOnDate(employee, date){
    let timeOutString =  employee.timeOutEvents[0].hour.toString().split('').slice(0,2).join('')
    let timeInString = employee.timeInEvents[0].hour.toString().split('').slice(0,1).join('')
    return timeOutString - timeInString;
}

function wagesEarnedOnDate(employee, date){
    return (hoursWorkedOnDate(employee, date) * employee.payPerHour)
}

function allWagesFor(employee){
    let timeArray = employee.timeInEvents.concat(employee.timeOutEvents);
 //    [
 //     { type: 'TimeIn', hour: 900, date: '0044-03-14' },
 //     { type: 'TimeIn', hour: 900, date: '0044-03-15' },
 //     { type: 'TimeOut', hour: 2100, date: '0044-03-14' },
 //     { type: 'TimeOut', hour: 1100, date: '0044-03-15' }
 //   ]
     let firstDateObj = timeArray.filter(d => {return d.date === '0044-03-14' })
     let secondDateObj = timeArray.filter(d => {return d.date === '0044-03-15' })
     console.log(firstDate)
 
     // console.log(hoursWorkedOnDate(employee, firstDate))
     // console.log(hoursWorkedOnDate(employee, secondDate))
 
 // take time in and tim out hours from each date
 // put them into an array
 // add them
 // then multiply by payPerHour
 }
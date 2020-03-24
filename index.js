// Your code here
function createEmployeeRecord(record){
    const [firstName, familyName, title, payRate] = record
   return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payRate,
      timeInEvents: [],
      timeOutEvents: []
   }

}

function createEmployeeRecords(nestedArray){
    return nestedArray.map(createEmployeeRecord)
}

function createTimeInEvent(record, timeStamp){
    const timeArray = timeStamp.split(" ")
    const hour = parseInt(timeArray[1])
    const date = timeArray[0]
    const newTimeInObj = {
        type: "TimeIn",
        hour: hour,
        date: date
     }
     record.timeInEvents.push(newTimeInObj)
    return record
}

function createTimeOutEvent(record, timeStamp){
    const timeArray = timeStamp.split(" ")
    const hour = parseInt(timeArray[1])
    const date = timeArray[0]
    const newTimeInObj = {
        type: "TimeOut",
        hour: hour,
        date: date
     }
     record.timeOutEvents.push(newTimeInObj)
    return record
}

function hoursWorkedOnDate(record, date){
    const timeIn = record.timeInEvents.find(timeIn => timeIn.date === date)
    const timeOut = record.timeOutEvents.find(timeOut => timeOut.date === date)

    const hoursWorked = (timeOut.hour - timeIn.hour) / 100
   return hoursWorked

}

function wagesEarnedOnDate(record, date){
    const hoursWorked = hoursWorkedOnDate(record, date)
   const payRate = record.payPerHour

   const payForDate = hoursWorked * payRate
   return payForDate
}

function allWagesFor (record){
    const datesInArray = record.timeInEvents.map(tiEvent => tiEvent.date)
    const datesOutArray = record.timeOutEvents.map(toEvent => toEvent.date)

   if (datesInArray.length === datesOutArray.length) {
      
      const wagesArray = datesInArray.map(date => wagesEarnedOnDate(record, date))
      const totalWages = wagesArray.reduce((dayWage, value) => value + dayWage, 0)
      return totalWages
   } else {
      console.log("There is bad data for this employee - number of clockin / clockout events mismatch")
      return "Bad Data, check console error"
   }


}

function calculatePayroll(record){
    const allEmpWages = record.map(record => allWagesFor(record))
    const allEmpWagesTotal = allEmpWages.reduce((empWage, value) => value + empWage, 0)
    return allEmpWagesTotal
}

function findEmployeeByFirstName(record, name){
    return record.find(record => record.firstName === name)


}
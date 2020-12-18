const createEmployeeRecord = (recordArray => {
    return {
        firstName: recordArray[0],
        familyName: recordArray[1],
        title:  recordArray[2],
        payPerHour: recordArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
})

const createEmployeeRecords = (recordsArray => {
    return recordsArray.map(record => {
        return createEmployeeRecord(record)
    })
})

const createTimeInEvent = ((record, dateStamp) => {
    let [date, hour] = dateStamp.split(" ")

    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return record
})

const createTimeOutEvent = ((record, dateStamp) => {
    let [date, hour] = dateStamp.split(" ")

    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return record
})

const hoursWorkedOnDate = (record, date) => {
    let timeIn = record.timeInEvents.find(timeInEvent => {
        return timeInEvent.date === date
    })
    let timeOut = record.timeOutEvents.find(timeOutEvent => {
        return timeOutEvent.date === date
    })
    return (timeOut.hour - timeIn.hour)/100
}

const wagesEarnedOnDate = (record, date) => {
    let hours = hoursWorkedOnDate(record, date)

    return hours * record.payPerHour
}

const allWagesFor = (record => {
    let datesWorked = record.timeInEvents.map(event => {
        return event.date
    })
    let totalWages = datesWorked.reduce((accumulator, date) => {
        return accumulator + wagesEarnedOnDate(record, date)
    }, 0)
    return totalWages
})

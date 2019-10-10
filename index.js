// Your code here
const createEmployeeRecord = ([firstName, famName, title, payRate]) => {
    return {
        firstName:firstName,
        familyName:famName,
        title:title,
        payPerHour:payRate,
        timeInEvents:[],
        timeOutEvents:[]
    }
}

const createEmployeeRecords = (recordsArray) => {
    return recordsArray.map((arr) => {
        return createEmployeeRecord(arr)
    })
}

const createTimeInEvent = (empObj, dateStamp) => {
    let dateSplit = dateStamp.split(' ');
    empObj.timeInEvents.push({type:'TimeIn', hour:parseInt(dateSplit[1], 10), date:dateSplit[0]})
    return empObj 
}

const createTimeOutEvent = (empObj, dateStamp) => {
    let dateSplit = dateStamp.split(' ');
    empObj.timeOutEvents.push({type:'TimeOut', hour:parseInt(dateSplit[1], 10), date:dateSplit[0]})
    return empObj
}

const hoursWorkedOnDate = (empObj, date) => {
    const timeIn = empObj.timeInEvents.find((event) => {
        return event.date === date
    }).hour 
    const timeOut = empObj.timeOutEvents.find((event) => {
        return event.date === date
    }).hour 
    return (timeOut - timeIn)/100; 
}

const wagesEarnedOnDate = (empObj, date) => {
    const workedHours = hoursWorkedOnDate(empObj, date);
    return workedHours * empObj.payPerHour; 
}

const allWagesFor = (empObj) => {
    const datesArray = [];
    const allWages = []; 
    const sumWages = (totalWages, wage) => {
        return totalWages += wage 
    }
    empObj.timeInEvents.forEach((event) => {
        datesArray.push(event.date)
    })
    datesArray.forEach((date) => {
        allWages.push(wagesEarnedOnDate(empObj, date))
    })
    return allWages.reduce(sumWages, 0)
}

const findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find((empObj) => {
        return empObj.firstName === firstName 
    })
}

const calculatePayroll = (srcArray) => {
    const allTotalWages = [];
    const sumAllTotalWages = (totalWages, wage) => {
        return totalWages += wage 
    }
    srcArray.map((empObj) => {
        allTotalWages.push(allWagesFor(empObj))
    })
    return allTotalWages.reduce(sumAllTotalWages, 0)
}
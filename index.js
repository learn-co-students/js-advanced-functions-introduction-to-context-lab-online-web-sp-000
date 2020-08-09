// Your code here


function createEmployeeRecord(array){
    return {
        firstName: array[0], 
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}


function createEmployeeRecords(array){
        return array.map(ray => {
          return createEmployeeRecord(ray)
        })
}

function createTimeInEvent(obj, dataStamp){
    
    let [date, hour] = dataStamp.split(' ')

    obj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour), 
        date,
    })

    return obj
}

function createTimeOutEvent(obj, dateStamp){
        let [date, hour] = dateStamp.split(' ')

        obj.timeOutEvents.push({ 
            type: "TimeOut",
            hour: parseInt(hour),
            date

           })
           return obj
}

// return hours worked an integer


let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(obj, dateStamp){

  let num = hoursWorkedOnDate(obj, dateStamp) * obj.payPerHour

  return num

    
}

function allWagesFor(obj){
    let eligibleDates = obj.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(obj, d)
    }, 0)

    return payable
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(ray => ray.firstName === firstName)
}

function calculatePayroll(allRecords){
    return allRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
     }, 0)
}












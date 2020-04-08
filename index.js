// Your code here
function createEmployeeRecord(arr){
    let employee = {}
    
   employee.firstName = arr[0]
   employee.familyName = arr[1]
   employee.title = arr[2]
   employee.payPerHour = arr[3]
   employee.timeInEvents = []
   employee.timeOutEvents = []

   return employee
 
}


function createEmployeeRecords(arr){
   return arr.map( emp => createEmployeeRecord(emp))
}


function createTimeInEvent(rec, clockIn){
    
   clockIn = clockIn.split(" ")
   
   let day = clockIn[0]
   let time = clockIn[1]

    let timeIn =  {
        type: "TimeIn",
        hour: parseInt(time),
        date: day
    }
    
    rec.timeInEvents.push(timeIn)
    return rec 
}


function createTimeOutEvent(rec, clockOut){

    clockOut = clockOut.split(" ")

    let day = clockOut[0]
    let time = clockOut[1]

    let timeOut = {
        type: "TimeOut",
        hour: parseInt(time),
        date: day
    }

    rec.timeOutEvents.push(timeOut)
    return rec 
}

function hoursWorkedOnDate(emp, date){
    let inEvent = emp.timeInEvents.find(element => element.date === date)
    let outEvent = emp.timeOutEvents.find(element => element.date === date)

    let num = (outEvent.hour - inEvent.hour)/100

    return num 

}


function wagesEarnedOnDate(emp, date){
   let numOfHours = hoursWorkedOnDate(emp, date)
   let wages = emp.payPerHour * numOfHours

   return wages
}

function allWagesFor(emp){

    let inTime = emp.timeInEvents.map(function(e){
        return e.date
     })
     
     let results = inTime.reduce(function(total,day){
        return total + wagesEarnedOnDate(emp, day)
     }, 0)
    
     return results
}

function calculatePayroll(arr){

    return arr.reduce(function(total, emp){
        let grab = allWagesFor(emp)
        return total + grab
    }, 0)

}

function findEmployeeByFirstName(arr, name){
   return arr.find(emp => emp.firstName === name)
}



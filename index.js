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
    let employeeRecords = []

    employeeRecords.push(createEmployeeRecord(arr[0]))
    employeeRecords.push(createEmployeeRecord(arr[1]))

    return employeeRecords
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

    let num = outEvent.hour - inEvent.hour

    if (num > 1200){
        num =- 1200
        return num / 100
    }
    else {
        return num / 100
    }

}


function wagesEarnedOnDate(emp, date){
   let numOfHours = hoursWorkedOnDate(emp, date)
   let wages = emp.payPerHour * numOfHours

   return wages
}

function allWagesFor(emp){
   // console.log(emp)

    // emp.timeInEvents.forEach(event => {
        
    // });

     emp.timeInEvents.map(function(e){
        console.log(e)
     })
    //     let newD = e.date 
    //     emp.timeOutEvents.map(function(e){
    //         console.log(newD)
            //return e.find( match => match.date == newD)
       // })
  //  })

}
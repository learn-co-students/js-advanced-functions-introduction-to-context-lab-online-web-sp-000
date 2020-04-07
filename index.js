// Your code here

function createEmployeeRecord(employee){

    let employeePayRollInfo ={}

        employeePayRollInfo.firstName = employee[0]
        employeePayRollInfo.familyName = employee[1]
        employeePayRollInfo.title = employee[2]
        employeePayRollInfo.payPerHour = employee[3]
        employeePayRollInfo.timeInEvents = []
        employeePayRollInfo.timeOutEvents = []

         return employeePayRollInfo
}

function createEmployeeRecords(employee){
    return employee.map( e => createEmployeeRecord(e))
}

 function createTimeInEvent(record, date){
    let day = date.split(" ")[0]   
    let hour = parseInt( date.split(" ")[1])
    record.timeInEvents.push({type:"TimeIn", hour: hour, date: day})
    return record
 }

 function createTimeOutEvent(record, date){
    let day = date.split(" ")[0]   
    let hour = parseInt( date.split(" ")[1])
    record.timeOutEvents.push({type:"TimeOut", hour: hour, date: day})
    return record
 }

 function hoursWorkedOnDate(record, date){
     let hourIn = record.timeInEvents.find(f => f.date === date )
     let hourOut = record.timeOutEvents.find(f => f.date === date)
    return ( hourOut.hour - hourIn.hour)/100
 }

 function wagesEarnedOnDate(record, date){
     let hours = hoursWorkedOnDate(record, date)
     return hours * record.payPerHour
 }

function allWagesFor(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
    return e.date 
    })
        let payable = eligibleDates.reduce(function(memo, date){       
        return memo + wagesEarnedOnDate(employee, date)
        },0)
            return payable
 }


function calculatePayroll(records){
    return records.reduce(function(memo, record){
        return memo + allWagesFor(record)
    },0)
}

function findEmployeeByFirstName(srcArray, firstName){

    let name = srcArray.filter(s => s.firstName === firstName)
    console.log("name", name)
    return name[0]
}



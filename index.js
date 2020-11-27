// Your code here

//let payroll=[]

//let employee1= ["Rafiki", "", "Aide", 10]
//let employee1ClockIn1 = "2019-01-01 0900"
//let employee1ClockIn2 = "2019-01-02 1000"

//let employee1ClockOut1 = "2019-01-01 1300"
//let employee1Clockout2 = "2019-01-02 1300"


//let employee2 = ["Simba", "", "King", 100]
//let employee2ClockIn1 = "2019-01-11 0900"
//let employee2ClockIn2 = "2019-01-12 1000"

//let employee2ClockOut1 = "2019-01-11 1300"
//let employee2ClockOut2 = "2019-01-12 1300"

let createEmployeeRecord = function(section){
  let record={
    firstName: section[0],
    familyName: section[1],
    title: section[2],
    payPerHour: section[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return record
}

//let employer = createEmployeeRecord(employee2)

let createEmployeeRecords=function(array){
  let person =array.map(function(subarray){
    return createEmployeeRecord(subarray)})
    return person 
  }


function createTimeInEvent(employee, time){
  let workDate= time.substring(0, 10)
  let workHour= time.substring(11, 15)
  employee.timeInEvents.push({
    type:"TimeIn",
    hour:parseInt(workHour),
    date: workDate
   
  })
  return employee
}

//let timeIn = createTimeInEvent(employer, employee2ClockIn1)
//let timeInIn = createTimeInEvent(timeIn, employee2ClockIn2)

function createTimeOutEvent(employee, time){
  let workDate= time.substring(0, 10)
  let workHour= time.substring(11, 15)
  employee.timeOutEvents.push({
    type:"TimeOut",
    hour:parseInt(workHour),
    date: workDate
  })
  return employee
}

//let timeout = createTimeOutEvent(timeInIn, employee2ClockOut1)
//let fullDay2 = createTimeOutEvent(timeout, employee2ClockOut2)

function hoursWorkedOnDate(employeeRecord, date){
  let timeToWork = employeeRecord.timeInEvents.map(d=>{ 
    if (d.date===date){
      return d.hour}})
      
      let timeOffWork = employeeRecord.timeOutEvents.map(d=>{ 
        if (d.date===date){
        return d.hour}})
          
          let clockOut= parseInt(timeOffWork.join(" "))
          let clockIn= parseInt(timeToWork.join(" "))
          return (clockOut-clockIn)/100
        }

function wagesEarnedOnDate(employeeRecord, date){
  return hoursWorkedOnDate(employeeRecord, date) * employeeRecord["payPerHour"]
}


let allWagesFor = function(employee){
  let payday = employee.timeInEvents.map(function(pay){
      return pay.date
  })

  let paid = payday.reduce(function(memo, d){
      return memo + wagesEarnedOnDate(employee, d)
  }, 0)

  return paid
}
//function allWagesFor(employeeRecord){
  //let timeOffWork = employeeRecord.timeOutEvents.map(d=>{ 
    //if (d.date){
      //return d.hour}})
      
      //let timeInWork = employeeRecord.timeInEvents.map(d=>{ 
        //if (d.date){
          //return d.hour}})
          
          //let x = timeOffWork.map(function(item, index){
          //return item - timeInWork[index]})
          
          //let y = x.reduce((a, b) => (a+b), 0)/100

          //return employeeRecord.payPerHour*y
//}

function findEmployeeByFirstName(employeeAarray, firstName){
  return employeeAarray.find(function(employee){
    return employee.firstName === firstName
  })
}

let calculatePayroll = function(payRoll){
  return payRoll.reduce(function(memo, pay){
      return memo + allWagesFor(pay)
  }, 0)
}



//let timeInDates = fullDay.timeInEvents.map(d=>d.date)

//timeInDates.map(time =>hoursWorkedOnDate(employeeRecord, time))
//for(const time in timeforWork){
  //return time.date
//}//

//timeInDates.forEach(time=> hoursWorkedOnDate(fullDay, time))

//let dam= "0044-03-14" 
  
//function hoursWork(employeeRecord, date){
  //let timeToWork = employeeRecord.timeInEvents.map(d=>{ 
    //if (d.date===date){
      //return d.hour}})
      
    //  let timeOffWork = fullDay.timeOutEvents.map(d=>{ 
      //  if (d.date===date){
        //return d.hour}})
          
          //let clockOut= parseInt(timeOffWork.join(" "))
          //let clockIn= parseInt(timeToWork.join(" "))
          //eturn (clockOut-clockIn)/100
        //}
      
      
        //let timeToWork = employeeRecord.timeInEvents.map(d=>{ 
        //if (d.date===dam2){
          //return d.hour}})
      
      //let timeOffWork = fullDay.timeOutEvents.map(d=>{ 
        //if (d.date===dam2){
          //return d.hour}})

      //let clockOut= parseInt(timeOffWork.join())
      //let clockIn= parseInt(timeToWork.join())
      //(clockOut-clockIn)/100
  
  //hoursWorkedOnDate(fullDay, timeIn1)

//let timeOffWork = fullDay.timeOutEvents.map(d=>{ 
  //if (d.date===dam){
    //return d.hour}})

//var x = timeToWork.map(function(item, index) {
  //return item - timeofWork[index];
//})


//var y = x.reduce((a, b) => (a+b), 0)

//fullDay.payPerHour*y

//function fullWages(employeeRecord){
 // let timeOffWork = employeeRecord.timeOutEvents.map(d=>{ 
   // if (d.date){
     // return d.hour}})
      
      //let timeInWork = employeeRecord.timeInEvents.map(d=>{ 
        //if (d.date){
          //return d.hour}})
          
          //l//et x = timeOffWork.map(function(item, index){
          //r//eturn item - timeInWork[index]})
          
          //let y = x.reduce((a, b) => (a+b), 0)/100

          //return employeeRecord.payPerHour*y
//}

//let employ=payroll.map(function(subarray){
  //return subarray.timeInEvents})

  //employed = employ.map(function(e){
    //return e})

    e//mployed.map(function(emp){
      //return emp.date
    //})

    c//onst tngCharacters = characters.filter(character => {
      //return character.series.includes('Star Trek: The Next Generation');
   // })

//payroll.filter(pay =>{return pay.timeInEvents.includes("date")})





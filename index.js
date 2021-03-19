// Your code here
// Your code here
function createEmployeeRecord(employee){
    let employeeObject = {firstName: employee[0],familyName: employee[1], title: employee[2], payPerHour: employee[3], timeInEvents: [], timeOutEvents: []}
    return employeeObject
  }
  
  
  function createEmployeeRecords(employeeRecords){
    
     return  employeeRecords.map(function(employee){
         return createEmployeeRecord(employee)
      })
  }
  
  function createTimeInEvent(employee,time){
      const dateAndTime = time.split(' ')
      let punchIn = {type: 'TimeIn',date: dateAndTime[0], hour: parseInt(dateAndTime[1], 10)}
      employee.timeInEvents.push(punchIn)
      return employee
  }
  
  function createTimeOutEvent(employee,time){
      const dateAndTime = time.split(' ')
      let punchOut = {type: 'TimeOut',date: dateAndTime[0], hour: parseInt(dateAndTime[1], 10)}
      employee.timeOutEvents.push(punchOut)
      return employee
  }
  
  function hoursWorkedOnDate(employee,time = ''){
  
      let hours = employee.timeInEvents.reduce(function(acc,currV,currentIndex){
          return acc + employee.timeOutEvents[currentIndex].hour - currV.hour 
      },0)
  
       hours = `${hours}`
      if(hours.length === 3){
         return parseInt(hours[0])
      } else if(hours.length === 4){
        hours = `${hours[0]}${hours[1]}`
        return parseInt(hours)
      }
  }
  
  function wagesEarnedOnDate(employee,time){
      const hourPay = employee.payPerHour
      let hoursWorked = hoursWorkedOnDate(employee,time)
      return hourPay *  hoursWorked
  }
  
  function allWagesFor(employee){
      return wagesEarnedOnDate(employee)
     
  }
  
  function calculatePayroll(employee){
      return employee.reduce(function(accumulator,currentValue){
         return allWagesFor(currentValue) + accumulator
      },0)
  }
  
  function findEmployeeByFirstName(employees,firstName){
   let employee =  employees.filter(function(e){
       return e.firstName === firstName
   })
    return employee[0]
  }
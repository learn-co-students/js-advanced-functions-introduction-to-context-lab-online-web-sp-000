// Your code here


function createEmployeeRecord(ary){
   const [firstName, familyName, title, payPerHour] = ary
   const empObj = {firstName: firstName, familyName: familyName, title: title, payPerHour: payPerHour, timeInEvents: [], timeOutEvents: []}
   return empObj

}


function createEmployeeRecords(rows){
  return   rows.map((e) => createEmployeeRecord(e));
     
}

function createTimeInEvent(obj, dateStamp){

   let newEvent = {type: "TimeIn", date: dateStamp.slice(0, 10) , hour: parseInt(dateStamp.slice(-4)) }
    obj.timeInEvents.push(newEvent);
    return obj
}

function createTimeOutEvent(obj, dateStamp){
    let newEvent = {type: "TimeOut", date: dateStamp.slice(0, 10) , hour: parseInt(dateStamp.slice(-4)) }
    obj.timeOutEvents.push(newEvent);
    return obj
}

function hoursWorkedOnDate(obj, date){
let intTime = obj.timeInEvents.find((el) => el.date == date).hour;
let outTime = obj.timeOutEvents.find((el) => el.date == date).hour;
return (outTime - intTime)/100;
}

function wagesEarnedOnDate(obj, date){
    let hours = hoursWorkedOnDate(obj, date);
    return hours * obj.payPerHour

}

function allWagesFor(obj){
    
return obj.timeInEvents.reduce((a, b) => {
  return a + wagesEarnedOnDate(obj, b.date) }, 0)
}

function calculatePayroll(array){
return array.reduce((a, b) => a + allWagesFor(b), 0 )
}

function findEmployeeByFirstName(array, name){
return array.find((el) => el.firstName == name)
}
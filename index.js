// Your code here
//let person1 =["Bruce", "Ruffin", "Software Developer", 23]
//let person2 =["Karla", "Johnson", "Nurse", 22]
//let person3 =["Becky", "Woodward", "Teacher", 25]
//let person4 =["Michael", "McGrath", "Coach", 27]


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


let employeeInfo=[]

let createEmployeeRecords= function(section){
  let payPeriod=[]
  let employeeRecord = Object.values(createEmployeeRecord(section))
  payPeriod.push(employeeRecord.slice(0, 4))
  employeeInfo.push(payPeriod)
  return employeeInfo
}
//createEmployeeRecords(person1)
//createEmployeeRecords(person2)
//createEmployeeRecords(person3)
//createEmployeeRecords(person4)






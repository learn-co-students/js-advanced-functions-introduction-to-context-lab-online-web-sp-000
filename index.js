
function createEmployeeRecord(arr){
    return {firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [] 
    }
}

// function createEmployeeRecord(arr){
//     let newObj;
//     return newObj = Object.assign({
//       timeInEvents: [],
//       timeOutEvents: [] 
//         }, {firstName: arr[0],
//             familyName: arr[1],
//             title: arr[2],
//             payPerHour: arr[3], 
//         }
//     )
// }

function createEmployeeRecords(arr) {
return arr.map((e)=>{
    return createEmployeeRecord(e)
})
}

function createTimeInEvent(staff, timestamp) {
    staff.timeInEvents.push({ type: "TimeIn", hour: parseInt(timestamp.slice(11)), date: timestamp.slice(0, 10) })
    return staff;
}  

function createTimeOutEvent(staff, timestamp) {
    staff.timeOutEvents.push({ type: "TimeOut", hour: parseInt(timestamp.slice(11)), date: timestamp.slice(0, 10)})
    return staff;
}

function hoursWorkedOnDate(staff, datestamp) {
    let inEvent = staff.timeInEvents.find((e) => {
        return e.date === datestamp
    })
    
    let outEvent = staff.timeOutEvents.find((e) => {
        return e.date == datestamp
    })

    return (outEvent.hour - inEvent.hour)/100
}

function wagesEarnedOnDate(staff, datestamp){
    return staff.payPerHour * hoursWorkedOnDate(staff, datestamp)
}

function allWagesFor(staff){
    let dates = staff.timeInEvents.map((e) => {
        return e.date
    })

    let amountToPay = dates.reduce((prev, curr) => {
        return prev + wagesEarnedOnDate(staff, curr)
    }, 0)

    return amountToPay
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((e) => {
    return e.firstName === firstName
  })
}

function calculatePayroll(staff) {
    return staff.reduce((p, c) =>{
        return p + allWagesFor(c)
    }, 0)
}
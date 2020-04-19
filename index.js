function createEmployeeRecord(array ){
    return{ firstName: array[0],
        familyName:array[1],
        title:array[2],
        payPerHour:array[3],
        timeInEvents:[],
        timeOutEvents:[]

    }

}

function createEmployeeRecords(array1){
    return array1.map(function(e){
        return createEmployeeRecord(e)
    })

}

function createTimeInEvent(employee,timeIn){
    let clock = timeIn.split(" ")
    
   
    employee.timeInEvents.push({
        type:'TimeIn',
        hour:parseInt(clock[1]),
        date:clock[0]
    })
    return employee 

    }

function createTimeOutEvent(employee,timeOut){
    let clockOut = timeOut.split(" ")
    employee.timeOutEvents.push({
    type:'TimeOut',
    hour:parseInt(clockOut[1]),
    date:clockOut[0]

    })
    return employee

    }

function hoursWorkedOnDate(employee,date){
    let TimeIn = employee.timeInEvents.find(e=>{
            return e.date === date 
    })
        let TimeOut = employee.timeOutEvents.find(e=>{
            return e.date === date 
        })
            return (TimeOut.hour - TimeIn.hour )/ 100

    }
    
    function wagesEarnedOnDate(employee,date){
        return hoursWorkedOnDate(employee,date) *  employee.payPerHour
        }



 

function findEmployeeByFirstName(srcArray, firstName){
    
    let emp = srcArray.find(e=> e.firstName === firstName)
    // console.log(emp)
    return emp
    }





function allWagesFor(records){
    
    let total = 0;
    for(let i = 0; i < records.timeInEvents.length; i++){
        total = total + wagesEarnedOnDate(records, records.timeInEvents[i].date);
    }
    return total;
}

//employees = [{emploeey1}, {employee2},...]

// //Function reducer 1    
// const reducer = (accumulator,currentValue) => accumulator + allWagesFor(currentValue);
// //Function reducer 2 
// function reducer2 (accum, element){
//     return accum + allWagesFor(element);
// }

function calculatePayroll(employees){
    // reduce impelemtation 1
    return employees.reduce((accumulator, element) => accumulator + allWagesFor(element), 0);

    //reduce implementation 2
    //return employees.reduce(reducer2, 0);

}




   




// Your code here

function createEmployeeRecord(array){
  const keys = ['firstName', 'familyName', 'title', 'payPerHour', 'timeInEvents', 'timeOutEvents'];
  const newRecord = keys.reduce((records, key, index)=>{
    records[key] = array.length > index ? array[index]:[];
    return records;
  }, {});
  return newRecord;
}


function createEmployeeRecords(array2d){

}

function createTimeInEvent(){

}

function createTimeOutEvent(){

}

function hoursWorkedOnDate(){

}

function allWagesFor(){

}

function calculatePayroll(){

}

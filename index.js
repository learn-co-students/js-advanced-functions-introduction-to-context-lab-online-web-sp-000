// Your code here
function createEmployeeRecord(array) {
  let newObj = {};
  newObj.firstName = array[0];
  newObj.familyName = array[1];
  newObj.title = array[2];
  newObj.payPerHour = array[3];
  newObj.timeInEvents = [];
  newObj.timeOutEvents = [];
  return newObj
}

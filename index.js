// Your code here
const createEmployeeRecord = (employeeRecord) => {
  let newEmployeeRecord = {};
  newEmployeeRecord.firstName = employeeRecord[0];
  newEmployeeRecord.familyName = employeeRecord[1];
  newEmployeeRecord.title = employeeRecord[2];
  newEmployeeRecord.payPerHour = employeeRecord[3];
  return newEmployeeRecord;
}
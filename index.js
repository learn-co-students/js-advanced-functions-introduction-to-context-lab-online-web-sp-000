// Populates a record from an array
const createEmployeeRecord = (employeeRecord) => {
  let newEmployeeRecord = {};
  newEmployeeRecord.firstName = employeeRecord[0];
  newEmployeeRecord.familyName = employeeRecord[1];
  newEmployeeRecord.title = employeeRecord[2];
  newEmployeeRecord.payPerHour = employeeRecord[3];
  newEmployeeRecord.timeInEvents = [];
  newEmployeeRecord.timeOutEvents =[];
  return newEmployeeRecord;
}

// Process an Array of Arrays into an Array of employee records
const createEmployeeRecords = (record) => {
  // createEmployeeRecords
  //       1) creates two records
  //       2) correctly assigns the first names
  //       3) creates more than 2 records
  // let twoRows = [
  //       ["moe", "sizlak", "barkeep", 2],
  //       ["bartholomew", "simpson", "scamp", 3]
  //     ]
  // it("correctly assigns the first names", function () {
  //       let employeeRecords = createEmployeeRecords(twoRows)
  //       let nameExtractor = function (e) { return e.firstName }
  //       expect(employeeRecords.map(nameExtractor)).to.eql(["moe", "bartholomew"]);
  //     })
  let employeeRecords = record.map(employeeArray => {
    return {firstName: employeeArray[0]}
  })
  return employeeRecords;
}










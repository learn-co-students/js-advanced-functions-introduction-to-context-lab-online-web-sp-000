function createEmployeeRecord(record) {
  let clockIn = [];
  let clockOut = [];
  let details = {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: clockIn,
    timeOutEvents: clockOut,
  };
  return details;
}

function createEmployeeRecords(records) {
  const arr = records.map(createEmployeeRecord);
  return arr;
}

function createTimeInEvent(record, dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  record.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  });
  return record;
}

function createTimeOutEvent(record, dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  record.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  });
  return record;
}

function hoursWorkedOnDate(record, date) {
  let hours = 0;
  let clockIn = record.timeInEvents.find(function (key) {
    return key.date === date;
  });
  let clockOut = record.timeOutEvents.find(function (key) {
    return key.date === date;
  });
  hours = (clockOut.hour - clockIn.hour) / 100;
  return hours;
}

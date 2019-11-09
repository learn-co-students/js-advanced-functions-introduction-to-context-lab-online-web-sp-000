// Your code here
const TIME_IN = 'TimeIn'
const TIME_OUT = 'TimeOut'

const createEmployeeRecord = arr => {
  let [ firstName, familyName, title, payPerHour ] = arr
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createAndAddEmployeeRecord = ( records, arr ) =>
  [ ...records, createEmployeeRecord( arr ) ]

const createEmployeeRecords = arrs =>
  arrs.reduce( createAndAddEmployeeRecord, [])

const createTimeEvent = ( timestamp, type ) => {
  let [ date, hourStr ] = timestamp.split( ' ' )
  let hour = parseInt( hourStr )
  return { type, hour, date }
}

const createTimeInEvent = ( record, timestamp ) => {
  let newEvent = createTimeEvent( timestamp, TIME_IN )

  record.timeInEvents = [ ...record.timeInEvents, newEvent ]
  return record
}

const createTimeOutEvent = ( record, timestamp ) => {
  let newEvent = createTimeEvent( timestamp, TIME_OUT )

  record.timeOutEvents = [ ...record.timeOutEvents, newEvent ]
  return record
}

const hoursWorkedOnDate = ( record, date ) => {
  let inEvent = record.timeInEvents.find( x => x.date == date )
  let outEvent = record.timeOutEvents.find( x => x.date == date )
  let hoursWorked = ( outEvent.hour - inEvent.hour ) / 100

  return hoursWorked
}

const wagesEarnedOnDate = ( record, date ) =>
  record.payPerHour * hoursWorkedOnDate( record, date )

const allWagesFor = ( record ) => {
  let allDates = record.timeInEvents.map( x => x.date )
  let wages = allDates.reduce( ( total, date ) =>
    total += wagesEarnedOnDate( record, date ), 0)

  return wages
}

const findEmployeeByFirstName = ( records, firstName ) =>
  records.find( record => record.firstName === firstName )

const calculatePayroll = records =>
  records.reduce( ( total, record) => total += allWagesFor( record ), 0 )

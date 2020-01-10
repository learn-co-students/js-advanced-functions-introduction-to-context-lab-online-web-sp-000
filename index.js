function createEmployeeRecord(array) {
    const obj = {}
    array.forEach((item, index) => {
        obj[index] = item;
    });
}
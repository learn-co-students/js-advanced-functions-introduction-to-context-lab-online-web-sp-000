function createEmployeeRecord(array) {
    const obj = {}
    return array.forEach((item, index) => {
        obj[index] = item;
    });
}
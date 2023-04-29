function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}

function createEmployeeRecords(employeeData) {
    return employeeData.map((employee) => createEmployeeRecord(employee));
}

function createTimeInEvent(employeeRecord, punchIn) {
    const [date, hour] = punchIn.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    });
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, punchOut) {
    const [date, hour] = punchOut.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    });
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateWorked) {
    const punchIn = employeeRecord.timeInEvents.find(
        (record) => record.date === dateWorked
    );

    const punchOut = employeeRecord.timeOutEvents.find(
        (record) => record.date === dateWorked
    );

    return (punchOut.hour - punchIn.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, dateWorked) {
    const wagesOweForDay =
        hoursWorkedOnDate(employeeRecord, dateWorked) *
        employeeRecord.payPerHour;
    return parseFloat(wagesOweForDay.toString());
}

function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(
        (record) => record.date
    );

    const payable = datesWorked.reduce(function (total, date) {
        return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);

    return payable;
}

function calculatePayroll(employeeData) {
    return employeeData.reduce((total, rec) => total + allWagesFor(rec), 0);
}

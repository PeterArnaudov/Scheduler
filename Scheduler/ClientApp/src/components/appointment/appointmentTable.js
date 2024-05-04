import { Table } from "reactstrap";
import AppointmentRow from "./appointmentRow";
import React from "react";
var AppointmentTable = function (_a) {
    var appointments = _a.appointments;
    return (React.createElement(Table, null,
        React.createElement("thead", null,
            React.createElement("tr", null,
                React.createElement("th", null, "\u0414\u0430\u0442\u0430"),
                React.createElement("th", null, "\u0418\u043D\u0442\u0435\u0440\u0432\u0430\u043B"),
                React.createElement("th", null, "\u041F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0430"),
                React.createElement("th", null, "\u0414\u043E\u043A\u0442\u043E\u0440"))),
        React.createElement("tbody", null, appointments.map(function (appointment) { return (React.createElement(AppointmentRow, { key: appointment.id, appointment: appointment })); }))));
};
export default AppointmentTable;
//# sourceMappingURL=appointmentTable.js.map
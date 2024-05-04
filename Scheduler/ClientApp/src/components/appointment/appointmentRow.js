import React from "react";
import { extractHour, extractLongDate } from "../../helpers/formatters/dateFormatter";
;
var AppointmentRow = function (_a) {
    var _b, _c;
    var appointment = _a.appointment;
    return (React.createElement("tr", null,
        React.createElement("th", { scope: "row" }, appointment.startDateTime &&
            extractLongDate(appointment.startDateTime)),
        React.createElement("td", null,
            (appointment.startDateTime && appointment.endDateTime) &&
                extractHour(appointment.startDateTime),
            " - ",
            extractHour(appointment.endDateTime)),
        React.createElement("td", null, (_b = appointment.type) === null || _b === void 0 ? void 0 : _b.name),
        React.createElement("td", null, (_c = appointment.doctor) === null || _c === void 0 ? void 0 : _c.name)));
};
export default AppointmentRow;
//# sourceMappingURL=appointmentRow.js.map
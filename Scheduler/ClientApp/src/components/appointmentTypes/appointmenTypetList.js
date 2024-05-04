import React, { useState } from "react";
import AppointmentType from "./appointmentType";
import { Collapse } from "reactstrap";
;
var AppointmentTypeList = function (_a) {
    var appointmentTypes = _a.appointmentTypes, doctorName = _a.doctorName, doctorOptions = _a.doctorOptions, onEditAppointmentType = _a.onEditAppointmentType, onDeleteAppointmentType = _a.onDeleteAppointmentType;
    var _b = useState(true), isOpen = _b[0], setIsOpen = _b[1];
    var toggle = function () { return setIsOpen(!isOpen); };
    return (React.createElement("div", null,
        React.createElement("h2", { onClick: toggle, style: { cursor: "pointer" } },
            doctorName,
            " ",
            isOpen ? "▼" : "►"),
        React.createElement(Collapse, { isOpen: isOpen }, appointmentTypes.map(function (appointmentType) { return (React.createElement(AppointmentType, { key: appointmentType.id, appointmentType: appointmentType, doctorOptions: doctorOptions, onEditAppointmentType: onEditAppointmentType, onDeleteAppointmentType: onDeleteAppointmentType })); }))));
};
export default AppointmentTypeList;
//# sourceMappingURL=appointmenTypetList.js.map
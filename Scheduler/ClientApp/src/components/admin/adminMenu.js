import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import DoctorGrid from "../doctor/doctorGrid";
import AppointmentSchedule from "../appointment/appointmentSchedule";
import PatientContainer from "../patient/patientContainer";
import AppointmentTypeContainer from "../appointmentTypes/appointmentTypeContainer";
import Dashboard from "./dashboard/dashboard";
import doctorService from "../../services/doctorService";
var AdminMenu = function () {
    var _a = useState(undefined), activeSection = _a[0], setActiveSection = _a[1];
    var renderSection = function () {
        switch (activeSection) {
            case 'doctors':
                return React.createElement(DoctorGrid, { fetchDoctors: doctorService.getDoctorsAsync });
            case 'patients':
                return React.createElement(PatientContainer, null);
            case 'appointments':
                return React.createElement(AppointmentSchedule, null);
            case 'appointment-types':
                return React.createElement(AppointmentTypeContainer, null);
            // case 'reminders':
            //     return <RemindersComponent />;
            default:
                return React.createElement(Dashboard, null);
        }
    };
    useEffect(function () {
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "text-center" },
            React.createElement("h2", null, "A\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u0435\u043D \u043F\u0430\u043D\u0435\u043B"),
            React.createElement("div", null,
                React.createElement(Button, { className: "m-2", color: "".concat(activeSection === 'dashboard' ? 'primary' : 'secondary'), onClick: function () { return setActiveSection('dashboard'); } }, "\u0422\u0430\u0431\u043B\u043E"),
                React.createElement(Button, { className: "m-2", color: "".concat(activeSection === 'doctors' ? 'primary' : 'secondary'), onClick: function () { return setActiveSection('doctors'); } }, "\u0414\u043E\u043A\u0442\u043E\u0440\u0438"),
                React.createElement(Button, { className: "m-2", color: "".concat(activeSection === 'patients' ? 'primary' : 'secondary'), onClick: function () { return setActiveSection('patients'); } }, "\u041F\u0430\u0446\u0438\u0435\u043D\u0442\u0438"),
                React.createElement(Button, { className: "m-2", color: "".concat(activeSection === 'appointments' ? 'primary' : 'secondary'), onClick: function () { return setActiveSection('appointments'); } }, "\u0413\u0440\u0430\u0444\u0438\u043A"),
                React.createElement(Button, { className: "m-2", color: "".concat(activeSection === 'appointment-types' ? 'primary' : 'secondary'), onClick: function () { return setActiveSection('appointment-types'); } }, "\u041F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438"))),
        React.createElement("div", { className: "mt-2" }, renderSection())));
};
export default AdminMenu;
//# sourceMappingURL=adminMenu.js.map
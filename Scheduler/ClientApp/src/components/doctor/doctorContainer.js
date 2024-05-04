import React, { useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import AppointmentForm from "../appointment/appointmentForm";
import DoctorDetails from "./doctorDetails";
import DoctorGrid from "./doctorGrid";
import doctorService from "../../services/doctorService";
var DoctorContainer = function () {
    var navigate = useNavigate();
    var clinicName = useParams().clinicName;
    var _a = useState(), selectedDoctor = _a[0], setSelectedDoctor = _a[1];
    var _b = useState(), selectedAppointment = _b[0], setSelectedAppointment = _b[1];
    var handleSelectDoctor = function (doctor) {
        setSelectedDoctor(doctor);
        // Redirect to doctor details page.
        navigate("/".concat(clinicName, "/doctors/").concat(doctor.name.replace(/\s+/g, '-')));
    };
    var handleSelectAppointment = function (appointment, doctor) {
        setSelectedAppointment(appointment);
        if (doctor) {
            setSelectedDoctor(doctor);
        }
        // Redirect to appointment form page.
        navigate("appointment");
    };
    return (React.createElement(Routes, null,
        React.createElement(Route, { path: "/", element: React.createElement(DoctorGrid, { onSelectDoctor: handleSelectDoctor, onSelectAppointment: handleSelectAppointment, fetchDoctors: doctorService.getSummarizedDoctorsAsync }) }),
        React.createElement(Route, { path: ":doctorName", element: React.createElement(DoctorDetails, { doctor: selectedDoctor, onSelectDoctor: handleSelectDoctor, onSelectAppointment: handleSelectAppointment }) }),
        selectedDoctor && selectedAppointment &&
            React.createElement(Route, { path: "appointment", element: React.createElement(AppointmentForm, { doctor: selectedDoctor, selectedAppointment: selectedAppointment }) })));
};
export default DoctorContainer;
//# sourceMappingURL=doctorContainer.js.map
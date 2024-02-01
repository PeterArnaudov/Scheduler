import React, { useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import AppointmentForm from "../appointment/appointmentForm";
import DoctorDetails from "./doctorDetails";
import DoctorGrid from "./doctorGrid";
import doctorService from "../services/doctorService";

const DoctorContainer = () => {
    const navigate = useNavigate();
    const { clinicName } = useParams();
    const [selectedDoctor, setSelectedDoctor] = useState();
    const [selectedAppointment, setSelectedAppointment] = useState();

    const handleSelectDoctor = (doctor) => {
        setSelectedDoctor(doctor);

        // Redirect to doctor details page.
        navigate(`/${clinicName}/doctors/${doctor.name.replace(/\s+/g, '-')}`);
    }

    const handleSelectAppointment = (appointment, doctor) => {
        setSelectedAppointment(appointment);

        if (doctor) {
            setSelectedDoctor(doctor);
        }

        // Redirect to appointment form page.
        navigate("appointment");
    }

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <DoctorGrid
                        onSelectDoctor={handleSelectDoctor}
                        onSelectAppointment={handleSelectAppointment}
                        fetchDoctors={doctorService.getSummarizedDoctorsAsync}
                    />}
            />
            <Route
                path=":doctorName"
                element={
                    <DoctorDetails
                        doctor={selectedDoctor}
                        onSelectDoctor={handleSelectDoctor}
                        onSelectAppointment={handleSelectAppointment}
                    />}
            />
            {<Route
                path="appointment"
                element={
                    <AppointmentForm
                        doctor={selectedDoctor}
                        selectedAppointment={selectedAppointment} />}
            />}
        </Routes>
    );
};

export default DoctorContainer;

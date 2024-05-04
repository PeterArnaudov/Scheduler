import React, { FC, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import AppointmentForm from "../appointment/appointmentForm";
import DoctorDetails from "./doctorDetails";
import DoctorGrid from "./doctorGrid";
import doctorService from "../../services/doctorService";
import { DoctorModel } from "../../models/doctorModel";
import { AppointmentModel } from "../../models/appointmentModel";

const DoctorContainer: FC = () => {
    const navigate = useNavigate();
    const { clinicName } = useParams();
    const [selectedDoctor, setSelectedDoctor] = useState<DoctorModel>();
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentModel>();

    const handleSelectDoctor = (doctor: DoctorModel) => {
        setSelectedDoctor(doctor);

        // Redirect to doctor details page.
        navigate(`/${clinicName}/doctors/${doctor.name.replace(/\s+/g, '-')}`);
    }

    const handleSelectAppointment = (appointment: AppointmentModel, doctor?: DoctorModel) => {
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
            {selectedDoctor && selectedAppointment &&
                <Route
                    path="appointment"
                    element={
                        <AppointmentForm
                            doctor={selectedDoctor}
                            selectedAppointment={selectedAppointment} />}
                />
            }
        </Routes>
    );
};

export default DoctorContainer;

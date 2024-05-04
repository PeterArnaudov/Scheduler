import React, { FC, useEffect, useState } from "react";
import Loader from "../common/loader";
import AppointmentTable from "../appointment/appointmentTable";
import appointmentService from "../../services/appointmentService";
import { PatientModel } from "../../models/patientModel";
import { AppointmentModel } from "../../models/appointmentModel";
import { AppointmentSearchRequest } from "../../models/requests/appointmentSearchRequest";

interface PatientDetailsProps {
    patient: PatientModel
};

const PatientDetails: FC<PatientDetailsProps> = ({ patient }) => {
    const [appointments, setAppointments] = useState<AppointmentModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const populateAppointmentData = async () => {
            try {
                setIsLoading(true);

                var request: AppointmentSearchRequest = {
                    free: false,
                    occupied: true,
                    patients: [patient.id]
                }
                var result = await appointmentService.searchAsync(request);

                setAppointments(result.data);
            } catch (error) {
                console.error('Error fetching appointment data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        populateAppointmentData();
    }, []);

    return (
        <div className={`${isLoading ? 'loading' : ''}`}>
            {isLoading && <Loader />}
            {appointments.length > 0 && <AppointmentTable appointments={appointments} />}
            {appointments.length <= 0 && <p>Пациентът не е запазвал часове към момента.</p>}
        </div>
    );
};

export default PatientDetails;
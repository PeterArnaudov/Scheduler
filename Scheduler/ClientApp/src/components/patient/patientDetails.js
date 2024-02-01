import { useEffect, useState } from "react";
import appointmentService from "../services/appointmentService";
import Loader from "../common/loader";
import AppointmentTable from "../appointment/appointmentTable";

const PatientDetails = ({ patient }) => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const populateAppointmentData = async () => {
            try {
                setIsLoading(true);

                var result = await appointmentService.searchAsync({ patients: [patient.id] });

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
            {appointments <= 0 && <p>Пациентът не е запазвал часове към момента.</p>}
        </div>
    );
};

export default PatientDetails;
import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import DoctorGrid from "../doctor/doctorGrid";
import AppointmentSchedule from "../appointment/appointmentSchedule";
import PatientContainer from "../patient/patientContainer";
import AppointmentTypeContainer from "../appointmentTypes/appointmentTypeContainer";
import Dashboard from "./dashboard/dashboard";
import doctorService from "../../services/doctorService";

const AdminMenu = () => {
    const [activeSection, setActiveSection] = useState(null);

    const renderSection = () => {
        switch (activeSection) {
            case 'doctors':
                return <DoctorGrid fetchDoctors={doctorService.getDoctorsAsync} />;
            case 'patients':
                return <PatientContainer />;
            case 'appointments':
                return <AppointmentSchedule />;
            case 'appointment-types':
                return <AppointmentTypeContainer />;
            // case 'reminders':
            //     return <RemindersComponent />;
            default:
                return <Dashboard />;
        }
    };

    useEffect(() => {

    }, []);

    return (
        <>
            <div className="text-center">
                <h2>Aдминистративен панел</h2>
                <div>
                    <Button
                        className="m-2"
                        color={`${activeSection === 'dashboard' ? 'primary' : 'secondary'}`}
                        onClick={() => setActiveSection('dashboard')}>
                        Табло
                    </Button>
                    <Button
                        className="m-2"
                        color={`${activeSection === 'doctors' ? 'primary' : 'secondary'}`}
                        onClick={() => setActiveSection('doctors')}>
                        Доктори
                    </Button>
                    <Button
                        className="m-2"
                        color={`${activeSection === 'patients' ? 'primary' : 'secondary'}`}
                        onClick={() => setActiveSection('patients')}>
                        Пациенти
                    </Button>
                    <Button
                        className="m-2"
                        color={`${activeSection === 'appointments' ? 'primary' : 'secondary'}`}
                        onClick={() => setActiveSection('appointments')}>
                        График
                    </Button>
                    <Button
                        className="m-2"
                        color={`${activeSection === 'appointment-types' ? 'primary' : 'secondary'}`}
                        onClick={() => setActiveSection('appointment-types')}>
                        Процедури
                    </Button>
                    {/* <Button
                        className="m-2"
                        color={`${activeSection === 'reminders' ? 'primary' : 'secondary'}`}
                        onClick={() => setActiveSection('reminders')}>
                        Напомняния
                    </Button> */}
                </div>
            </div>
            <div className="mt-2">
                {renderSection()}
            </div>
        </>
    );
};

export default AdminMenu;
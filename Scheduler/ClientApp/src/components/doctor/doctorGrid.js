import React, { useEffect, useState } from "react";
import Doctor from "./doctor";
import Loader from "../common/loader";
import doctorService from "../services/doctorService";
import { useAuth } from "../../contexts/authContext";
import { Button } from "reactstrap";
import DoctorCreate from "./doctorCreate";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const DoctorGrid = ({ onSelectDoctor, onSelectAppointment, fetchDoctors }) => {
    const { user } = useAuth();
    const { clinicName } = useParams();

    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    useEffect(() => {
        const populateDoctorData = async () => {
            try {
                setIsLoading(true);

                var result = await fetchDoctors(clinicName);

                setDoctors(result.data);
            } catch (error) {
                console.error('Error fetching doctor data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        populateDoctorData();
    }, []);

    const toggleCreateOpen = () => {
        setIsCreateOpen(!isCreateOpen);
    }

    const addDoctor = (doctor) => {
        setDoctors((prevDoctors) => [...prevDoctors, doctor]);
    }

    const onDelete = async (doctor) => {
        try {
            const result = await doctorService.deleteDoctorAsync(doctor.id);

            if (result.success) {
                setDoctors((prevDoctors) => {
                    const updatedAppointments = prevDoctors.filter((x) => x.id !== doctor.id);
                    return updatedAppointments;
                });

                toast.success(`Успешно изтри ${doctor.name}.`, {
                    icon: '✅'
                });
            }
            else {
                toast.error(result.message, {
                    icon: '❌',
                });
            }
        }
        catch (error) {
            toast.error('Изникна грешка при обработването на резултата', {
                icon: '❌',
            });
        }
    };

    return (
        <div className={`row ${isLoading ? 'loading' : ''}`}>
            {isLoading && <Loader />}
            {user?.isAdmin && (
                <span>
                    <Button
                        className="mb-2 w-100"
                        color={!isCreateOpen ? "success" : "secondary"}
                        onClick={toggleCreateOpen}>
                        {!isCreateOpen ? "Създаване" : "Откажи"}
                    </Button>

                    {isCreateOpen &&
                        <DoctorCreate
                            onDoctorCreate={addDoctor}
                            onCancelClick={toggleCreateOpen} />}
                </span>
            )}
            {doctors.length > 0 && doctors.map((doctor) =>
                <Doctor
                    key={doctor.id}
                    doctor={doctor}
                    onSelectDoctor={onSelectDoctor}
                    onSelectAppointment={onSelectAppointment}
                    onDelete={onDelete} />)}
            {(!isLoading && doctors.length === 0) &&
                <p>Нямаме налични лекари към този момент.</p>}
        </div >
    );
};

export default DoctorGrid;
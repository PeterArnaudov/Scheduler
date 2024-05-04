import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import { DoctorModel } from "../../models/doctorModel"
import doctorService from "../../services/doctorService";
import { useAuth } from "../../contexts/authContext";
import Loader from "../common/loader";
import DoctorCreate from "./doctorCreate";
import Doctor from "./doctor";
import { ApiResponse } from "../../models/responses/apiResponse";

interface DoctorGridProps {
    onSelectDoctor?: (doctor: DoctorModel) => void,
    onSelectAppointment?: (appointment: any, doctor?: DoctorModel) => void,
    fetchDoctors: (clinicName?: string) => Promise<ApiResponse<DoctorModel[]>>
};

const DoctorGrid: FC<DoctorGridProps> = ({ onSelectDoctor, onSelectAppointment, fetchDoctors }) => {
    const { user } = useAuth();
    const { clinicName } = useParams<{ clinicName: string }>();

    const [doctors, setDoctors] = useState<DoctorModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

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

    const addDoctor = (doctor: DoctorModel) => {
        setDoctors((prevDoctors) => [...prevDoctors, doctor]);
    }

    const onDelete = async (doctor: DoctorModel) => {
        try {
            await doctorService.deleteDoctorAsync(doctor.id);

            setDoctors((prevDoctors) => {
                const updatedAppointments = prevDoctors.filter((x) => x.id !== doctor.id);
                return updatedAppointments;
            });

            toast.success(`Успешно изтри ${doctor.name}.`, {
                icon: '✅'
            });
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
                    doctorData={doctor}
                    onSelectDoctor={onSelectDoctor}
                    onSelectAppointment={onSelectAppointment}
                    onDelete={onDelete} />)}
            {(!isLoading && doctors.length === 0) &&
                <p>Нямаме налични лекари към този момент.</p>}
        </div >
    );
}

export default DoctorGrid;
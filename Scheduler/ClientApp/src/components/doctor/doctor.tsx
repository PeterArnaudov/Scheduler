import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Appointment from '../appointment/appointment';
import Loader from '../common/loader';
import { useAuth } from '../../contexts/authContext';
import DoctorEdit from './doctorEdit';
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { DoctorModel } from '../../models/doctorModel';

interface DoctorProps {
    doctorData: DoctorModel,
    selectedAppointment?: any,
    onSelectDoctor?: (doctor: DoctorModel) => void,
    onDelete?: (doctor: DoctorModel) => Promise<void>,
    onSelectAppointment?: (appointment: any, doctor?: DoctorModel) => void,
}

const Doctor: FC<DoctorProps> = ({ doctorData, selectedAppointment, onSelectDoctor, onDelete, onSelectAppointment }) => {
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(doctorData);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const { user } = useAuth();
    const { doctorName } = useParams();

    const hasSelectedAppointment = selectedAppointment !== undefined && selectedAppointment !== null;

    const toggleConfirmationModal = () => {
        setIsConfirmationModalOpen(!isConfirmationModalOpen);
    };

    const onDeleteClick = async (doctor: DoctorModel) => {
        toggleConfirmationModal();
        setIsLoading(true);

        if (onDelete) {
            await onDelete(doctor);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        // Fetch doctor data based on the name from the backend.
        const fetchDoctorData = async () => {
            try {
                const response = await fetch(`/api/doctor/get/${doctorName}`);
                const data = await response.json();

                if (onSelectDoctor) {
                    onSelectDoctor(data);
                }
            } catch (error) {
                console.error('Error fetching doctor data:', error);

                navigate('/doctors');
            } finally {
                setIsLoading(false);
            }
        };

        if (!doctor && doctorName) {
            // Fetch doctor data only if not already available and name is provided.
            fetchDoctorData();
        }
        else {
            setIsLoading(false);
        }
    }, [doctor, doctorName, navigate, onSelectDoctor]);

    return (
        <div className={`col-sm-12 col-md-6 col-lg-4 p-2 ${isLoading ? 'loading' : ''}`}>
            {!isEditMode &&
                <Card>
                    {isLoading && <Loader />}
                    <CardBody>
                        {doctor?.image &&
                            <CardImg src={doctor.image} className='img-fluid' alt='doctor'></CardImg>}
                        <CardTitle className='h5'>{doctor?.name}</CardTitle>
                        {doctor?.description && <CardText>{doctor.description}</CardText>}

                        {(!doctor?.earliestAvailableAppointment && onSelectAppointment) && (
                            <p>Няма свободни часове.</p>
                        )}

                        {hasSelectedAppointment && (
                            <div>
                                <p>Избран час:</p>
                                <Appointment
                                    appointment={selectedAppointment} />
                            </div>
                        )}

                        {(!hasSelectedAppointment && doctor?.earliestAvailableAppointment && onSelectAppointment) && (
                            <div>
                                <p>Най-ранен час:</p>
                                <Appointment
                                    key={doctor?.earliestAvailableAppointment?.id}
                                    appointment={doctor?.earliestAvailableAppointment}
                                    doctor={doctor}
                                    onSelectAppointment={onSelectAppointment} />
                            </div>
                        )}

                        {onSelectDoctor && (
                            <button
                                className={`btn btn-primary ${!doctor?.earliestAvailableAppointment ? "disabled" : ""} mt-2 d-block`}
                                onClick={() => onSelectDoctor(doctor)}>
                                Избери
                            </button>
                        )}

                        {user?.isAdmin && (
                            <div>
                                {onDelete &&
                                    <Button
                                        className='mt-2 me-2 fw-bold'
                                        color='danger'
                                        onClick={toggleConfirmationModal}>
                                        Изтрий
                                    </Button>
                                }
                                <Button
                                    className='mt-2 fw-bold'
                                    color='warning'
                                    onClick={() => setIsEditMode(true)}>
                                    Редактирай
                                </Button>
                                <Modal isOpen={isConfirmationModalOpen} toggle={toggleConfirmationModal} centered>
                                    <ModalHeader toggle={toggleConfirmationModal}>Потвърждение</ModalHeader>
                                    <ModalBody>
                                        Сигурни ли сте, че искате да изтриете този запис?
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" onClick={() => onDeleteClick(doctor)}>Изтрий</Button>
                                        <Button color="secondary" onClick={toggleConfirmationModal}>Отказ</Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        )}
                    </CardBody>
                </Card>
            }
            {isEditMode && <DoctorEdit doctor={doctor} setDoctor={setDoctor} setIsEditMode={setIsEditMode} />}
        </div>
    )
};

export default Doctor;
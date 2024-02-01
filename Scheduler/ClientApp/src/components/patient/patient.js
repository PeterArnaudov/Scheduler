import React, { useState } from "react";
import { Button, Card, CardBody, CardText, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PatientEdit from "./patientEdit";
import Loader from "../common/loader";
import PatientDetails from "./patientDetails";

const Patient = ({ patient, onEditPatient, onDeletePatient }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [appointmentsDisplayed, setAppointmentsDisplayed] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const toggleAppointmentsDisplayed = () => {
        setAppointmentsDisplayed(!appointmentsDisplayed);
    };

    const toggleConfirmationModal = () => {
        setIsConfirmationModalOpen(!isConfirmationModalOpen);
    };

    const handleDelete = (async () => {
        toggleConfirmationModal();
        setIsLoading(true);

        await onDeletePatient(patient);

        setIsLoading(false);
    });

    return (
        <Card className={`mb-2 ${isLoading ? 'loading' : ''}`}>
            {isLoading && <Loader />}
            <CardBody className="text-center">
                <div className="row">
                    <CardText className="col-12 col-sm-3 col-md-4">{patient.name}</CardText>
                    <CardText className="col-12 col-sm-3 col-md-4">{patient.phone}</CardText>
                    <CardText className="col-12 col-sm-6 col-md-4">{patient.email}</CardText>
                </div>
                <div>
                    <Button
                        color={`${appointmentsDisplayed ? "secondary" : "primary"}`}
                        className="fw-bold m-1 col-12 col-sm-3 col-lg-2"
                        onClick={toggleAppointmentsDisplayed}>
                        {appointmentsDisplayed ? "Скрий" : "Процедури"}
                    </Button>
                    <Button
                        color={`${isEditMode ? "secondary" : "warning"}`}
                        className="fw-bold m-1 col-12 col-sm-3 col-lg-2"
                        onClick={toggleEditMode}>
                        {isEditMode ? "Откажи" : "Редактирай"}
                    </Button>
                    <Button
                        color="danger fw-bold m-1 col-12 col-sm-3 col-lg-2"
                        onClick={toggleConfirmationModal}>
                        Изтрий
                    </Button>
                    <Modal isOpen={isConfirmationModalOpen} toggle={toggleConfirmationModal} centered>
                        <ModalHeader toggle={toggleConfirmationModal}>Потвърждение</ModalHeader>
                        <ModalBody>
                            Сигурни ли сте, че искате да изтриете този запис?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={handleDelete}>Изтрий</Button>
                            <Button color="secondary" onClick={toggleConfirmationModal}>Отказ</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                {isEditMode &&
                    <div className="mt-4">
                        <PatientEdit
                            patient={patient}
                            toggleEditMode={toggleEditMode}
                            onEditPatient={onEditPatient} />
                    </div>
                }
                {appointmentsDisplayed &&
                    <div className="mt-4">
                        <PatientDetails patient={patient} />
                    </div>
                }
            </CardBody>
        </Card>
    )
};

export default Patient;
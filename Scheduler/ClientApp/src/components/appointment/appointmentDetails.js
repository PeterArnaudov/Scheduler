import { useState } from "react";
import { Button, ButtonGroup, Card, CardBody, CardText, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Loader from "../common/loader";
import { extractHour } from "../../helpers/formatters/dateFormatter";
import AppointmentEdit from "./appointmentEdit";

const AppointmentDetails = ({ appointment, doctors, patients, appointmentTypes, setAppointment, setAppointments, onDelete }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const toggleConfirmationModal = () => {
        setIsConfirmationModalOpen(!isConfirmationModalOpen);
    };

    const onDeleteClick = async () => {
        toggleConfirmationModal();
        setIsLoading(true);

        await onDelete(appointment);

        setIsLoading(false);
    }

    return (
        <Card className={`${appointment?.isFree ? 'border-success' : 'border-danger'} ${isLoading ? 'loading' : ''}`}>
            {isLoading && <Loader />}
            <CardBody>
                <div className="row text-center">
                    <CardText className="col-8 col-sm-12 col-lg-8">{appointment?.doctor?.name}</CardText>
                    <CardText className="col-4 col-sm-12 col-lg-4">{extractHour(appointment?.startDateTime)}</CardText>
                    {(appointment?.patient?.name && appointment?.patient?.phone) &&
                        <CardText className="col-12">{appointment?.patient?.name} ({appointment?.patient?.phone})</CardText>
                    }
                    {appointment.type &&
                        <CardText className="col-12">{appointment?.type?.name}</CardText>
                    }
                    <div className="col-12">
                        <ButtonGroup className="gap-1">
                            <Button
                                color={`${isEditMode ? "secondary" : "warning"}`}
                                className="fw-bold"
                                onClick={toggleEditMode}>
                                {isEditMode ? "Откажи" : "Редактирай"}
                            </Button>
                            <Button
                                color="danger fw-bold"
                                onClick={toggleConfirmationModal}>
                                Изтрий
                            </Button>
                        </ButtonGroup>
                    </div>
                    {isEditMode &&
                        <div className="mt-4">
                            <AppointmentEdit
                                appointment={appointment}
                                doctors={doctors}
                                patients={patients}
                                appointmentTypes={appointmentTypes}
                                setAppointment={setAppointment}
                                setAppointments={setAppointments}
                                toggleEditMode={toggleEditMode} />
                        </div>
                    }
                </div>
            </CardBody>
            <Modal
                isOpen={isConfirmationModalOpen}
                toggle={toggleConfirmationModal} centered>
                <ModalHeader toggle={toggleConfirmationModal}>Потвърждение</ModalHeader>
                <ModalBody>
                    Сигурни ли сте, че искате да изтриете този запис?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={onDeleteClick}>Изтрий</Button>
                    <Button color="secondary" onClick={toggleConfirmationModal}>Отказ</Button>
                </ModalFooter>
            </Modal>
        </Card>
    )
};

export default AppointmentDetails;
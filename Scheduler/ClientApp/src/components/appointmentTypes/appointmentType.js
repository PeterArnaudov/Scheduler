import { useState } from "react";
import { Button, Card, CardBody, CardText, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Loader from "../common/loader";
import AppointmentTypeEdit from "./appointmentTypeEdit";

const AppointmentType = ({ appointmentType, doctorOptions, onEditAppointmentType, onDeleteAppointmentType }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const toggleConfirmationModal = () => {
        setIsConfirmationModalOpen(!isConfirmationModalOpen);
    };

    const handleDelete = async () => {
        toggleConfirmationModal();
        setIsLoading(true);

        await onDeleteAppointmentType(appointmentType);

        setIsLoading(false);
    }

    return (
        <Card className={`mb-2 ${isLoading ? 'loading' : ''}`}>
            {isLoading && <Loader />}
            <CardBody>
                <div className="text-center">
                    <CardText>{appointmentType.name}</CardText>
                    <div>
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
                            <AppointmentTypeEdit
                                appointmentType={appointmentType}
                                doctorOptions={doctorOptions}
                                toggleEditMode={toggleEditMode}
                                onEditAppointmentType={onEditAppointmentType} />
                        </div>
                    }
                    {/* {TODO: PatientDetails, will include list of appointments} */}
                </div>
            </CardBody>
        </Card>
    )
};

export default AppointmentType;
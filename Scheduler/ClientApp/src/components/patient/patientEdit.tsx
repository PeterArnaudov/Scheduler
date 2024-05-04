import React, { FC, useState } from "react";
import { Button, Form } from "reactstrap";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../common/loader";
import TextInput from "../common/inputs/textInput";
import { PatientModel } from "../../models/patientModel";
import { PatientEditRequest } from "../../models/requests/patientEditRequest";
import { handleInputChange } from "../../helpers/utils/inputUtils";

interface PatientEditProps {
    patient: PatientModel,
    toggleEditMode: () => void,
    onEditPatient: (patient: PatientModel) => Promise<boolean>
};

interface FormErrors {
    name?: string,
    email?: string,
    phone?: string
};

const PatientEdit: FC<PatientEditProps> = ({ patient, toggleEditMode, onEditPatient }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [requestData, setRequestData] = useState<PatientEditRequest>({
        id: patient.id,
        name: patient.name,
        email: patient.email,
        phone: patient.phone
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        handleInputChange(e, key, setRequestData, setFormErrors);
    };

    const validateForm = () => {
        const isValidEmail = (email: string) => {
            var urlPattern = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$', 'i');
            return !!urlPattern.test(email);
        }

        const errors: FormErrors = {};

        if (!requestData.name || !requestData.name.trim()) {
            errors.name = "Моля, попълнете име.";
        }
        if (!requestData.email) {
            errors.email = 'Моля, попълнете email адрес.'
        }
        else if (requestData.email.trim() && !isValidEmail(requestData.email)) {
            errors.email = "Моля, попълнете валиден email адрес.";
        }
        if (!requestData.phone || !requestData.phone.trim()) {
            errors.phone = "Моля, попълнете телефонен номер.";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Form is valid if there are no errors
    };

    const onFormSubmitClick = async () => {
        if (validateForm()) {
            setIsLoading(true);

            requestData.id = patient?.id;
            const isEdited = await onEditPatient(requestData);

            if (isEdited) {
                toggleEditMode();
            }

            setIsLoading(false);
        }
    };

    return (
        <Form className={`text-center ${isLoading ? 'loading' : ''}`}>
            {isLoading && <Loader />}
            <TextInput
                id='name'
                formData={requestData.name}
                label={'Име'}
                placeholder={'Въведете име'}
                error={formErrors.name}
                onChange={onInputChange} />
            <TextInput
                id='email'
                formData={requestData.email}
                label={'Email адрес'}
                placeholder={'Въведете email адрес'}
                error={formErrors.email}
                onChange={onInputChange} />
            <TextInput
                id='phone'
                formData={requestData.phone}
                label={'Телефонен номер'}
                placeholder={'Въведете телефонен номер'}
                error={formErrors.phone}
                onChange={onInputChange} />
            <Button
                color="success col-5"
                className="fw-bold m-1"
                onClick={onFormSubmitClick}>
                Запази
            </Button>
            <Button
                color="secondary"
                className="fw-bold m-1 col-5"
                onClick={toggleEditMode}>
                Откажи
            </Button>
        </Form>
    )
};

export default PatientEdit;
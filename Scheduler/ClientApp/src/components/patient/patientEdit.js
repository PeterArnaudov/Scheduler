import { useState } from "react";
import { Button, Form } from "reactstrap";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../common/loader";
import TextInput from "../common/inputs/textInput";

const PatientEdit = ({ patient, toggleEditMode, onEditPatient }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: patient.name,
        email: patient.email,
        phone: patient.phone
    });
    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const handleInputChange = (e, key) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: e.target.value,
        }));

        // Clear validation error when user starts typing.
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [key]: "",
        }));
    };

    const validateForm = () => {
        const isValidEmail = email => {
            var urlPattern = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$', 'i');
            return !!urlPattern.test(email);
        }

        const errors = {};

        if (!formData.name.trim()) {
            errors.name = "Моля, попълнете име.";
        }
        if (!formData.email) {
            errors.email = 'Моля, попълнете email адрес.'
        }
        else if (formData.email.trim() && !isValidEmail(formData.email)) {
            errors.email = "Моля, попълнете валиден email адрес.";
        }
        if (!formData.phone.trim()) {
            errors.phone = "Моля, попълнете телефонен номер.";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Form is valid if there are no errors
    };

    const onFormSubmitClick = async () => {
        if (validateForm()) {
            setIsLoading(true);

            formData.id = patient?.id;
            const isEdited = await onEditPatient(formData);

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
                formData={formData.name}
                label={'Име'}
                placeholder={'Въведете име'}
                error={formErrors.name}
                onChange={handleInputChange} />
            <TextInput
                id='email'
                formData={formData.email}
                label={'Email адрес'}
                placeholder={'Въведете email адрес'}
                error={formErrors.email}
                onChange={handleInputChange} />
            <TextInput
                id='phone'
                formData={formData.phone}
                label={'Телефонен номер'}
                placeholder={'Въведете телефонен номер'}
                error={formErrors.phone}
                onChange={handleInputChange} />
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
import { useState } from "react";
import { Button, Form } from "reactstrap";
import Loader from "../common/loader";
import TextInput from "../common/inputs/textInput";
import SelectInput from "../common/inputs/selectInput";

const AppointmentTypeEdit = ({ appointmentType, doctorOptions, toggleEditMode, onEditAppointmentType }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: appointmentType.name,
        doctorId: appointmentType.doctorId,
    });
    const [formErrors, setFormErrors] = useState({
        name: "",
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

    const handleSelectInputChange = (option, input) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [input.name]: option ? option.value : null,
        }));
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = "Моля, попълнете име.";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Form is valid if there are no errors
    };

    const onFormSubmitClick = async () => {
        if (validateForm()) {
            setIsLoading(true);

            formData.id = appointmentType?.id;
            const isEdited = await onEditAppointmentType(formData);

            if (isEdited) {
                toggleEditMode();
            }

            setIsLoading(false);
        }
    };

    return (
        <Form className={`${isLoading ? 'loading' : ''}`}>
            {isLoading && <Loader />}
            <TextInput
                id='name'
                formData={formData.name}
                label={'Име'}
                placeholder={'Въведете име'}
                error={formErrors.name}
                onChange={handleInputChange} />
            <SelectInput
                id='doctorId'
                formData={formData.doctorId}
                options={doctorOptions}
                label={'Доктор'}
                placeholder={'Изберете доктор'}
                onChange={handleSelectInputChange} />
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

export default AppointmentTypeEdit;
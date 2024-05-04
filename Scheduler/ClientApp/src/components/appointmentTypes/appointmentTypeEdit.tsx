import React, { FC, useState } from "react";
import { Button, Form } from "reactstrap";
import Loader from "../common/loader";
import TextInput from "../common/inputs/textInput";
import SelectInput from "../common/inputs/selectInput";
import { AppointmentTypeModel } from "../../models/appointmentTypeModel";
import { Option } from "../../models/items/option";
import { ActionMeta, MultiValue, SingleValue } from "react-select";
import { handleSelectInputChange } from "../../helpers/utils/reactSelectUtils";
import { handleInputChange } from "../../helpers/utils/inputUtils";

interface AppointmentTypeEditProps {
    appointmentType: AppointmentTypeModel,
    doctorOptions: Option[],
    toggleEditMode: () => void,
    onEditAppointmentType: (appointmentType: AppointmentTypeModel) => Promise<boolean>
};

interface FormErrors {
    name?: string
};

const AppointmentTypeEdit: FC<AppointmentTypeEditProps> = ({ appointmentType, doctorOptions, toggleEditMode, onEditAppointmentType }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [requestData, setRequestData] = useState<AppointmentTypeModel>({
        id: appointmentType.id,
        name: appointmentType.name,
        doctorId: appointmentType.doctorId,
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({
        name: "",
    });

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        handleInputChange(e, key, setRequestData, setFormErrors);
    }

    const onSelectChange = (newValue: SingleValue<Option> | MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
        handleSelectInputChange(newValue, actionMeta, setRequestData);
    };

    const validateForm = () => {
        const errors: FormErrors = {};

        if (!requestData.name || !requestData.name.trim()) {
            errors.name = "Моля, попълнете име.";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Form is valid if there are no errors
    };

    const onFormSubmitClick = async () => {
        if (validateForm()) {
            setIsLoading(true);

            requestData.id = appointmentType?.id;
            const isEdited = await onEditAppointmentType(requestData);

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
                formData={requestData.name}
                label={'Име'}
                placeholder={'Въведете име'}
                error={formErrors.name}
                onChange={onInputChange} />
            <SelectInput
                id='doctorId'
                formData={requestData.doctorId}
                options={doctorOptions}
                label={'Доктор'}
                placeholder={'Изберете доктор'}
                onChange={onSelectChange} />
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
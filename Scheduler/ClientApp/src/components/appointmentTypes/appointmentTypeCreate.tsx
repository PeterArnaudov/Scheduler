import React, { FC, useState } from "react";
import appointmentTypeService from "../../services/appointmentTypeService";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader, CardTitle, Form } from "reactstrap";
import Loader from "../common/loader";
import TextInput from "../common/inputs/textInput";
import SelectInput from "../common/inputs/selectInput";
import { AppointmentTypeModel } from "../../models/appointmentTypeModel";
import { Option } from "../../models/items/option";
import { AppointmentTypeCreateRequest } from "../../models/requests/appointmentTypeCreateRequest";
import { handleInputChange } from "../../helpers/utils/inputUtils";
import { ActionMeta, MultiValue, SingleValue } from "react-select";
import { handleSelectInputChange } from "../../helpers/utils/reactSelectUtils";

interface AppointmentTypeCreateProps {
    onAppointmentTypeCreate: (appointmentTypes: AppointmentTypeModel[]) => void,
    doctorOptions: Option[],
    onCancelClick: () => void
};

interface FormErrors {
    name?: string
};

const AppointmentTypeCreate: FC<AppointmentTypeCreateProps> = ({ onAppointmentTypeCreate, doctorOptions, onCancelClick }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [requestData, setRequestData] = useState<AppointmentTypeCreateRequest>({
        name: "",
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const clearFormData = () => {
        setRequestData({
            ...requestData,
            name: "",
        });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        handleInputChange(e, key, setRequestData, setFormErrors);
    }

    const onSelectChange = (newValue: SingleValue<Option> | MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
        handleSelectInputChange(newValue, actionMeta, setRequestData);
    };

    const validateForm = () => {
        const errors: FormErrors = {};

        if (!requestData.name.trim()) {
            errors.name = "Моля, попълнете име.";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Form is valid if there are no errors
    };

    const onFormSubmitClick = async () => {
        if (validateForm()) {
            try {
                setIsLoading(true);

                const result = await appointmentTypeService.createAppointmentTypeAsync(requestData);

                if (result.success) {
                    onAppointmentTypeCreate(result.data);

                    toast.success(`Успешно създадохте ${requestData.name}.`, {
                        icon: '✅',
                    });

                    clearFormData();
                }
                else {
                    toast.error(result.message, {
                        icon: '❌',
                    });
                }
            } catch (error) {
                toast.error('Изникна грешка при обработването на резултата.', {
                    icon: '❌',
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Card>
            {isLoading && <Loader />}
            <CardHeader>
                <CardTitle className="h5">Създаване</CardTitle>
            </CardHeader>
            <CardBody>
                <Form>
                    <TextInput
                        id='name'
                        formData={requestData.name}
                        label={'Име'}
                        placeholder={'Въведете име'}
                        error={formErrors.name}
                        onChange={onInputChange} />
                    <SelectInput
                        id='doctors'
                        formData={requestData.doctors}
                        options={doctorOptions}
                        label={'Доктор'}
                        placeholder={'Изберете доктор'}
                        isMulti={true}
                        onChange={onSelectChange} />
                </Form>
                <Button color="success" onClick={onFormSubmitClick}>
                    Създай
                </Button>
                <Button className="ms-2" color="secondary" onClick={onCancelClick}>
                    Откажи
                </Button>
            </CardBody>
        </Card>
    );
};

export default AppointmentTypeCreate;
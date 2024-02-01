import { useState } from "react";
import appointmentTypeService from "../services/appointmentTypeService";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader, CardTitle, Form } from "reactstrap";
import Loader from "../common/loader";
import TextInput from "../common/inputs/textInput";
import SelectInput from "../common/inputs/selectInput";

const AppointmentTypeCreate = ({ onAppointmentTypeCreate, doctorOptions, onCancelClick }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
    });
    const [formErrors, setFormErrors] = useState({
        name: "",
    });

    const clearFormData = () => {
        setFormData({
            ...formData,
            name: "",
        });
    };

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

    const handleSelectInputChange = (options, input) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [input.name]: options ? options.map(x => x.value) : [],
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
            try {
                setIsLoading(true);

                const result = await appointmentTypeService.createAppointmentTypeAsync(formData);

                if (result.success) {
                    onAppointmentTypeCreate(result.data);

                    toast.success(`Успешно създадохте ${formData.name}.`, {
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
                        formData={formData.name}
                        label={'Име'}
                        placeholder={'Въведете име'}
                        error={formErrors.name}
                        onChange={handleInputChange} />
                    <SelectInput
                        id='doctors'
                        formData={formData.doctors}
                        options={doctorOptions}
                        label={'Доктор'}
                        placeholder={'Изберете доктор'}
                        isMulti={true}
                        onChange={handleSelectInputChange} />
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
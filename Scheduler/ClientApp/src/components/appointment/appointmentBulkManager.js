import { Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Form } from "reactstrap";
import Loader from "../common/loader";
import { useState } from "react";
import DateTimeInput from "../common/inputs/dateTimeInput";
import SelectInput from "../common/inputs/selectInput";
import NumberInput from "../common/inputs/numberInput";
import appointmentService from "../services/appointmentService";
import { toast } from "react-toastify";

const AppointmentBulkManager = ({ doctorOptions, setAppointments, onCancelClick, className }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        weekDays: [1, 2, 3, 4, 5]
    });
    const [formErrors, setFormErrors] = useState({});

    const weekDayOptions = [
        { value: 0, label: 'Неделя' },
        { value: 1, label: 'Понеделник' },
        { value: 2, label: 'Вторник' },
        { value: 3, label: 'Сряда' },
        { value: 4, label: 'Четвъртък' },
        { value: 5, label: 'Петък' },
        { value: 6, label: 'Събота' },
    ]

    const handleInputChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));

        // Clear validation error when user starts typing.
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "",
        }));
    };

    const handleSelectInputChange = (options, input) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [input.name]: options ? options.map(x => x.value) : null,
        }));
    };

    const validateForm = (operation) => {
        const errors = {};

        if (!formData.startDateTime) {
            errors.startDateTime = "Моля, попълнете начални дата и час.";
        }
        if (!formData.endDateTime) {
            errors.endDateTime = "Моля, попълнете крайни дата и час.";
        }

        if (new Date(formData.startDateTime) >= new Date(formData.endDateTime)) {
            errors.startDateTime = "Моля, попълнете начални дата и час, които са преди крайните.";
            errors.endDateTime = "Моля, попълнете крайни дата и час, които са след началните.";
        }

        if (!formData.weekDays || formData.weekDays.length === 0) {
            errors.weekDays = "Моля, изберете дни от седмицата.";
        }

        if (operation === 'create') {
            if (!formData.doctors || formData.doctors.length === 0) {
                errors.doctors = "Моля, изберете доктор(и).";
            }
            if (!formData.duration || parseInt(formData.duration) === 0) {
                errors.duration = "Моля, попълнете продължителност.";
            }
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Form is valid if there are no errors
    };

    const handleCreateClick = async () => {
        if (validateForm('create')) {
            try {
                setIsLoading(true);
                const result = await appointmentService.bulkCreateAsync(formData);

                if (result.success) {
                    setAppointments((prevAppointments) => [...prevAppointments, ...result.data]);

                    toast.success(`Успешно създадохте ${result.data.length} записа.`, {
                        icon: '✅'
                    });
                }
                else {
                    toast.error(result.message, {
                        icon: '❌',
                    });
                }
            }
            catch (error) {
                toast.error('Изникна грешка при обработването на резултата', {
                    icon: '❌',
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleDeleteClick = async () => {
        if (validateForm()) {
            try {
                setIsLoading(true);
                const result = await appointmentService.bulkDeleteAsync(formData);

                if (result.success) {
                    setAppointments((prevAppointments) => {
                        const updatedAppointments = prevAppointments.filter((x) => !result.data.some((y) => y.id === x.id));
                        return updatedAppointments;
                    });

                    toast.success(`Успешно изтрихте ${result.data.length} записа.`, {
                        icon: '✅'
                    });
                }
                else {
                    toast.error(result.message, {
                        icon: '❌',
                    });
                }
            }
            catch (error) {
                toast.error('Изникна грешка при обработването на резултата', {
                    icon: '❌',
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Card className={className}>
            {isLoading && <Loader />}
            <CardHeader>
                <CardTitle className="h5">Групово създаване/изтриване</CardTitle>
            </CardHeader>
            <CardBody>
                <Form>
                    <DateTimeInput
                        id='startDateTime'
                        formData={formData.startDateTime}
                        label='Начало'
                        error={formErrors.startDateTime}
                        onChange={handleInputChange} />
                    <DateTimeInput
                        id='endDateTime'
                        formData={formData.endDateTime}
                        label='Край'
                        error={formErrors.endDateTime}
                        onChange={handleInputChange} />
                    <NumberInput
                        id='duration'
                        formData={formData.duration}
                        label='Продължителност *'
                        placeholder='Изберете продължителност (в минути)'
                        error={formErrors.duration}
                        onChange={handleInputChange} />
                    <NumberInput
                        id='interval'
                        formData={formData.interval}
                        label='Интервал между часове *'
                        placeholder='Изберете интервал между часовете (в минути)'
                        error={formErrors.interval}
                        onChange={handleInputChange} />
                    <SelectInput
                        id='doctors'
                        formData={formData.doctors}
                        options={doctorOptions}
                        label='Доктори'
                        placeholder='Изберете доктори'
                        isMulti={true}
                        error={formErrors.doctors}
                        onChange={handleSelectInputChange} />
                    <SelectInput
                        id='weekDays'
                        formData={formData.weekDays}
                        options={weekDayOptions}
                        label='Дни от седмицата'
                        placeholder='Изберете дни от седмицата'
                        isMulti={true}
                        error={formErrors.weekDays}
                        onChange={handleSelectInputChange} />
                    <p>* Взима се предвид само при създаване.</p>
                </Form>
                <ButtonGroup className="gap-1 d-block">
                    <Button color="success" onClick={handleCreateClick}>
                        Създай
                    </Button>
                    <Button color="danger" onClick={handleDeleteClick}>
                        Изтрий
                    </Button>
                    <Button color="secondary" onClick={onCancelClick}>
                        Откажи
                    </Button>
                </ButtonGroup>
            </CardBody>
        </Card>
    );
};

export default AppointmentBulkManager;
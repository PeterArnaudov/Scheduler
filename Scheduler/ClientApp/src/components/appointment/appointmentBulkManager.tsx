import { Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Form } from "reactstrap";
import Loader from "../common/loader";
import React, { FC, useState } from "react";
import DateTimeInput from "../common/inputs/dateTimeInput";
import SelectInput from "../common/inputs/selectInput";
import NumberInput from "../common/inputs/numberInput";
import appointmentService from "../../services/appointmentService";
import { toast } from "react-toastify";
import { Option } from "../../models/items/option";
import { AppointmentModel } from "../../models/appointmentModel";
import { AppointmentBulkRequest } from "../../models/requests/appointmentBulkCreateRequest";
import { ActionMeta, MultiValue, SingleValue } from "react-select";
import { handleSelectInputChange } from "../../helpers/utils/reactSelectUtils";
import { handleInputChange } from "../../helpers/utils/inputUtils";

interface AppointmentBulkManagerProps {
    doctorOptions: Option[],
    setAppointments: React.Dispatch<React.SetStateAction<AppointmentModel[]>>,
    onCancelClick: () => void,
    className?: string
};

interface FormErrors {
    startDateTime?: string,
    endDateTime?: string,
    duration?: string,
    interval?: string,
    weekDays?: string,
    doctors?: string
};

const AppointmentBulkManager: FC<AppointmentBulkManagerProps> = ({ doctorOptions, setAppointments, onCancelClick, className }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [requestData, setRequestData] = useState<AppointmentBulkRequest>({
        startDateTime: new Date(),
        endDateTime: new Date(),
        duration: 60,
        interval: 15,
        doctors: doctorOptions.map(d => d.value),
        weekDays: [1, 2, 3, 4, 5]
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const weekDayOptions = [
        { value: Weekdays.Sunday, label: 'Неделя' },
        { value: Weekdays.Monday, label: 'Понеделник' },
        { value: Weekdays.Tuesday, label: 'Вторник' },
        { value: Weekdays.Wednesday, label: 'Сряда' },
        { value: Weekdays.Thursday, label: 'Четвъртък' },
        { value: Weekdays.Friday, label: 'Петък' },
        { value: Weekdays.Saturday, label: 'Събота' },
    ]

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        handleInputChange(e, key, setRequestData, setFormErrors);
    };
    
    const onSelectChange = (newValue: SingleValue<Option> | MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
        handleSelectInputChange(newValue, actionMeta, setRequestData);
    };

    const validateForm = (operation: "create" | "delete") => {
        const errors: FormErrors = {};

        if (!requestData.startDateTime) {
            errors.startDateTime = "Моля, попълнете начални дата и час.";
        }
        if (!requestData.endDateTime) {
            errors.endDateTime = "Моля, попълнете крайни дата и час.";
        }

        if (new Date(requestData.startDateTime) >= new Date(requestData.endDateTime)) {
            errors.startDateTime = "Моля, попълнете начални дата и час, които са преди крайните.";
            errors.endDateTime = "Моля, попълнете крайни дата и час, които са след началните.";
        }

        if (!requestData.weekDays || requestData.weekDays.length === 0) {
            errors.weekDays = "Моля, изберете дни от седмицата.";
        }

        if (operation === 'create') {
            if (!requestData.doctors || requestData.doctors.length === 0) {
                errors.doctors = "Моля, изберете доктор(и).";
            }
            if (!requestData.duration || requestData.duration === 0) {
                errors.duration = "Моля, попълнете продължителност.";
            }
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Form is valid if there are no errors
    };

    const handleCreateClick = async () => {
        if (validateForm("create")) {
            try {
                setIsLoading(true);
                const result = await appointmentService.bulkCreateAsync(requestData);

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
        if (validateForm("delete")) {
            try {
                setIsLoading(true);
                const result = await appointmentService.bulkDeleteAsync(requestData);

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
                        formData={requestData.startDateTime}
                        label='Начало'
                        error={formErrors.startDateTime}
                        onChange={onInputChange} />
                    <DateTimeInput
                        id='endDateTime'
                        formData={requestData.endDateTime}
                        label='Край'
                        error={formErrors.endDateTime}
                        onChange={onInputChange} />
                    <NumberInput
                        id='duration'
                        formData={requestData.duration}
                        label='Продължителност *'
                        placeholder='Изберете продължителност (в минути)'
                        error={formErrors.duration}
                        onChange={onInputChange} />
                    <NumberInput
                        id='interval'
                        formData={requestData.interval}
                        label='Интервал между часове *'
                        placeholder='Изберете интервал между часовете (в минути)'
                        error={formErrors.interval}
                        onChange={onInputChange} />
                    <SelectInput
                        id='doctors'
                        formData={requestData.doctors}
                        options={doctorOptions}
                        label='Доктори'
                        placeholder='Изберете доктори'
                        isMulti={true}
                        error={formErrors.doctors}
                        onChange={onSelectChange} />
                    <SelectInput
                        id='weekDays'
                        formData={requestData.weekDays}
                        options={weekDayOptions}
                        label='Дни от седмицата'
                        placeholder='Изберете дни от седмицата'
                        isMulti={true}
                        error={formErrors.weekDays}
                        onChange={onSelectChange} />
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
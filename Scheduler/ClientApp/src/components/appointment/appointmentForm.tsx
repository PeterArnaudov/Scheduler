import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Doctor from "../doctor/doctor";
import Result from "../common/result";
import { Alert, Button, FormGroup } from "reactstrap";
import { extractDate, extractHour } from "../../helpers/formatters/dateFormatter";
import StepList from "../common/stepList";
import Loader from "../common/loader";
import appointmentTypeService from "../../services/appointmentTypeService";
import TextInput from "../common/inputs/textInput";
import { DoctorModel } from "../../models/doctorModel";
import { AppointmentModel } from "../../models/appointmentModel";
import { AppointmentTypeModel } from "../../models/appointmentTypeModel";
import { AppointmentSubmitRequest } from "../../models/requests/appointmentSubmitRequest";
import { handleInputChange } from "../../helpers/utils/inputUtils";
import SelectInput from "../common/inputs/selectInput";
import { ActionMeta, MultiValue, SingleValue } from "react-select";
import { Option } from "../../models/items/option";
import { handleSelectInputChange } from "../../helpers/utils/reactSelectUtils";

interface AppointmentFormInterface {
    doctor: DoctorModel,
    selectedAppointment: AppointmentModel
};

interface FormErrors {
    name?: string,
    email?: string,
    phone?: string
    appointment?: string,
};

const AppointmentForm: FC<AppointmentFormInterface> = ({ doctor, selectedAppointment }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<AppointmentSubmitRequest>({
        appointmentId: selectedAppointment?.id ?? 0,
        phone: "",
    });

    const [appointmentTypes, setAppointmentTypes] = useState<AppointmentTypeModel[]>([]);
    const [hasQuickAppointmentFailed, setHasQuickAppointmentFailed] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState<FormErrors>({
        name: "",
        email: "",
        phone: "",
        appointment: "",
    });
    const [formResult, setFormResult] = useState<boolean | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const hasFormResult = formResult !== undefined && formResult !== null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await appointmentTypeService.getAppointmentTypesAsync(doctor.id);

                if (result.success) {
                    setAppointmentTypes(result.data);
                } else {
                    console.error('Error fetching appointment types:', result.message);
                }
            } catch (error) {
                console.error('An unexpected error occurred:', error);
            }
        };

        if (!doctor || !selectedAppointment) {
            navigate('/doctors');
        } else {
            fetchData();
        }
    }, [doctor, selectedAppointment, navigate]);

    const getAppointmentTypeOptions = (): Option[] => {
        return appointmentTypes.map((type) => (
            {
                value: type.id,
                label: type.name
            }
        ))
    };

    const onFormSubmitClick = async () => {
        if (validateForm(hasQuickAppointmentFailed)) {
            try {
                setIsLoading(true);

                const response = await fetch("/api/appointment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                var result = await response.json();

                if (response.ok) {
                    if (result.success) {
                        setFormResult(result.success);
                    }
                } else {
                    if (!result.success && result.isQuickAppointment) {
                        setHasQuickAppointmentFailed(true);
                        validateForm(true);
                    }
                    else {
                        setFormResult(result.success);
                    }
                }
            } catch (error) {
                setFormResult(false);

                console.error('An unexpected error occurred:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const validateForm = (hasQuickAppointmentFailed: boolean) => {
        const errors: FormErrors = {};

        if ((!formData.name || !formData.name.trim()) && hasQuickAppointmentFailed) {
            errors.name = "Моля, попълнете Вашето име.";
        }
        if ((!formData.email || !formData.email.trim()) && hasQuickAppointmentFailed) {
            errors.email = "Моля, попълнете Вашият email.";
        }
        if (!formData.phone || !formData.phone.trim()) {
            errors.phone = "Моля, попълнете Вашият телефонен номер.";
        }

        // Check either #typeId has a selected option or #comment has a value
        if (!formData.appointmentTypeId && (!formData.comment || !formData.comment.trim())) {
            errors.appointment = "Моля, изберете процедура или добавете коментар.";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Form is valid if there are no errors
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        handleInputChange(e, key, setFormData, setFormErrors);

        // Clear form result when user starts typing.
        setFormResult(undefined);
    };

    const onSelectChange = (newValue: SingleValue<Option> | MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
        handleSelectInputChange(newValue, actionMeta, setFormData);
    };


    return (
        <div>
            {hasFormResult &&
                <div>
                    <Result
                        isSuccess={formResult}
                        message={formResult
                            ? `Успешно запазихте своя час. Очакваме Ви в ${extractDate(selectedAppointment.startDateTime)} в ${extractHour(selectedAppointment.startDateTime)} ч.`
                            : "Изникна грешка при запазване на час. Моля, свържете се по телефон с нас."}>
                        {formResult
                            ? <Button color="primary" onClick={() => navigate('/doctors')} >Запази друг час</Button>
                            : <Button href="tel:+359885127779" color="primary">Обади ни се</Button>}
                        <Button href="https://dentahouse.bg" color="primary">Върни се в сайта</Button>
                    </Result>
                    {formResult && (
                        <>
                            <Alert color="info">
                                <p>Ако желаете да получавате напомняне за Вашите посещения и друга полезна информация от нас, може да се абонирате за нашия Viber Bot, изпълнявайте изброените стъпки отдолу:</p>
                                <StepList
                                    steps={[
                                        {
                                            title: "Отворете нашия Viber Bot",
                                            description: "Натиснете бутона отдолу, който ще Ви отведе до нашия Viber Bot.",
                                            children: [<Button className='mt-2'>Viber Bot</Button>]
                                        },
                                        {
                                            title: "Изпратете мобилен номер",
                                            description: "Въведете своя мобилен номер и изпратете съобщението до нашия Viber Bot."
                                        },
                                        {
                                            title: "Готово!",
                                            description: "Вие вече сте абониран за нашия Viber Bot и ще получавате напомняне за предстоящите Ви посещения и друга важна информация!"
                                        },
                                    ]} />
                            </Alert>
                        </>
                    )}
                </div>
            }
            {(!hasFormResult || !formResult) &&
                <div className="row mb-4">
                    <Doctor doctorData={doctor} selectedAppointment={selectedAppointment} />
                    <div className={`col-sm-12 col-md-6 col-lg-8 mt-3 ${isLoading ? 'loading' : ''}`}>
                        {isLoading && <Loader />}
                        <div className="alert alert-info">
                            Ако вече сте запазвали час чрез нашата онлайн система, може да попълните единствено телефонен номер.
                        </div>
                        <TextInput
                            id='name'
                            formData={formData.name}
                            label='Име и фамилия'
                            placeholder='Въведете име и фамилия'
                            error={formErrors.name}
                            onChange={onInputChange} />
                        <TextInput
                            id='email'
                            formData={formData.email}
                            label='Email'
                            placeholder='Въведете email'
                            error={formErrors.email}
                            onChange={onInputChange} />
                        <TextInput
                            id='phone'
                            formData={formData.phone}
                            label='Телефонен номер'
                            placeholder='Въведете телефонен номер'
                            error={formErrors.phone}
                            onChange={onInputChange} />
                        <SelectInput
                            id='appointmentTypeId'
                            formData={formData.appointmentTypeId}
                            options={getAppointmentTypeOptions()}
                            label={'Изберете процедура'}
                            placeholder={'Изберете процедура'}
                            onChange={onSelectChange} />
                        <TextInput
                            id='comment'
                            formData={formData.comment}
                            label='Допълнителен коментар'
                            placeholder='Добавете допълнителен коментар'
                            error={formErrors.appointment}
                            onChange={onInputChange} />
                        <button className="btn btn-primary mt-2 w-100" onClick={onFormSubmitClick}>
                            Запази час
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};

export default AppointmentForm;

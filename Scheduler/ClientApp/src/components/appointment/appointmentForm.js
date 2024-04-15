import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Doctor from "../doctor/doctor";
import Result from "../common/result";
import { Alert, Button, FormGroup } from "reactstrap";
import { extractDate, extractHour } from "../../helpers/formatters/dateFormatter";
import StepList from "../common/stepList";
import Loader from "../common/loader";
import appointmentTypeService from "../../services/appointmentTypeService";
import TextInput from "../common/inputs/textInput";

const AppointmentForm = ({ doctor, selectedAppointment }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        appointmentId: selectedAppointment?.id,
        appointmentTypeId: 0,
        name: "",
        email: "",
        phone: "",
        comment: "",
    });

    const [appointmentTypes, setAppointmentTypes] = useState([]);
    const [hasQuickAppointmentFailed, setHasQuickAppointmentFailed] = useState(false);
    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        phone: "",
        appointment: "",
    });
    const [formResult, setFormResult] = useState();
    const [isLoading, setIsLoading] = useState(false);

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
                console.error('An unexpected error occurred:', error.message);
            }
        };

        if (!doctor || !selectedAppointment) {
            navigate('/doctors');
        } else {
            fetchData();
        }
    }, [doctor, selectedAppointment, navigate]);

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

                console.error('An unexpected error occurred:', error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const validateForm = (hasQuickAppointmentFailed) => {
        const errors = {};

        if (!formData.name.trim() && hasQuickAppointmentFailed) {
            errors.name = "Моля, попълнете Вашето име.";
        }
        if (!formData.email.trim() && hasQuickAppointmentFailed) {
            errors.email = "Моля, попълнете Вашият email.";
        }
        if (!formData.phone.trim()) {
            errors.phone = "Моля, попълнете Вашият телефонен номер.";
        }

        // Check either #typeId has a selected option or #comment has a value
        if (!formData.appointmentTypeId && !formData.comment.trim()) {
            errors.appointment = "Моля, изберете процедура или добавете коментар.";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Form is valid if there are no errors
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

        // Clear form result when user starts typing.
        setFormResult();
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
                                            children: <Button className='mt-2'>Viber Bot</Button>
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
                    <Doctor doctor={doctor} selectedAppointment={selectedAppointment} />
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
                            onChange={handleInputChange} />
                        <TextInput
                            id='email'
                            formData={formData.email}
                            label='Email'
                            placeholder='Въведете email'
                            error={formErrors.email}
                            onChange={handleInputChange} />
                        <TextInput
                            id='phone'
                            formData={formData.phone}
                            label='Телефонен номер'
                            placeholder='Въведете телефонен номер'
                            error={formErrors.phone}
                            onChange={handleInputChange} />
                        <FormGroup>
                            <label htmlFor="appointmentTypeId" className="mt-2">
                                Изберете процедура
                            </label>
                            <select
                                id="appointmentTypeId"
                                className="form-select"
                                onChange={(e) => handleInputChange(e, "appointmentTypeId")}
                                placeholder="Изберете процедура"
                                {...(appointmentTypes.length === 0 ? { disabled: true } : {})}>
                                <option>Изберете процедура</option>
                                {appointmentTypes.map((type) => (
                                    <option key={type.value} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="comment" className="mt-2">
                                Допълнителен коментар
                            </label>
                            <textarea
                                id="comment"
                                className="form-control"
                                onChange={(e) => handleInputChange(e, "comment")}
                                placeholder="Добавете допълнителен коментар"></textarea>
                            {formErrors.appointment && <div style={{ color: 'red' }}>{formErrors.appointment}</div>}
                        </FormGroup>
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

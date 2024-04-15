import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Form } from "reactstrap";
import Loader from "../common/loader";
import appointmentService from "../../services/appointmentService";
import CheckboxInput from "../common/inputs/checkboxInput";
import DateTimeInput from "../common/inputs/dateTimeInput";
import SelectInput from "../common/inputs/selectInput";

const AppointmentEdit = ({ appointment, doctors, patients, appointmentTypes, setAppointment, setAppointments, toggleEditMode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [doctorAppointmentTypes, setDoctorAppointmentTypes] = useState([]);
    const [formData, setFormData] = useState({
        isFree: appointment.isFree,
        doctorId: appointment.doctor?.id,
        patientId: appointment.patient?.id,
        typeId: appointment.type?.id,
        startDateTime: appointment.startDateTime,
        endDateTime: appointment.endDateTime,
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (appointment.doctor?.id) {
            setDoctorAppointmentTypes(getDoctorAppointmentTypes(appointment.doctor.id));
        }
    }, [])

    const getDoctorOptions = () => {
        return doctors.map((doctor) => ({
            value: doctor.id,
            label: doctor.name,
        }));
    };

    const getPatientOptions = () => {
        return patients.map((patient) => ({
            value: patient.id,
            label: `${patient.name} (${patient.phone})`,
        }));
    };

    const getDoctorAppointmentTypes = (doctorId) => {
        const filteredAppointmentTypes = appointmentTypes.filter(
            (appointmentType) => appointmentType.doctorId === doctorId || appointmentType.doctorId === undefined
        );

        const mappedAppointments = filteredAppointmentTypes.map((appointmentType) => ({
            value: appointmentType.id,
            label: appointmentType.name,
        }));

        return mappedAppointments;
    };

    const handleDoctorSelect = (option, input) => {
        setDoctorAppointmentTypes(getDoctorAppointmentTypes(option.value));

        handleSelectInputChange(option, input);
    };

    const handleCheckboxInputChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.id]: e.target.checked,
        }));
    };

    const handleSelectInputChange = (option, input) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [input.name]: option ? option.value : null,
        }));
    };

    const handleDateTimeInputChange = (e) => {
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

    const validateForm = () => {
        const errors = {};

        if (!formData.doctorId || formData.doctorId === 0) {
            errors.doctor = "Моля, изберете доктор.";
        }
        if (!formData.isFree && (!formData.patientId || formData.patientId === 0)) {
            errors.patient = 'Моля, изберете пациент.'
        }
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

        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Form is valid if there are no errors
    };

    const onFormSubmitClick = async () => {
        if (validateForm()) {
            try {
                setIsLoading(true);

                formData.id = appointment.id;
                const result = await appointmentService.editAppointmentAsync(formData);

                if (result.success) {
                    setAppointment(prevAppointment => ({
                        ...prevAppointment,
                        ...result.data
                    }));

                    setAppointments(prevAppointments => {
                        const updatedAppointment = result.data;
                        const updatedAppointments = prevAppointments.map(appointment => {
                            if (appointment.id === updatedAppointment.id) {
                                // If the ID matches, replace the existing appointment with the updated one
                                return updatedAppointment;
                            }
                            // For other appointments, return them unchanged
                            return appointment;
                        });
                        return updatedAppointments;
                    });

                    toggleEditMode();

                    toast.success(`Успешно редактира слота.`, {
                        icon: '✅',
                    });
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
        <Form className={`text-start ${isLoading ? 'loading' : ''}`}>
            {isLoading && <Loader />}
            <CheckboxInput
                id={'isFree'}
                formData={formData.isFree}
                label='Свободен час'
                error={formErrors.isFree}
                onChange={handleCheckboxInputChange} />
            <SelectInput
                id='doctorId'
                formData={formData.doctorId}
                options={getDoctorOptions()}
                label={'Доктор'}
                placeholder={'Изберете доктор'}
                onChange={handleDoctorSelect} />
            <SelectInput
                id='typeId'
                formData={formData.typeId}
                options={doctorAppointmentTypes}
                label={'Процедура'}
                placeholder={'Изберете процедура'}
                onChange={handleSelectInputChange} />
            <SelectInput
                id='patientId'
                formData={formData.patientId}
                options={getPatientOptions()}
                isDisabled={formData.isFree}
                label={'Пациент'}
                placeholder={'Изберете пациент'}
                onChange={handleSelectInputChange} />
            <DateTimeInput
                id='startDateTime'
                formData={formData.startDateTime}
                label='Начало'
                error={formErrors.startDateTime}
                onChange={handleDateTimeInputChange} />
            <DateTimeInput
                id='endDateTime'
                formData={formData.endDateTime}
                label='Край'
                error={formErrors.endDateTime}
                onChange={handleDateTimeInputChange} />
            <div className="text-center">
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
            </div>
        </Form>
    );
};

export default AppointmentEdit;
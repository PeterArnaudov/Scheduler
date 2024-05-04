import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Form } from "reactstrap";
import Loader from "../common/loader";
import appointmentService from "../../services/appointmentService";
import CheckboxInput from "../common/inputs/checkboxInput";
import DateTimeInput from "../common/inputs/dateTimeInput";
import SelectInput from "../common/inputs/selectInput";
import { AppointmentModel } from "../../models/appointmentModel";
import { DoctorModel } from "../../models/doctorModel";
import { AppointmentTypeModel } from "../../models/appointmentTypeModel";
import { PatientModel } from "../../models/patientModel";
import { Option } from "../../models/items/option";
import { AppointmentEditRequest } from "../../models/requests/appointmentEditRequest";
import { ActionMeta, MultiValue, SingleValue } from "react-select";
import { handleSelectInputChange, isMultiValue } from "../../helpers/utils/reactSelectUtils";
import { handleInputChange } from "../../helpers/utils/inputUtils";

interface AppointmentEditProps {
    appointment: AppointmentModel,
    doctors: DoctorModel[],
    patients: PatientModel[],
    appointmentTypes: AppointmentTypeModel[],
    setAppointment: React.Dispatch<React.SetStateAction<AppointmentModel | undefined>>,
    setAppointments: React.Dispatch<React.SetStateAction<AppointmentModel[]>>,
    toggleEditMode: () => void
};

interface FormErrors {
    doctor?: string,
    patient?: string,
    startDateTime?: string
    endDateTime?: string,
    isFree?: string
};

const AppointmentEdit: FC<AppointmentEditProps> = ({ appointment, doctors, patients, appointmentTypes, setAppointment, setAppointments, toggleEditMode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [doctorAppointmentTypes, setDoctorAppointmentTypes] = useState<Option[]>([]);
    const [requestData, setRequestData] = useState<AppointmentEditRequest>({
        id: appointment.id,
        isFree: appointment.isFree,
        doctorId: appointment.doctor.id,
        patientId: appointment.patient?.id,
        typeId: appointment.type?.id,
        startDateTime: appointment.startDateTime,
        endDateTime: appointment.endDateTime,
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (appointment.doctor?.id) {
            setDoctorAppointmentTypes(getDoctorAppointmentTypes(appointment.doctor.id));
        }
    }, [])

    const getDoctorOptions = (): Option[] => {
        return doctors.map((doctor) => ({
            value: doctor.id,
            label: doctor.name,
        }));
    };

    const getPatientOptions = (): Option[] => {
        return patients.map((patient) => ({
            value: patient.id,
            label: `${patient.name} (${patient.phone})`,
        }));
    };

    const getDoctorAppointmentTypes = (doctorId: number): Option[] => {
        const filteredAppointmentTypes = appointmentTypes.filter(
            (appointmentType) => appointmentType.doctorId === doctorId || appointmentType.doctorId === undefined
        );

        const mappedAppointments = filteredAppointmentTypes.map((appointmentType) => ({
            value: appointmentType.id,
            label: appointmentType.name,
        }));

        return mappedAppointments;
    };

    const onDoctorSelect = (newValue: SingleValue<Option> | MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
        if (isMultiValue(newValue)) {
            return;
        } else {
            setDoctorAppointmentTypes(getDoctorAppointmentTypes(newValue?.value));
        }
    
        onSelectChange(newValue, actionMeta);
    };
    
    const onSelectChange = (newValue: SingleValue<Option> | MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
        handleSelectInputChange(newValue, actionMeta, setRequestData);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        handleInputChange(e, key, setRequestData, setFormErrors);
    };

    const validateForm = (): boolean => {
        const errors: FormErrors = {};

        if (!requestData.doctorId || requestData.doctorId === 0) {
            errors.doctor = "Моля, изберете доктор.";
        }
        if (!requestData.isFree && (!requestData.patientId || requestData.patientId === 0)) {
            errors.patient = 'Моля, изберете пациент.'
        }
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

        setFormErrors(errors);
        
        return Object.keys(errors).length === 0; // Form is valid if there are no errors
    };

    const onFormSubmitClick = async () => {
        if (validateForm()) {
            try {
                setIsLoading(true);

                requestData.id = appointment.id;
                const result = await appointmentService.editAppointmentAsync(requestData);

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
                formData={requestData.isFree}
                label='Свободен час'
                error={formErrors.isFree}
                onChange={onInputChange} />
            <SelectInput
                id='doctorId'
                formData={requestData.doctorId}
                options={getDoctorOptions()}
                label={'Доктор'}
                placeholder={'Изберете доктор'}
                error={formErrors.doctor}
                onChange={onDoctorSelect} />
            <SelectInput
                id='typeId'
                formData={requestData.typeId}
                options={doctorAppointmentTypes}
                label={'Процедура'}
                placeholder={'Изберете процедура'}
                onChange={onSelectChange} />
            <SelectInput
                id='patientId'
                formData={requestData.patientId}
                options={getPatientOptions()}
                isDisabled={requestData.isFree}
                label={'Пациент'}
                placeholder={'Изберете пациент'}
                error={formErrors.patient}
                onChange={onSelectChange} />
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
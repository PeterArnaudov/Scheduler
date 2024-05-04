import React, { FC, useEffect, useState } from "react";
import appointmentTypeService from "../../services/appointmentTypeService";
import { toast } from "react-toastify";
import doctorService from "../../services/doctorService";
import { Button } from "reactstrap";
import AppointmentTypeCreate from "./appointmentTypeCreate";
import { AppointmentTypeModel } from "../../models/appointmentTypeModel";
import { Option } from "../../models/items/option";
import AppointmentTypeList from "./appointmenTypetList";

const AppointmentTypeContainer: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [appointmentTypes, setAppointmentTypes] = useState<AppointmentTypeModel[]>([]);
    const [doctorOptions, setDoctorOptions] = useState<Option[]>([]);
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

    const toggleIsLoading = () => {
        setIsLoading(!isLoading);
    };

    const toggleCreateOpen = () => {
        setIsCreateOpen(!isCreateOpen);
    }

    useEffect(() => {
        const populateAppointmentTypeData = async () => {
            try {
                toggleIsLoading();

                var result = await appointmentTypeService.getAppointmentTypesAsync();

                setAppointmentTypes(result.data);
            } catch (error) {
                console.error('Error fetching appointment type data:', error);
            } finally {
                toggleIsLoading();
            }
        };

        const populateDoctorOptions = async () => {
            try {
                var result = await doctorService.getDoctorsAsync();
                const doctorOptions = result.data.map((doctor) => ({
                    value: doctor.id,
                    label: doctor.name,
                }));

                const defaultOption = {
                    value: undefined,
                    label: 'Всички'
                };

                const options = [defaultOption, ...doctorOptions];

                setDoctorOptions(options);
            } catch (error) {
                console.error('Error fetching doctor data:', error);
            }
        };

        populateAppointmentTypeData();
        populateDoctorOptions();
    }, []);

    const groupedAppointments = appointmentTypes.reduce(
        (grouped: { [key: number]: AppointmentTypeModel[] }, appointmentType): { [key: number]: AppointmentTypeModel[] } => {
            const doctorId = appointmentType.doctorId || 0;
            grouped[doctorId] = grouped[doctorId] || [];
            grouped[doctorId].push(appointmentType);
            return grouped;
        }, {});

    const handleCreateAppointmentType = (appointmentTypes: AppointmentTypeModel[]) => {
        setAppointmentTypes((prevAppointmentTypes) => [...prevAppointmentTypes, ...appointmentTypes]);
    }

    const handleEditAppointmentType = async (editedAppointmentType: AppointmentTypeModel) => {
        try {
            const result = await appointmentTypeService.editAppointmentTypeAsync(editedAppointmentType);

            if (result.success) {
                setAppointmentTypes((prevAppointmentTypes) => {
                    return prevAppointmentTypes.map((appointmentType) =>
                        appointmentType.id === editedAppointmentType.id ? result.data : appointmentType
                    );
                });

                toast.success(`Успешно редактирахте ${editedAppointmentType.name}.`, {
                    icon: '✅'
                });
            }
            else {
                toast.error(result.message, {
                    icon: '❌',
                });
            }

            return result.success;
        }
        catch (error) {
            toast.error('Изникна грешка при обработването на резултата', {
                icon: '❌',
            });

            return false;
        }
    };

    const handleDeleteAppointmentType = async (appointmentType: AppointmentTypeModel) => {
        try {
            const result = await appointmentTypeService.deleteAppointmentTypeAsync(appointmentType.id);

            if (result.success) {
                setAppointmentTypes((prevAppointmentTypes) => {
                    const updatedAppointmentTypes = prevAppointmentTypes.filter((x) => x.id !== appointmentType.id);
                    return updatedAppointmentTypes;
                });

                toast.success(`Успешно изтрихте ${appointmentType.name}.`, {
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
        }
    };

    return (
        <>
            <span>
                <Button
                    className="mb-2 w-100"
                    color={!isCreateOpen ? "success" : "secondary"}
                    onClick={toggleCreateOpen}>
                    {!isCreateOpen ? "Създаване" : "Откажи"}
                </Button>

                {isCreateOpen &&
                    <AppointmentTypeCreate
                        onAppointmentTypeCreate={handleCreateAppointmentType}
                        doctorOptions={doctorOptions}
                        onCancelClick={toggleCreateOpen} />}
            </span>
            {Object.entries(groupedAppointments).map(([doctorId, types]) => (
                <div key={doctorId}>
                    <AppointmentTypeList
                        appointmentTypes={types}
                        doctorName={doctorOptions.find(x => x.value === parseInt(doctorId))?.label ?? 'Общи процедури'}
                        doctorOptions={doctorOptions}
                        onEditAppointmentType={handleEditAppointmentType}
                        onDeleteAppointmentType={handleDeleteAppointmentType}
                    />
                </div>
            ))}
        </>
    );
};

export default AppointmentTypeContainer;
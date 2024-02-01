import { useEffect, useState } from "react";
import appointmentService from "../services/appointmentService";
import { Calendar, Views, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'dayjs/locale/bg';
import Loader from "../common/loader";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import AppointmentDetails from "./appointmentDetails";
import Legend from "../common/legend";
import FilterContainer from "../common/filters/filterContainer";
import CheckboxFilter from "../common/filters/checkboxFilter";
import MultiSelectFilter from "../common/filters/multiSelectFilter";
import doctorService from "../services/doctorService";
import appointmentTypeService from "../services/appointmentTypeService";
import { toast } from "react-toastify";
import patientService from "../services/patientService";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { formatDateTimeLocal } from "../../helpers/formatters/dateFormatter";
import DateFilter from "../common/filters/dateFilter";
import AppointmentBulkManager from "./appointmentBulkManager";

const DragAndDropCalendar = withDragAndDrop(Calendar);

const AppointmentSchedule = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [appointmentTypes, setAppointmentTypes] = useState([]);
    const [patients, setPatients] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isBulkManagerOpen, setIsBulkManagerOpen] = useState(false);
    const [isFilteringOpen, setIsFilteringOpen] = useState(false);
    const [filterData, setFilterData] = useState({
        free: true,
        occupied: true,
        startDateTime: formatDateTimeLocal(new Date().setMonth(new Date().getMonth() - 1)),
        endDateTime: formatDateTimeLocal(new Date().setMonth(new Date().getMonth() + 1))
    });

    useEffect(() => {
        const populateAppointmentData = async () => {
            try {
                setIsLoading(true);

                var result = await appointmentService.searchAsync(filterData);

                setAppointments(result.data);
            } catch (error) {
                console.error('Error fetching schedule data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        populateAppointmentData();
    }, [filterData]);

    useEffect(() => {
        const populateDoctorData = async () => {
            try {
                setIsLoading(true);

                var result = await doctorService.getDoctorsAsync();

                setDoctors(result.data);
            } catch (error) {
                console.error('Error fetching doctor data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const populateAppointmentTypeData = async () => {
            try {
                const result = await appointmentTypeService.getAppointmentTypesAsync();

                setAppointmentTypes(result.data);
            } catch (error) {
                console.error('Error fetching appointment types data:', error.message);
            }
        };

        const populatePatientData = async () => {
            try {
                const result = await patientService.searchAsync();

                setPatients(result.data);
            } catch (error) {
                console.error('Error fetching appointment types data:', error.message);
            }
        };

        populateDoctorData();
        populateAppointmentTypeData();
        populatePatientData();
    }, [])

    dayjs.locale('bg');
    dayjs.extend(timezone);
    const localizer = dayjsLocalizer(dayjs)

    const toggleModal = () => {
        setIsModelOpen(!isModelOpen);
    }

    const toggleBulkManagerOpen = () => {
        setIsBulkManagerOpen(!isBulkManagerOpen);
    }

    const toggleFilteringOpen = () => {
        setIsFilteringOpen(!isFilteringOpen);
    }

    const getDoctorMultiSelectOptions = () => {
        return doctors.map((doctor) => ({
            value: doctor?.id,
            label: doctor?.name,
            color: doctor?.color,
        }));
    };

    const getDoctorLegendItems = () => {
        return doctors.map((doctor) => ({
            text: doctor?.name,
            color: doctor?.color
        }));
    };

    const events = appointments.map((appointment) => ({
        title: `${localizer.format(appointment.startDateTime, 'HH:mm')} - ${localizer.format(appointment.endDateTime, 'HH:mm')}
            ${appointment.patient?.name ? appointment.patient?.name : 'Свободен'}`,
        start: new Date(appointment.startDateTime),
        end: new Date(appointment.endDateTime),
        settings: {
            color: doctors.find(x => x.id === appointment.doctor?.id)?.color,
            borderColor: appointment.isFree ? 'green' : 'red',
        },
        appointment: appointment
    }));

    const eventPropGetter = (event) => {
        return {
            style: {
                backgroundColor: event.settings.color,
                border: `2px solid ${event.settings.borderColor}`
            },
        };
    };

    const handleSelect = (id) => {
        setSelectedAppointment(appointments.find(x => x.id === id));
        toggleModal();
    }

    const updateFilterData = (updatedFilterData) => {
        setFilterData(updatedFilterData);
    };

    const onDelete = async (appointment) => {
        try {
            setIsLoading(true);
            const result = await appointmentService.deleteAppointmentAsync(appointment.id);

            if (result.success) {
                setAppointments((prevAppointments) => {
                    const updatedAppointments = prevAppointments.filter((x) => x.id !== appointment.id);
                    return updatedAppointments;
                });

                toast.success(`Успешно изтри записа.`, {
                    icon: '✅'
                });

                toggleModal();
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
    };

    const moveEvent = async ({ event, start, end }) => {
        const formData = {
            ...event.appointment,
            typeId: event.appointment.type?.id,
            doctorId: event.appointment.doctor?.id,
            patientId: event.appointment.patient?.id,
            startDateTime: formatDateTimeLocal(start),
            endDateTime: formatDateTimeLocal(end)
        };

        const result = await appointmentService.editAppointmentAsync(formData);

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
    };

    const doctorSelectStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: 'white',
            borderColor: state.isFocused ? 'blue' : 'gray',
            boxShadow: state.isFocused ? '0 0 0 1px blue' : 'none',
        }),
        option: (provided, state) => {
            const color = state.data.color;

            return {
                ...provided,
                ...(state.data.color
                    ? state.isDisabled
                        ? undefined
                        : state.isSelected
                            ? state.data.color
                            : state.isFocused
                                ? { backgroundColor: `${color}33` }
                                : { backgroundColor: 'white' }
                    : undefined),
                color: state.isDisabled
                    ? '#ccc'
                    : state.isSelected
                        ? 'red'
                            ? 'white'
                            : 'black'
                        : color,
                cursor: state.isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...provided[':active'],
                    ...(state.data.color
                        ? {
                            backgroundColor: !state.isDisabled
                                ? state.isSelected
                                    ? color
                                    : state.data.color + '4D'
                                : undefined
                        }
                        : undefined),
                },
            };
        },
        multiValue: (provided, state) => ({
            ...provided,
            ...(state.data.color ? { backgroundColor: state.data.color + '33' } : undefined),
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: 'black',
        }),
        multiValueRemove: (provided,) => ({
            ...provided,
            color: 'black',
            ':hover': {
                backgroundColor: 'red',
                color: 'white',
            },
        }),
    };

    return (
        <div className={`${isLoading ? 'loading' : ''}`}>
            {isLoading && <Loader />}
            <span>
                <Button
                    className="mb-2 w-100"
                    color={!isBulkManagerOpen ? "success" : "secondary"}
                    onClick={toggleBulkManagerOpen}>
                    {!isBulkManagerOpen ? "Създаване/Изтриване" : "Откажи"}
                </Button>

                {isBulkManagerOpen &&
                    <AppointmentBulkManager
                        className='mb-2'
                        doctorOptions={getDoctorMultiSelectOptions()}
                        setAppointments={setAppointments}
                        onCancelClick={toggleBulkManagerOpen} />}
            </span>
            <span>
                <Button
                    className="mb-2 w-100"
                    color={!isFilteringOpen ? "primary" : "secondary"}
                    onClick={toggleFilteringOpen}>
                    {!isFilteringOpen ? "Филтриране" : "Откажи"}
                </Button>

                {isFilteringOpen &&
                    <FilterContainer className="mb-2 mt-2"
                        initialFilterData={filterData}
                        updateFilterData={updateFilterData} >
                        <DateFilter
                            className='d-inline-block col-12 col-lg-3'
                            name='startDateTime'
                            label='Начална дата' />
                        <DateFilter
                            className='d-inline-block col-12 col-lg-3'
                            name='endDateTime'
                            label='Крайна дата' />
                        <MultiSelectFilter
                            className='col-12 col-lg-6 mb-2'
                            options={getDoctorMultiSelectOptions()}
                            name='doctors'
                            label='Доктори'
                            customStyles={doctorSelectStyles} />
                        <CheckboxFilter name={'free'} label={'Свободни часове'} />
                        <CheckboxFilter name={'occupied'} label={'Заети часове'} />
                    </FilterContainer>}
            </span>
            <hr />
            <div className="mb-2">
                <Legend legendItems={getDoctorLegendItems()} />
                <Legend legendItems={[
                    {
                        text: 'Свободен час',
                        style: {
                            border: '2px solid green'
                        },
                    },
                    {
                        text: 'Зает час',
                        style: {
                            border: '2px solid red'
                        },
                    }]} />
            </div>
            <hr />
            <DragAndDropCalendar
                localizer={localizer}
                events={events}
                defaultView={Views.WEEK} // sets the view on initial render
                dayLayoutAlgorithm="no-overlap" // render option for overlapping events
                min={new Date(2020, 1, 1, 6)} // start hour in DAY view
                max={new Date(9999, 1, 1, 23)} // end hour in DAY view
                length={6} // agenda dates range (today + X days)
                popup={true} // pop-up to quickly display more events (on show more click)
                eventPropGetter={eventPropGetter} // event styling
                onSelectEvent={(event) => handleSelect(event.appointment.id)} // onSelect event function callback
                onEventDrop={moveEvent}
                onEventResize={moveEvent}
                messages={
                    {
                        day: 'Ден',
                        week: 'Седмица',
                        month: 'Месец',
                        previous: 'Назад',
                        next: 'Напред',
                        yesterday: 'Вчера',
                        tomorrow: 'Утре',
                        today: 'Днес',
                        agenda: 'Седмичен ред',
                        showMore: total => `+${total} още`
                    }
                }
                formats={
                    {
                        eventTimeRangeFormat: () => '',
                        timeGutterFormat: (date, culture, localizer) =>
                            localizer.format(date, 'HH:mm', culture)
                    }
                }
            />
            <Modal isOpen={isModelOpen} toggle={toggleModal} centered>
                <ModalHeader toggle={toggleModal}>Детайли</ModalHeader>
                <ModalBody>
                    <AppointmentDetails
                        appointment={selectedAppointment}
                        doctors={doctors}
                        appointmentTypes={appointmentTypes}
                        patients={patients}
                        setAppointment={setSelectedAppointment}
                        setAppointments={setAppointments}
                        onDelete={onDelete} />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>Затвори</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default AppointmentSchedule;
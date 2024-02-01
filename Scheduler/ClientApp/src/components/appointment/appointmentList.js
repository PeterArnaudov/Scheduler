import React, { useEffect, useState } from "react";
import { extractDate, formatDate } from "../../helpers/formatters/dateFormatter";
import Appointment from "./appointment";
import { toast } from "react-toastify";
import appointmentService from "../services/appointmentService";
import Loader from "../common/loader";

const AppointmentList = ({ doctorName, onSelectAppointment }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [scrollIndex, setScrollIndex] = useState(0);

    useEffect(() => {
        const fetchAppointmentData = async () => {
            try {
                const result = await appointmentService.getAvailableAsync(doctorName);

                if (result.success) {
                    setAppointments(result.data);
                }
            }
            catch (error) {
                console.error('Error fetching appointment data:', error);
            } finally {
                setIsLoading(false);
            }
        }

        setIsLoading(true);
        fetchAppointmentData();
    }, [doctorName]);

    const hasAppointments = appointments?.length > 0;

    const groupAppointmentsByDay = (appointments) => {
        return appointments.reduce((grouped, appointment) => {
            const day = extractDate(appointment.startDateTime);
            grouped[day] = grouped[day] || [];
            grouped[day].push(appointment);
            return grouped;
        }, {});
    };

    const groupedAppointments = Object.entries(groupAppointmentsByDay(appointments));
    const visibleAppointments = groupedAppointments.slice(scrollIndex, scrollIndex + 3);

    const handleScroll = (direction) => {
        const newIndex = direction === "left" ? scrollIndex - 3 : scrollIndex + 3;
        setScrollIndex(Math.max(0, Math.min(groupedAppointments.length - 3, newIndex)));
    };

    const onDelete = async (appointment) => {
        try {
            const result = await appointmentService.deleteAppointmentAsync(appointment.id);

            if (result.success) {
                setAppointments((prevAppointments) => {
                    const updatedAppointments = prevAppointments.filter((x) => x.id !== appointment.id);
                    return updatedAppointments;
                });

                toast.success(`Успешно изтри ${formatDate(appointment.startDateTime)}.`, {
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
        <div className={`${isLoading ? 'loading' : ''}`}>
            {isLoading && <Loader />}
            {(!isLoading && !hasAppointments) &&
                <p>Няма свободни часове за избраният лекар.</p>}
            {(!isLoading && hasAppointments) &&
                <><p>Свободни часове</p>
                    <div className="row mb-2">
                        <div className="col-6 text-start">
                            <button
                                className="btn btn-primary"
                                onClick={() => handleScroll("left")}
                                disabled={scrollIndex === 0}>
                                {"<"}
                            </button>
                        </div>
                        <div className="col-6 text-end">
                            <button
                                className="btn btn-primary"
                                onClick={() => handleScroll("right")}
                                disabled={scrollIndex >= groupedAppointments.length - 3}>
                                {">"}
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        {visibleAppointments.map(([day]) => (
                            <div key={day} className="col-4 text-center">
                                <p className="fw-bold">{day}</p>
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        {visibleAppointments.map(([day, appointments]) => (
                            <div key={day} className="col-4 text-center">
                                {appointments.map((appointment) => (
                                    <span key={appointment.id} className="d-block p-1">
                                        <Appointment
                                            appointment={appointment}
                                            isShortFormat={true}
                                            onSelectAppointment={onSelectAppointment}
                                            onDelete={onDelete}
                                        />
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </>}
        </div>
    );
};

export default AppointmentList;

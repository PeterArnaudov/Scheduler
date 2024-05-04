import React, { FC, useState } from 'react';
import { Button } from "reactstrap";
import { extractHour, formatAppointmentDate } from "../../helpers/formatters/dateFormatter";
import { useAuth } from "../../contexts/authContext";
import Loader from "../common/loader";
import { AppointmentModel } from '../../models/appointmentModel';
import { DoctorModel } from '../../models/doctorModel';

interface AppointmentProps {
    appointment: AppointmentModel,
    doctor?: DoctorModel,
    isShortFormat?: boolean,
    onSelectAppointment?: (appointment: any, doctor?: DoctorModel) => void,
    onDelete?: (appointment: AppointmentModel) => Promise<void>
}

const Appointment: FC<AppointmentProps> = ({ appointment, doctor, isShortFormat, onSelectAppointment, onDelete }) => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const onDeleteClick = async (appointment: AppointmentModel) => {
        if (onDelete) {
            setIsLoading(true);
            await onDelete(appointment);
            setIsLoading(false);
        }
    }

    return (
        <div className={`${isLoading ? 'loading' : ''}`}>
            {isLoading && <Loader />}
            <Button
                color="primary"
                {...(!onSelectAppointment ? { disabled: true } : {})}
                onClick={() => onSelectAppointment && onSelectAppointment(appointment, doctor)}>
                {isShortFormat
                    ? extractHour(appointment.startDateTime)
                    : formatAppointmentDate(appointment.startDateTime)}
            </Button>
            {(user?.isAdmin && onDelete) &&
                <Button
                    color="danger"
                    size="sm"
                    onClick={() => onDeleteClick(appointment)}>
                    x
                </Button>
            }
        </div>
    )
};

export default Appointment;
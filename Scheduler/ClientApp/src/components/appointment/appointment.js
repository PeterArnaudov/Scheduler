import { Button } from "reactstrap";
import { extractHour, formatDate } from "../../helpers/formatters/dateFormatter";
import { useAuth } from "../../contexts/authContext";
import { useState } from "react";
import Loader from "../common/loader";

const Appointment = ({ appointment, doctor, isShortFormat, onSelectAppointment, onDelete }) => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const onDeleteClick = async (appointment) => {
        setIsLoading(true);
        await onDelete(appointment);
        setIsLoading(false);
    }

    return (
        <div className={`${isLoading ? 'loading' : ''}`}>
            {isLoading && <Loader />}
            <Button
                color="primary"
                {...(!onSelectAppointment ? { disabled: true } : {})}
                onClick={() => onSelectAppointment(appointment, doctor)}>
                {isShortFormat
                    ? extractHour(appointment.startDateTime)
                    : formatDate(appointment.startDateTime)}
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
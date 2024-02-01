import { extractHour, extractLongDate } from "../../helpers/formatters/dateFormatter";

const AppointmentRow = ({ appointment }) => {
    return (
        <tr>
            <th scope="row">
                {appointment.startDateTime &&
                    extractLongDate(appointment.startDateTime)}
            </th>
            <td>
                {(appointment.startDateTime && appointment.endDateTime) &&
                    extractHour(appointment.startDateTime)} - {extractHour(appointment.endDateTime)}
            </td>
            <td>
                {appointment.type?.name}
            </td>
            <td>
                {appointment.doctor?.name}
            </td>
        </tr>
    );
};

export default AppointmentRow;
import { Table } from "reactstrap";
import AppointmentRow from "./appointmentRow";

const AppointmentTable = ({ appointments }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>
                        Дата
                    </th>
                    <th>
                        Интервал
                    </th>
                    <th>
                        Процедура
                    </th>
                    <th>
                        Доктор
                    </th>
                </tr>
            </thead>
            <tbody>
                {appointments.map((appointment) => (
                    <AppointmentRow key={appointment.id} appointment={appointment} />
                ))}
            </tbody>
        </Table>
    );
};

export default AppointmentTable;
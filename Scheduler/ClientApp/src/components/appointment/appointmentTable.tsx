import { Table } from "reactstrap";
import AppointmentRow from "./appointmentRow";
import { AppointmentModel } from "../../models/appointmentModel";
import React, { FC } from "react";

interface AppointmentTableProps {
    appointments: AppointmentModel[]
}

const AppointmentTable: FC<AppointmentTableProps> = ({ appointments }) => {
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
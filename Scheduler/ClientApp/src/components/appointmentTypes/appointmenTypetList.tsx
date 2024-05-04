import React, { FC, useState } from "react";
import AppointmentType from "./appointmentType";
import { Collapse } from "reactstrap";
import { AppointmentTypeModel } from "../../models/appointmentTypeModel";
import { Option } from "../../models/items/option";

interface AppointmentTypeListProps {
    appointmentTypes: AppointmentTypeModel[],
    doctorName: string,
    doctorOptions: Option[],
    onEditAppointmentType: (appointmentType: AppointmentTypeModel) => Promise<boolean>,
    onDeleteAppointmentType: (appointmentType: AppointmentTypeModel) => Promise<void>
};

const AppointmentTypeList: FC<AppointmentTypeListProps> = ({ appointmentTypes, doctorName, doctorOptions, onEditAppointmentType, onDeleteAppointmentType }) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <h2 onClick={toggle} style={{ cursor: "pointer" }}>
                {doctorName} {isOpen ? "▼" : "►"}
            </h2>
            <Collapse isOpen={isOpen}>
                {appointmentTypes.map((appointmentType) => (
                    <AppointmentType
                        key={appointmentType.id}
                        appointmentType={appointmentType}
                        doctorOptions={doctorOptions}
                        onEditAppointmentType={onEditAppointmentType}
                        onDeleteAppointmentType={onDeleteAppointmentType} />
                ))}
            </Collapse>
        </div>
    );
};

export default AppointmentTypeList;
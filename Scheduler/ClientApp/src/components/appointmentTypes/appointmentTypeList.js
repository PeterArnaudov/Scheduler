import { useState } from "react";
import AppointmentType from "./appointmentType";
import { Collapse } from "reactstrap";

const AppointmentTypeList = ({ appointmentTypes, doctorName, doctorOptions, onEditAppointmentType, onDeleteAppointmentType }) => {
    const [isOpen, setIsOpen] = useState(true);

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
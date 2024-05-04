import { AppointmentModel } from "./appointmentModel";

export interface DoctorModel {
    id: number,
    name: string,
    description?: string,
    image?: string,
    color?: string,
    earliestAvailableAppointment?: AppointmentModel
};
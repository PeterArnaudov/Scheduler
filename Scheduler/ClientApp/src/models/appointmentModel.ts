import { AppointmentTypeModel } from "./appointmentTypeModel";
import { DoctorModel } from "./doctorModel";
import { PatientModel } from "./patientModel";

export interface AppointmentModel {
    id: number,
    isFree: boolean,
    startDateTime: Date,
    endDateTime: Date,
    doctor: DoctorModel,
    type?: AppointmentTypeModel,
    patient?: PatientModel
};
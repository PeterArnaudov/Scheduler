export interface AppointmentEditRequest {
    id: number,
    isFree: boolean,
    startDateTime: Date,
    endDateTime: Date,
    doctorId: number,
    typeId?: number,
    patientId?: number
};
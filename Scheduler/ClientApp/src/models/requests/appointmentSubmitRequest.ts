export interface AppointmentSubmitRequest {
    appointmentId: number,
    phone: string
    appointmentTypeId?: number,
    name?: string,
    email?: string,
    comment?: string
};
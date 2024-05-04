export interface AppointmentBulkRequest {
    startDateTime: Date,
    endDateTime: Date,
    duration: number,
    interval: number,
    doctors: number[],
    weekDays: number[]
};
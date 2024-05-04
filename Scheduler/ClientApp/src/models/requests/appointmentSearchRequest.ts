export interface AppointmentSearchRequest {
    free: boolean,
    occupied: boolean,
    startDateTime?: Date,
    endDateTime?: Date,
    ids?: number[],
    doctors?: number[],
    patients?: number[]
};
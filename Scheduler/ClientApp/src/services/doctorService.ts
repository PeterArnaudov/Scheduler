import 'tslib';
import authService from "../api-authorization/authorizeService";
import { DoctorModel } from "../models/doctorModel";
import { BaseResponse } from '../models/responses/baseResponse';
import { CreateDoctorRequest } from '../models/requests/createDoctorRequest';
import { EditDoctorRequest } from '../models/requests/editDoctorRequest';
import { ApiResponse } from '../models/responses/apiResponse';
import { convertUtcToLocal } from '../helpers/utils/dateUtils';

const doctorService = {
    getSummarizedDoctorsAsync: async (clinicId?: string): Promise<ApiResponse<DoctorModel[]>> => {
        try {
            const response = await fetch(`/api/doctor/summarized?clinicId=${clinicId}&clinicId=0`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json() as ApiResponse<DoctorModel[]>;

            result.data.forEach((doctor) => {
                if (doctor.earliestAvailableAppointment) {
                    doctor.earliestAvailableAppointment.startDateTime = convertUtcToLocal(doctor.earliestAvailableAppointment.startDateTime);
                    doctor.earliestAvailableAppointment.endDateTime = convertUtcToLocal(doctor.earliestAvailableAppointment.endDateTime);
                }
            });

            return result;
        }
        catch (error) {
            console.error('Error during getSummarizedDoctorsAsync:', error);
            throw new Error('An error occured during get operation.');
        }
    },

    getDoctorsAsync: async (): Promise<ApiResponse<DoctorModel[]>> => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch("/api/doctor/list", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
            });

            const result = await response.json() as ApiResponse<DoctorModel[]>;

            result.data.forEach((doctor) => {
                if (doctor.earliestAvailableAppointment) {
                    doctor.earliestAvailableAppointment.startDateTime = convertUtcToLocal(doctor.earliestAvailableAppointment.startDateTime);
                    doctor.earliestAvailableAppointment.endDateTime = convertUtcToLocal(doctor.earliestAvailableAppointment.endDateTime);
                }
            });

            return result;
        }
        catch (error) {
            console.error('Error during getDoctorsAsync:', error);
            throw new Error('An error occured during get operation.');
        }
    },

    getDoctorAsync: async (doctorName: string, clinicId: string): Promise<ApiResponse<DoctorModel>> => {
        try {
            const response = await fetch(`/api/doctor/single?doctorName=${doctorName}&clinicId=${clinicId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json() as ApiResponse<DoctorModel>;

            return result;
        }
        catch (error) {
            console.error('Error during getDoctorAsync:', error);
            throw new Error('An error occured during get operation.');
        }
    },

    createDoctorAsync: async (request: CreateDoctorRequest): Promise<ApiResponse<DoctorModel>> => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch("/api/doctor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(request),
            });

            var result = await response.json() as ApiResponse<DoctorModel>;

            if (result.data.earliestAvailableAppointment) {
                result.data.earliestAvailableAppointment.startDateTime = convertUtcToLocal(result.data.earliestAvailableAppointment.startDateTime);
                result.data.earliestAvailableAppointment.endDateTime = convertUtcToLocal(result.data.earliestAvailableAppointment.endDateTime);
            }

            return result;
        }
        catch (error) {
            console.error('Error during createDoctorAsync:', error);
            throw new Error('An error occured during create operation.');
        }
    },

    editDoctorAsync: async (request: EditDoctorRequest): Promise<ApiResponse<DoctorModel>> => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch("/api/doctor", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(request),
            });

            var result = await response.json() as ApiResponse<DoctorModel>;

            if (result.data.earliestAvailableAppointment) {
                result.data.earliestAvailableAppointment.startDateTime = convertUtcToLocal(result.data.earliestAvailableAppointment.startDateTime);
                result.data.earliestAvailableAppointment.endDateTime = convertUtcToLocal(result.data.earliestAvailableAppointment.endDateTime);
            }

            return result;
        }
        catch (error) {
            console.error('Error during editDoctorAsync:', error);
            throw new Error('An error occured during edit operation.');
        }
    },

    deleteDoctorAsync: async (id: number): Promise<BaseResponse> => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch(`/api/doctor/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            var result = await response.json();

            return result.data as BaseResponse;
        }
        catch (error) {
            console.error('Error during deleteDoctorAsync:', error);
            throw new Error('An error occured during delete operation.');
        }
    },
};

export default doctorService;
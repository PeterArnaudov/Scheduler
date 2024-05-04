import authService from "../api-authorization/authorizeService";
import { AppointmentTypeModel } from "../models/appointmentTypeModel";
import { AppointmentTypeCreateRequest } from "../models/requests/appointmentTypeCreateRequest";
import { ApiResponse } from "../models/responses/apiResponse";
import { BaseResponse } from "../models/responses/baseResponse";

const appointmentTypeService = {
    getAppointmentTypesAsync: async (doctorId?: number, clinicId?: string): Promise<ApiResponse<AppointmentTypeModel[]>> => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch(`/api/appointmenttype?doctorId=${doctorId ?? ''}&clinicId=${clinicId ?? ''}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json();

            return result as ApiResponse<AppointmentTypeModel[]>;
        }
        catch (error) {
            console.error('Error during getAppointmentTypesAsync:', error);
            throw new Error('An error occured during get operation.');
        }
    },

    createAppointmentTypeAsync: async (request: AppointmentTypeCreateRequest): Promise<ApiResponse<AppointmentTypeModel[]>> => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch("/api/appointmenttype", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(request),
            });

            var result = await response.json();

            return result as Promise<ApiResponse<AppointmentTypeModel[]>>;
        }
        catch (error) {
            console.error('Error during createAppointmentTypeAsync:', error);
            throw new Error('An error occured during create operation.');
        }
    },

    editAppointmentTypeAsync: async (request: AppointmentTypeModel): Promise<ApiResponse<AppointmentTypeModel>> => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch("/api/appointmenttype", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(request),
            });

            var result = await response.json();

            return result as Promise<ApiResponse<AppointmentTypeModel>>;
        }
        catch (error) {
            console.error('Error during editAppointmentTypeAsync:', error);
            throw new Error('An error occured during edit operation.');
        }
    },

    deleteAppointmentTypeAsync: async (id: number): Promise<BaseResponse> => {
        try {

            const token = await authService.getAccessToken();
            const response = await fetch(`/api/appointmenttype/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            var result = await response.json();

            return result as BaseResponse;
        }
        catch (error) {
            console.error('Error during deleteAppointmentTypeAsync:', error);
            throw new Error('An error occured during delete operation.');
        }
    },
};

export default appointmentTypeService;
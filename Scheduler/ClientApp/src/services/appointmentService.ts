import 'tslib';
import authService from "../api-authorization/authorizeService";
import { AppointmentModel } from '../models/appointmentModel';
import { BaseResponse } from '../models/responses/baseResponse';
import { AppointmentSearchRequest } from '../models/requests/appointmentSearchRequest';
import { AppointmentEditRequest } from '../models/requests/appointmentEditRequest';
import { AppointmentBulkRequest } from '../models/requests/appointmentBulkCreateRequest';
import { ApiResponse } from '../models/responses/apiResponse';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { convertUtcToLocal } from '../helpers/utils/dateUtils';

dayjs.extend(utc);

const appointmentService = {
    getAvailableAsync: async (doctorName: string): Promise<ApiResponse<AppointmentModel[]>> => {
        try {
            const response = await fetch(`/api/appointment/available/${doctorName}`);
            var result = await response.json() as ApiResponse<AppointmentModel[]>;

            result.data.forEach((appointment) => {
                appointment.startDateTime = convertUtcToLocal(appointment.startDateTime);
                appointment.endDateTime = convertUtcToLocal(appointment.endDateTime);
            });

            return result;
        }
        catch (error) {
            console.error('Error during getAvailableAsync:', error);
            throw new Error('An error occured during get operation.');
        }
    },

    searchAsync: async (request: AppointmentSearchRequest): Promise<ApiResponse<AppointmentModel[]>> => {
        try {
            request.startDateTime = dayjs(request.startDateTime).utc().toDate();
            request.endDateTime = dayjs(request.endDateTime).utc().toDate();

            const token = await authService.getAccessToken();
            const response = await fetch(`/api/appointment/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(request),
            });

            var result = await response.json() as ApiResponse<AppointmentModel[]>;

            result.data.forEach((appointment) => {
                appointment.startDateTime = convertUtcToLocal(appointment.startDateTime);
                appointment.endDateTime = convertUtcToLocal(appointment.endDateTime);
            });

            return result;
        }
        catch (error) {
            console.error('Error during searchAsync:', error);
            throw new Error('An error occured during search operation.');
        }
    },

    editAppointmentAsync: async (request: AppointmentEditRequest): Promise<ApiResponse<AppointmentModel>> => {
        try {
            request.startDateTime = dayjs(request.startDateTime).utc().toDate();
            request.endDateTime = dayjs(request.endDateTime).utc().toDate();

            const token = await authService.getAccessToken();
            const response = await fetch("/api/appointment", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(request),
            });

            var result = await response.json() as ApiResponse<AppointmentModel>;

            result.data.startDateTime = convertUtcToLocal(result.data.startDateTime);
            result.data.endDateTime = convertUtcToLocal(result.data.endDateTime);

            return result;
        }
        catch (error) {
            console.error('Error during editAppointmentAsync:', error);
            throw new Error('An error occured during edit operation.');
        }
    },

    deleteAppointmentAsync: async (id: number): Promise<BaseResponse> => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch(`/api/appointment/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            var result = await response.json();

            return result.data as BaseResponse;
        }
        catch (error) {
            console.error('Error during deleteAppointmentAsync:', error);
            throw new Error('An error occured during delete operation.');
        }
    },

    bulkCreateAsync: async (request: AppointmentBulkRequest): Promise<ApiResponse<AppointmentModel[]>> => {
        try {
            request.startDateTime = dayjs(request.startDateTime).utc().toDate();
            request.endDateTime = dayjs(request.endDateTime).utc().toDate();

            const token = await authService.getAccessToken();
            const response = await fetch(`/api/appointment/bulk-create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(request),
            });

            var result = await response.json() as ApiResponse<AppointmentModel[]>;
            
            result.data.forEach((appointment) => {
                appointment.startDateTime = convertUtcToLocal(appointment.startDateTime);
                appointment.endDateTime = convertUtcToLocal(appointment.endDateTime);
            });

            return result;
        }
        catch (error) {
            console.error('Error during bulkCreateAsync:', error);
            throw new Error('An error occured during bulk create operation.');
        }
    },

    bulkDeleteAsync: async (request: AppointmentBulkRequest): Promise<ApiResponse<AppointmentModel[]>> => {
        try {
            request.startDateTime = dayjs(request.startDateTime).utc().toDate();
            request.endDateTime = dayjs(request.endDateTime).utc().toDate();

            const token = await authService.getAccessToken();
            const response = await fetch(`/api/appointment/bulk-delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(request),
            });

            var result = await response.json() as ApiResponse<AppointmentModel[]>;
            
            result.data.forEach((appointment) => {
                appointment.startDateTime = convertUtcToLocal(appointment.startDateTime);
                appointment.endDateTime = convertUtcToLocal(appointment.endDateTime);
            });

            return result;
        }
        catch (error) {
            console.error('Error during bulkDeleteAsync:', error);
            throw new Error('An error occured during bulk delete operation.');
        }
    },
};

export default appointmentService;
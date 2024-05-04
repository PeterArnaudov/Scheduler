import authService from "../api-authorization/authorizeService";
import { PatientModel } from "../models/patientModel";
import { PatientEditRequest } from "../models/requests/patientEditRequest";
import { PatientSearchRequest } from "../models/requests/patientSearchRequest";
import { ApiResponse } from "../models/responses/apiResponse";
import { BaseResponse } from "../models/responses/baseResponse";

const patientService = {
    searchAsync: async (requestData?: PatientSearchRequest): Promise<ApiResponse<PatientModel[]>> => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch('api/patient/search', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(requestData),
            });
            const result = await response.json();

            return result as ApiResponse<PatientModel[]>;
        }
        catch (error) {
            console.error('Error during getPatientsAsync:', error);
            throw new Error('An error occured during get operation.');
        }
    },

    editPatientAsync: async (requestData: PatientEditRequest): Promise<ApiResponse<PatientModel>> => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch("/api/patient", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestData),
            });

            var result = await response.json();

            return result as ApiResponse<PatientModel>;
        }
        catch (error) {
            console.error('Error during editPatientAsync:', error);
            throw new Error('An error occured during edit operation.');
        }
    },

    deletePatientAsync: async (id: number): Promise<BaseResponse> => {
        try {

            const token = await authService.getAccessToken();
            const response = await fetch(`/api/patient/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            var result = await response.json();

            return result as BaseResponse;
        }
        catch (error) {
            console.error('Error during deletePatientAsync:', error);
            throw new Error('An error occured during delete operation.');
        }
    },
};

export default patientService;